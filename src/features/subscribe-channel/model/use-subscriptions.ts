'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Channel } from '@/entities/channel'

export type SubscribedChannel = Pick<Channel, 'id' | 'title' | 'avatarUrl' | 'description'>

type SubscriptionsState = {
  channelsById: Record<string, SubscribedChannel>
  order: string[]
  toggleSubscribe: (channel: SubscribedChannel) => void
  syncChannel: (channel: SubscribedChannel) => void
}

export const useSubscriptionsStore = create<SubscriptionsState>()(
  persist(
    (set, get) => ({
      channelsById: {},
      order: [],
      toggleSubscribe: (channel) => {
        const { channelsById, order } = get()
        const subscribed = Boolean(channelsById[channel.id])

        if (subscribed) {
          const { [channel.id]: _removed, ...rest } = channelsById
          set({
            channelsById: rest,
            order: order.filter((id) => id !== channel.id),
          })
          return
        }

        set({
          channelsById: { ...channelsById, [channel.id]: channel },
          order: [channel.id, ...order.filter((id) => id !== channel.id)],
        })
      },
      syncChannel: (channel) => {
        const current = get().channelsById[channel.id]
        if (!current) return
        if (
          current.title === channel.title &&
          current.avatarUrl === channel.avatarUrl &&
          current.description === channel.description
        ) {
          return
        }

        set({
          channelsById: {
            ...get().channelsById,
            [channel.id]: { ...current, ...channel },
          },
        })
      },
    }),
    {
      name: 'youtube-clone-subscriptions',
    },
  ),
)

export function useSubscriptions() {
  const order = useSubscriptionsStore((state) => state.order)
  const channelsById = useSubscriptionsStore((state) => state.channelsById)

  return order
    .map((id) => channelsById[id])
    .filter((channel): channel is SubscribedChannel => Boolean(channel))
}
