import type { PointerEvent, ReactNode } from 'react'

type SpotlightCardProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'article'
}

export function SpotlightCard({ children, className = '', as = 'div' }: SpotlightCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return

    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  if (as === 'article') {
    return (
      <article className={`spotlight ${className}`} onPointerMove={handlePointerMove}>
        {children}
      </article>
    )
  }

  return (
    <div className={`spotlight ${className}`} onPointerMove={handlePointerMove}>
      {children}
    </div>
  )
}
