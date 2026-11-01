import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Download, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navItems, site } from '../lib/site'
import { SocialLinks } from './ui/SocialLinks'

function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1))

    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.32
      let current = sectionIds[0]

      sectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= marker) {
          current = id
        }
      })

      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8
      if (isAtBottom) {
        current = sectionIds[sectionIds.length - 1]
      }

      setActiveSection(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  return activeSection
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-3">
        <div className="container-shell">
          <nav
            aria-label="Main navigation"
            className={`flex h-[3.9rem] items-center justify-between rounded-full border px-3 transition-all duration-300 sm:px-4 ${
              scrolled || menuOpen
                ? 'border-white/10 bg-ink/85 shadow-[0_18px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl'
                : 'border-transparent bg-transparent'
            }`}
          >
            <a href="#home" onClick={closeMenu} className="group flex items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] transition group-hover:border-accent/35 group-hover:bg-accent/[0.06]">
                <span className="font-display text-[0.68rem] font-bold tracking-[-0.03em] text-white">
                  BN
                </span>
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full border-2 border-ink bg-accent" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate font-display text-[0.66rem] font-semibold tracking-[0.14em] text-white sm:text-[0.72rem]">
                  BENEDICT NALDO
                </span>
                <span className="mt-0.5 hidden font-mono text-[0.52rem] tracking-[0.16em] text-faint uppercase sm:block">
                  Software Developer
                </span>
              </span>
              <span className="sr-only">— Back to home</span>
            </a>

            <div className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[0.78rem] font-semibold transition-colors ${
                      isActive ? 'text-white' : 'text-muted hover:text-white'
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={site.resume}
                download="Benedict-Naldo-Resume.pdf"
                className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-4 py-2.5 text-[0.75rem] font-bold text-white transition hover:border-accent/35 hover:bg-accent/[0.07] hover:text-accent sm:inline-flex"
              >
                <Download className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                Resume
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="icon-button h-10 w-10 lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? (
                  <X className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[4.95rem] bottom-0 z-40 overflow-y-auto border-t border-white/[0.06] bg-ink/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="container-shell flex min-h-full flex-col py-8">
              <div className="flex flex-col">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.slice(1)
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={isActive ? 'page' : undefined}
                      className="group flex items-center justify-between border-b border-white/[0.06] py-3.5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[10px] text-faint">0{index + 1}</span>
                        <span
                          className={`font-display text-[1.7rem] font-medium tracking-[-0.035em] ${
                            isActive ? 'text-accent' : 'text-white group-hover:text-accent'
                          }`}
                        >
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 text-faint transition group-hover:text-accent"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </a>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <a
                  href={site.resume}
                  download="Benedict-Naldo-Resume.pdf"
                  onClick={closeMenu}
                  className="btn btn-primary w-full"
                >
                  <Download className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  Download Resume
                </a>
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span className="eyebrow flex-none whitespace-nowrap text-faint">
                    Find me online
                  </span>
                  <SocialLinks showLabels />
                </div>
              </div>

              <p className="mt-auto pt-12 font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
                {site.shortLocation} · Open to opportunities
              </p>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  )
}
