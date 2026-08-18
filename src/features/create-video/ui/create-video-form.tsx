'use client'

import { TextField } from '@/shared/ui/text-field'
import { CREATE_VIDEO_FORM_ACTIONS, CREATE_VIDEO_FORM_FIELDS } from '../model/form-content'
import { useCreateVideoForm } from '../model/use-create-video-form'

export function CreateVideoForm() {
  const { form, onSubmit, isSubmitting } = useCreateVideoForm()
  const {
    register,
    formState: { errors },
  } = form

  const titleField = CREATE_VIDEO_FORM_FIELDS.title
  const descriptionField = CREATE_VIDEO_FORM_FIELDS.description

  return (
    <form onSubmit={onSubmit} className="flex max-w-2xl flex-col gap-6">
      <TextField
        label={titleField.label}
        type={titleField.type}
        placeholder={titleField.placeholder}
        error={errors[titleField.name]?.message}
        {...register(titleField.name, titleField.validation)}
      />

      <TextField
        multiline
        label={descriptionField.label}
        rows={descriptionField.rows}
        placeholder={descriptionField.placeholder}
        error={errors[descriptionField.name]?.message}
        {...register(descriptionField.name, descriptionField.validation)}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="self-start rounded-full bg-red-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? CREATE_VIDEO_FORM_ACTIONS.submitting : CREATE_VIDEO_FORM_ACTIONS.submit}
      </button>
    </form>
  )
}
