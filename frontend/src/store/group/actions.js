import { httpClient } from 'src/config/httpClient'

export async function getList ({ commit }) {
  const response = await httpClient.get('/group')
  if (response.data) {
    const filterData = response.data.map(item => {
      if (item.parent === null) {
        delete item.parent
      }

      return item
    })

    commit('setList', filterData)
  }
}

export async function create ({ commit }, payload) {
  const response = await httpClient.post('/group', payload)

  if (response.data) {
    commit('notify/setNotify', {
      color: 'teal',
      message: response.message
    }, { root: true })

    return true
  }

  return false
}
