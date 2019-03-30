import { useEffect, useRef } from "react"

const useTimeout = (duration, cb) => {
  const timer = useRef()

  useEffect(() => {
    timer.current = setTimeout(() => {
      cb()
    }, duration)
    return () => {
      clearTimeout(timer.current)
    }
  }, [cb, duration])
}

export default useTimeout
