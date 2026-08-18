import { Play } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="flex items-center gap-2 border-b border-neutral-800 px-6 py-4">
        <Play className="size-8 fill-red-600 text-red-600" />
        <h1 className="text-xl font-semibold tracking-tight">YouTube Clone</h1>
      </header>
      <main className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <p className="max-w-md text-neutral-400">
          Frontend is ready
        </p>
      </main>
    </div>
  )
}
