/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import posed from "react-pose"

const container = theme => css`
  background: #eee;
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  padding-top: 5rem;
  z-index: ${theme.zIndex.drawer};
`

const Container = posed.div({
  hidden: {
    x: window.innerWidth
  },
  visible: {
    x: 0,
    transition: {
      type: "tween",
      duration: 300
    }
  }
})

const Drawer = ({ open, children }) => {
  return (
    <Container css={container} pose={open ? "visible" : "hidden"}>
      {children}
    </Container>
  )
}

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default Drawer
