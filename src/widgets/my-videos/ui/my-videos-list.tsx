'use client'

import { useEffect, useState } from 'react'
import { VideoCardWithLike } from '@/features/like-video'
import { MY_VIDEOS_PAGE } from '@/features/create-video'
import { useLocalVideos, useLocalVideosStore } from '@/entities/video/model/use-local-videos'

export function MyVideosList() {
  const videos = useLocalVideos()
  const removeVideo = useLocalVideosStore((state) => state.removeVideo)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) {
    return <p className="text-sm text-neutral-400">Loading...</p>
  }

  if (videos.length === 0) {
    return <p className="text-sm text-neutral-400">{MY_VIDEOS_PAGE.empty}</p>
  }

  return (
    <ul className="video-card-grid">
      {videos.map((video) => (
        <li key={video.id} className="relative">
          <VideoCardWithLike video={video} />
          <button
            type="button"
            onClick={() => removeVideo(video.id)}
            className="mt-2 cursor-pointer text-sm text-neutral-400 hover:text-red-400"
          >
            {MY_VIDEOS_PAGE.delete}
          </button>
        </li>
      ))}
    </ul>
  )
}
