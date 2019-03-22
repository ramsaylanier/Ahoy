/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { auth } from "@/state/auth"
import { useDispatch } from "@/state/store"

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

const Profile = props => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    auth.logout({
      returnTo: "http://localhost:3000/"
    })
    dispatch({ type: "logout" })
    localStorage.removeItem("loggedInToAhoy")
  }

  return (
    <div css={container}>
      <h1>Profile</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile
