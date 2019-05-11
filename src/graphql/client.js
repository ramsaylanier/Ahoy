import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { ApolloLink, split } from "apollo-link"
import { WebSocketLink } from "apollo-link-ws"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import { getMainDefinition } from "apollo-utilities"
import config from "@config"
import fetch from "unfetch"

const cache = new InMemoryCache()

// GraphQL Endpoint
const httpLink = new HttpLink({
  uri: config.graphql.endpoint,
  fetch
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem("ahoyToken")
    }
  }
})

// Pass auth token to each GraphQL request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("ahoyToken")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

// Error Reporting
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink
)

const composedLink = ApolloLink.from([authLink, errorLink, wsLink, link])

const client = new ApolloClient({
  link: composedLink,
  cache,
  fetchOptions: {
    mode: "no-cors"
  }
})

export default client
