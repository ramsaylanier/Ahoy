/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import FormControl from "@/components/form/formControl"

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

const Login = props => {
  return (
    <div css={container}>
      <form>
        <FormControl>
          <input type="text" name="user_name" id="username" />
          <label htmlFor="username">Username</label>
        </FormControl>

        <FormControl>
          <input type="password" name="password" id="password" />
          <label htmlFor="password">Password</label>
        </FormControl>

        <input type="submit" value="login" />
      </form>
    </div>
  )
}

export default Login
