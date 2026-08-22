export const SIDEBAR = {
  brand: 'YouTube Clone',
  sections: [
    {
      id: 'main',
      title: null,
      items: [
        { href: '/', label: 'Главная', icon: 'home' },
        { href: '/subscriptions', label: 'Подписки', icon: 'subscriptions' },
      ],
    },
    {
      id: 'library',
      title: 'Вы',
      items: [
        { href: '/history', label: 'История', icon: 'history' },
        { href: '/liked', label: 'Понравившиеся', icon: 'liked' },
        { href: '/videos/create', label: 'Загрузить видео', icon: 'upload' },
      ],
    },
  ],
} as const

export type SidebarIconName = (typeof SIDEBAR.sections)[number]['items'][number]['icon']
