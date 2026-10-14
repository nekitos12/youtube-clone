import { getPopularVideos } from '@/entities/video'
import { PopularVideos } from '@/widgets/popular-videos'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const initialPage = await getPopularVideos()

  return (
    <main className="flex h-screen flex-col px-6 py-8">
      <h1 className="mb-6 shrink-0 text-2xl font-semibold tracking-tight">Trending</h1>
      <PopularVideos initialPage={initialPage} />
    </main>
  )
}
