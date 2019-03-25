/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { Link } from "@reach/router"

const listItem = theme => css`
  display: flex;
  background: white;
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`

const title = theme => css`
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1.3rem;
  text-decoration: none;
  color: ${theme.colors.primary};
`

const ProjectListItem = ({ project }) => {
  return (
    <div css={listItem}>
      <Link to={`/projects/${project.id}`} css={title}>
        {project.title}
      </Link>
    </div>
  )
}

ProjectListItem.propTypes = {
  project: PropTypes.object.isRequired
}

export default ProjectListItem
