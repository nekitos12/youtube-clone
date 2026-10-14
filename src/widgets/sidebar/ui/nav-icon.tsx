import { Clapperboard, History, Home, Play, ThumbsUp, Upload, Users } from 'lucide-react'
import type { SidebarIconName } from '../model/nav'

const icons = {
  home: Home,
  subscriptions: Users,
  history: History,
  liked: ThumbsUp,
  videos: Clapperboard,
  upload: Upload,
} satisfies Record<SidebarIconName, typeof Home>

type NavIconProps = {
  name: SidebarIconName
  className?: string
}

export function NavIcon({ name, className }: NavIconProps) {
  const Icon = icons[name]
  return <Icon className={className} />
}

export function BrandIcon({ className }: { className?: string }) {
  return <Play className={className} />
}
