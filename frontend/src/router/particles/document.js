export default [
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
  },
  {
    path: 'document/:id/preview',
    component: () => import('pages/Admin/Document/Preview'),
    name: 'document-preview'
  }
]
