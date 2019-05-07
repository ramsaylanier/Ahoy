import gql from "graphql-tag"

export const PROJECT_QUERY = gql`
  query Project($id: Int!) {
    project(id: $id) {
      id
      title
      tasks {
        id
        title
        order
        completed
        completed_at
        project {
          owner {
            id
          }
        }
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

export const UPDATE_PROJECT_TITLE = gql`
  mutation UpdateProjectTitle($projectId: Int!, $title: String!) {
    updateProjectTitle(projectId: $projectId, title: $title) {
      id
      title
    }
  }
`
