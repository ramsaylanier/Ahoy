/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import theme from "@/theme"
import Color from "color"
import { redirectTo } from "@reach/router"

import AppNav from "@/components/appNav"
import ProjectList from "@/components/project/projectList"

import { useQuery } from "react-apollo-hooks"
import { USER_QUERY } from "@/graphql/user"

const container = css`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: 100vh;
  align-content: stretch;
  grid-template-areas: "header main";
`

const main = css`
  grid-area: main;
  display: flex;
  position: relative;
  background: ${Color(theme.colors.primary)
    .darken(0.7)
    .string()};
  overflow: auto;
  z-index: ${theme.zIndex.main};
`

const content = css`
  flex: 1;
`

const Layout = props => {
  const { loading, data, error } = useQuery(USER_QUERY)

  if (loading) return "Loding..."

  if (error) {
    redirectTo("/login")
  }

  const { user } = data

  return (
    <div css={container}>
      <AppNav />
      <main css={main}>
        {user.projects && <ProjectList projects={data.user.projects} />}
        <div css={content}>{props.children}</div>
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired
}

export default Layout
