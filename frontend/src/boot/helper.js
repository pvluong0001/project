import constant from 'src/constants/index';
import { Notify } from 'quasar'

function asset(path) {
  return `${process.env.ASSETS_URL}/${path}`;
}

export default async ({Vue, store}) => {
  Vue.prototype.$asset = asset;

  Vue.prototype.CONSTANT = constant;

  Vue.prototype.hasRole = (role) => {
    const userRoles = store.state.user.user.roles;

    return userRoles.includes(role);
  };

  Vue.prototype.onResponse = (response, callbackSuccess = null, callbackError = null) => {
    if(response.isSuccess) {
      callbackSuccess && callbackSuccess(response.result.data)
    } else {
      callbackError && callbackError(response.result)
    }
  }

  Vue.prototype.rules = {
    required: val => !!val || 'Field is required',
    max: max => {
      return val => val.length <= max || `Maximum ${max} characters`;
    },
  };

  Vue.prototype.addRememberTab = function(label, path) {
    store.dispatch('helper/ADD_REMEMBER_TAB', {
      label, path
    });
  };
}
