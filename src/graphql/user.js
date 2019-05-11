import gql from "graphql-tag"

export const USER_QUERY = gql`
  query UserQuery($id: String) {
    user(id: $id) {
      id
      projects {
        id
        title
        description
        owner {
          id
        }
      }
    }
  }
`

export const INVITE_USER = gql`
  mutation InviteUser($email: String!, $projectId: Int!) {
    inviteUser(email: $email, projectId: $projectId) {
      id
      members {
        id
        nickname
      }
    }
  }
`
