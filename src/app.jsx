/** @jsx jsx */
import React, { Fragment, useEffect } from "react"
import ReactDOM from "react-dom"
import AppHeader from "@/components/appHeader"
import { Router } from "@reach/router"
import { jsx, css } from "@emotion/core"
import { useDispatch } from "@/state/store"

import Callback from "@/views/callback"
import Home from "@/views/home"
import Dashboard from "@/views/dashboard"
import Profile from "@/views/profile"

import { hot } from "react-hot-loader/root"
import { auth } from "./state/auth"

if (process.env.NODE_ENV !== "production") {
  var axe = require("react-axe")
  axe(React, ReactDOM, 1000)
}

const main = theme => css`
  z-index: ${theme.zIndex.main};
`

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem("loggedInToAhoy")) {
      auth.checkSession({}, (err, result) => {
        if (err) {
          console.log(err)
        }
        dispatch({ type: "login", payload: { token: result } })
      })
    }
  }, [dispatch])

  return (
    <Fragment>
      <AppHeader />

      <main css={main}>
        <Router>
          <Home path="/" />
          <Dashboard path="/dashboard" />
          <Profile path="/profile" />
          <Callback path="/callback" />
        </Router>
      </main>
    </Fragment>
  )
}

export default hot(App)
