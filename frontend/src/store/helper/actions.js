export function ADD_REMEMBER_TAB ({ commit, state }, payloads) {
  commit('addTab', payloads)
}

export function REMOVE_REMEMBER_TAB ({ commit, state }, tabIndex) {
  commit('removeTab', tabIndex)
}

export function CLEAR_REMEMBER_TAB ({ commit, state }, tabIndex) {
  commit('removeTab', null)
}
