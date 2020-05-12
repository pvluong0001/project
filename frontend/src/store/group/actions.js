import { httpClient } from 'src/config/httpClient'

export async function getList ({ commit }) {
  const response = await httpClient.get('/group')
  console.log(response)
}
