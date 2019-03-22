/** @jsx jsx */
import { useEffect } from "react"
import { jsx, css } from "@emotion/core"

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

const control = theme => css`
  display: flex;
  background: ${theme.colors.background.default};
  padding: 0.5rem;
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`

const Login = props => {
  useEffect(() => {
    console.log("render")
  }, [])

  return (
    <div css={container}>
      <form>
        <div css={control}>
          <input type="text" name="user_name" id="username" />
          <label htmlFor="username">Username</label>
        </div>

        <div css={control}>
          <input type="password" name="password" id="password" />
          <label htmlFor="password">Password</label>
        </div>

        <input type="submit" value="login" />
      </form>
    </div>
  )
}

export default Login
