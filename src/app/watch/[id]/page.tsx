import { getVideoById } from '@/entities/video'

type WatchPageProps = {
  params: Promise<{ id: string }>
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params
  const { videos } = await getVideoById(id)
  const video = videos[0]

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <div className="aspect-video overflow-hidden rounded-xl bg-black">
        <iframe
          title={video?.title ?? 'Видео'}
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      {video && (
        <>
          <h1 className="mt-4 text-xl font-semibold tracking-tight">{video.title}</h1>
          <p className="mt-1 text-sm text-neutral-400">{video.channelTitle}</p>
        </>
      )}
    </main>
  )
}
