/** @jsx jsx */
import { jsx } from "@emotion/core"
import PropTypes from "prop-types"

import CreateProjectButton from "./createProjectButton"
import ProjectListItem from "./projectListItem"

const ProjectList = ({ projects }) => {
  return (
    <div css={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
      {projects.map(project => (
        <ProjectListItem key={project.id} project={project} expanded={false} />
      ))}

      <CreateProjectButton cssProps={{ marginTop: "2rem" }} />
    </div>
  )
}

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired
}

export default ProjectList
