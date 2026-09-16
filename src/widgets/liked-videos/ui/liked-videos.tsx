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
    return <p className="text-sm text-neutral-400">Загрузка...</p>
  }

  if (videos.length === 0) {
    return (
      <p className="text-sm text-neutral-400">
        Пока нет понравившихся. Нажмите на палец вверх на превью, чтобы сохранить видео.
      </p>
    )
  }

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 max-sm:!grid-cols-1 lg:!grid-cols-3 xl:!grid-cols-4">
      {videos.map((video) => (
        <li key={video.id}>
          <VideoCardWithLike video={video} />
        </li>
      ))}
    </ul>
  )
}
