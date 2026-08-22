'use client'

import { useEffect, useRef, useState, type ReactNode, type UIEvent } from 'react'

type Viewport = {
  width: number
  height: number
}

type VirtualListProps<T> = {
  items: T[] | ((width: number) => T[])
  rowHeight: number | ((width: number) => number)
  className?: string
  overscan?: number
  endReachedThreshold?: number
  onEndReached?: () => void
  renderRow: (item: T, index: number, width: number) => ReactNode
  getKey?: (item: T, index: number) => string | number
}

function useViewportSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [viewport, setViewport] = useState<Viewport>({ width: 0, height: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new ResizeObserver(([entry]) => {
      setViewport({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      })
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, viewport }
}

export function VirtualList<T>({
  items,
  rowHeight,
  className,
  overscan = 5,
  endReachedThreshold,
  onEndReached,
  renderRow,
  getKey = (_item, index) => index,
}: VirtualListProps<T>) {
  const { ref, viewport } = useViewportSize<HTMLDivElement>()
  const [scrollTop, setScrollTop] = useState(0)
  const onEndReachedRef = useRef(onEndReached)
  onEndReachedRef.current = onEndReached

  const resolvedItems = typeof items === 'function' ? items(viewport.width) : items
  const resolvedRowHeight =
    typeof rowHeight === 'function' ? rowHeight(Math.max(viewport.width, 1)) : rowHeight
  const totalHeight = resolvedItems.length * resolvedRowHeight
  const threshold = endReachedThreshold ?? resolvedRowHeight * 2

  const startIndex = Math.max(0, Math.floor(scrollTop / resolvedRowHeight) - overscan)
  const endIndex = Math.min(
    resolvedItems.length,
    Math.ceil((scrollTop + viewport.height) / resolvedRowHeight) + overscan,
  )

  const maybeReachEnd = (nextScrollTop: number) => {
    const remaining = totalHeight - nextScrollTop - viewport.height
    if (remaining <= threshold) {
      onEndReachedRef.current?.()
    }
  }

  useEffect(() => {
    maybeReachEnd(scrollTop)
  }, [resolvedItems.length, viewport.height, resolvedRowHeight, totalHeight, threshold, scrollTop])

  const onScroll = (event: UIEvent<HTMLDivElement>) => {
    const nextScrollTop = event.currentTarget.scrollTop
    setScrollTop(nextScrollTop)
    maybeReachEnd(nextScrollTop)
  }

  const rows = []
  if (viewport.height > 0 && viewport.width > 0) {
    for (let i = startIndex; i < endIndex; i++) {
      rows.push(
        <div
          key={getKey(resolvedItems[i], i)}
          style={{
            position: 'absolute',
            top: i * resolvedRowHeight,
            height: resolvedRowHeight,
            left: 0,
            right: 0,
          }}
        >
          {renderRow(resolvedItems[i], i, viewport.width)}
        </div>,
      )
    }
  }

  return (
    <div ref={ref} className={className}>
      <div
        style={{ height: viewport.height, overflowY: 'auto', width: '100%' }}
        onScroll={onScroll}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>{rows}</div>
      </div>
    </div>
  )
}
