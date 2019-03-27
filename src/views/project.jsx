/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import gql from "graphql-tag"
import { useQuery, useMutation } from "react-apollo-hooks"
import { useStore } from "@/state/store"

import Drawer from "@/components/drawer"
import FormControl from "@/components/form/formControl"
import TextField from "@/components/form/textField"

const projectStyles = theme => css`
  position: relative;
`

const PROJECT_QUERY = gql`
  query Project($id: String!) {
    project(id: $id) {
      id
      title
      members {
        id
        nickname
      }
      owner {
        id
        nickname
      }
    }
  }
`

const INVITE_USER = gql`
  mutation InviteUser($email: String!, $projectId: String!) {
    inviteUser(email: $email, projectId: $projectId) {
      id
      members {
        id
        nickname
      }
    }
  }
`

const Project = ({ projectId }) => {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const authState = useStore("auth")

  // Queries
  const {
    data: { project = {} },
    loading
  } = useQuery(PROJECT_QUERY, {
    variables: { id: projectId }
  })

  // Mutations
  const inviteUser = useMutation(INVITE_USER)

  if (loading) return "Loading..."

  const handleSubmit = async e => {
    e.preventDefault()
    const newUser = await inviteUser({ variables: { projectId, email } })
    console.log(newUser)
  }

  const isOwner =
    authState.userProfile && authState.userProfile.sub === project.owner.id

  console.log(project)
  return (
    <div css={projectStyles}>
      <h1>{project.title}</h1>
      <h3>{project.owner.nickname}</h3>

      {isOwner && (
        <button onClick={() => setOpen(!open)}>Add User To Project</button>
      )}

      {project.members.map(member => {
        return <h1 key={member.id}>{member.nickname}</h1>
      })}

      <Drawer open={open}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              id="new-user-email"
              label="User's Email"
              type="email"
              val={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>

          <input type="submit" value="Invite" />
        </form>
      </Drawer>
    </div>
  )
}

Project.propTypes = {
  projectId: PropTypes.string
}

export default Project
