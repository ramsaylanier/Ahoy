/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import gql from "graphql-tag"
import { useQuery, useMutation } from "react-apollo-hooks"
import { useStore } from "@/state/store"

import IconButton from "@/components/button/iconButton"
import InputSubmit from "@/components/form/inputSubmit"
import Drawer from "@/components/drawer"
import FormControl from "@/components/form/formControl"
import TextField from "@/components/form/textField"

import AddAccountIcon from "@/icons/addAccountIcon"

const container = css`
  position: relative;
`

const drawer = css`
  width: 50%;
  max-width: 300px;
`

const title = theme => css`
  color: white;
  margin: 0;
  font-size: 1.2em;
`

const header = theme => css`
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`

const form = css`
  padding: 0.5rem;
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
    inviteUser({ variables: { projectId, email } })
  }

  const isOwner =
    authState.userProfile && authState.userProfile.sub === project.owner.id

  return (
    <div css={container}>
      <div css={header}>
        <h1 css={title}>{project.title}</h1>

        {isOwner && (
          <IconButton onClick={() => setOpen(!open)} color="secondary">
            <AddAccountIcon />
          </IconButton>
        )}
      </div>

      {project.members.map(member => {
        return <h1 key={member.id}>{member.nickname}</h1>
      })}

      <Drawer open={open} onClose={() => setOpen(false)} cssProps={drawer}>
        <form onSubmit={handleSubmit} css={form}>
          <FormControl cssProps={{ padding: 0 }}>
            <TextField
              id="new-user-email"
              label="User's Email"
              type="email"
              val={email}
              styles={{
                label: {
                  color: "white"
                }
              }}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>

          <InputSubmit
            value="Invite"
            color="secondary"
            cssProps={{ marginTop: "1rem" }}
          />
        </form>
      </Drawer>
    </div>
  )
}

Project.propTypes = {
  projectId: PropTypes.string
}

export default Project
