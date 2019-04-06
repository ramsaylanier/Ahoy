/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { Link } from "@reach/router"
import { useStore } from "@/state/store"
import theme, { lighten, darkBlue } from "@/theme"

const listItem = css`
  display: flex;
  align-items: center;
  width: 100%;
`

const link = css`
  width: 100%;
  display: block;
  padding: 1rem 0.5rem;
  font-size: 1rem;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${theme.colors.primary};
  &:hover {
    background: ${lighten(theme.colors.primary)(1.3)};
  }
`

const listItemExpanded = css`
  height: auto;

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`

const listItemActive = css`
  a {
    background: ${theme.colors.primary};
    color: white;

    &:hover {
      background: ${theme.colors.primary};
    }
  }
`

const text = css``

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
  const [isCurrent, setIsCurrent] = useState(false)

  const isOwner = project.owner.id === userId
  const ownerText = expanded ? "owner" : "O"

  const setActive = ({ isCurrent }) => {
    setIsCurrent(isCurrent)
  }

  return (
    <div
      css={[
        listItem,
        expanded && listItemExpanded,
        isCurrent && listItemActive
      ]}
    >
      <Link to={`/projects/${project.id}`} css={[link]} getProps={setActive}>
        <span css={text}>{project.title}</span>
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
