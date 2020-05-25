export default [
  {
    path: 'user',
    component: () => import('pages/Admin/User/Index'),
    name: 'user'
  },
  {
    path: 'user/:id/detail',
    component: () => import('pages/Admin/User/Detail'),
    name: 'user-detail'
  },
  {
    path: 'user/create',
    component: () => import('pages/Admin/User/Create'),
    name: 'user-create'
  }
]
