'use client'

import { useEffect, useState } from 'react'
import { useLikedVideos, VideoCardWithLike } from '@/features/like-video'

export function LikedVideos() {
  const videos = useLikedVideos()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) {
    return <p className="text-sm text-neutral-400">Loading...</p>
  }

  if (videos.length === 0) {
    return (
      <p className="text-sm text-neutral-400">
        No liked videos yet. Tap the thumbs up on a thumbnail to save a video.
      </p>
    )
  }

  return (
    <ul className="video-card-grid">
      {videos.map((video) => (
        <li key={video.id}>
          <VideoCardWithLike video={video} />
        </li>
      ))}
    </ul>
  )
}
