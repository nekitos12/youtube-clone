'use client'

import { useForm } from 'react-hook-form'
import { CREATE_VIDEO_FORM_FIELDS } from './form-content'
import type { CreateVideoFormValues } from './types'

export function useCreateVideoForm() {
  const form = useForm<CreateVideoFormValues>({
    defaultValues: {
      [CREATE_VIDEO_FORM_FIELDS.title.name]: '',
      [CREATE_VIDEO_FORM_FIELDS.description.name]: '',
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    console.log('Create video:', values)
  })

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  }
}
