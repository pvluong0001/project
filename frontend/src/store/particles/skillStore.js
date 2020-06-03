export default {
  namespaced: true,
  // IMPORTANT: state must be a function so the module can be
  // instantiated multiple times
  state: function(){
    return {
      mode: 'single',
      list: []
    }
  },
  actions: {
    async buildSkills(context, payloads) {
      return this._vm.$axios.post('skill', payloads)
    },
    async list({commit}) {
      const response = await this._vm.$axios.get('skill');

      if(response.isSuccess) {
        commit('setList', response.result.data)
      }
    }
  },
  mutations: {
    setMode: (state, mode) => state.mode = mode,
    setList: (state, payload) => state.list = payload
  }
}
