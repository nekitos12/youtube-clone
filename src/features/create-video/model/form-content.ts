export const CREATE_VIDEO_FORM_FIELDS = {
  url: {
    name: 'url' as const,
    label: 'YouTube URL',
    placeholder: 'https://www.youtube.com/watch?v=…',
  },
}

export const CREATE_VIDEO_FORM_ACTIONS = {
  submit: 'Add video',
  submitting: 'Adding...',
} as const

export const CREATE_VIDEO_PAGE = {
  title: 'Add video',
} as const

export const CREATE_VIDEO_MESSAGES = {
  success: 'Video added.',
  error: 'Could not add this video. Check the link and API key.',
  invalidUrl: 'Enter a valid YouTube link or video id.',
  notFound: 'Video not found on YouTube.',
} as const

export const MY_VIDEOS_PAGE = {
  title: 'My videos',
  empty: 'You have not added any videos yet.',
  delete: 'Delete',
} as const
