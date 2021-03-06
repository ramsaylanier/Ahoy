/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import theme from "@/theme"
import Color from "color"

import { Link } from "@reach/router"

const list = css`
  list-style: none;
  padding: 0;
  margin: 0;
`

const listItem = css`
  display: flex;
  align-items: center;
  padding: 0;
  background: ${Color(theme.colors.primary)
    .lighten(1.3)
    .string()};
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  a {
    display: block;
    color: ${theme.colors.primary};
    padding: 1rem;
  }
`

const badge = css`
  background: white;
  padding: 0.25rem 0.55rem;
  font-size: 0.7rem;
  border-radius: 3px;
  color: ${theme.colors.primary};
`

const UserList = ({ project }) => {
  if (!project) return null

  const users = [project.owner, ...project.members]
  return (
    <ul css={list}>
      {users.map(user => {
        const isOwner = user.id === project.owner.id
        return (
          <li key={user.id} css={listItem}>
            <Link to={`members/${user.id}`}>{user.nickname}</Link>
            {isOwner && <span css={badge}>owner</span>}
          </li>
        )
      })}
    </ul>
  )
}

UserList.propTypes = {
  project: PropTypes.object
}

export default UserList
