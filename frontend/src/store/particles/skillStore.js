export default {
  namespaced: true,
  // IMPORTANT: state must be a function so the module can be
  // instantiated multiple times
  state: () => ({
    mode: 'auto'
  }),
  actions: {
    async buildSkills(context, payloads) {
      const response = await this._vm.$axios.post('skill', payloads)

      console.log(response.result.data);
    }
  },
  mutations: {
    setMode: (state, mode) => state.mode = mode
  }
}
