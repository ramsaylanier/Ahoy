/** @jsx jsx */
import { Fragment } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { useImmerReducer } from "use-immer"
import theme from "@/theme"

import IconButton from "@/components/button/iconButton"
import AddIcon from "@/icons/addIcon"
import InviteUserForm from "@/components/project/inviteUserForm"
import Modal from "@/components/modal"

const addButton = css`
  path {
    fill: ${theme.colors.primary};
  }
`

const initialState = {
  open: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case "setOpen":
      state.open = action.payload.open
      return
    case "setDrawerType":
      state.drawer.type = action.payload.type
      return
    case "selectTask":
      state.selection.push(action.payload.id)
      return
    case "deselectTask":
      state.selection = state.selection.filter(id => id !== action.payload.id)
      return
    case "clearSelection":
      state.selection = []
  }
}

const InviteUserButton = ({ projectId, cssProps }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  const actions = {
    setOpen: isOpen => dispatch({ type: "setOpen", payload: { open: isOpen } })
  }

  const handleClick = type => {
    actions.setOpen(true)
  }

  return (
    <Fragment>
      <IconButton
        cssProps={[addButton, cssProps]}
        onClick={() => handleClick("inviteUser")}
      >
        <AddIcon />
      </IconButton>

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
