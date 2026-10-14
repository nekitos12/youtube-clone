import { z } from 'zod'
import { CREATE_VIDEO_MESSAGES } from './form-content'
import { parseYoutubeVideoId } from './parse-youtube-id'

export const createVideoSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, CREATE_VIDEO_MESSAGES.invalidUrl)
    .refine((value) => Boolean(parseYoutubeVideoId(value)), CREATE_VIDEO_MESSAGES.invalidUrl),
})

export type CreateVideoFormValues = z.infer<typeof createVideoSchema>
