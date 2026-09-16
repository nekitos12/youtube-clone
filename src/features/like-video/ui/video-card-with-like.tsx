'use client'

import { VideoCard } from '@/entities/video'
import type { Video } from '@/entities/video'
import { LikeButton } from './like-button'

type VideoCardWithLikeProps = {
  video: Video
}

export function VideoCardWithLike({ video }: VideoCardWithLikeProps) {
  return (
    <div className="relative">
      <VideoCard video={video} />
      <div className="absolute right-2 top-2 z-10">
        <LikeButton video={video} />
      </div>
    </div>
  )
}
