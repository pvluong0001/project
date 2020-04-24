import axios from 'axios'

const token = localStorage.getItem(process.env.TOKEN_NAME)

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
  Vue.prototype.$axios.defaults.baseURL = process.env.API_URL
  Vue.prototype.$axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  Vue.prototype.$axios.defaults.headers.post['Content-Type'] = 'application/json'

  if (token) {
    Vue.prototype.$axios.defaults.headers.Authorization = `Bearer ${token}`
  }
}
