/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { useQuery, useMutation } from "react-apollo-hooks"
import { useImmerReducer } from "use-immer"
import useIsOwner from "@/hooks/useIsOwner"

import Column from "@/components/column"
import IconButton from "@/components/button/iconButton"
import InviteUserForm from "@/components/project/inviteUserForm"
import InviteUserButton from "@/components/button/inviteUserButton"
import ContentWrapper from "@/components/contentWrapper"
import CreateTaskForm from "@/components/task/createTaskForm"
import Drawer from "@/components/drawer"
import TaskList from "@/components/task/taskList"
import UserList from "@/components/user/userList"

import AddIcon from "@/icons/addIcon"
import DeleteIcon from "@/icons/deleteIcon"

import { PROJECT_QUERY } from "@/graphql/project"
import { DELETE_TASKS } from "@/graphql/task"
import theme from "@/theme"
import DragDropContext from "@/components/dragDropContext"

const drawer = css`
  width: 50%;
  max-width: 300px;
`

const flex = css`
  display: flex;
`

const body = css`
  display: grid;
  grid-template-columns: auto 1fr;
`

const column = css``

const columnHeader = css`
  ${flex}
  align-items: center;
  justify-content: space-between;
  background: ${theme.colors.primary};
  padding: 0 0.5rem;
  color: white;
`

const addButton = css`
  margin-left: 0.5rem;
  background: white;
  path {
    fill: ${theme.colors.primary};
  }
`

const initialState = {
  drawer: {
    open: false,
    type: "inviteUser"
  },
  selection: []
}

const reducer = (state, action) => {
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

const Project = ({ projectId, children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  const actions = {
    open: isOpen => dispatch({ type: "openDrawer", payload: { open: isOpen } }),
    setDrawerType: type =>
      dispatch({ type: "setDrawerType", payload: { type } }),
    selectTask: id => dispatch({ type: "selectTask", payload: { id } }),
    deselectTask: id => dispatch({ type: "deselectTask", payload: { id } }),
    clearSelection: () => dispatch({ type: "clearSelection" })
  }

  // Queries
  const id = Number(projectId)
  const { data = {}, loading } = useQuery(PROJECT_QUERY, {
    variables: { id }
  })

  // Mutations
  const deleteTasks = useMutation(DELETE_TASKS)
  const isOwner = useIsOwner(data.project)

  if (loading) return "Loading..."

  const { project } = data
  const drawerMap = {
    inviteUser: <InviteUserForm projectId={id} />,
    createTask: <CreateTaskForm projectId={id} />
  }
  const DrawerComponent = drawerMap[state.drawer.type]

  const handleClick = type => {
    actions.open(true)
    actions.setDrawerType(type)
  }

  const handleDeleteClick = () => {
    deleteTasks({
      variables: { ids: state.selection },
      update: (store, { data: { deleteTasks } }) => {
        const { project } = store.readQuery({
          query: PROJECT_QUERY,
          variables: { id }
        })

        project.tasks = project.tasks.filter(
          task => !deleteTasks.includes(task.id)
        )

        store.writeQuery({
          query: PROJECT_QUERY,
          variables: { id },
          data: { project }
        })

        actions.clearSelection()
      }
    })
  }

  const hasSelection = state.selection.length > 0

  return (
    <ContentWrapper size="full" cssProps={{ background: "white" }}>
      <div css={body}>
        {isOwner && (
          <Column title="Members">
            <div css={{ textAlign: "center", padding: "1rem 0.5rem" }}>
              <InviteUserButton
                projectId={projectId}
                cssProps={{ fontSize: ".8rem" }}
              />
            </div>
            <UserList
              users={[project.owner, ...project.members]}
              projectOwner={project.owner}
            />
          </Column>
        )}

        <Column title="Tasks">
          <div css={columnHeader}>
            <h3>{hasSelection ? `${state.selection.length} selected` : ""}</h3>
            {isOwner &&
              (hasSelection ? (
                <IconButton
                  cssProps={addButton}
                  onClick={() => handleDeleteClick()}
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                <IconButton
                  cssProps={addButton}
                  onClick={() => handleClick("createTask")}
                >
                  <AddIcon />
                </IconButton>
              ))}
          </div>

          <TaskList
            tasks={project.tasks}
            actions={actions}
            state={state}
            dispatch={dispatch}
          />
        </Column>
        <div css={column}>{children}</div>
      </div>

      <Drawer
        open={state.drawer.open}
        onClose={() => actions.open(false)}
        cssProps={drawer}
      >
        {DrawerComponent}
      </Drawer>
    </ContentWrapper>
  )
}

Project.propTypes = {
  projectId: PropTypes.string,
  children: PropTypes.node
}

export default DragDropContext(Project)
