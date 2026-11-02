import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  blur?: boolean
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
  direction = 'up',
  blur = false,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const offset = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }[direction]

  return (
    <motion.div
      className={className}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, ...offset, filter: blur ? 'blur(10px)' : 'blur(0px)' }
      }
      whileInView={
        prefersReducedMotion
          ? undefined
          : { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }
      }
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
