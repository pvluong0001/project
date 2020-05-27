import axios from 'axios'
import { Notify } from 'quasar'

const token = localStorage.getItem(process.env.TOKEN_NAME)

export default async ({ Vue, store }) => {
  console.log('hererer');
  Vue.prototype.$axios = axios

  Vue.prototype.$axios.interceptors.response.use(response => {
    return {
      isSuccess: true,
      result: response.data
    };
  }, err => {
    Notify.create({
      message: err.response.data.message || 'Server error!',
      position: 'top-right',
      icon: 'warning',
      timeout: 2000,
      color: 'negative'
    })

    return Promise.resolve({
      isSuccess: false,
      result: err.response.data
    })
  })
  Vue.prototype.$axios.defaults.baseURL = process.env.API_URL
  // Vue.prototype.$axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  Vue.prototype.$axios.defaults.headers.post['Content-Type'] = 'application/json'

  if (token) {
    Vue.prototype.$axios.defaults.headers.Authorization = `Bearer ${token}`
  }
}
