import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const wordmark = 'BENEDICT NALDO'

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      const frame = window.requestAnimationFrame(() => setCount(100))
      const timeout = window.setTimeout(onComplete, 500)
      return () => {
        window.cancelAnimationFrame(frame)
        window.clearTimeout(timeout)
      }
    }

    let frame = 0
    const startedAt = performance.now()
    const duration = 1700

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * 100))

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick)
      } else {
        window.setTimeout(onComplete, 360)
      }
    }

    frame = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(frame)
  }, [onComplete, prefersReducedMotion])

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex flex-col justify-between overflow-hidden bg-black px-5 py-5 sm:px-8 sm:py-7"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
      aria-label={`Loading portfolio, ${count} percent`}
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-display text-[0.8rem] tracking-[0.18em] text-white uppercase">
            Benedict Naldo
          </p>
          <p className="mt-1 font-mono text-[0.55rem] tracking-[0.2em] text-white/45 uppercase">
            Portfolio / 2026
          </p>
        </div>
        <p className="max-w-[12rem] text-right font-mono text-[0.55rem] leading-5 tracking-[0.16em] text-white/45 uppercase">
          Coimbatore, India
          <br />
          Available for opportunities
        </p>
      </div>

      <div className="relative flex flex-1 items-center justify-center py-10">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/[0.07]" />
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 overflow-hidden">
          <div
            className="h-full bg-accent transition-[width] duration-200 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>

        <h1 className="relative flex flex-wrap justify-center gap-x-[0.22em] gap-y-2 text-center font-display text-[clamp(2.5rem,8.4vw,7rem)] leading-[0.84] tracking-[-0.04em] text-white uppercase">
          {wordmark.split(' ').map((word, wordIndex) => (
            <span key={`${word}-${wordIndex}`} className="inline-flex overflow-hidden">
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={`${letter}-${letterIndex}`}
                  className="inline-block"
                  initial={prefersReducedMotion ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.05 + (wordIndex * 6 + letterIndex) * 0.018,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="max-w-[15rem]">
          <div className="h-px w-16 bg-accent/70" />
          <p className="mt-3 font-mono text-[0.54rem] leading-5 tracking-[0.16em] text-white/40 uppercase">
            Loading particles
            <br />
            Preparing the scene
          </p>
        </div>
        <p className="font-display text-[clamp(3.4rem,10vw,8rem)] leading-[0.72] tracking-[-0.06em] text-white">
          {String(count).padStart(3, '0')}
        </p>
      </div>
    </motion.div>
  )
}
