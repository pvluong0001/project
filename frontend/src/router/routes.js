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
      },
      {
        path: 'document',
        component: () => import('pages/Admin/Document/Index'),
        name: 'document'
      },
      {
        path: 'document/create',
        component: () => import('pages/Admin/Document/Create'),
        name: 'document-create'
      },
      {
        path: 'document/:id/create',
        component: () => import('pages/Admin/Document/Clone'),
        name: 'document-clone'
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
