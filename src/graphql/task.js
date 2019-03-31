import gql from "graphql-tag"

export const CREATE_TASK = gql`
  mutation CreateTask($task: TaskInput!) {
    createTask(task: $task) {
      id
      title
      description
      order
    }
  }
`

export const UPDATE_TASK_ORDER = gql`
  mutation UpdateTaskOrder($id: Int!, $order: Int!) {
    updateTaskOrder(id: $id, order: $order)
  }
`

export const GET_TASK = gql`
  query GetTask($id: Int!) {
    task(id: $id) {
      id
      title
      description
      order
    }
  }
`
