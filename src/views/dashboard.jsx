/** @jsx jsx */
import { useEffect } from "react"
import { jsx, css } from "@emotion/core"

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

const Dashboard = props => {
  useEffect(() => {
    console.log("home")
  }, [])

  return (
    <div css={container}>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
