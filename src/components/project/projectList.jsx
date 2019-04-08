/** @jsx jsx */
import { jsx } from "@emotion/core"
import PropTypes from "prop-types"

import Column from "../column"
import ProjectListItem from "./projectListItem"

const ProjectList = ({ projects }) => {
  return (
    <Column title="Projects">
      {projects.map(project => (
        <ProjectListItem key={project.id} project={project} expanded={open} />
      ))}
    </Column>
  )
}

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired
}

export default ProjectList
