import { useEffect, useRef } from 'react'
import { subscribeToScroll } from '../../lib/scroll'

const chapters = [
  { id: 'home', label: 'Origin' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Journey' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Proof' },
  { id: 'contact', label: 'Contact' },
] as const

export function ChapterRail() {
  const countRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const sections = chapters
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (!sections.length) return

    let activeIndex = 0

    const setActive = (index: number) => {
      if (index === activeIndex) return
      activeIndex = index
      if (countRef.current) countRef.current.textContent = String(index + 1).padStart(2, '0')
      if (labelRef.current) labelRef.current.textContent = chapters[index].label

      linkRefs.current.forEach((link, linkIndex) => {
        if (!link) return
        link.dataset.active = linkIndex === index ? 'true' : 'false'
        if (linkIndex === index) link.setAttribute('aria-current', 'true')
        else link.removeAttribute('aria-current')
      })
    }

    const unsubscribe = subscribeToScroll((progress) => {
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${progress})`
      }
    })

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visible) return
        const index = chapters.findIndex(({ id }) => id === visible.target.id)
        if (index >= 0) setActive(index)
      },
      { rootMargin: '-46% 0px -46% 0px', threshold: [0, 0.01] },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      unsubscribe()
      observer.disconnect()
    }
  }, [])

  return (
    <aside className="pointer-events-none fixed top-1/2 right-3 z-30 hidden -translate-y-1/2 xl:block">
      <nav aria-label="Chapter navigation" className="flex flex-col items-end gap-3">
        <span className="font-mono text-[0.48rem] tracking-[0.18em] text-white/45">
          <span ref={countRef}>01</span> / {String(chapters.length).padStart(2, '0')}
        </span>

        <div className="flex items-center gap-3">
          <span
            ref={labelRef}
            className="vertical-rl max-h-28 overflow-hidden font-mono text-[0.46rem] tracking-[0.24em] text-white/55 uppercase"
          >
            Origin
          </span>

          <div className="pointer-events-auto relative flex flex-col items-center py-1">
            <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10" aria-hidden="true">
              <span
                ref={progressRef}
                className="absolute inset-0 block origin-top bg-gradient-to-b from-accent via-sky to-accent"
              />
            </span>

            {chapters.map(({ id, label }, index) => (
              <a
                key={id}
                href={`#${id}`}
                ref={(element) => {
                  linkRefs.current[index] = element
                }}
                aria-label={`Go to ${label}`}
                data-active={index === 0 ? 'true' : 'false'}
                className="group relative flex h-6 w-6 items-center justify-center"
              >
                <span
                  className="block h-1 w-1 rounded-full bg-white/30 transition-all duration-300 group-hover:bg-white group-data-[active=true]:h-2 group-data-[active=true]:w-2 group-data-[active=true]:bg-accent group-data-[active=true]:shadow-[0_0_12px_rgba(244,140,24,0.7)]"
                  aria-hidden="true"
                />
                <span className="pointer-events-none absolute right-full mr-2 hidden whitespace-nowrap font-mono text-[0.46rem] tracking-[0.16em] text-white/70 uppercase group-hover:block">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  )
}
