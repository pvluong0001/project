import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import user from './user'
import notify from './notify'
import helper from './helper'
import document from './document'

const vuexPersist = new VuexPersist({
  key: process.env.DATA_NAME,
  storage: localStorage
})

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      user, notify, helper, document
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,

    plugins: [vuexPersist.plugin]
  })

  return Store
}
