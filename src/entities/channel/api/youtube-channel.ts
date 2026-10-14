import type { Video } from '@/entities/video'
import { mapYoutubeVideo } from '@/entities/video'
import type { Channel } from '../model/types'
import { mapYoutubeChannel, type YoutubeChannelResponse } from './map-youtube-channel'

const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3'

type ChannelQuery = {
  channel: Channel | null
  error: string | null
}

type ChannelVideosQuery = {
  videos: Video[]
  error: string | null
}

type PlaylistItemsResponse = {
  items?: Array<{
    snippet: {
      title: string
      description: string
      channelId: string
      channelTitle: string
      publishedAt: string
      resourceId: {
        videoId: string
      }
      thumbnails: {
        medium?: { url: string }
        high?: { url: string }
        maxres?: { url: string }
        standard?: { url: string }
        default?: { url: string }
      }
    }
  }>
  error?: {
    message: string
  }
}

async function youtubeFetch<T>(path: string, params: Record<string, string>): Promise<T | { error: { message: string } }> {
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey) {
    return { error: { message: 'YOUTUBE_API_KEY is missing. Add a YouTube Data API v3 key to .env' } }
  }

  const url = new URL(`${YOUTUBE_API}/${path}`)
  url.searchParams.set('key', apiKey)

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  const response = await fetch(url, { next: { revalidate: 3600 } })
  const data = (await response.json()) as T & { error?: { message: string } }

  if (!response.ok || data.error) {
    return { error: { message: data.error?.message ?? 'Failed to load channel data' } }
  }

  return data
}

export async function getChannelById(id: string): Promise<ChannelQuery> {
  const data = await youtubeFetch<YoutubeChannelResponse>('channels', {
    part: 'snippet,statistics,contentDetails,brandingSettings',
    id,
  })

  if ('error' in data && data.error && !('items' in data)) {
    return { channel: null, error: data.error.message }
  }

  const item = 'items' in data ? data.items?.[0] : undefined
  if (!item) {
    return { channel: null, error: 'Channel not found' }
  }

  return { channel: mapYoutubeChannel(item), error: null }
}

export async function getChannelVideos(uploadsPlaylistId: string): Promise<ChannelVideosQuery> {
  const data = await youtubeFetch<PlaylistItemsResponse>('playlistItems', {
    part: 'snippet',
    playlistId: uploadsPlaylistId,
    maxResults: '24',
  })

  if ('error' in data && data.error && !('items' in data)) {
    return { videos: [], error: data.error.message }
  }

  const items = 'items' in data ? (data.items ?? []) : []

  return {
    videos: items.map((item) =>
      mapYoutubeVideo({
        id: item.snippet.resourceId.videoId,
        snippet: item.snippet,
      }),
    ),
    error: null,
  }
}
