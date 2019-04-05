/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Link } from "@reach/router"
import { useStore } from "@/state/store"

const header = theme => css`
  grid-area: header;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  background: ${theme.colors.primary};
  display: flex;
  flex-flow: column;
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
  const isAuthenticated = new Date().getTime() < authState.expiresAt

  return (
    <header css={header}>
      <h1 css={title}>
        <Link css={link} to={isAuthenticated ? "/" : "/"}>
          Ahoy
        </Link>
      </h1>

      {isAuthenticated && (
        <Link to="/profile" css={avatar}>
          <img src={authState.userProfile.picture} alt="user avatar" />
        </Link>
      )}
    </header>
  )
}

export default AppHeader
