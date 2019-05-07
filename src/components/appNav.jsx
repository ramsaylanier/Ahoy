/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { Link } from "@reach/router"
import { useStore } from "@/state/store"
import theme, { darkBlue } from "@/theme"

import ProjectList from "@/components/project/projectList"

const header = css`
  grid-area: header;
  position: relative;
  padding: 0.5rem;
  background: ${darkBlue};
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  border-right: 2px solid ${darkBlue};
`

const title = css`
  font-size: 1.3rem;
`

const link = css`
  color: ${theme.colors.secondary};
`

const avatar = css`
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

const AppHeader = ({ user }) => {
  const authState = useStore("auth")
  const isAuthenticated = new Date().getTime() < authState.expiresAt

  return (
    <header css={header}>
      <div>
        <h1 css={title}>
          <Link css={link} to={isAuthenticated ? "/" : "/"}>
            Ahoy
          </Link>
        </h1>

        {user.projects && <ProjectList projects={user.projects} />}
      </div>

      {isAuthenticated && (
        <Link to="/profile" css={avatar}>
          <img src={authState.userProfile.picture} alt="user avatar" />
        </Link>
      )}
    </header>
  )
}

AppHeader.propTypes = {
  user: PropTypes.object
}

export default AppHeader
