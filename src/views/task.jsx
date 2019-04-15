/** @jsx jsx */
import { Fragment, useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import useIsOwner from "@/hooks/useIsOwner"

import { useQuery } from "react-apollo-hooks"
import { GET_TASK } from "@/graphql/task"
import Showdown from "showdown"
import ReactMde from "react-mde"
import "react-mde/lib/styles/css/react-mde-all.css"

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
  const [val, setVal] = useState("")
  const [tab, setTab] = useState("preview")
  const [isEditing, setIsEditing] = useState(false)
  const {
    loading,
    data: { task = {} }
  } = useQuery(GET_TASK, {
    variables: { id: Number(taskId) }
  })

  const isOwner = useIsOwner(task.project)

  if (task) {
    return (
      <div css={container}>
        <div css={content}>
          {loading ? (
            "Loading"
          ) : (
            <Fragment>
              <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Save" : "Edit"}
              </button>
              <h1>{task.title}</h1>
              <ReactMde
                css={{ height: "auto", flex: 1 }}
                readOnly={!isOwner || !isEditing}
                onChange={val => setVal(val)}
                value={val}
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
