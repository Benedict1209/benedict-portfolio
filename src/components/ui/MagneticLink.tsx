import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'

type MagneticLinkProps = {
  href: string
  children: ReactNode
  className?: string
  strength?: number
  external?: boolean
  download?: string
  onClick?: () => void
  ariaLabel?: string
}

export function MagneticLink({
  href,
  children,
  className,
  strength = 12,
  external = false,
  download,
  onClick,
  ariaLabel,
}: MagneticLinkProps) {
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 })

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return

    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * strength
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * strength

    x.set(offsetX)
    y.set(offsetY)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download } : {})}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </motion.a>
  )
}
