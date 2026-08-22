'use client'

import { loadPopularVideos, type YoutubeQuery } from '@/entities/video'
import { useInfiniteQuery } from '@tanstack/react-query'

export function usePopularVideos(initialPage: YoutubeQuery) {
  const query = useInfiniteQuery({
    queryKey: ['popular-videos'],
    queryFn: ({ pageParam }) => loadPopularVideos(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    staleTime: 60_000,
    initialData: initialPage.error
      ? undefined
      : {
          pages: [initialPage],
          pageParams: [undefined],
        },
  })

  const videos = query.data?.pages.flatMap((page) => page.videos) ?? initialPage.videos
  const error = query.data?.pages.at(-1)?.error ?? query.error?.message ?? initialPage.error

  const loadMore = () => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      void query.fetchNextPage()
    }
  }

  return {
    videos,
    error,
    loadMore,
  }
}
