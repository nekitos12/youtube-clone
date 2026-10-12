'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  SUBSCRIPTIONS_PAGE,
  SubscribeButton,
  useSubscriptions,
} from '@/features/subscribe-channel'

export function SubscriptionsList() {
  const channels = useSubscriptions()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) {
    return <p className="text-sm text-neutral-400">{SUBSCRIPTIONS_PAGE.loading}</p>
  }

  if (channels.length === 0) {
    return <p className="text-sm text-neutral-400">{SUBSCRIPTIONS_PAGE.empty}</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {channels.map((channel) => (
        <li
          key={channel.id}
          className="flex items-center gap-4 rounded-xl border border-neutral-800 px-4 py-3"
        >
          <Link href={`/channel/${channel.id}`} className="flex min-w-0 flex-1 items-center gap-4">
            {channel.avatarUrl ? (
              <Image
                src={channel.avatarUrl}
                alt={channel.title}
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-full bg-neutral-800"
              />
            ) : (
              <div className="size-14 shrink-0 rounded-full bg-neutral-800" />
            )}
            <div className="min-w-0">
              <p className="truncate font-medium text-white">{channel.title}</p>
              {channel.description && (
                <p className="mt-1 line-clamp-1 text-sm text-neutral-400">{channel.description}</p>
              )}
            </div>
          </Link>
          <SubscribeButton channel={channel} />
        </li>
      ))}
    </ul>
  )
}
