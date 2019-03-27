/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { useMutation } from "react-apollo-hooks"
import InputSubmit from "@/components/form/inputSubmit"
import FormControl from "@/components/form/formControl"
import TextField from "@/components/form/textField"
import { CREATE_TASK } from "@/graphql/task"

const form = css`
  padding: 0.5rem;
`

const formTitle = css`
  color: white;
  font-size: 1em;
`

const CreateTaskForm = ({ projectId }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // Mutations
  const createTask = useMutation(CREATE_TASK)

  const handleSubmit = async e => {
    e.preventDefault()

    const task = {
      title,
      description,
      projectId
    }

    createTask({ variables: { task } })
  }

  return (
    <form onSubmit={handleSubmit} css={form}>
      <h4 css={formTitle}>Create New Task</h4>
      <FormControl cssProps={{ padding: 0 }}>
        <TextField
          id="new-task-name"
          label="Title"
          type="text"
          val={title}
          styles={{
            label: {
              color: "white"
            }
          }}
          onChange={e => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl cssProps={{ padding: 0 }}>
        <TextField
          id="new-task-description"
          label="Task Description"
          type="textArea"
          val={description}
          styles={{
            label: {
              color: "white"
            }
          }}
          onChange={e => setDescription(e.target.value)}
        />
      </FormControl>

      <InputSubmit
        value="Create Task"
        color="secondary"
        cssProps={{ marginTop: "1rem" }}
      />
    </form>
  )
}

CreateTaskForm.propTypes = {
  projectId: PropTypes.string
}

export default CreateTaskForm
