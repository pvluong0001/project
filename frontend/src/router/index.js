import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    let allowedToEnter = true

    to.matched.some((record) => {
      const isLoggedIn = (typeof localStorage.getItem(process.env.TOKEN_NAME) !== 'undefined' && localStorage.getItem(process.env.TOKEN_NAME) !== null)

      if (!isLoggedIn && record.name === 'home') {
        next({
          path: '/login',
          replace: true
        })
        return
      }

      if (to.path === '/login' && isLoggedIn) {
        next({
          path: '/admin',
          replace: true
        })
        return
      }

      if ('meta' in record) {
        if ('requiresAuth' in record.meta) {
          if (record.meta.requiresAuth) {
            if (!isLoggedIn) {
              allowedToEnter = false
              next({
                path: '/login',
                replace: true,
                query: { redirect: to.fullPath }
              })
            }
          }
        }
      }
    })

    if (allowedToEnter) {
      next()
    }
  })

  return Router
}
