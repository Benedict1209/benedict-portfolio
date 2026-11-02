import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react'
import { gmailComposeUrl, navItems, site } from '../lib/site'
import { SocialLinks } from './ui/SocialLinks'

const footerLinks = [
  ...navItems,
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
]

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="container-shell relative">
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-[1.3fr_0.7fr_0.8fr] md:gap-12 md:py-16">
          <div>
            <a href="#home" className="group inline-flex items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center border border-white/20 bg-white/[0.025] transition group-hover:border-accent/60">
                <span className="font-display text-[0.7rem] font-semibold tracking-[0.06em] text-white">
                  BN
                </span>
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-display text-[0.76rem] font-medium tracking-[0.14em] text-white uppercase">
                Benedict Naldo
              </span>
              <span className="sr-only">— Back to home</span>
            </a>
            <p className="mt-5 max-w-xs text-[0.82rem] leading-6 text-white/55">
              Building thoughtful digital experiences from Coimbatore, India — with curiosity,
              consistency, and a willingness to learn.
            </p>
            <a
              href={gmailComposeUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 text-[0.74rem] font-semibold text-white/60 transition hover:text-accent"
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
            <span className="font-mono text-[0.54rem] tracking-[0.18em] text-white/55 uppercase">
              Navigate
            </span>
            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2.5 md:grid-cols-1">
              {footerLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[0.72rem] font-medium text-white/55 transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div>
            <span className="font-mono text-[0.54rem] tracking-[0.18em] text-white/55 uppercase">
              Elsewhere
            </span>
            <div className="mt-4 flex flex-col items-start gap-3">
              <SocialLinks showLabels />
            </div>
            <div className="mt-6 flex items-center gap-2 font-mono text-[0.52rem] tracking-[0.14em] text-white/55 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Coimbatore, India
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.64rem] text-white/55">
            © {currentYear} Benedict Naldo P. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <p className="text-[0.6rem] text-white/55">Built with React, TypeScript & Tailwind CSS</p>
            <a
              href="#home"
              className="group flex items-center gap-1.5 text-[0.62rem] font-semibold text-white/55 transition hover:text-accent"
            >
              Back to top
              <span className="flex h-6 w-6 items-center justify-center border border-white/15 transition group-hover:border-accent/50">
                <ArrowUp className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <p className="container-shell translate-y-[0.16em] font-display text-[clamp(3.1rem,11.5vw,10rem)] leading-[0.78] font-medium tracking-[-0.06em] text-white/40 uppercase">
          <span className="block sm:inline">Benedict</span>{' '}
          <span className="block sm:inline">Naldo.</span>
        </p>
      </div>
    </footer>
  )
}
