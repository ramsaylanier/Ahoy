/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"

import AppHeader from "@/components/appHeader"

const container = css`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: 100vh;
  align-content: stretch;
  grid-template-areas: "header main";
`

const main = theme => css`
  grid-area: main;
  position: relative;
  background: #eee;
  padding: 1rem;
  overflow: auto;
  z-index: ${theme.zIndex.main};
`

const Layout = props => {
  return (
    <div css={container}>
      <AppHeader />
      <main css={main}>{props.children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired
}

export default Layout
