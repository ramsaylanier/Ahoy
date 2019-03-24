/** @jsx jsx */
import { useEffect } from "react"
import { jsx, css } from "@emotion/core"
import { Link } from "@reach/router"
import { auth } from "@/state/auth"
import { useStore } from "@/state/store"

const header = theme => css`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  background: ${theme.colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: ${theme.zIndex.appHeader};
`

const title = theme => css`
  font-size: 1.3rem;
`

const link = theme => css`
  color: ${theme.colors.secondary};
`

const avatar = theme => css`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 0;
  padding: 0;
  overflow: hidden;

  img {
    height: 100%;
    width: auto;
  }
`

const AppHeader = () => {
  const authState = useStore("auth")

  useEffect(() => {}, [])

  const handleClick = e => {
    e.preventDefault()
    auth.authorize({
      prompt: "consent",
      scope: "openid profile"
    })
  }

  const isAuthenticated = new Date().getTime() < authState.expiresAt

  return (
    <header css={header}>
      <h1 css={title}>
        <Link css={link} to="/">
          Ahoy
        </Link>
      </h1>

      {isAuthenticated ? (
        <Link to="/profile" css={avatar}>
          <img src={authState.userProfile.picture} alt="user avatar" />
        </Link>
      ) : (
        <a href="/login" onClick={handleClick} css={link}>
          login
        </a>
      )}
    </header>
  )
}

export default AppHeader
