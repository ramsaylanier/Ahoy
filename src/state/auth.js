import auth0 from "auth0-js"
import config from "@config"

export const auth = new auth0.WebAuth({
  domain: config.auth.domain,
  clientID: config.auth.clientId,
  redirectUri: config.auth.callbackUrl,
  responseType: "token id_token",
  scope: "openid profile"
})

export const initialAuthState = {
  accessToken: null,
  idToken: null,
  expiresAt: null,
  userProfile: null,
  scopes: null
}

const actions = {
  login: state => ({ token }) => {
    const {
      idTokenPayload: { name, nickname, picture, nonce, sub }
    } = token
    let expiresAt = token.expiresIn * 1000 + new Date().getTime()
    state.accessToken = token.accessToken
    state.idToken = token.idToken
    state.expiresAt = expiresAt
    state.scope = token.scope || ""
    state.userProfile = {
      name,
      nickname,
      picture,
      nonce,
      sub
    }
  },
  logout: state => () => {
    state.accessToken = null
    state.idToken = null
    state.expiresAt = null
    state.scope = null
    state.userProfile = null
  }
}

export const authReducer = (state, { type, payload }) => {
  actions[type] && actions[type](state)(payload)
}
