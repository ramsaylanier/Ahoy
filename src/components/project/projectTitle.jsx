/** @jsx jsx */
import { useState, useEffect } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import theme, { darken } from "@/theme"

import { useMutation } from "react-apollo-hooks"
import { UPDATE_PROJECT_TITLE } from "@/graphql/project"

const projectTitle = css`
  margin: 0;
  font-weight: 600;
  font-size: 1.3em;
`

const button = css`
  ${projectTitle}
  width: 100%;
  text-align: left;
  appearance: none;
  border: 0;
  &:hover {
    background: ${darken(theme.colors.background.default)(0.2)};
  }
`

const field = css`
  ${projectTitle}
  width: 100%;
`

const flex = css`
  display: flex;
`

const ProjectTitle = ({ project, isOwner }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [val, setVal] = useState(project.title)

  // reset val to project title when project changes
  useEffect(() => {
    setVal(project.title)
  }, [project.id, project.title])

  const updateProjectTitle = useMutation(UPDATE_PROJECT_TITLE)

  const handleSave = () => {
    updateProjectTitle({ variables: { projectId: project.id, title: val } })
    setIsEditing(false)
  }

  return isOwner ? (
    isEditing ? (
      <div css={flex}>
        <input
          css={field}
          type="text"
          value={val}
          onChange={e => setVal(e.target.value)}
        />
        <button onClick={() => handleSave()}>X</button>
        <button onClick={() => setIsEditing(false)}>X</button>
      </div>
    ) : (
      <button css={button} onClick={() => setIsEditing(!isEditing)}>
        {project.title}
      </button>
    )
  ) : (
    <h3 css={projectTitle}>{project.title}</h3>
  )
}

ProjectTitle.propTypes = {
  project: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired
}

export default ProjectTitle
