import { useState, useEffect } from "react"
import { auth } from "../state/auth"

const useCheckSession = () => {
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("ahoyToken")) {
      auth.checkSession({}, (err, result) => {
        if (err) {
          console.log(err)
        }
        setToken(result)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])
  return {
    loading,
    token
  }
}

export default useCheckSession
