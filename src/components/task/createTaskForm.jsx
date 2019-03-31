/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { useDispatch } from "@/state/store"

import InputSubmit from "@/components/form/inputSubmit"
import FormControl from "@/components/form/formControl"
import TextField from "@/components/form/textField"

import { useMutation } from "react-apollo-hooks"
import { CREATE_TASK } from "@/graphql/task"
import { PROJECT_QUERY } from "@/graphql/project"

import sortBy from "lodash/sortBy"

const form = css`
  padding: 0.5rem;
`

const formTitle = css`
  color: white;
  font-size: 1em;
`

const CreateTaskForm = ({ projectId }) => {
  const dispatch = useDispatch()
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

    await createTask({
      variables: { task },
      update: (store, { data: { createTask } }) => {
        const { project } = store.readQuery({
          query: PROJECT_QUERY,
          variables: { id: projectId }
        })

        project.tasks.push(createTask)
        project.tasks = sortBy(project.tasks, task => task.order)

        store.writeQuery({
          query: PROJECT_QUERY,
          variables: { id: projectId },
          data: { project }
        })
      }
    })

    dispatch({
      type: "throwNotification",
      payload: { message: `Task created`, type: "success" }
    })
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
  projectId: PropTypes.number
}

export default CreateTaskForm
