/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import theme from "@/theme"

import { Link } from "@reach/router"

const list = css`
  list-style: none;
  padding: 0;
`

const listItem = css`
  padding: 0;
  background: ${theme.colors.background.default};
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  a {
    display: block;
    color: ${theme.colors.primary};
    padding: 1rem;
  }
`

const TaskList = ({ tasks }) => {
  return (
    <ul css={list}>
      {tasks.map(task => {
        return (
          <li key={task.id} css={listItem}>
            <Link to={`task/${task.id}`}>{task.title}</Link>
          </li>
        )
      })}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default TaskList
