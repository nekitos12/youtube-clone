'use client'

import { TextField } from '@/shared/ui/text-field'
import { CREATE_VIDEO_FORM_ACTIONS, CREATE_VIDEO_FORM_FIELDS, CREATE_VIDEO_MESSAGES } from '../model/form-content'
import { useCreateVideoForm } from '../model/use-create-video-form'

export function CreateVideoForm() {
  const { form, onSubmit, status, errorMessage, isSubmitting } = useCreateVideoForm()
  const {
    register,
    formState: { errors },
  } = form

  const urlField = CREATE_VIDEO_FORM_FIELDS.url

  return (
    <form onSubmit={onSubmit} className="flex max-w-2xl flex-col gap-6">
      {status === 'success' && (
        <p className="rounded-lg border border-emerald-800 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300">
          {CREATE_VIDEO_MESSAGES.success}
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {errorMessage ?? CREATE_VIDEO_MESSAGES.error}
        </p>
      )}

      <TextField
        label={urlField.label}
        placeholder={urlField.placeholder}
        error={errors.url?.message}
        {...register(urlField.name)}
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
