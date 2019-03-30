/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useStore, useDispatch } from "@/state/store"
import posed from "react-pose"
import theme from "@/theme"
import useTimeout from "../hooks/useTimeout"

const Container = posed.div({
  open: {
    y: 0
  },
  closed: {
    y: -100
  }
})

const container = css`
  position: fixed;
  top: 0rem;
  right: 1rem;
  z-index: ${theme.zIndex.notification};
`

const text = css`
  padding: 1rem;
  color: white;
`

const success = css`
  background: ${theme.colors.success};
`

const error = css`
  background: ${theme.colors.error};
`

const typeMap = {
  success,
  error
}

const Notification = props => {
  const { open, message, type } = useStore("notification")
  const dispatch = useDispatch()

  useTimeout(5000, () => {
    dispatch({ type: "closeNotification" })
  })

  return (
    <Container pose={open ? "open" : "closed"} css={container}>
      <p css={[text, typeMap[type]]}>{message}</p>
    </Container>
  )
}

export default Notification
