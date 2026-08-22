import Image from 'next/image'
import Link from 'next/link'
import type { Video } from '../model/types'

type VideoCardProps = {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/watch/${video.id}`} className="group block">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-800">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-3 line-clamp-2 text-sm font-medium leading-snug text-white group-hover:text-neutral-200">
        {video.title}
      </h3>
      <p className="mt-1 text-sm text-neutral-400">{video.channelTitle}</p>
    </Link>
  )
}
