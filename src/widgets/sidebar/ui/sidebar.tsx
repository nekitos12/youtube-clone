'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SIDEBAR } from '../model/nav'
import { BrandIcon, NavIcon } from './nav-icon'

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-neutral-800 bg-neutral-950">
      <Link href="/" className="flex items-center gap-2 px-5 py-4">
        <BrandIcon className="size-7 fill-red-600 text-red-600" />
        <span className="text-lg font-semibold tracking-tight">{SIDEBAR.brand}</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto px-3 py-2">
        {SIDEBAR.sections.map((section) => (
          <div key={section.id} className="flex flex-col gap-1">
            {section.title && (
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
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? 'bg-neutral-800 font-medium text-white'
                      : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  <NavIcon name={item.icon} className="size-5 shrink-0" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}
