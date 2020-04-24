import { httpClient } from 'src/config/httpClient'
import { SUCCESS_STATUS_CODE } from 'src/config/constant'

export async function LOGIN ({ commit, dispatch }, payloads) {
  try {
    const response = await httpClient.post('/auth/login', payloads)

    if (response.code === SUCCESS_STATUS_CODE) {
      localStorage.setItem(process.env.TOKEN_NAME, response.result.token)
      this._vm.$axios.defaults.headers.common.Authorization = `Bearer ${response.result.token}`

      commit('notify/setNotify', {
        color: 'teal',
        message: 'Login success'
      }, { root: true })

      commit('setLoginStatus', true)
      dispatch('helper/CLEAR_REMEMBER_TAB', null, { root: true })

      this.$router.replace('/admin')
    } else {
      commit('setError', response.error || response.message)
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
  const response = await httpClient.get('/auth/get-user')

  if (response.code === SUCCESS_STATUS_CODE) {
    commit('setUser', response.result)
  } else {
    commit('notify/setNotify', {
      color: 'negative',
      message: 'Session invalid!'
    }, { root: true })
  }
  // try {
  //   switch (response.result.code) {
  //     case 200:
  //       commit('setUser', response.data)
  //       break
  //     case 600:
  //       commit('notify/setNotify', {
  //         color: 'negative',
  //         message: 'Session invalid!'
  //       }, { root: true })
  //
  //       localStorage.removeItem(process.env.TOKEN_NAME)
  //       this.$router.replace('/login')
  //       break
  //     default:
  //       commit('notify/setNotify', {
  //         color: 'negative',
  //         message: response.result.message
  //       }, { root: true })
  //   }
  // } catch (e) {
  //   commit('notify/setNotify', {
  //     color: 'negative',
  //     message: 'Cannot load user info'
  //   }, { root: true })
  // }
}
