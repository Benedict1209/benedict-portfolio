import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { bindLenisProgress, bindWindowProgress } from '../lib/scroll'

gsap.registerPlugin(ScrollTrigger)

/**
 * Single owner of Lenis + GSAP ScrollTrigger.
 *
 * Lenis scrolls the window natively, so ScrollTrigger reads the real scroll
 * position. We drive Lenis from GSAP's ticker and push Lenis progress into the
 * shared store, which the particle scene samples every frame.
 *
 * Everything is registered once per mount and cleaned up in reverse order, so
 * StrictMode's mount/unmount cycle cannot leave duplicate instances or tickers.
 */
export function LenisProvider() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let refreshTimer = 0
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimer)
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 180)
    }

    window.addEventListener('resize', scheduleRefresh)
    window.addEventListener('load', scheduleRefresh)
    window.addEventListener('portfolio:refresh', scheduleRefresh)

    let lenis: Lenis | null = null
    let unbindProgress: (() => void) | null = null
    let ticker: ((time: number) => void) | null = null
    const onScroll = () => ScrollTrigger.update()

    if (reducedMotion) {
      unbindProgress = bindWindowProgress()
    } else {
      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.4,
        autoRaf: false,
        anchors: { offset: -76 },
      })

      unbindProgress = bindLenisProgress(lenis)
      lenis.on('scroll', onScroll)
      ticker = (time: number) => lenis?.raf(time * 1000)
      gsap.ticker.add(ticker)
      gsap.ticker.lagSmoothing(0)
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined)
    }

    return () => {
      window.clearTimeout(refreshTimer)
      window.removeEventListener('resize', scheduleRefresh)
      window.removeEventListener('load', scheduleRefresh)
      window.removeEventListener('portfolio:refresh', scheduleRefresh)

      unbindProgress?.()

      if (lenis) {
        lenis.off('scroll', onScroll)
        if (ticker) gsap.ticker.remove(ticker)
        lenis.destroy()
      }
    }
  }, [])

  return null
}
