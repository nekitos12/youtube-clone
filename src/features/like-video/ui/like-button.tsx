'use client'

import { ThumbsUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Video } from '@/entities/video'
import { useLikedVideosStore } from '../model/use-liked-videos'

type LikeButtonProps = {
  video: Video
  variant?: 'overlay' | 'toolbar'
}

export function LikeButton({ video, variant = 'overlay' }: LikeButtonProps) {
  const [ready, setReady] = useState(false)
  const isLiked = useLikedVideosStore((state) => Boolean(state.videosById[video.id]))
  const toggleLike = useLikedVideosStore((state) => state.toggleLike)

  useEffect(() => {
    setReady(true)
  }, [])

  const liked = ready && isLiked

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggleLike(video)
      }}
      aria-pressed={liked}
      aria-label={liked ? 'Убрать из понравившихся' : 'Добавить в понравившиеся'}
      className={
        variant === 'toolbar'
          ? `flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
              liked
                ? 'bg-neutral-100 font-medium text-neutral-950 hover:bg-white'
                : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white'
            }`
          : `cursor-pointer rounded-full p-2 shadow-sm transition-all ${
              liked
                ? 'bg-white text-neutral-950 hover:scale-110 hover:bg-neutral-200'
                : 'bg-black/60 text-white hover:scale-110 hover:bg-black hover:text-white'
            }`
      }
    >
      <ThumbsUp className={`size-4 ${liked ? 'fill-current' : ''}`} />
    </button>
  )
}
