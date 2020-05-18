export function setError (state, payloads) {
  state.error = payloads
}

export function setNotify (state, payloads) {
  state.notify = payloads
}

export function setLoginStatus (state, loginStatus) {
  state.isLogged = loginStatus
}

export function setUser (state, userInfo) {
  state.user = userInfo
}

export function setList (state, userList) {
  state.list = userList
}

export function updateUser (state, options = {}) {
  state.user = {
    ...state.user,
    ...options
  }
}
