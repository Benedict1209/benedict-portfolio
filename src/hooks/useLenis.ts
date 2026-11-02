import { useEffect, useState } from 'react'
import { getScrollProgress, subscribeToScroll } from '../lib/scroll'

/**
 * Read the shared scroll progress (0–1).
 *
 * Lenis itself is owned by <LenisProvider> in the same ticker-driven loop as
 * ScrollTrigger, so this hook only subscribes to the shared store. Creating a
 * second Lenis instance here would desynchronise HTML and WebGL scroll
 * choreography, so do not instantiate one.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(getScrollProgress)

  useEffect(() => subscribeToScroll(setProgress), [])

  return progress
}
