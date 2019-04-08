/** @jsx jsx */
import { Fragment } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"

import { useQuery } from "react-apollo-hooks"
import { GET_TASK } from "@/graphql/task"

const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const content = css`
  padding: 2rem;
  background: white;
  width: 90%;
  height: 90%;
`

const Task = ({ projectId, taskId }) => {
  const {
    loading,
    data: { task = {} },
    error
  } = useQuery(GET_TASK, {
    variables: { id: Number(taskId) }
  })

  if (error) {
    console.log(error)
  }

  return (
    <div css={container}>
      <div css={content}>
        {loading ? (
          "Loading"
        ) : (
          <Fragment>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
          </Fragment>
        )}
      </div>
    </div>
  )
}

Task.propTypes = {
  projectId: PropTypes.string,
  taskId: PropTypes.string
}

export default Task
