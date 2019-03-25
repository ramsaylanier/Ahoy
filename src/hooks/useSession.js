import { useState, useEffect } from "react"
import { auth } from "../state/auth"

const useSession = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  useEffect(() => {
    if (localStorage.getItem("ahoyToken")) {
      auth.checkSession({}, (err, result) => {
        if (err) {
          console.log(err)
        }
        setToken(result)
        setLoggedIn(true)
      })
    }
  }, [])
  return {
    loggedIn,
    token
  }
}

export default useSession
