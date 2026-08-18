import type { RegisterOptions } from 'react-hook-form'
import type { CreateVideoFormValues } from './types'

type FormFieldConfig = {
  name: keyof CreateVideoFormValues
  label: string
  placeholder: string
  validation: RegisterOptions<CreateVideoFormValues>
  multiline?: boolean
  type?: 'text' | 'number'
  rows?: number
}

export const CREATE_VIDEO_FORM_FIELDS = {
  title: {
    name: 'title',
    label: 'Название',
    placeholder: 'Добавьте название видео',
    type: 'text',
    validation: {
      required: 'Название обязательно',
      minLength: { value: 3, message: 'Минимум 3 символа' },
    },
  },
  description: {
    name: 'description',
    label: 'Описание',
    placeholder: 'Расскажите зрителям о видео',
    multiline: true,
    rows: 5,
    validation: {
      required: 'Описание обязательно',
      minLength: { value: 10, message: 'Минимум 10 символов' },
    },
  },
} as const satisfies Record<keyof CreateVideoFormValues, FormFieldConfig>

export const CREATE_VIDEO_FORM_ACTIONS = {
  submit: 'Опубликовать',
  submitting: 'Публикация...',
} as const

export const CREATE_VIDEO_PAGE = {
  title: 'Загрузить видео',
} as const
