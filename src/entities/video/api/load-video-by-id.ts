'use server'

import { getVideoById } from './youtube-client'

export async function loadVideoById(id: string) {
  return getVideoById(id)
}
