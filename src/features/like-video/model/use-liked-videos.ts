'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Video } from '@/entities/video'

type LikedVideosState = {
  videosById: Record<string, Video>
  order: string[]
  toggleLike: (video: Video) => void
  isLiked: (id: string) => boolean
}

export const useLikedVideosStore = create<LikedVideosState>()(
  persist(
    (set, get) => ({
      videosById: {},
      order: [],
      isLiked: (id) => Boolean(get().videosById[id]),
      toggleLike: (video) => {
        const { videosById, order } = get()
        const liked = Boolean(videosById[video.id])

        if (liked) {
        const { [video.id]: _removed, ...rest } = videosById
          set({
            videosById: rest,
            order: order.filter((id) => id !== video.id),
          })
          return
        }

        set({
          videosById: { ...videosById, [video.id]: video },
          order: [video.id, ...order.filter((id) => id !== video.id)],
        })
      },
    }),
    {
      name: 'youtube-clone-liked-videos',
    },
  ),
)

export function useLikedVideos() {
  const order = useLikedVideosStore((state) => state.order)
  const videosById = useLikedVideosStore((state) => state.videosById)

  return order
    .map((id) => videosById[id])
    .filter((video): video is Video => Boolean(video))
}
