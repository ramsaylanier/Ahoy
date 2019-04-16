/** @jsx jsx */
import { Fragment, useState, useEffect } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import useIsOwner from "@/hooks/useIsOwner"

import { useQuery, useMutation } from "react-apollo-hooks"
import { GET_TASK, UPDATE_TASK_DESCRIPTION } from "@/graphql/task"
import Showdown from "showdown"
import ReactMde from "react-mde"
import "react-mde/lib/styles/css/react-mde-all.css"
import "./task.css"

const container = css`
  height: 100vh;
  width: 100%;
  overflow: auto;
`

const content = css`
  height: 100%;
  padding: 2rem;
  background: white;
  display: flex;
  flex-flow: column;
`

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})

const Task = ({ taskId }) => {
  const [description, setDescription] = useState("")
  const [tab, setTab] = useState("write")
  const [isEditing, setIsEditing] = useState(false)

  // QUERY
  const {
    loading,
    data: { task = {} }
  } = useQuery(GET_TASK, {
    variables: { id: Number(taskId) }
  })

  // MUTATION
  const updateTaskDescription = useMutation(UPDATE_TASK_DESCRIPTION)

  // RESET
  useEffect(() => {
    setDescription("")
    setIsEditing(false)
    setTab("write")
  }, [taskId])

  const isOwner = useIsOwner(task.project)

  const handleClick = () => {
    if (isEditing) {
      updateTaskDescription({
        variables: {
          taskId: Number(taskId),
          description
        }
      })
    } else {
      setDescription(task.description)
    }

    setIsEditing(!isEditing)
  }

  if (task) {
    return (
      <div css={container}>
        <div css={content}>
          {loading ? (
            "Loading"
          ) : (
            <Fragment>
              <button onClick={handleClick}>
                {isEditing ? "Save" : "Edit"}
              </button>
              <h1>{task.title}</h1>

              {isEditing ? (
                <ReactMde
                  css={{ height: "auto", flex: 1 }}
                  readOnly={!isOwner || !isEditing}
                  onChange={val => setDescription(val)}
                  value={description}
                  selectedTab={tab}
                  onTabChange={tab => setTab(tab)}
                  generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                  }
                  textAreaProps={{
                    style: {
                      height: "100%"
                    }
                  }}
                />
              ) : (
                <div
                  id="task-description"
                  dangerouslySetInnerHTML={{
                    __html: converter.makeHtml(task.description)
                  }}
                />
              )}
            </Fragment>
          )}
        </div>
      </div>
    )
  }

  return null
}

Task.propTypes = {
  taskId: PropTypes.string.isRequired
}

export default Task
