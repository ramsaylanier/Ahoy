/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { Link } from "@reach/router"
import { useStore } from "@/state/store"
import theme from "@/theme"

const listItem = css`
  display: flex;
  align-items: center;
  background: white;
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`

const title = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  font-size: 1.3rem;
  text-decoration: none;
  color: ${theme.colors.primary};
`

const badge = css`
  margin-left: 1rem;
  background: ${theme.colors.secondary};
  padding: 0.25rem 0.55rem;
  font-size: 0.7rem;
  border-radius: 3px;
  color: ${theme.colors.primary};
`

const ProjectListItem = ({ project }) => {
  const {
    userProfile: { sub: userId }
  } = useStore("auth")

  const isOwner = project.owner.id === userId
  return (
    <div css={listItem}>
      <Link to={`/projects/${project.id}`} css={title}>
        {project.title}
        {isOwner && <span css={badge}>owner</span>}
      </Link>
    </div>
  )
}

ProjectListItem.propTypes = {
  project: PropTypes.object.isRequired
}

export default ProjectListItem
