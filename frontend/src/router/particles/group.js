export default [
  {
    path: 'group',
    component: () => import('pages/Admin/Group/Index'),
    name: 'group'
  },
  {
    path: 'group/skills',
    component: () => import('pages/Admin/Group/Skill')
  }
]
