'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Video } from '@/entities/video/model/types'

type LocalVideosState = {
  videosById: Record<string, Video>
  order: string[]
  addVideo: (video: Video) => void
  removeVideo: (id: string) => void
}

export const useLocalVideosStore = create<LocalVideosState>()(
  persist(
    (set, get) => ({
      videosById: {},
      order: [],
      addVideo: (video) => {
        const { videosById, order } = get()
        set({
          videosById: { ...videosById, [video.id]: video },
          order: [video.id, ...order.filter((id) => id !== video.id)],
        })
      },
      removeVideo: (id) => {
        const { videosById, order } = get()
        const { [id]: _removed, ...rest } = videosById
        set({
          videosById: rest,
          order: order.filter((videoId) => videoId !== id),
        })
      },
    }),
    {
      name: 'youtube-clone-local-videos',
    },
  ),
)

export function useLocalVideos() {
  const order = useLocalVideosStore((state) => state.order)
  const videosById = useLocalVideosStore((state) => state.videosById)

  return order
    .map((id) => videosById[id])
    .filter((video): video is Video => Boolean(video))
}
