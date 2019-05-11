/** @jsx jsx */
import { Fragment } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { useImmerReducer } from "use-immer"
import theme from "@/theme"

import IconButton from "@/components/button/iconButton"
import AddIcon from "@/icons/addIcon"
import CreateProjectForm from "@/components/project/createProjectForm"
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

const CreateProjectButton = ({ cssProps }) => {
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
        tooltip="Create Project"
        cssProps={[addButton, cssProps]}
        onClick={() => handleClick()}
      >
        <AddIcon />
      </IconButton>

      <Modal open={state.open} onClose={() => actions.setOpen(false)}>
        <CreateProjectForm />
      </Modal>
    </Fragment>
  )
}

CreateProjectButton.propTypes = {
  cssProps: PropTypes.object
}

export default CreateProjectButton
