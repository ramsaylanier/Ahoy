/** @jsx jsx */
import { useState } from "react"
import PropTypes from "prop-types"
import posed from "react-pose"

import ProjectListItem from "./projectListItem"

import ExpandRightIcon from "@/icons/expandRightIcon"
import ExpandLeftIcon from "@/icons/expandLeftIcon"

import theme, { lightenPrimary } from "@/theme"
import { jsx, css } from "@emotion/core"

const listHeader = css`
  background: ${lightenPrimary(1.3)};
`

const toggle = css`
  background: transparent;
  border: 0;
  padding: 0;
  width: 100%;
  text-align: end;
  &:focus {
    outline: none;
  }
  svg {
    height: 24px;
    width: 24px;
    path {
      fill: ${theme.colors.primary};
    }
  }
`

const ProjectList = ({ projects }) => {
  const [open, setOpen] = useState(false)
  const handleExpand = () => {
    setOpen(!open)
  }

  return (
    <List css={list} pose={open ? "open" : "close"}>
      <div css={listHeader}>
        <button onClick={handleExpand} css={toggle}>
          {open ? <ExpandLeftIcon /> : <ExpandRightIcon />}
        </button>
      </div>
      {projects.map(project => (
        <ProjectListItem key={project.id} project={project} expanded={open} />
      ))}
    </List>
  )
}

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired
}

export default ProjectList
