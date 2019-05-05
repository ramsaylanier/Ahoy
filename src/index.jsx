import React from "react"
import ReactDOM from "react-dom"
import { ApolloProvider } from "react-apollo"
import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks"
import { StoreProvider } from "@/state/store"
import { ThemeProvider } from "emotion-theming"
import client from "@/graphql/client"
import App from "./app.jsx"
import theme from "./theme"
import "normalize.css"
import "@reach/tooltip/styles.css"
import "./app.css"

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloProviderHooks client={client}>
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StoreProvider>
    </ApolloProviderHooks>
  </ApolloProvider>,
  document.getElementById("app")
)
