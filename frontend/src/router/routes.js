import calendar from 'src/router/particles/calendar';
import document from 'src/router/particles/document';
import profile from 'src/router/particles/profile';
import group from 'src/router/particles/group';
import user from 'src/router/particles/user';

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
    name: 'dashboard',
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        component: () => import('pages/Admin/Dashboard')
      },
      ...calendar,
      ...document,
      ...profile,
      ...group,
      ...user
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
