import { HISTORY_PAGE } from '@/features/watch-history'
import { WatchHistoryList } from '@/widgets/watch-history'

export default function HistoryPage() {
  return (
    <main className="px-6 py-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">{HISTORY_PAGE.title}</h1>
      <WatchHistoryList />
    </main>
  )
}
