/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { redirectTo } from "@reach/router"

import { useQuery } from "react-apollo-hooks"
import { USER_QUERY } from "@/graphql/user"

import ProjectList from "@/components/project/projectList"

const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Dashboard = props => {
  const { loading, data, error } = useQuery(USER_QUERY)

  if (loading) return "Loding..."

  if (error) {
    redirectTo("/login")
  }

  const { user } = data

  return (
    <div css={container}>
      {user.projects && <ProjectList projects={data.user.projects} />}
    </div>
  )
}

export default Dashboard
