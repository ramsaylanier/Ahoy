/** @jsx jsx */
import { useEffect } from "react"
import { jsx } from "@emotion/core"
import PropTypes from "prop-types"
import qs from "query-string"
import { useDispatch } from "@/state/store"
import { navigate } from "@reach/router"

const Callback = ({ location }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = qs.parse(location.hash)

    if (token.access_token) {
      localStorage.setItem("ahoyToken", token.id_token)
      navigate("/dashboard")
    } else {
      navigate("/")
    }
  }, [dispatch, location])

  return <div />
}

Callback.propTypes = {
  location: PropTypes.object
}

export default Callback
