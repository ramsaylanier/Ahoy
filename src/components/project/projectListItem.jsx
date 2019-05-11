/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { Link } from "@reach/router"
import { useStore } from "@/state/store"
import theme from "@/theme"

import Tooltip from "@reach/tooltip"

const listItem = css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`

const link = css`
  position: relative;
  width: 100%;
  display: block;
  padding: 1.5rem 0.5rem;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  color: ${theme.colors.primary};
`

const linkActive = css`
  position: relative;

  > span {
    background: white;
    color: ${theme.colors.primary};
  }
`

const listItemExpanded = css`
  height: auto;
`

const text = css`
  position: relative;
  background: ${theme.colors.primary};
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 3px;
`

const badge = css`
  position: absolute;
  top: -0.35rem;
  right: -0.35rem;
  background: ${theme.colors.secondary};
  height: 0.7rem;
  width: 0.7rem;
  border-radius: 50%;
  color: ${theme.colors.primary};
`

const ProjectListItem = ({ project, expanded }) => {
  const {
    userProfile: { sub: userId }
  } = useStore("auth")
  const [isCurrent, setIsCurrent] = useState(false)

  const isOwner = project.owner.id === userId

  const setActive = ({ isCurrent }) => {
    setIsCurrent(isCurrent)
  }

  return (
    <div css={[listItem, expanded && listItemExpanded]}>
      <Tooltip label={project.title}>
        <Link
          to={`/projects/${project.id}`}
          css={[link, isCurrent && linkActive]}
          getProps={setActive}
        >
          <span css={text}>
            {project.title[0].toUpperCase()}
            {isOwner && <span css={badge} />}
          </span>
        </Link>
      </Tooltip>
    </div>
  )
}

ProjectListItem.propTypes = {
  project: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired
}

export default ProjectListItem
