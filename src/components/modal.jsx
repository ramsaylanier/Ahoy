/** @jsx jsx */
import { useRef } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import posed from "react-pose"
import useClickAway from "@/hooks/useClickAway"
import Color from "color"
import theme from "@/theme"
// import usePortal from "@/hooks/usePortal"

const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${Color(theme.colors.primary)
    .darken(0.3)
    .fade(0.05)
    .string()};
  position: fixed;
  padding-left: 4rem;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  z-index: ${theme.zIndex.modal};
`

const Container = posed.div({
  hidden: {
    opacity: 0,
    y: window.innerHeight,
    transition: {
      opacity: { duration: 150 },
      y: { duration: 0, delay: 300 }
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 150 },
      y: { duration: 0 }
    }
  }
})

const inner = css`
  display: flex;
  justifty-content: center;
  align-items: center;
  padding: 2rem;
  background: ${theme.colors.primary};
`

const Modal = ({ open, children, onClose, cssProps }) => {
  const innerRef = useRef()
  // const { Portal } = usePortal()
  useClickAway(innerRef, onClose, open)

  return (
    <Container css={[container, cssProps]} pose={open ? "visible" : "hidden"}>
      <div ref={innerRef} css={inner}>
        {children}
      </div>
    </Container>
  )
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  cssProps: PropTypes.object
}

export default Modal
