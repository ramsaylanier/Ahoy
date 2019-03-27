import React, { Fragment, useEffect } from "react"
import ReactDOM from "react-dom"
import { Router } from "@reach/router"
import { useDispatch } from "@/state/store"
import useCheckSession from "@/hooks/useCheckSession"

import Home from "@/views/home"
import Dashboard from "@/views/dashboard"
import Profile from "@/views/profile"
import Project from "@/views/project"
import Callback from "@/views/callback"
import Verify from "@/views/verify"
import Login from "@/views/login"

import Layout from "@/components/layout"

import { hot } from "react-hot-loader/root"

if (process.env.NODE_ENV !== "production") {
  var axe = require("react-axe")
  axe(React, ReactDOM, 1000)
}

const App = () => {
  const dispatch = useDispatch()
  const { token, loading } = useCheckSession()

  useEffect(() => {
    if (token) {
      dispatch({ type: "login", payload: { token } })
    }
  }, [dispatch, token])

  if (loading) return null

  return (
    <Fragment>
      <Router>
        <Layout path="/">
          <Home path="/" />
          <Dashboard path="/dashboard" />
          <Profile path="/profile" />
          <Project path="/projects/:projectId" />
          <Callback path="/callback" />
          <Verify path="/verify" />
        </Layout>

        <Login path="/login" />
      </Router>
    </Fragment>
  )
}

export default hot(App)
