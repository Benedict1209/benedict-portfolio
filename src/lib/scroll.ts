import type Lenis from 'lenis'

/**
 * Shared scroll-progress architecture.
 *
 * A single source of truth for normalized scroll progress (0–1) derived from
 * Lenis (or native scroll when smooth scrolling is disabled). Both the HTML
 * content (via GSAP ScrollTrigger) and the Three.js particle scene read from
 * this same value so particles, camera movement, text, project visuals, and
 * section transitions all move off one scroll progression without per-frame
 * React state updates.
 */

let scrollProgress = 0

const subscribers = new Set<(progress: number) => void>()

function notify() {
  for (const cb of subscribers) {
    cb(scrollProgress)
  }
}

export function setScrollProgress(value: number) {
  const clamped = Math.min(1, Math.max(0, value))
  if (clamped === scrollProgress) return
  scrollProgress = clamped
  notify()
}

export function getScrollProgress(): number {
  return scrollProgress
}

export function subscribeToScroll(cb: (progress: number) => void): () => void {
  subscribers.add(cb)
  // Emit current value immediately.
  cb(scrollProgress)
  return () => {
    subscribers.delete(cb)
  }
}

/**
 * Document scroll ratio, used when Lenis is disabled (reduced motion) so the
 * particle scene still tracks the page.
 */
export function getWindowProgress(): number {
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - window.innerHeight
  if (scrollable <= 0) return 0
  return Math.min(1, Math.max(0, window.scrollY / scrollable))
}

/**
 * Bind Lenis to the shared progress store. Called once from LenisProvider.
 * Lenis reports progress as a normalized 0–1 value.
 */
export function bindLenisProgress(lenis: Lenis) {
  const update = () => setScrollProgress(lenis.progress)
  lenis.on('scroll', update)
  update()

  return () => {
    lenis.off('scroll', update)
  }
}

/**
 * Native-scroll fallback binding for reduced-motion users.
 */
export function bindWindowProgress() {
  const update = () => setScrollProgress(getWindowProgress())
  update()

  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)

  return () => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  }
}
