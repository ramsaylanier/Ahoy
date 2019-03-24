import { useRef, useEffect } from "react"
import { createPortal } from "react-dom"

const usePortal = () => {
  const portal = useRef(document.createElement("div"))

  useEffect(() => {
    const p = portal.current
    document.body.append(p)

    // remove portal on unmount
    return () => {
      document.body.removeChild(p)
    }
  }, [])

  return {
    Portal: ({ children }) => createPortal(children, portal.current)
  }
}

export default usePortal
