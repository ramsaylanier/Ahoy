/** @jsx jsx */
import { jsx, css } from "@emotion/core"

import gql from "graphql-tag"
import { useQuery } from "react-apollo-hooks"

import ProjectList from "@/components/project/projectList"

const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

const wrapper = css`
  max-width: 600px;
`

const USER_QUERY = gql`
  query UserQuery($id: String) {
    user(id: $id) {
      projects {
        id
        title
        description
      }
    }
  }
`

const Dashboard = props => {
  const { loading, data } = useQuery(USER_QUERY)

  if (loading) return "Loding..."

  return (
    <div css={container}>
      <div css={wrapper}>
        {data && <ProjectList projects={data.user.projects} />}
      </div>
    </div>
  )
}

export default Dashboard
