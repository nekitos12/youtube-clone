'use client'

import { useEffect } from 'react'
import type { Video } from '@/entities/video'
import { useWatchHistoryStore } from '../model/use-watch-history'

type RecordWatchHistoryProps = {
  video: Video
}

export function RecordWatchHistory({ video }: RecordWatchHistoryProps) {
  const addToHistory = useWatchHistoryStore((state) => state.addToHistory)

  useEffect(() => {
    addToHistory(video)
  }, [addToHistory, video.id])

  return null
}
