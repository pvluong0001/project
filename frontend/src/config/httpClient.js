import axios from 'axios'

const client = axios.create({
  baseURL: process.env.API_URL
})

async function get (url, query = null) {
  try {
    const response = await client.get(url, {
      params: query || {}
    })

    if (response.status === 200) {
      return response.data
    }

    return null
  } catch (err) {
    return err.response.data || null
  }
}

async function post (url, data, options = {}) {
  try {
    const response = await client.post(url, data, options)

    if (response.status === 200) {
      return response.data
    }

    return null
  } catch (err) {
    return err.response.data || null
  }
}

async function put (url, data) {
  try {
    const response = await client.put(url, data)

    if (response.status === 200) {
      return response.data
    }

    return null
  } catch (err) {
    return err.response.data || null
  }
}

async function del (url, data) {
  try {
    const response = await client.delete(url, { data })

    if (response.status === 200) {
      return response.data
    }

    return null
  } catch (err) {
    return err.response.data || null
  }
}

export const httpClient = {
  get,
  post,
  put,
  del
}
