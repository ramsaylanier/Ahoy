/** @jsx jsx */
import { Fragment, useState } from "react"
import { jsx, css } from "@emotion/core"
import { auth } from "@/state/auth"
import { useDispatch } from "@/state/store"
import { useMutation } from "react-apollo-hooks"

import Button from "@/components/button/button"
import Drawer from "@/components/drawer"
import FormControl from "@/components/form/formControl"
import TextField from "@/components/form/textField"

import { CREATE_PROJECT } from "@/graphql/project"

const container = css`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
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
    localStorage.removeItem("ahoyAccessToken")
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
    <Fragment>
      <div css={container}>
        <Button color="secondary" onClick={() => setOpen(!open)}>
          Create Project
        </Button>
        <Button color="secondary" type="text" onClick={handleLogout}>
          Logout
        </Button>
      </div>

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
    </Fragment>
  )
}

export default Profile
