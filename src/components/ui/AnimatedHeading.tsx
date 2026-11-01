import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'

type AnimatedHeadingProps = {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  animateOnMount?: boolean
  as?: 'h1' | 'h2' | 'h3'
}

export function AnimatedHeading({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  animateOnMount = false,
  as = 'h2',
}: AnimatedHeadingProps) {
  const prefersReducedMotion = useReducedMotion()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-60px' })

  const content = (
    <span className="block">
      {lines.map((line, index) => (
        <span key={index} className={`block overflow-hidden pb-[0.06em] ${lineClassName}`}>
          <motion.span
            className="block will-change-transform"
            initial={prefersReducedMotion ? false : { y: '112%' }}
            animate={animateOnMount || isInView ? { y: 0 } : undefined}
            transition={{
              duration: 0.92,
              delay: delay + index * 0.075,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )

  if (as === 'h1') {
    return (
      <h1 ref={headingRef} className={className}>
        {content}
      </h1>
    )
  }

  if (as === 'h3') {
    return (
      <h3 ref={headingRef} className={className}>
        {content}
      </h3>
    )
  }

  return (
    <h2 ref={headingRef} className={className}>
      {content}
    </h2>
  )
}
