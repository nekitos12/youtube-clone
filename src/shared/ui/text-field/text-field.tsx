'use client'

import { forwardRef } from 'react'

const fieldClassName =
  'rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-red-500 focus:outline-none'

type CommonFieldProps = {
  label: string
  error?: string
}

type TextFieldInputProps = CommonFieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof CommonFieldProps> & {
    type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url'
    multiline?: false
  }

type TextFieldTextareaProps = CommonFieldProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof CommonFieldProps> & {
    multiline: true
    type?: never
  }

export type TextFieldProps = TextFieldInputProps | TextFieldTextareaProps

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  function TextField(props, ref) {
    const { label, error, id, name, className, multiline, ...rest } = props
    const fieldId = id ?? name
    const combinedClassName = [fieldClassName, multiline ? 'resize-none' : '', className]
      .filter(Boolean)
      .join(' ')

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId} className="text-sm font-medium text-neutral-300">
          {label}
        </label>

        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={fieldId}
            name={name}
            className={combinedClassName}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={fieldId}
            name={name}
            type={props.type ?? 'text'}
            className={combinedClassName}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    )
  },
)
