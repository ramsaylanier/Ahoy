/** @jsx jsx */
import { useRef } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import posed from "react-pose"
import useClickAway from "@/hooks/useClickAway"
import Color from "color"
import theme from "@/theme"

const container = css`
  background: ${Color(theme.colors.primary)
    .darken(0.3)
    .string()};
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

const Drawer = ({ open, children, onClose, cssProps }) => {
  const drawerRef = useRef()

  useClickAway(drawerRef, onClose, open)

  return (
    <Container
      ref={drawerRef}
      css={[container, cssProps]}
      pose={open ? "visible" : "hidden"}
    >
      {children}
    </Container>
  )
}

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  cssProps: PropTypes.object
}

export default Drawer
