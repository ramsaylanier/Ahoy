/** @jsx jsx */
import { jsx } from "@emotion/core"
import PropTypes from "prop-types"

import Column from "../column"
import ColumnToolbar from "../columnToolbar"
import CreateProjectButton from "./createProjectButton"
import ProjectListItem from "./projectListItem"

const ProjectList = ({ projects }) => {
  return (
    <Column title="Projects">
      <ColumnToolbar>
        <CreateProjectButton />
      </ColumnToolbar>
      {projects.map(project => (
        <ProjectListItem key={project.id} project={project} expanded={false} />
      ))}
    </Column>
  )
}

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired
}

export default ProjectList
