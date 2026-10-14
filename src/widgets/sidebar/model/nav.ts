export const SIDEBAR = {
  brand: 'YouTube Clone',
  toggle: {
    collapse: 'Collapse',
    expand: 'Expand',
  },
  sections: [
    {
      id: 'main',
      title: null,
      items: [
        { href: '/', label: 'Home', icon: 'home' },
        { href: '/subscriptions', label: 'Subscriptions', icon: 'subscriptions' },
      ],
    },
    {
      id: 'library',
      title: 'You',
      items: [
        { href: '/history', label: 'History', icon: 'history' },
        { href: '/liked', label: 'Liked', icon: 'liked' },
        { href: '/videos', label: 'My videos', icon: 'videos' },
        { href: '/videos/create', label: 'Upload', icon: 'upload' },
      ],
    },
  ],
} as const

export type SidebarIconName = (typeof SIDEBAR.sections)[number]['items'][number]['icon']
