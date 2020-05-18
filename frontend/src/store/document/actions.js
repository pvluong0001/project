import { httpClient } from 'src/config/httpClient'

export async function create ({ commit }, payload) {
  return await httpClient.post('/document', payload)
}

export async function list (context) {
  const response = await httpClient.get('/document', {
    query: {
      isRoot: true
    }
  })

  return response ? response.data : []
}

export async function getDetail (context, documentId) {
  return await httpClient.get(`/document/${documentId}`)
}
