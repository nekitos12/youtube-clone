'use client'

import { useEffect, useState } from 'react'
import { VideoCardWithLike } from '@/features/like-video'
import { HISTORY_PAGE, useWatchHistory, useWatchHistoryStore } from '@/features/watch-history'

export function WatchHistoryList() {
  const videos = useWatchHistory()
  const removeFromHistory = useWatchHistoryStore((state) => state.removeFromHistory)
  const clearHistory = useWatchHistoryStore((state) => state.clearHistory)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) {
    return <p className="text-sm text-neutral-400">{HISTORY_PAGE.loading}</p>
  }

  if (videos.length === 0) {
    return <p className="text-sm text-neutral-400">{HISTORY_PAGE.empty}</p>
  }

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => clearHistory()}
        className="cursor-pointer self-start text-sm text-neutral-400 hover:text-white"
      >
        {HISTORY_PAGE.clear}
      </button>
      <ul className="video-card-grid">
        {videos.map((video) => (
          <li key={video.id}>
            <VideoCardWithLike video={video} />
            <button
              type="button"
              onClick={() => removeFromHistory(video.id)}
              className="mt-2 cursor-pointer text-sm text-neutral-400 hover:text-red-400"
            >
              {HISTORY_PAGE.remove}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
