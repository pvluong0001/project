import {ValidationProvider, ValidationObserver, extend} from 'vee-validate'
import {required, email, max, min} from 'vee-validate/dist/rules'

export default ({ Vue }) => {
  Vue.component('ValidationProvider', ValidationProvider)
  Vue.component('ValidationObserver', ValidationObserver)

  extend('required', {
    ...required,
    message: field => {
      return `${field} is required!`
    }
  })

  extend('email', email)
  extend('max', max)
  extend('min', min)
}
