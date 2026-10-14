'use client'

import { VideoCardWithLike } from '@/features/like-video'
import { type Video, type YoutubeQuery } from '@/entities/video'
import { VirtualList } from '@/shared/ui/virtual-list'
import { usePopularVideos } from '../model/use-popular-videos'

const TITLE_BLOCK_HEIGHT = 88
const ROW_GAP = 16

function getColumnCount(width: number) {
  if (width < 640) return 1
  if (width < 1024) return 2
  if (width < 1280) return 3
  return 4
}

function chunkVideos(videos: Video[], columns: number) {
  const rows: Video[][] = []

  for (let index = 0; index < videos.length; index += columns) {
    rows.push(videos.slice(index, index + columns))
  }

  return rows
}

type PopularVideosProps = {
  initialPage: YoutubeQuery
}

export function PopularVideos({ initialPage }: PopularVideosProps) {
  const { videos, error, loadMore } = usePopularVideos(initialPage)

  if (error && videos.length === 0) {
    return (
      <p className="rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
        {error}
      </p>
    )
  }

  if (videos.length === 0) {
    return <p className="text-sm text-neutral-400">Trending videos are unavailable right now.</p>
  }

  return (
    <VirtualList
      className="min-h-0 flex-1"
      items={(width) => chunkVideos(videos, getColumnCount(width))}
      rowHeight={(width) => {
        const columns = getColumnCount(width)
        return Math.round((width / columns) * (9 / 16) + TITLE_BLOCK_HEIGHT + ROW_GAP)
      }}
      onEndReached={loadMore}
      getKey={(row) => row.map((video) => video.id).join('-')}
      renderRow={(row, _index, width) => {
        const columns = getColumnCount(width)

        return (
          <div
            className="grid h-full gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {row.map((video) => (
              <VideoCardWithLike key={video.id} video={video} />
            ))}
          </div>
        )
      }}
    />
  )
}
