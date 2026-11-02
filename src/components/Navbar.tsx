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
    const onScroll = () => setScrolled(window.scrollY > 24)
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
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled || menuOpen
            ? 'border-white/10 bg-black/90 backdrop-blur-xl'
            : 'border-transparent bg-gradient-to-b from-black/50 to-transparent'
        }`}
      >
        <div className="container-shell">
          <nav
            aria-label="Main navigation"
            className="flex h-[4.6rem] items-center justify-between gap-5 sm:h-[5.1rem]"
          >
            <a href="#home" onClick={closeMenu} className="group flex items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center border border-white/20 bg-white/[0.025] transition group-hover:border-accent/60">
                <span className="font-display text-[0.7rem] font-semibold tracking-[0.06em] text-white">
                  BN
                </span>
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate font-display text-[0.72rem] font-medium tracking-[0.14em] text-white uppercase">
                  Benedict Naldo
                </span>
                <span className="mt-0.5 hidden font-mono text-[0.5rem] tracking-[0.18em] text-white/55 uppercase sm:block">
                  Portfolio / 2026
                </span>
              </span>
              <span className="sr-only">— Back to home</span>
            </a>

            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative px-3 py-2 font-mono text-[0.58rem] font-semibold tracking-[0.16em] uppercase transition-colors ${
                      isActive ? 'text-white' : 'text-white/55 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-px h-px bg-accent"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        aria-hidden="true"
                      />
                    ) : null}
                  </a>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden items-center gap-2 border-b border-white/20 pb-1 font-mono text-[0.58rem] font-semibold tracking-[0.16em] text-white/70 uppercase transition hover:border-accent hover:text-accent sm:inline-flex"
              >
                Let&apos;s talk
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
              </a>
              <a
                href={site.resume}
                download="Benedict-Naldo-Resume.pdf"
                className="hidden h-10 w-10 items-center justify-center border border-white/15 text-white/60 transition hover:border-accent/50 hover:text-accent md:inline-flex"
                aria-label="Download resume"
              >
                <Download className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition hover:border-accent/50 hover:text-accent lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? (
                  <X className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
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
            initial={prefersReducedMotion ? false : { opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -18 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[4.6rem] bottom-0 z-40 overflow-y-auto border-t border-white/10 bg-black/95 backdrop-blur-2xl sm:top-[5.1rem] lg:hidden"
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
                      className="group flex items-center justify-between border-b border-white/10 py-4"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[0.55rem] tracking-[0.15em] text-white/55">
                          0{index + 1}
                        </span>
                        <span
                          className={`font-display text-[2.2rem] leading-none tracking-[-0.03em] uppercase ${
                            isActive ? 'text-accent' : 'text-white group-hover:text-accent'
                          }`}
                        >
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 text-white/30 transition group-hover:text-accent"
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
                  Download resume
                </a>
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span className="eyebrow text-white/55">Find me online</span>
                  <SocialLinks showLabels />
                </div>
              </div>

              <p className="mt-auto pt-12 font-mono text-[0.55rem] tracking-[0.16em] text-white/55 uppercase">
                {site.shortLocation} · Open to opportunities
              </p>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  )
}
