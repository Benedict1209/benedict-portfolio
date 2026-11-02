import { forwardRef } from 'react'
import type { PointerEvent, ReactNode, Ref } from 'react'

type SpotlightCardProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'article'
}

export const SpotlightCard = forwardRef<HTMLElement, SpotlightCardProps>(
  function SpotlightCard({ children, className = '', as = 'div' }, ref) {
    const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType !== 'mouse') return

      const rect = event.currentTarget.getBoundingClientRect()
      event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
      event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
    }

    if (as === 'article') {
      return (
        <article
          ref={ref as Ref<HTMLDivElement>}
          className={`spotlight ${className}`}
          onPointerMove={handlePointerMove}
        >
          {children}
        </article>
      )
    }

    return (
      <div
        ref={ref as Ref<HTMLDivElement>}
        className={`spotlight ${className}`}
        onPointerMove={handlePointerMove}
      >
        {children}
      </div>
    )
  },
)
