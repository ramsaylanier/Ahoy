/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"

import TaskListItem from "./taskListItem"

const list = css`
  list-style: none;
  padding: 0;
`

const TaskList = ({ tasks }) => {
  const [sortedTasks, setSortedTasks] = useState(tasks)

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

  return (
    <ul css={list}>
      {sortedTasks.map((task, index) => {
        return (
          <TaskListItem
            key={task.id}
            task={task}
            moveTask={moveTask}
            index={index}
          />
        )
      })}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default TaskList
