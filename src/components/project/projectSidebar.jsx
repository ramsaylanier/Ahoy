/** @jsx jsx */
import { cloneElement, Children } from "react"
import { jsx } from "@emotion/core"
import PropTypes from "prop-types"
import { useStore as useProjectStore } from "@/components/project/projectState"

import { Link } from "@reach/router"
import Column from "@/components/column"
// import ColumnToolbar from "@/components/columnToolbar"
// import IconButton from "@/components/button/iconButton"
// import InviteUserButton from "@/components/button/inviteUserButton"
// import UserList from "@/components/user/userList"
// import TaskList from "@/components/task/taskList"

const ProjectSidebar = props => {
  const state = useProjectStore()
  console.log(state)
  console.log(props)
  const { project, children, location } = props
  // const id = Number(project.id)
  // const deleteTasks = useMutation(DELETE_TASKS)

  // const hasSelection = state.selection.length > 0

  if (!project) return null

  return (
    <Column expandable={false}>
      <div css={{ padding: "1rem", display: "flex", flexFlow: "column" }}>
        <Link to="./tasks">Tasks</Link>
        <Link to="./members">Members</Link>
        {cloneElement(children, {
          children: Children.map(children.props.children, child => {
            return cloneElement(child, { project, location })
          })
        })}
      </div>

      {/* {view === "members" && (
        <Fragment>
          <ColumnToolbar>
            <InviteUserButton projectId={project.id} />
          </ColumnToolbar>
          <UserList
            users={[project.owner, ...project.members]}
            projectOwner={project.owner}
          />
        </Fragment>
      )}

      {view === "tasks" && (
        <Fragment>
          <ColumnToolbar>
            {hasSelection ? (
              <Fragment>
                <span css={{ fontSize: "0.8rem", color: "white" }}>
                  {state.selection.length} selected
                </span>
                <IconButton
                  cssProps={addButton}
                  onClick={() => handleDeleteClick()}
                >
                  <DeleteIcon />
                </IconButton>
              </Fragment>
            ) : (
              <CreateTaskButton projectId={id} />
            )}
          </ColumnToolbar>
          <TaskList
            tasks={project.tasks}
            actions={actions}
            state={state}
            dispatch={dispatch}
          />
        </Fragment>
      )} */}
    </Column>
  )
}

ProjectSidebar.propTypes = {
  location: PropTypes.object,
  project: PropTypes.object,
  children: PropTypes.node
}

export default ProjectSidebar
