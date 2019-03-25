/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"

import ProjectListItem from "./projectListItem"

const list = theme => css`
  display: flex;
  flex-flow: column;
`

const ProjectList = ({ projects }) => {
  return (
    <div css={list}>
      {projects.map(project => (
        <ProjectListItem key={project.id} project={project} />
      ))}
    </div>
  )
}

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired
}

export default ProjectList
