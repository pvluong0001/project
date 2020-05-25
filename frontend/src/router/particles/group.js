export default [
  {
    path: 'group',
    component: () => import('pages/Admin/Group/Index'),
    name: 'group'
  },
  {
    path: 'group/skill',
    component: () => import('pages/Admin/Group/Skill')
  }
]
