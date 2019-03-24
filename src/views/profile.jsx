/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import { auth } from "@/state/auth"
import { useDispatch, useStore } from "@/state/store"
import { useQuery, useMutation } from "react-apollo-hooks"
import gql from "graphql-tag"

import Drawer from "@/components/drawer"
import FormControl from "@/components/form/formControl"
import TextField from "@/components/form/textField"

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const USER_QUERY = gql`
  query UserQuery($id: String!) {
    user(id: $id) {
      id
      projects {
        id
        title
        description
      }
    }
  }
`

const CREATE_PROJECT = gql`
  mutation CreateProject($project: ProjectInput!) {
    createProject(project: $project) {
      id
      title
      description
      owner {
        id
      }
      created_at
    }
  }
`

const Profile = props => {
  const dispatch = useDispatch()
  const authState = useStore("auth")
  const [open, setOpen] = useState(false)
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const createProject = useMutation(CREATE_PROJECT)

  const userId = authState.userProfile ? authState.userProfile.sub : null

  const { loading, data, error } = useQuery(USER_QUERY, {
    variables: { id: userId },
    skip: !userId
  })

  if (error) throw error

  console.log(data)

  const handleLogout = () => {
    auth.logout({
      returnTo: "http://localhost:3000/"
    })
    dispatch({ type: "logout" })
    localStorage.removeItem("ahoyToken")
  }

  const handleSubmit = e => {
    e.preventDefault()

    createProject({
      variables: {
        project: { title: projectTitle, description: projectDescription }
      }
    })
  }

  return (
    <div css={container}>
      {loading && "Loading..."}
      <h1>Profile</h1>

      <button onClick={handleLogout}>Logout</button>

      <button onClick={() => setOpen(!open)}>Create Project</button>

      <Drawer open={open}>
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
      </Drawer>
    </div>
  )
}

export default Profile
