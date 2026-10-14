'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loadVideoById } from '@/entities/video'
import { useLocalVideosStore } from '@/entities/video/model/use-local-videos'
import { CREATE_VIDEO_MESSAGES } from './form-content'
import { parseYoutubeVideoId } from './parse-youtube-id'
import { createVideoSchema, type CreateVideoFormValues } from './types'

export function useCreateVideoForm() {
  const router = useRouter()
  const addVideo = useLocalVideosStore((state) => state.addVideo)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<CreateVideoFormValues>({
    resolver: zodResolver(createVideoSchema),
    defaultValues: {
      url: '',
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const id = parseYoutubeVideoId(values.url)
    if (!id) {
      setStatus('error')
      setErrorMessage(CREATE_VIDEO_MESSAGES.invalidUrl)
      return
    }

    setStatus('idle')
    setErrorMessage(null)

    const result = await loadVideoById(id)
    const video = result.videos[0]

    if (!video) {
      setStatus('error')
      setErrorMessage(result.error ?? CREATE_VIDEO_MESSAGES.notFound)
      return
    }

    addVideo(video)
    setStatus('success')
    router.push(`/watch/${video.id}`)
  })

  return {
    form,
    onSubmit,
    status,
    errorMessage,
    isSubmitting: form.formState.isSubmitting,
  }
}
