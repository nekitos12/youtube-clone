export function parseYoutubeVideoId(input: string): string | null {
  const value = input.trim()
  if (!value) return null
  if (/^[\w-]{11}$/.test(value)) return value

  try {
    const url = new URL(value)
    const host = url.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id && /^[\w-]{11}$/.test(id) ? id : null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      const fromQuery = url.searchParams.get('v')
      if (fromQuery && /^[\w-]{11}$/.test(fromQuery)) return fromQuery

      const match = url.pathname.match(/\/(embed|shorts|live)\/([\w-]{11})/)
      return match?.[2] ?? null
    }
  } catch {
    return null
  }

  return null
}
