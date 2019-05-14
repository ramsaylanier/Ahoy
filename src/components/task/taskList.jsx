/** @jsx jsx */
import { Fragment, useState, useEffect } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import theme from "@/theme"
import {
  useStore as useProjectStore,
  useDispatch as useProjectDispatch,
  actions as projectActions
} from "@/components/project/projectState"

import CreateTaskButton from "@/components/button/createTaskButton"
import IconButton from "@/components/button/iconButton"
import TaskListItem from "./taskListItem"

import DeleteIcon from "@/icons/deleteIcon"

import { DELETE_TASKS } from "@/graphql/task"
import { PROJECT_QUERY } from "@/graphql/project"
import { useMutation } from "react-apollo-hooks"

const addButton = css`
  margin-left: 0.5rem;
  background: white;
  path {
    fill: ${theme.colors.primary};
  }
`

const TaskList = ({ project }) => {
  useEffect(() => {
    setSortedTasks(project.tasks)
  }, [project.tasks])
  const state = useProjectStore()
  const projectDispatch = useProjectDispatch()
  const [sortedTasks, setSortedTasks] = useState(project.tasks || [])
  const deleteTasks = useMutation(DELETE_TASKS)
  const actions = projectActions(projectDispatch)

  if (!project) return null
  const id = Number(project.id)
  const handleDeleteClick = () => {
    deleteTasks({
      variables: { ids: state.selection },
      update: (store, { data: { deleteTasks } }) => {
        const { project } = store.readQuery({
          query: PROJECT_QUERY,
          variables: { id }
        })

        project.tasks = project.tasks.filter(
          task => !deleteTasks.includes(task.id)
        )

        store.writeQuery({
          query: PROJECT_QUERY,
          variables: { id },
          data: { project }
        })

        actions.clearSelection()
      }
    })
  }

  const moveTask = (dragIndex, hoverIndex) => {
    const tasks = [...sortedTasks]
    const dragTask = tasks[dragIndex]

    // remove currently dragged item
    tasks.splice(dragIndex, 1)
    // add it back in its new place
    tasks.splice(hoverIndex, 0, dragTask)
    // update list
    setSortedTasks(tasks)
  }

  const hasSelection = state.selection.length > 0

  return (
    <Fragment>
      {hasSelection ? (
        <Fragment>
          <span css={{ fontSize: "0.8rem", color: "white" }}>
            {state.selection.length} selected
          </span>
          <IconButton cssProps={addButton} onClick={() => handleDeleteClick()}>
            <DeleteIcon />
          </IconButton>
        </Fragment>
      ) : (
        <CreateTaskButton projectId={id} />
      )}
      {sortedTasks.map((task, index) => {
        return (
          <TaskListItem
            key={task.id}
            task={task}
            moveTask={moveTask}
            index={index}
            actions={actions}
          />
        )
      })}
    </Fragment>
  )
}

TaskList.propTypes = {
  project: PropTypes.object,
  actions: PropTypes.object,
  state: PropTypes.object,
  dispatch: PropTypes.func
}

export default TaskList
