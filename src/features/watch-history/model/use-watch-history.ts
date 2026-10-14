'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Video } from '@/entities/video'

const MAX_HISTORY_ITEMS = 100

type WatchHistoryState = {
  videosById: Record<string, Video>
  order: string[]
  addToHistory: (video: Video) => void
  removeFromHistory: (id: string) => void
  clearHistory: () => void
}

export const useWatchHistoryStore = create<WatchHistoryState>()(
  persist(
    (set, get) => ({
      videosById: {},
      order: [],
      addToHistory: (video) => {
        const { videosById, order } = get()
        const nextOrder = [video.id, ...order.filter((id) => id !== video.id)].slice(
          0,
          MAX_HISTORY_ITEMS,
        )
        const nextVideos = { ...videosById, [video.id]: video }

        for (const id of Object.keys(nextVideos)) {
          if (!nextOrder.includes(id)) {
            delete nextVideos[id]
          }
        }

        set({
          videosById: nextVideos,
          order: nextOrder,
        })
      },
      removeFromHistory: (id) => {
        const { videosById, order } = get()
        const { [id]: _removed, ...rest } = videosById
        set({
          videosById: rest,
          order: order.filter((videoId) => videoId !== id),
        })
      },
      clearHistory: () => {
        set({ videosById: {}, order: [] })
      },
    }),
    {
      name: 'youtube-clone-watch-history',
    },
  ),
)

export function useWatchHistory() {
  const order = useWatchHistoryStore((state) => state.order)
  const videosById = useWatchHistoryStore((state) => state.videosById)

  return order
    .map((id) => videosById[id])
    .filter((video): video is Video => Boolean(video))
}
