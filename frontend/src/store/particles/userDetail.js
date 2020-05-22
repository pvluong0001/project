export default {
  namespaced: true,
  // IMPORTANT: state must be a function so the module can be
  // instantiated multiple times
  state: () => ({
    user: {}
  }),
  actions: {
    async getUserDetail({commit}, userId) {
      const response = await this._vm.$axios.get(`/user/${userId}`);

      commit('setUser', response.result.data)
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  }
}
