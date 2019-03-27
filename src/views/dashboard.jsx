/** @jsx jsx */
import { jsx, css } from "@emotion/core"

import { useQuery } from "react-apollo-hooks"
import { USER_QUERY } from "@/graphql/user"

import ProjectList from "@/components/project/projectList"

const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

const wrapper = css`
  max-width: 600px;
`

const Dashboard = props => {
  const { loading, data } = useQuery(USER_QUERY)

  if (loading) return "Loding..."

  const { user } = data
  console.log(user)

  return (
    <div css={container}>
      <div css={wrapper}>
        {user.projects && <ProjectList projects={data.user.projects} />}
      </div>
    </div>
  )
}

export default Dashboard
