import gql from "graphql-tag"

export const CREATE_TASK = gql`
  mutation CreateTask($task: TaskInput!) {
    createTask(task: $task) {
      id
      title
      description
      order
      completed
      completed_at
      project {
        owner {
          id
        }
      }
    }
  }
`

export const COMPLETE_TASK = gql`
  mutation CompleteTask($taskId: Int!) {
    completeTask(taskId: $taskId) {
      id
      completed
      completed_at
    }
  }
`

export const UPDATE_TASK_DESCRIPTION = gql`
  mutation UpdateTaskDescription($taskId: Int!, $description: String!) {
    updateTaskDescription(taskId: $taskId, description: $description) {
      id
      title
      description
      order
      project {
        owner {
          id
        }
      }
    }
  }
`

export const DELETE_TASKS = gql`
  mutation CreateTask($ids: [Int]!) {
    deleteTasks(ids: $ids)
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
      completed
      completed_at
      project {
        owner {
          id
        }
      }
    }
  }
`
