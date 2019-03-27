/** @jsx jsx */
import React, { Fragment, useEffect } from "react"
import ReactDOM from "react-dom"
import { Router } from "@reach/router"
import { jsx, css } from "@emotion/core"
import { useDispatch } from "@/state/store"
import useSession from "@/hooks/useSession"

import Home from "@/views/home"
import Dashboard from "@/views/dashboard"
import Profile from "@/views/profile"
import Project from "@/views/project"
import Callback from "@/views/callback"
import Verify from "@/views/verify"

import AppHeader from "@/components/appHeader"

import { hot } from "react-hot-loader/root"

if (process.env.NODE_ENV !== "production") {
  var axe = require("react-axe")
  axe(React, ReactDOM, 1000)
}

const main = theme => css`
  grid-area: main;
  position: relative;
  background: #eee;
  padding: 1rem;
  overflow: auto;
  z-index: ${theme.zIndex.main};
`

const App = () => {
  const dispatch = useDispatch()
  const { token } = useSession()

  useEffect(() => {
    if (token) {
      dispatch({ type: "login", payload: { token } })
    }
  }, [dispatch, token])

  return (
    <Fragment>
      <AppHeader />
      <main css={main}>
        <Router>
          <Home path="/" />
          <Dashboard path="/dashboard" />
          <Profile path="/profile" />
          <Project path="/projects/:projectId" />
          <Callback path="/callback" />
          <Verify path="/verify" />
        </Router>
      </main>
    </Fragment>
  )
}

export default hot(App)
