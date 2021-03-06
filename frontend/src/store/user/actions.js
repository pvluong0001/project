import { httpClient } from 'src/config/httpClient'

export async function LOGIN ({ commit, dispatch }, payloads) {
  try {
    const response = await httpClient.post('/auth/login', payloads)
    if (response.data.token) {
      localStorage.setItem(process.env.TOKEN_NAME, response.data.token)
      this._vm.$axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`

      commit('notify/setNotify', {
        color: 'teal',
        message: 'Login success'
      }, { root: true })

      commit('setLoginStatus', true)
      dispatch('helper/CLEAR_REMEMBER_TAB', null, { root: true })

      this.$router.replace('/admin')
    } else {
      commit('setError', response.errors || response.message)
    }
  } catch (e) {
    commit('setError', 'Login failed! Please contact admin.')
  }
}

export async function LOGOUT ({ commit, state }) {
  if (state.isLogged) {
    localStorage.removeItem(process.env.TOKEN_NAME)

    commit('notify/setNotify', {
      color: 'teal',
      message: 'Logout success'
    }, { root: true })

    commit('setLoginStatus', false)

    this.$router.replace('/login')
  }
}

export async function loadUser ({ commit }) {
  const response = await httpClient.get('/auth/user/info')
  if (response.data) {
    commit('setUser', response.data)
  } else {
    commit('notify/setNotify', {
      color: 'negative',
      message: 'Session invalid!'
    }, { root: true })
  }
}
