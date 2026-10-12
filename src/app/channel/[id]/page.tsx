import { ChannelHeader, getChannelById, getChannelVideos } from '@/entities/channel'
import { VideoCardWithLike } from '@/features/like-video'
import { SubscribeButton } from '@/features/subscribe-channel'
import { notFound } from 'next/navigation'

type ChannelPageProps = {
  params: Promise<{ id: string }>
}

export default async function ChannelPage({ params }: ChannelPageProps) {
  const { id } = await params
  const { channel, error } = await getChannelById(id)

  if (!channel) {
    if (error) {
      return (
        <main className="px-6 py-8">
          <p className="rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        </main>
      )
    }
    notFound()
  }

  const videosResult = channel.uploadsPlaylistId
    ? await getChannelVideos(channel.uploadsPlaylistId)
    : { videos: [], error: null }

  return (
    <main className="px-6 py-8">
      <ChannelHeader
        channel={channel}
        actions={<SubscribeButton channel={channel} />}
      />

      <h2 className="mt-8 mb-4 text-lg font-semibold tracking-tight">Видео</h2>
      {videosResult.error && (
        <p className="text-sm text-red-300">{videosResult.error}</p>
      )}
      {videosResult.videos.length === 0 && !videosResult.error && (
        <p className="text-sm text-neutral-400">На канале пока нет видео.</p>
      )}
      <ul className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videosResult.videos.map((video) => (
          <li key={video.id}>
            <VideoCardWithLike video={video} />
          </li>
        ))}
      </ul>
    </main>
  )
}
