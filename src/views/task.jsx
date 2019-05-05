/** @jsx jsx */
import { Fragment, useState, useEffect } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import useIsOwner from "@/hooks/useIsOwner"

import { useQuery, useMutation } from "react-apollo-hooks"
import {
  GET_TASK,
  UPDATE_TASK_DESCRIPTION,
  COMPLETE_TASK
} from "@/graphql/task"
import Button from "@/components/button/button"
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

const button = css`
  margin-left: 1rem;
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
  const completeTask = useMutation(COMPLETE_TASK)

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

  const handleCompleteTask = () => {
    completeTask({ variables: { taskId: Number(taskId) } })
  }

  if (task) {
    return (
      <div css={container}>
        <div css={content}>
          {loading ? (
            "Loading"
          ) : (
            <Fragment>
              <div css={{ display: "flex", alignItems: "center" }}>
                <h1>{task.title}</h1>

                {isOwner && (
                  <Button onClick={handleClick} cssProps={button}>
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                )}

                {!isOwner && (
                  <Button onClick={handleCompleteTask} cssProps={button}>
                    Mark As Complete
                  </Button>
                )}
              </div>

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
