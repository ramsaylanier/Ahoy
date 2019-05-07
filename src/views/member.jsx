/** @jsx jsx */
import { useEffect } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"

import { useQuery } from "react-apollo-hooks"
import { USER_QUERY } from "@/graphql/user"
import "react-mde/lib/styles/css/react-mde-all.css"
import "./task.css"

const container = css`
  height: 100vh;
  width: 100%;
  overflow: auto;
`

const content = css`
  height: 100%;
  padding: 2rem;
  background: white;
  display: flex;
  flex-flow: column;
`

const Member = ({ memberId }) => {
  // QUERY
  const {
    loading,
    data: { user = {} }
  } = useQuery(USER_QUERY, {
    variables: { id: Number(memberId) }
  })

  // RESET
  useEffect(() => {}, [])

  if (loading) return "Loading..."

  console.log(user)

  if (user.id) {
    return (
      <div css={container}>
        <div css={content}>{loading ? "Loading" : <h1>{memberId}</h1>}</div>
      </div>
    )
  }

  return null
}

Member.propTypes = {
  memberId: PropTypes.string
}

export default Member
