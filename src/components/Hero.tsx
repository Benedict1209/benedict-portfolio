import { ArrowDown, ArrowUpRight, MapPin, Trophy } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gmailComposeUrl, site } from '../lib/site'
import { MagneticLink } from './ui/MagneticLink'
import { Marquee } from './ui/Marquee'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_ITEMS = [
  'Python',
  'Flask',
  'JavaScript',
  'PHP',
  'SQL',
  'pandas',
  'Machine Learning',
  'HTML',
  'CSS',
]

const facts = [
  { icon: Trophy, label: 'SIH 2026 finalist' },
  { icon: MapPin, label: 'Coimbatore, India' },
]

export function Hero({ introReady }: { introReady: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const asideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!introReady || !sectionRef.current) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef)

      const tl = gsap.timeline({ delay: 0.12, defaults: { ease: 'expo.out' } })

      tl.fromTo(
        q('[data-hero-line]'),
        { yPercent: 118 },
        { yPercent: 0, duration: 1.35, stagger: 0.1 },
      )
        .fromTo(
          q('[data-hero-meta]'),
          { opacity: 0, x: -26 },
          { opacity: 1, x: 0, duration: 0.9 },
          0.1,
        )
        .fromTo(
          q('[data-hero-kicker]'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.5,
        )
        .fromTo(
          q('[data-hero-copy]'),
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.62,
        )
        .fromTo(
          q('[data-hero-cta]'),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
          0.78,
        )
        .fromTo(
          q('[data-hero-fact]'),
          { opacity: 0, x: -18 },
          { opacity: 1, x: 0, duration: 0.7, stagger: 0.07 },
          0.9,
        )
        .fromTo(
          q('[data-hero-aside]'),
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 1 },
          0.45,
        )
        .fromTo(
          q('[data-hero-band]'),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.85,
        )

      // Scroll-linked hero exit: content lifts and recedes as About arrives.
      gsap.to(contentRef.current, {
        yPercent: -12,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      gsap.to(asideRef.current, {
        yPercent: -34,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '70% top',
          scrub: 0.6,
        },
      })

      // Headline drifts slightly slower than the page for depth.
      gsap.to(q('[data-hero-title]'), {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    }, sectionRef.current)

    return () => ctx.revert()
  }, [introReady])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-x-clip pt-24 sm:pt-28 lg:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="hero-shade absolute inset-0" />
        <div className="grid-fade absolute inset-0 opacity-45" />
        <div className="absolute top-[6%] right-[-14%] h-[30rem] w-[30rem] rounded-full bg-sky/[0.06] blur-[120px] sm:h-[42rem] sm:w-[42rem]" />
        <div className="absolute bottom-[6%] left-[-18%] h-[26rem] w-[26rem] rounded-full bg-accent/[0.05] blur-[120px]" />
      </div>

      <div className="container-shell relative w-full flex-1">
        <div className="grid h-full grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)] lg:gap-8">
          <div ref={contentRef} className="max-w-3xl pt-3 pb-5 sm:pt-6 sm:pb-10 lg:pb-12">
            <div
              data-hero-meta
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] py-1.5 pr-3.5 pl-2.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-55" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[0.58rem] tracking-[0.17em] text-white/75 uppercase">
                  Open to opportunities
                </span>
              </span>
              <span className="font-mono text-[0.55rem] tracking-[0.18em] text-white/55 uppercase">
                Portfolio / 2026
              </span>
            </div>

            <h1 className="mt-6 font-display text-[clamp(3.5rem,9.6vw,8.4rem)] leading-[0.8] font-medium tracking-[-0.045em] text-white uppercase sm:mt-7">
              <span data-hero-title className="block">
                <span className="block overflow-hidden pb-[0.04em]">
                  <span data-hero-line className="block will-change-transform">
                    Benedict
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.04em]">
                  <span
                    data-hero-line
                    className="flex items-baseline gap-[0.06em] will-change-transform"
                  >
                    Naldo
                    <span className="text-accent">.</span>
                  </span>
                </span>
              </span>
            </h1>

            <p
              data-hero-kicker
              className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-serif text-[clamp(1.1rem,1.9vw,1.5rem)] leading-tight text-white/80 italic sm:mt-5"
            >
              Software developer
              <span className="h-px w-8 bg-accent/70" aria-hidden="true" />
              <span className="not-italic text-white/50">MCA student</span>
            </p>

            <p
              data-hero-copy
              className="mt-4 max-w-md text-[0.92rem] leading-7 text-white/60 sm:text-[0.98rem] sm:leading-8"
            >
              I build thoughtful web and machine-learning experiences with Python, Flask, and
              JavaScript — turning ideas into software that is clear, useful, and considered.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
              <span data-hero-cta className="inline-flex">
                <MagneticLink
                  href="#projects"
                  className="btn btn-primary"
                  ariaLabel="Explore selected projects"
                >
                  Explore the work
                  <ArrowDown className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                </MagneticLink>
              </span>
              <span data-hero-cta className="inline-flex">
                <MagneticLink
                  href="#contact"
                  className="btn btn-secondary"
                  ariaLabel="Get in touch with Benedict"
                >
                  Get in touch
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                </MagneticLink>
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-white/[0.08] pt-4 sm:mt-9">
              {facts.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  data-hero-fact
                  className="flex items-center gap-2 font-mono text-[0.54rem] tracking-[0.14em] text-white/55 uppercase"
                >
                  <Icon className="h-3 w-3 text-accent/70" strokeWidth={1.7} aria-hidden="true" />
                  {label}
                </span>
              ))}
              <a
                data-hero-fact
                href={gmailComposeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 font-mono text-[0.54rem] tracking-[0.14em] text-white/55 uppercase transition hover:text-accent sm:flex"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div
            ref={asideRef}
            className="relative hidden h-full min-h-[26rem] items-center justify-end lg:flex"
            aria-hidden="true"
          >
            <div data-hero-aside className="relative w-full max-w-[19rem]">
              <div className="flex items-center justify-between border-t border-white/15 pt-3">
                <span className="font-mono text-[0.52rem] tracking-[0.2em] text-white/45 uppercase">
                  Particle study / 001
                </span>
                <span className="font-mono text-[0.52rem] tracking-[0.2em] text-accent">
                  Live
                </span>
              </div>

              <p className="mt-5 max-w-[15rem] font-display text-[1.35rem] leading-[1.15] tracking-[-0.02em] text-white/80 uppercase">
                Form follows
                <br />
                attention.
              </p>

              <p className="mt-3 max-w-[15rem] text-[0.72rem] leading-6 text-white/40">
                The artwork responds to scroll and cursor. Keep moving to see it reorganise.
              </p>

              <div className="mt-8 flex items-end justify-between border-t border-white/[0.08] pt-4">
                <span className="vertical-rl font-mono text-[0.5rem] tracking-[0.32em] text-white/30 uppercase">
                  Scroll to transform
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15">
                  <ArrowDown className="h-4 w-4 text-white/55" strokeWidth={1.5} />
                </span>
              </div>

              <span className="absolute -top-24 -right-6 font-display text-[7.5rem] leading-none font-semibold tracking-[-0.08em] text-white/[0.035]">
                01
              </span>
            </div>
          </div>
        </div>
      </div>

      <div data-hero-band className="relative w-full border-t border-white/[0.07]">
        <div className="container-shell flex items-center justify-between gap-6 py-2.5">
          <span className="font-mono text-[0.5rem] tracking-[0.2em] text-white/55 uppercase">
            Toolkit
          </span>
          <span className="hidden font-mono text-[0.5rem] tracking-[0.2em] text-white/55 uppercase sm:block">
            Scroll to explore
          </span>
        </div>
        <Marquee
          items={MARQUEE_ITEMS}
          className="pb-2"
          itemClassName="font-display text-[clamp(1.2rem,2.3vw,1.9rem)] font-medium tracking-[-0.01em] text-white/25 uppercase"
        />
      </div>
    </section>
  )
}
