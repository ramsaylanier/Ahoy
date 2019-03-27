import gql from "graphql-tag"

export const USER_QUERY = gql`
  query UserQuery($id: String) {
    user(id: $id) {
      projects {
        id
        title
        description
      }
    }
  }
`

export const INVITE_USER = gql`
  mutation InviteUser($email: String!, $projectId: String!) {
    inviteUser(email: $email, projectId: $projectId) {
      id
      members {
        id
        nickname
      }
    }
  }
`
