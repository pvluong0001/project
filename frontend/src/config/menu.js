export default [
  {
    label: 'Dashboard',
    path: '/admin',
    icon: 'home'
  },
  {
    label: 'User management',
    icon: 'home',
    children: [
      {
        path: '/admin/user',
        label: 'List'
      },
      {
        path: '/admin/skill',
        label: 'Skill'
      }
    ]
  },
  {
    label: 'Group management',
    icon: 'home',
    children: [
      {
        path: '/admin/group',
        label: 'List'
      }
    ]
  },
  {
    label: 'Calendar',
    path: '/admin/calendar',
    icon: 'home'
  },
  {
    label: 'Document',
    icon: 'home',
    children: [
      {
        path: '/admin/document',
        label: 'List'
      }
    ]
  }
]
