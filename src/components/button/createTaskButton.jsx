/** @jsx jsx */
import { Fragment } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { useImmerReducer } from "use-immer"
import theme from "@/theme"

import IconButton from "@/components/button/iconButton"
import AddIcon from "@/icons/addIcon"
import CreateTaskForm from "@/components/task/createTaskForm"
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
  }
}

const CreateTaskButton = ({ projectId, cssProps }) => {
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
        onClick={() => handleClick()}
      >
        <AddIcon />
      </IconButton>

      <Modal open={state.open} onClose={() => actions.setOpen(false)}>
        <CreateTaskForm projectId={projectId} />
      </Modal>
    </Fragment>
  )
}

CreateTaskButton.propTypes = {
  projectId: PropTypes.number.isRequired,
  cssProps: PropTypes.object
}

export default CreateTaskButton
