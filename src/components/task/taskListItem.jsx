/** @jsx jsx */
import React, { useImperativeHandle, useRef, useEffect } from "react"
import { DragSource, DropTarget } from "react-dnd"
import { jsx, css } from "@emotion/core"
import theme from "@/theme"
import Color from "color"
import { useMutation } from "react-apollo-hooks"
import { UPDATE_TASK_ORDER } from "@/graphql/task"

import { Link } from "@reach/router"

const listItem = css`
  padding: 0;
  background: ${Color(theme.colors.primary)
    .lighten(1.3)
    .string()};
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  a {
    display: block;
    color: ${theme.colors.primary};
    padding: 1rem;
  }
`

const TaskListItem = React.forwardRef(
  ({ task, index, connectDragSource, connectDropTarget }, ref) => {
    const elementRef = useRef(null)
    connectDragSource(elementRef)
    connectDropTarget(elementRef)
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current
    }))

    const updateTaskOrder = useMutation(UPDATE_TASK_ORDER)

    // when item is dragged, its index will change. This will
    // update the task's order server-side so it matches client.
    useEffect(() => {
      if (index !== task.order) {
        updateTaskOrder({ variables: { id: task.id, order: index } })
      }
    }, [index, task.id, task.order, task.title, updateTaskOrder])

    return (
      <li ref={elementRef} css={listItem}>
        <Link to={`task/${task.id}`}>{task.title}</Link>
      </li>
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
