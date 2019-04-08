/** @jsx jsx */
import { Fragment } from "react"
import { jsx } from "@emotion/core"
import PropTypes from "prop-types"
import { useImmerReducer } from "use-immer"

import Button from "./button"
import InviteUserForm from "@/components/project/inviteUserForm"
import Modal from "@/components/modal"

const initialState = {
  open: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case "setOpen":
      state.open = action.payload.open
  }
}

const InviteUserButton = ({ projectId, cssProps }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  const actions = {
    setOpen: isOpen => dispatch({ type: "setOpen", payload: { open: isOpen } })
  }

  const handleClick = () => {
    actions.setOpen(!state.open)
  }

  return (
    <Fragment>
      <Button cssProps={cssProps} color="primary" onClick={handleClick}>
        Invite User
      </Button>

      <Modal open={state.open}>
        <InviteUserForm projectId={projectId} />
      </Modal>
    </Fragment>
  )
}

InviteUserButton.propTypes = {
  projectId: PropTypes.string.isRequired,
  cssProps: PropTypes.object
}

export default InviteUserButton
