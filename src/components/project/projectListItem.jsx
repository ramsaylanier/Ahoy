/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { Link } from "@reach/router"
import { useStore } from "@/state/store"
import theme, { lightenPrimary } from "@/theme"

const listItem = css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`

const link = css`
  width: 100%;
  display: block;
  padding: 1.5rem 0.5rem;
  font-size: 1rem;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${theme.colors.primary};
  &:hover {
    background: ${lightenPrimary(1.3)};
  }
`

const listItemExpanded = css`
  height: auto;

  a {
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
  position: absolute;
  top: 0;
  right: 0;
  background: ${theme.colors.secondary};
  padding: 0.25rem 0.55rem;
  font-size: 0.7rem;
  border-radius: 0px 0px 0px 3px;
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
      </Link>
      {isOwner && <span css={badge}>{ownerText}</span>}
    </div>
  )
}

ProjectListItem.propTypes = {
  project: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired
}

export default ProjectListItem
