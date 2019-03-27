import gql from "graphql-tag"

export const CREATE_TASK = gql`
  mutation CreateTask($task: TaskInput!) {
    createTask(task: $task) {
      id
      title
      description
    }
  }
`
