import React, { createContext, useContext } from "react"
import PropTypes from "prop-types"
import { useImmerReducer } from "use-immer"

const initialProjectState = {
  drawer: {
    open: false,
    type: "inviteUser"
  },
  selection: []
}

export const ProjectStoreContext = createContext(initialProjectState)
export const ProjectDispatchContext = createContext(() => {})
export const reducer = (state, action) => {
  switch (action.type) {
    case "openDrawer":
      state.drawer.open = action.payload.open
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

export const actions = dispatch => ({
  open: isOpen => dispatch({ type: "openDrawer", payload: { open: isOpen } }),
  setDrawerType: type => dispatch({ type: "setDrawerType", payload: { type } }),
  selectTask: id => dispatch({ type: "selectTask", payload: { id } }),
  deselectTask: id => dispatch({ type: "deselectTask", payload: { id } }),
  clearSelection: () => dispatch({ type: "clearSelection" })
})

export const ProjectStoreProvider = props => {
  const initialState = { ...initialProjectState, ...props.initialState }
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  return (
    <ProjectStoreContext.Provider value={state}>
      <ProjectDispatchContext.Provider value={dispatch}>
        {props.children}
      </ProjectDispatchContext.Provider>
    </ProjectStoreContext.Provider>
  )
}

ProjectStoreProvider.propTypes = {
  children: PropTypes.node,
  initialState: PropTypes.object
}

export const useDispatch = () => useContext(ProjectDispatchContext)
export const useStore = () => useContext(ProjectStoreContext)
