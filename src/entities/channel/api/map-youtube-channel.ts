import type { Channel } from '../model/types'

type YoutubeThumbnail = {
  url: string
}

type YoutubeChannelItem = {
  id: string
  snippet: {
    title: string
    description: string
    thumbnails: {
      default?: YoutubeThumbnail
      medium?: YoutubeThumbnail
      high?: YoutubeThumbnail
    }
  }
  statistics?: {
    subscriberCount?: string
    videoCount?: string
  }
  contentDetails?: {
    relatedPlaylists?: {
      uploads?: string
    }
  }
  brandingSettings?: {
    image?: {
      bannerExternalUrl?: string
    }
  }
}

export type YoutubeChannelResponse = {
  items?: YoutubeChannelItem[]
  error?: {
    message: string
  }
}

export function mapYoutubeChannel(item: YoutubeChannelItem): Channel {
  const thumbnails = item.snippet.thumbnails

  return {
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    avatarUrl: thumbnails.high?.url ?? thumbnails.medium?.url ?? thumbnails.default?.url ?? '',
    bannerUrl: item.brandingSettings?.image?.bannerExternalUrl,
    subscriberCount: item.statistics?.subscriberCount,
    videoCount: item.statistics?.videoCount,
    uploadsPlaylistId: item.contentDetails?.relatedPlaylists?.uploads,
  }
}
