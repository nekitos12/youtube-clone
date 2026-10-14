import { MY_VIDEOS_PAGE } from '@/features/create-video'
import { MyVideosList } from '@/widgets/my-videos'

export default function MyVideosPage() {
  return (
    <main className="px-6 py-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">{MY_VIDEOS_PAGE.title}</h1>
      <MyVideosList />
    </main>
  )
}
