/** @jsx jsx */
import { useEffect } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import qs from "query-string"
import { useDispatch } from "@/state/store"
import { navigate } from "@reach/router"

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

  return <div css={container} />
}

Callback.propTypes = {
  location: PropTypes.object
}

export default Callback
