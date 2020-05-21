export async function getList ({ commit }) {
  const response = await this._vm.$axios.get('/group')
  if (response.isSuccess) {
    const filterData = response.result.data.map(item => {
      if (item.parent === null) {
        delete item.parent
      }

      return item
    })

    commit('setList', filterData)
  }
}

export async function create ({ commit }, payload) {
  const response = await this._vm.$axios.post('/group', payload)

  if (response.isSuccess) {
    this._vm.$q.notify({
      color: 'teal',
      message: response.result.message,
      position: 'top-right'
    });

    return true
  }

  return false
}
