/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { Link } from "@reach/router"
import { useStore } from "@/state/store"
import theme from "@/theme"

const listItem = css`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid ${theme.colors.primary};
`

const title = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 1rem;
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

const ProjectListItem = ({ project, expanded }) => {
  const {
    userProfile: { sub: userId }
  } = useStore("auth")

  const isOwner = project.owner.id === userId
  const titleText = expanded
    ? project.title
    : project.title.substr(0, 1).toUpperCase()
  const ownerText = expanded ? "owner" : "O"

  return (
    <div css={listItem}>
      <Link to={`/projects/${project.id}`} css={title}>
        {titleText}
        {isOwner && <span css={badge}>{ownerText}</span>}
      </Link>
    </div>
  )
}

ProjectListItem.propTypes = {
  project: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired
}

export default ProjectListItem
