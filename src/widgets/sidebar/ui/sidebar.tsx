'use client'

import { Menu, PanelLeftClose } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SIDEBAR } from '../model/nav'
import { useSidebarStore } from '../model/use-sidebar-store'
import { BrandIcon, NavIcon } from './nav-icon'

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Sidebar() {
  const pathname = usePathname()
  const collapsed = useSidebarStore((state) => state.collapsed)
  const toggle = useSidebarStore((state) => state.toggle)

  return (
    <aside
      className={` p-2 sticky top-0 flex h-screen shrink-0 flex-col border-r border-neutral-800 bg-neutral-950 transition-[width] duration-200 ${
        collapsed ? 'w-[68px]' : 'w-60'
      }`}
    >
      <div className={`flex items-center gap-2 py-3 ${collapsed ? 'justify-center px-2' : 'px-3'}`}>
        {!collapsed && (
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <BrandIcon className="size-7 shrink-0 fill-red-600 text-red-600" />
            <span className="truncate text-lg font-semibold tracking-tight">{SIDEBAR.brand}</span>
          </Link>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {SIDEBAR.sections.map((section) => (
          <div key={section.id} className="flex flex-col gap-1">
            {section.title && !collapsed && (
              <p className="px-3 pb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
                {section.title}
              </p>
            )}
            {section.items.map((item) => {
              const active = isActivePath(pathname, item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  className={`flex items-center rounded-lg py-2 text-sm transition-colors ${
                    collapsed ? 'justify-center px-2' : 'gap-3 px-3'
                  } ${
                    active
                      ? 'bg-neutral-800 font-medium text-white'
                      : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  <NavIcon name={item.icon} className="size-5 shrink-0" />
                  {!collapsed && item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
      <button
          type="button"
          onClick={toggle}
          aria-expanded={!collapsed}
          aria-label={collapsed ? SIDEBAR.toggle.expand : SIDEBAR.toggle.collapse}
          className={`flex cursor-pointer items-center rounded-lg py-2 text-sm text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white ${
            collapsed ? 'justify-center px-2' : 'gap-3 px-3'
          }`}
        >
          {collapsed ? <Menu className="size-5" /> : <PanelLeftClose className="size-5" />}
          {!collapsed && SIDEBAR.toggle.collapse}
        </button>
    </aside>
  )
}
