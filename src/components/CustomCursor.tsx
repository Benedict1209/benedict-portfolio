import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (!enabled) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { x: target.x, y: target.y }
    const ringCurrent = { x: target.x, y: target.y }
    let targetScale = 1
    let currentScale = 1
    let targetDotOpacity = 1
    let currentDotOpacity = 1
    let visible = false
    let frame = 0

    const render = () => {
      current.x += (target.x - current.x) * 0.28
      current.y += (target.y - current.y) * 0.28
      ringCurrent.x += (target.x - ringCurrent.x) * 0.14
      ringCurrent.y += (target.y - ringCurrent.y) * 0.14
      currentScale += (targetScale - currentScale) * 0.16
      currentDotOpacity += (targetDotOpacity - currentDotOpacity) * 0.18

      dot.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`
      dot.style.opacity = String(visible ? currentDotOpacity : 0)
      ring.style.transform = `translate3d(${ringCurrent.x}px, ${ringCurrent.y}px, 0) translate(-50%, -50%) scale(${currentScale})`
      ring.style.opacity = String(visible ? 0.85 : 0)

      frame = window.requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      target.x = event.clientX
      target.y = event.clientY
      visible = true
    }

    const handlePointerOver = (event: PointerEvent) => {
      const targetElement = event.target
      if (!(targetElement instanceof Element)) return
      const isInteractive = Boolean(
        targetElement.closest('a, button, [role="button"], [data-cursor="hover"]'),
      )
      targetScale = isInteractive ? 1.75 : 1
      targetDotOpacity = isInteractive ? 0.35 : 1
    }

    const handlePointerDown = () => {
      targetScale = 0.78
    }

    const handlePointerUp = () => {
      targetScale = 1
    }

    const handlePointerLeave = () => {
      visible = false
    }

    const handlePointerEnter = () => {
      visible = true
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerover', handlePointerOver, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    document.documentElement.addEventListener('pointerleave', handlePointerLeave)
    document.documentElement.addEventListener('pointerenter', handlePointerEnter)

    frame = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerover', handlePointerOver)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
      document.documentElement.removeEventListener('pointerenter', handlePointerEnter)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
