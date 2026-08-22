'use server'

import { getPopularVideos } from './youtube-client'

export async function loadPopularVideos(pageToken?: string) {
  return getPopularVideos(pageToken)
}
