import { mapYoutubeVideo, type YoutubeVideosResponse } from './map-youtube-video'
import type { Video } from '../model/types'

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/videos'

export type YoutubeQuery = {
  videos: Video[]
  nextPageToken: string | null
  error: string | null
}

async function fetchYoutubeVideos(params: Record<string, string>): Promise<YoutubeQuery> {
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey) {
    return {
      videos: [],
      nextPageToken: null,
      error: 'YOUTUBE_API_KEY is missing. Add a YouTube Data API v3 key to .env',
    }
  }

  const url = new URL(YOUTUBE_API_URL)
  url.searchParams.set('part', 'snippet,statistics')
  url.searchParams.set('key', apiKey)

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  const response = await fetch(url, { next: { revalidate: 0 } })
  const data = (await response.json()) as YoutubeVideosResponse

  if (!response.ok || data.error) {
    return {
      videos: [],
      nextPageToken: null,
      error: data.error?.message ?? 'Failed to load videos from YouTube',
    }
  }

  return {
    videos: (data.items ?? []).map(mapYoutubeVideo),
    nextPageToken: data.nextPageToken ?? null,
    error: null,
  }
}

export function getPopularVideos(pageToken?: string) {
  return fetchYoutubeVideos({
    chart: 'mostPopular',
    maxResults: '24',
    regionCode: 'RU',
    ...(pageToken ? { pageToken } : {}),
  })
}

export function getVideoById(id: string) {
  return fetchYoutubeVideos({
    id,
  })
}
