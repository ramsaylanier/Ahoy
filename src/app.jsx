import React, { Fragment, useEffect } from "react"
import ReactDOM from "react-dom"
import { Router } from "@reach/router"
import { useDispatch } from "@/state/store"
import useCheckSession from "@/hooks/useCheckSession"

import Home from "@/views/home"
import Profile from "@/views/profile"
import Project from "@/views/project"
import Callback from "@/views/callback"
import Verify from "@/views/verify"
import Login from "@/views/login"
import Task from "@/views/task"

import Layout from "@/components/layout"
import Notification from "@/components/notification"

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
          <Profile path="profile" />
          <Project path="projects/:projectId">
            <Task path="task/:taskId" />
          </Project>
          <Verify path="verify" />
        </Layout>

        <Callback path="/callback" />
        <Login path="/login" />
      </Router>

      <Notification />
    </Fragment>
  )
}

export default hot(App)
