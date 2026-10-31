import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react'
import { navItems, site } from '../lib/site'
import { SocialLinks } from './ui/SocialLinks'

const footerLinks = [
  ...navItems,
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
]

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07]">
      <div className="container-shell relative">
        <div className="grid gap-10 py-14 md:grid-cols-[1.3fr_0.7fr_0.8fr] md:gap-12 md:py-16">
          <div>
            <a href="#home" className="group inline-flex items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] transition group-hover:border-accent/35 group-hover:bg-accent/[0.06]">
                <span className="font-display text-[0.68rem] font-bold tracking-[-0.03em] text-white">BN</span>
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full border-2 border-ink bg-accent" />
              </span>
              <span className="font-display text-[0.72rem] font-semibold tracking-[0.14em] text-white">
                BENEDICT NALDO
              </span>
              <span className="sr-only">— Back to home</span>
            </a>
            <p className="mt-5 max-w-xs text-[0.82rem] leading-6 text-faint">
              Building thoughtful digital experiences from Coimbatore, India — with curiosity,
              consistency, and a willingness to learn.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group mt-5 inline-flex items-center gap-2 text-[0.77rem] font-semibold text-white/65 transition hover:text-accent"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
              {site.email}
              <ArrowUpRight
                className="h-3 w-3 opacity-40 transition group-hover:opacity-100"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          </div>

          <nav aria-label="Footer navigation">
            <span className="font-mono text-[0.51rem] tracking-[0.15em] text-faint uppercase">
              Navigate
            </span>
            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2.5 md:grid-cols-1">
              {footerLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[0.75rem] font-medium text-white/55 transition hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div>
            <span className="font-mono text-[0.51rem] tracking-[0.15em] text-faint uppercase">
              Elsewhere
            </span>
            <div className="mt-4 flex flex-col items-start gap-3">
              <SocialLinks showLabels />
            </div>
            <div className="mt-6 flex items-center gap-2 font-mono text-[0.5rem] tracking-[0.12em] text-faint uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Coimbatore, India
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/[0.06] py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.67rem] text-faint">
            © {currentYear} Benedict Naldo P. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="text-[0.62rem] text-faint">
              Built with React, TypeScript & Tailwind CSS
            </p>
            <a
              href="#home"
              className="group flex items-center gap-1.5 text-[0.64rem] font-semibold text-white/55 transition hover:text-accent"
            >
              Back to top
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 transition group-hover:border-accent/30 group-hover:bg-accent/[0.06]">
                <ArrowUp className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <p className="container-shell translate-y-[0.16em] font-display text-[clamp(3.1rem,10.8vw,9rem)] leading-[0.8] font-bold tracking-[-0.075em] text-white/[0.032]">
          <span className="block sm:inline">BENEDICT</span>{' '}
          <span className="block sm:inline">NALDO.</span>
        </p>
      </div>
    </footer>
  )
}
