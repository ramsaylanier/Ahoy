/** @jsx jsx */
import { Fragment } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"

import AppHeader from "@/components/appHeader"

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
    <Fragment>
      <AppHeader />
      <main css={main}>{props.children}</main>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired
}

export default Layout
