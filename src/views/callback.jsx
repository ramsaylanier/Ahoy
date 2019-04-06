/** @jsx jsx */
import { jsx } from "@emotion/core"
import PropTypes from "prop-types"
import { useDispatch } from "@/state/store"
import qs from "query-string"
import { navigate } from "@reach/router"
import useCheckSession from "@/hooks/useCheckSession"

const Callback = ({ location }) => {
  const dispatch = useDispatch()
  const token = qs.parse(location.hash)
  localStorage.setItem("ahoyToken", token.id_token)
  const { token: session, loading } = useCheckSession()

  if (loading) return null

  if (session) {
    dispatch({ type: "login", payload: { token: session } })
    navigate("/")
  }
  return <div />
}

Callback.propTypes = {
  location: PropTypes.object
}

export default Callback
