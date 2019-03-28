/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { useQuery } from "react-apollo-hooks"
import { useStore } from "@/state/store"

import IconButton from "@/components/button/iconButton"
import InviteUserForm from "@/components/project/inviteUserForm"
import ContentWrapper from "@/components/contentWrapper"
import CreateTaskForm from "@/components/task/createTaskForm"
import Drawer from "@/components/drawer"
import TaskList from "@/components/task/taskList"

import AddIcon from "@/icons/addIcon"

import { PROJECT_QUERY } from "@/graphql/project"
import theme from "@/theme"

const drawer = css`
  width: 50%;
  max-width: 300px;
`

const title = theme => css`
  color: ${theme.colors.primary};
  margin: 0;
  font-size: 2.2em;
`

const header = theme => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.colors.primary};
`

const flex = css`
  display: flex;
`

const body = css`
  ${flex}
`

const column = css`
  flex: 1;
`

const columnHeader = css`
  ${flex}
  align-items: center;
`

const addButton = css`
  margin-left: 1rem;
  background: ${theme.colors.primary};
  path {
    fill: white;
  }
`

const Project = ({ projectId, children }) => {
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
    <ContentWrapper
      size="small"
      cssProps={{ background: "white", padding: "1rem" }}
    >
      <div css={header}>
        <h1 css={title}>{project.title}</h1>
      </div>

      <div css={body}>
        <div css={column}>
          <div css={columnHeader}>
            <h3>Members</h3>
            {isOwner && (
              <IconButton
                cssProps={addButton}
                onClick={() => handleClick("inviteUser")}
              >
                <AddIcon />
              </IconButton>
            )}
          </div>
          {project.members.map(member => {
            return <h1 key={member.id}>{member.nickname}</h1>
          })}
        </div>
        <div css={column}>
          <div css={columnHeader}>
            <h3>Tasks</h3>
            {isOwner && (
              <IconButton
                cssProps={addButton}
                onClick={() => handleClick("createTask")}
              >
                <AddIcon />
              </IconButton>
            )}
          </div>
          <TaskList tasks={project.tasks} />
        </div>
      </div>

      {children}

      <Drawer open={open} onClose={() => setOpen(false)} cssProps={drawer}>
        {drawerComponent}
      </Drawer>
    </ContentWrapper>
  )
}

Project.propTypes = {
  projectId: PropTypes.string,
  children: PropTypes.node
}

export default Project
