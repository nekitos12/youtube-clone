import { LikedVideos } from '@/widgets/liked-videos'

export default function LikedPage() {
  return (
    <main className="px-6 py-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Liked</h1>
      <LikedVideos />
    </main>
  )
}
