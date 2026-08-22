import { CREATE_VIDEO_PAGE, CreateVideoForm } from '@/features/create-video'

export default function CreateVideoPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">{CREATE_VIDEO_PAGE.title}</h1>
      <CreateVideoForm />
    </main>
  )
}
