/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import posed from "react-pose"
import theme from "@/theme"

import ProjectListItem from "./projectListItem"

import ExpandRightIcon from "@/icons/expandRightIcon"
import ExpandLeftIcon from "@/icons/expandLeftIcon"

const List = posed.div({
  open: { width: 400 },
  close: { width: 60 }
})

const list = css`
  display: flex;
  flex-flow: column;
  background: white;
`

const listHeader = css`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 0;
`

const toggle = css`
  background: transparent;
  border: 0;
  padding: 0;
  height: 24px;
  width: 24px;
  svg {
    height: 100%;
    width: 100%;
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
