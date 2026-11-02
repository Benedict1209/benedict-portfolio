import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type SplitRevealProps = {
  text: string
  className?: string
  delay?: number
}

/**
 * Editorial paragraph reveal.
 *
 * Each word is masked and lifted into place on first view, so supporting copy
 * enters with the same craft as the headlines instead of a generic fade.
 */
export function SplitReveal({ text, className = '', delay = 0 }: SplitRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const words = element.querySelectorAll<HTMLElement>('[data-split-word]')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 112, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.72,
          delay,
          stagger: 0.016,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, element)

    return () => ctx.revert()
  }, [delay])

  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((word, index, words) => (
        <span key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
            <span data-split-word className="inline-block will-change-transform">
              {word}
            </span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </p>
  )
}
