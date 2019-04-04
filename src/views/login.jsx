/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { auth } from "@/state/auth"
import theme from "@/theme"
import Color from "color"
import Logo from "@/components/logo"

const container = css`
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${Color(theme.colors.primary)
    .darken(0.7)
    .string()};
`

const link = theme => css`
  color: ${theme.colors.primary};
  text-decoration: none;
  padding: 1rem;
  background: ${theme.colors.secondary};
  border-radius: 5px;
  margin-top: 3rem;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 900;
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
      <Logo />
      <a href="/login" onClick={handleClick} css={link}>
        login
      </a>
    </div>
  )
}

export default Login
