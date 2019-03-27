import gql from "graphql-tag"

export const PROJECT_QUERY = gql`
  query Project($id: String!) {
    project(id: $id) {
      id
      title
      tasks {
        id
        title
      }
      members {
        id
        nickname
      }
      owner {
        id
        nickname
      }
    }
  }
`

export const CREATE_PROJECT = gql`
  mutation CreateProject($project: ProjectInput!) {
    createProject(project: $project) {
      id
      title
      description
      owner {
        id
      }
      created_at
    }
  }
`
