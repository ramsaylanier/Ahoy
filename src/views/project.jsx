/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { useQuery } from "react-apollo-hooks"
import { useStore } from "@/state/store"

import IconButton from "@/components/button/iconButton"
import InviteUserForm from "@/components/project/inviteUserForm"
import CreateTaskForm from "@/components/task/createTaskForm"
import Drawer from "@/components/drawer"

import AddAccountIcon from "@/icons/addAccountIcon"

import { PROJECT_QUERY } from "@/graphql/project"

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

const body = css`
  display: flex;
`

const column = css`
  flex: 1;
`

const Project = ({ projectId }) => {
  const [open, setOpen] = useState(false)
  const [drawerType, setDrawerType] = useState("inviteUser")
  const authState = useStore("auth")

  // Queries
  const { data, loading } = useQuery(PROJECT_QUERY, {
    variables: { id: projectId }
  })

  if (loading) return "Loading..."

  const { project } = data
  const isOwner =
    authState.userProfile && authState.userProfile.sub === project.owner.id
  const drawerMap = {
    inviteUser: <InviteUserForm projectId={projectId} />,
    createTask: <CreateTaskForm projectId={projectId} />
  }
  const drawerComponent = drawerMap[drawerType]

  const handleClick = type => {
    setOpen(true)
    setDrawerType(type)
  }

  return (
    <div css={container}>
      <div css={header}>
        <h1 css={title}>{project.title}</h1>

        {isOwner && (
          <div>
            <IconButton
              onClick={() => handleClick("inviteUser")}
              color="secondary"
            >
              <AddAccountIcon />
            </IconButton>
            <IconButton
              onClick={() => handleClick("createTask")}
              color="secondary"
            >
              <AddAccountIcon />
            </IconButton>
          </div>
        )}
      </div>

      <div css={body}>
        <div css={column}>
          <h3>Members</h3>
          {project.members.map(member => {
            return <h1 key={member.id}>{member.nickname}</h1>
          })}
        </div>
        <div css={column}>
          <h3>Tasks</h3>
          {project.tasks.map(task => {
            return <h1 key={task.id}>{task.nickname}</h1>
          })}
        </div>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)} cssProps={drawer}>
        {drawerComponent}
      </Drawer>
    </div>
  )
}

Project.propTypes = {
  projectId: PropTypes.string
}

export default Project
