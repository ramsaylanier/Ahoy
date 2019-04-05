/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import posed from "react-pose"

import ProjectListItem from "./projectListItem"

const List = posed.div({
  open: { width: 400 },
  close: { width: 60 }
})

const list = theme => css`
  display: flex;
  flex-flow: column;
  background: white;
`

const ProjectList = ({ projects }) => {
  const [open, setOpen] = useState(false)
  const handleExpand = () => {
    setOpen(!open)
  }

  console.log(open)

  return (
    <List css={list} pose={open ? "open" : "close"}>
      <button onClick={handleExpand}>+</button>
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
