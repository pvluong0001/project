const routes = [
  {
    path: '/',
    // component: () => import('layouts/MainLayout.vue'),
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login')
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        component: () => import('pages/Admin/Dashboard')
      },
      {
        path: 'calendar',
        component: () => import('pages/Admin/Calendar/Index')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
