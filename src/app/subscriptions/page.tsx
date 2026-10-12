import { SUBSCRIPTIONS_PAGE } from '@/features/subscribe-channel'
import { SubscriptionsList } from '@/widgets/subscriptions'

export default function SubscriptionsPage() {
  return (
    <main className="px-6 py-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">{SUBSCRIPTIONS_PAGE.title}</h1>
      <SubscriptionsList />
    </main>
  )
}
