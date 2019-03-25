/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { auth } from "@/state/auth"

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const link = theme => css`
  color: ${theme.colors.secondary};
`

const Login = props => {
  const handleClick = e => {
    e.preventDefault()
    auth.authorize({
      prompt: "consent",
      scope: "openid profile"
    })
  }

  return (
    <div css={container}>
      <a href="/login" onClick={handleClick} css={link}>
        login
      </a>
    </div>
  )
}

export default Login
