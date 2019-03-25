/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import gql from "graphql-tag"
import { useQuery } from "react-apollo-hooks"

const projectStyles = theme => css`
  position: relative;
`

const PROJECT_QUERY = gql`
  query Project($id: String!) {
    project(id: $id) {
      title
    }
  }
`

const Project = ({ projectId }) => {
  const {
    data: { project = {} },
    loading
  } = useQuery(PROJECT_QUERY, {
    variables: { id: projectId }
  })

  if (loading) return "Loading..."

  return (
    <div css={projectStyles}>
      <h1>{project.title}</h1>
    </div>
  )
}

Project.propTypes = {
  projectId: PropTypes.string.isRequired
}

export default Project
