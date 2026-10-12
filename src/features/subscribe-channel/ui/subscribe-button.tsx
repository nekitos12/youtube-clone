'use client'

import { useEffect, useState } from 'react'
import { SUBSCRIBE_BUTTON } from '../model/content'
import { useSubscriptionsStore, type SubscribedChannel } from '../model/use-subscriptions'

type SubscribeButtonProps = {
  channel: SubscribedChannel
}

export function SubscribeButton({ channel }: SubscribeButtonProps) {
  const [ready, setReady] = useState(false)
  const isSubscribed = useSubscriptionsStore((state) => Boolean(state.channelsById[channel.id]))
  const toggleSubscribe = useSubscriptionsStore((state) => state.toggleSubscribe)
  const syncChannel = useSubscriptionsStore((state) => state.syncChannel)

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    syncChannel(channel)
  }, [channel.id, channel.title, channel.avatarUrl, channel.description, ready, syncChannel])

  const subscribed = ready && isSubscribed

  return (
    <button
      type="button"
      onClick={() => toggleSubscribe(channel)}
      aria-pressed={subscribed}
      className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        subscribed
          ? 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white'
          : 'bg-white text-neutral-950 hover:bg-neutral-200'
      }`}
    >
      {subscribed ? SUBSCRIBE_BUTTON.subscribed : SUBSCRIBE_BUTTON.subscribe}
    </button>
  )
}
