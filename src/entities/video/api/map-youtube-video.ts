import type { Video } from '../model/types'

type YoutubeThumbnail = {
  url: string
}

type YoutubeVideoItem = {
  id: string
  snippet: {
    title: string
    description: string
    channelTitle: string
    publishedAt: string
    thumbnails: {
      medium?: YoutubeThumbnail
      high?: YoutubeThumbnail
      maxres?: YoutubeThumbnail
      standard?: YoutubeThumbnail
      default?: YoutubeThumbnail
    }
  }
  statistics?: {
    viewCount?: string
  }
}

export type YoutubeVideosResponse = {
  items?: YoutubeVideoItem[]
  nextPageToken?: string
  error?: {
    message: string
  }
}

export function mapYoutubeVideo(item: YoutubeVideoItem): Video {
  const thumbnails = item.snippet.thumbnails

  return {
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    channelTitle: item.snippet.channelTitle,
    thumbnailUrl:
      thumbnails.maxres?.url ??
      thumbnails.standard?.url ??
      thumbnails.high?.url ??
      thumbnails.medium?.url ??
      thumbnails.default?.url ??
      `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
    publishedAt: item.snippet.publishedAt,
    viewCount: item.statistics?.viewCount,
  }
}
