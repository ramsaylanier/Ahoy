/** @jsx jsx */
import React, { useImperativeHandle, useRef, useEffect } from "react"
import { DragSource, DropTarget } from "react-dnd"
import { jsx, css } from "@emotion/core"
import theme, { darken, lightenPrimary } from "@/theme"
import Color from "color"
import { useMutation } from "react-apollo-hooks"
import { UPDATE_TASK_ORDER } from "@/graphql/task"
import useIsOwner from "@/hooks/useIsOwner"
import CheckboxMarkedIcon from "@/components/icons/checkboxMarked"
import CheckboxIcon from "@/components/icons/checkbox"
import { Link } from "@reach/router"

const listItem = css`
  display: flex;
  align-items: center;
  background: ${Color(theme.colors.primary)
    .lighten(1.3)
    .string()};
  a {
    text-overflow: ellipsis;
    color: ${theme.colors.primary};
    padding: 1rem;
  }
`

const link = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0.5rem;
  font-size: 1rem;
  text-decoration: none;
  color: ${theme.colors.primary};
  &:hover {
    background: ${lightenPrimary(1.2)};
  }
`

const icon = css`
  height: 24px;
  width: 24px;
  margin-left: 1rem;
`

const TaskListItem = React.forwardRef(
  ({ task, index, connectDragSource, connectDropTarget, actions }, ref) => {
    const elementRef = useRef(null)
    const isOwner = useIsOwner(task.project)
    const updateTaskOrder = useMutation(UPDATE_TASK_ORDER)

    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current
    }))

    // when item is dragged, its index will change. This will
    // update the task's order server-side so it matches client.
    useEffect(() => {
      if (isOwner && index !== task.order) {
        updateTaskOrder({ variables: { id: task.id, order: index } })
      }
    }, [index, isOwner, task.id, task.order, task.title, updateTaskOrder])

    // enables drag and drop
    if (isOwner) {
      connectDragSource(elementRef)
      connectDropTarget(elementRef)
    }

    return (
      <div ref={elementRef} css={listItem}>
        {isOwner && (
          <input
            css={{ marginLeft: "1rem" }}
            type="checkbox"
            onChange={e => {
              e.target.checked
                ? actions.selectTask(task.id)
                : actions.deselectTask(task.id)
            }}
          />
        )}
        <Link css={link} to={`task/${task.id}`}>
          {task.title}
          {!isOwner &&
            (task.completed ? (
              <CheckboxMarkedIcon
                css={[icon, { fill: darken(theme.colors.success)(0.2) }]}
              />
            ) : (
              <CheckboxIcon css={[icon, { fill: theme.colors.primary }]} />
            ))}
        </Link>
      </div>
    )
  }
)

export default DropTarget(
  "task",
  {
    hover(props, monitor, component) {
      if (!component) {
        return null
      }
      // node = HTML Div element from imperative API
      const node = component.getNode()
      if (!node) {
        return null
      }
      const dragIndex = monitor.getItem().index
      const hoverIndex = props.index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      props.moveTask(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    "task",
    {
      beginDrag: props => ({
        id: props.id,
        index: props.index
      })
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(TaskListItem)
)
