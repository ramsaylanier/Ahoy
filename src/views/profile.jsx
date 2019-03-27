/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import { auth } from "@/state/auth"
import { useDispatch } from "@/state/store"
import { useMutation } from "react-apollo-hooks"

import Drawer from "@/components/drawer"
import FormControl from "@/components/form/formControl"
import TextField from "@/components/form/textField"

import { CREATE_PROJECT } from "@/graphql/project"

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
`

const Profile = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const createProject = useMutation(CREATE_PROJECT)

  const handleLogout = () => {
    auth.logout({
      returnTo: "http://localhost:3000/login"
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
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => setOpen(!open)}>Create Project</button>

      <Drawer open={open} onClose={() => setOpen(false)}>
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
