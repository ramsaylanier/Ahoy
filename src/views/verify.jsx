/** @jsx jsx */
import { useEffect, useState } from "react"
import { jsx } from "@emotion/core"
import PropTypes from "prop-types"
import qs from "query-string"
import { useDispatch } from "@/state/store"
import { auth } from "@/state/auth"
// import { navigate } from "@reach/router"

const Callback = ({ location }) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")

  useEffect(() => {
    localStorage.removeItem("ahoyToken")
  }, [])

  useEffect(() => {
    const { message } = qs.parse(location.search)
    setMessage(message)
  }, [dispatch, location])

  const handleClick = () => {
    auth.authorize({
      prompt: "consent",
      scope: "openid profile"
    })
  }

  return (
    <div>
      {message}
      <button onClick={handleClick}>Login</button>
    </div>
  )
}

Callback.propTypes = {
  location: PropTypes.object
}

export default Callback
