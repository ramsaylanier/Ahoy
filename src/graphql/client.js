import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { ApolloLink } from "apollo-link"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import config from "@config"
import fetch from "unfetch"

const cache = new InMemoryCache()

// GraphQL Endpoint
const httpLink = new HttpLink({
  uri: config.graphql.endpoint,
  fetch
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

const link = ApolloLink.from([authLink, errorLink, httpLink])

const client = new ApolloClient({
  link,
  cache,
  fetchOptions: {
    mode: "no-cors"
  }
})

export default client
