export default [
  {
    path: 'group',
    component: () => import('pages/Admin/Group/Index'),
    name: 'group'
  },
  {
    path: 'group/skill/create',
    component: () => import('pages/Admin/Group/SkillCreate')
  },
  {
    path: 'group/skill',
    component: () => import('pages/Admin/Group/Skill')
  },
  {
    path: 'group/doc/:id',
    component: () => import('pages/Admin/Group/Doc')
  }
]
