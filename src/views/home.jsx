/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useStore } from "@/state/store"
import { auth } from "@/state/auth"

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`
const link = theme => css`
  color: ${theme.colors.secondary};
`

const Home = props => {
  const authState = useStore("auth")
  const handleClick = e => {
    e.preventDefault()
    auth.authorize({
      prompt: "consent",
      scope: "openid profile"
    })
  }

  return (
    <div css={container}>
      {!authState.accessToken && (
        <a href="/login" onClick={handleClick} css={link}>
          login
        </a>
      )}

      <h1>Home</h1>
    </div>
  )
}

export default Home
