import Image from 'next/image'
import type { ReactNode } from 'react'
import type { Channel } from '../model/types'

type ChannelHeaderProps = {
  channel: Channel
  actions?: ReactNode
}

function formatCount(value?: string) {
  if (!value) return null
  return new Intl.NumberFormat('en-US').format(Number(value))
}

export function ChannelHeader({ channel, actions }: ChannelHeaderProps) {
  const subscribers = formatCount(channel.subscriberCount)
  const videos = formatCount(channel.videoCount)

  return (
    <header>
      {channel.bannerUrl && (
        <div className="relative mb-6 h-40 overflow-hidden rounded-xl bg-neutral-800 sm:h-52">
          <Image
            src={`${channel.bannerUrl}=w1280`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex items-start gap-4">
        {channel.avatarUrl && (
          <Image
            src={channel.avatarUrl}
            alt={channel.title}
            width={96}
            height={96}
            className="size-20 shrink-0 rounded-full bg-neutral-800 sm:size-24"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold tracking-tight">{channel.title}</h1>
              <p className="mt-1 text-sm text-neutral-400">
                {[subscribers && `${subscribers} subscribers`, videos && `${videos} videos`]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
            {actions}
          </div>
          {channel.description && (
            <p className="mt-3 line-clamp-3 text-sm text-neutral-300">{channel.description}</p>
          )}
        </div>
      </div>
    </header>
  )
}
