export async function create ({ commit }, payload) {
  return this._vm.$axios.post('/document', payload);
}

export async function list (context) {
  const response = await this._vm.$axios.get('/document')

  return response ? response.result.data : []
}

export async function getDetail (context, documentId) {
  return this._vm.$axios.get(`/document/${documentId}`);
}

export async function deleteDocument (context, documentId) {
  return this._vm.$axios.delete(`/document/${documentId}`)

}
