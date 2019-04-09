/** @jsx jsx */
import { useState } from "react"
import { jsx } from "@emotion/core"
import { useMutation } from "react-apollo-hooks"

import FormControl from "@/components/form/formControl"
import TextField from "@/components/form/textField"

import { CREATE_PROJECT } from "@/graphql/project"

const Profile = () => {
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const createProject = useMutation(CREATE_PROJECT)

  const handleSubmit = e => {
    e.preventDefault()

    createProject({
      variables: {
        project: { title: projectTitle, description: projectDescription }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <TextField
          id="project-name"
          label="Project Name"
          val={projectTitle}
          onChange={e => setProjectTitle(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <TextField
          id="description-name"
          label="Project Description"
          type="textArea"
          val={projectDescription}
          onChange={e => setProjectDescription(e.target.value)}
        />
      </FormControl>

      <input type="submit" value="Create" />
    </form>
  )
}

export default Profile
