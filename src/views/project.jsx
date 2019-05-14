/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { useQuery, useSubscription } from "react-apollo-hooks"
import useIsOwner from "@/hooks/useIsOwner"
import { Router } from "@reach/router"
import ContentWrapper from "@/components/contentWrapper"
import { ProjectStoreProvider } from "@/components/project/projectState"
import ProjectTitle from "@/components/project/projectTitle"
import ProjectSidebar from "@/components/project/projectSidebar"
import UserList from "@/components/user/userList"
import TaskList from "@/components/task/taskList"

import {
  PROJECT_QUERY,
  PROJECT_TITLE_UPDATED_SUBSCRIPTION
} from "@/graphql/project"
import theme from "@/theme"
import DragDropContext from "@/components/dragDropContext"

const wrapper = css`
  min-height: 100vh;
  background: white;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header"
    "body";
`

const header = css`
  grid-area: header;
  padding: 1rem;
  border-bottom: 1px solid ${theme.colors.primary};
`

const body = css`
  grid-area: body;
  display: flex;
`

const Project = ({ projectId, children, location }) => {
  const id = Number(projectId)

  // Queries
  const { data = {}, loading } = useQuery(PROJECT_QUERY, {
    variables: { id }
  })

  const isOwner = useIsOwner(data.project)

  // Subscriptions
  useSubscription(PROJECT_TITLE_UPDATED_SUBSCRIPTION)

  if (loading) return "Loading..."

  const { project } = data

  return (
    <ProjectStoreProvider>
      {project && (
        <ContentWrapper size="full" cssProps={wrapper}>
          <div css={header}>
            <ProjectTitle project={project} isOwner={isOwner} />
          </div>
          <div css={body}>
            <ProjectSidebar project={project}>
              <Router>
                <UserList path="members/*" />
                <TaskList path="tasks/*" />
              </Router>
            </ProjectSidebar>
            <div css={{ flex: 1 }}>{children}</div>
          </div>
        </ContentWrapper>
      )}
    </ProjectStoreProvider>
  )
}

Project.propTypes = {
  location: PropTypes.object.isRequired,
  projectId: PropTypes.string,
  children: PropTypes.node
}

export default DragDropContext(Project)
