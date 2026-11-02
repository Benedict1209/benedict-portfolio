import {
  ArrowUpRight,
  Download,
  GraduationCap,
  Languages,
  MapPin,
  MessageSquare,
  Puzzle,
  RefreshCw,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site } from '../lib/site'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { SpotlightCard } from './ui/SpotlightCard'

gsap.registerPlugin(ScrollTrigger)

const strengths: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Puzzle,
    title: 'Problem-Solving',
    description: 'Breaking complex problems into clear, testable steps.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Working openly, sharing context, and building together.',
  },
  {
    icon: RefreshCw,
    title: 'Adaptability',
    description: 'Learning new tools and approaches as the problem demands.',
  },
  {
    icon: MessageSquare,
    title: 'Communication',
    description: 'Explaining ideas with clarity, curiosity, and empathy.',
  },
]

const profileDetails = [
  { icon: GraduationCap, label: 'Education', value: 'MCA · Currently pursuing' },
  { icon: MapPin, label: 'Based in', value: 'Coimbatore, India' },
  { icon: Languages, label: 'Languages', value: 'Tamil · English' },
]

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const strengthsRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { x: -70, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        },
      )

      // Text block enters from the left while the profile card converges from
      // the right; both finish before the pair reaches the centre of the view.
      gsap.fromTo(
        textRef.current,
        { x: -95, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 92%',
            end: 'top 58%',
            scrub: 0.6,
          },
        },
      )

      gsap.fromTo(
        cardRef.current,
        { x: 95, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 92%',
            end: 'top 52%',
            scrub: 0.6,
          },
        },
      )

      // Strengths assemble one after another.
      gsap.fromTo(
        gsap.utils.selector(strengthsRef)('[data-strength]'),
        { y: 38, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: strengthsRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )

      gsap.to(wordRef.current, {
        yPercent: -18,
        xPercent: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    }, sectionRef.current)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="section-shell" ref={sectionRef}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span
          ref={wordRef}
          className="absolute top-[7%] -right-10 hidden font-display text-[clamp(10rem,25vw,24rem)] leading-none font-semibold tracking-[-0.09em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.045)] will-change-transform xl:block"
        >
          CURIOUS
        </span>
      </div>
      <div className="container-shell">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-20">
          <div className="lg:col-span-7">
            <div ref={headingRef}>
              <SectionHeading
                index="01"
                eyebrow="About"
                title={[
                  'Curious by nature.',
                  <>
                    Builder by{' '}
                    <span className="font-serif font-normal text-accent italic">practice.</span>
                  </>,
                ]}
              />
            </div>

            <div
              ref={textRef}
              className="mt-8 max-w-2xl space-y-5 text-[0.97rem] leading-7 text-muted sm:text-base sm:leading-8"
            >
                <p>
                  I'm Benedict Naldo P, an MCA student at Karpagam Academy of Higher Education. My
                  background in computer science gave me a foundation; building things is where that
                  foundation started to make sense.
                </p>
                <p>
                  I've explored Python and Flask through machine learning projects, worked with HTML
                  and CSS during a web development internship, and built interfaces with JavaScript
                  and PHP. Each project has been a way to understand how an idea becomes usable
                  software.
                </p>
                <p className="text-white/85">
                  I'm looking for a team where I can contribute, learn from experienced developers,
                  and grow into a thoughtful software engineer.
                </p>
            </div>

            <Reveal delay={0.14}>
              <div className="relative mt-10 max-w-2xl border-l border-accent/40 pl-6">
                <span
                  className="pointer-events-none absolute -top-5 left-5 font-serif text-[3.5rem] leading-none text-accent/20"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="relative font-serif text-[1.3rem] leading-8 text-white/80 italic sm:text-[1.45rem] sm:leading-9">
                  Eager to gain practical experience, learn emerging technologies, and contribute to
                  a team while continuously improving my craft.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={site.resume}
                  download="Benedict-Naldo-Resume.pdf"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2.5 text-[0.73rem] font-bold text-white transition hover:border-accent/35 hover:bg-accent/[0.06] hover:text-accent"
                >
                  <Download className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  Download resume
                  <ArrowUpRight
                    className="h-3 w-3 text-faint transition group-hover:text-accent"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </a>
                <span className="font-mono text-[0.56rem] tracking-[0.16em] text-faint uppercase">
                  Coimbatore · India
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
              <div ref={cardRef}>
                <SpotlightCard className="glass relative overflow-hidden rounded-[1.8rem] p-6 sm:p-7">
                <div
                  className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-sky/[0.09] blur-3xl"
                  aria-hidden="true"
                />
                <div
                  className="dot-grid pointer-events-none absolute inset-0 opacity-[0.11]"
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.57rem] tracking-[0.16em] text-faint uppercase">
                      Profile / 001
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full border border-accent/15 bg-accent/[0.05] px-2.5 py-1 font-mono text-[0.49rem] tracking-[0.1em] text-accent/80 uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                      Available
                    </span>
                  </div>

                  <div className="relative mt-8 flex items-center gap-4">
                    <div className="relative flex h-[4.9rem] w-[4.9rem] flex-none items-center justify-center rounded-2xl border border-accent/20 bg-[linear-gradient(145deg,rgba(216,255,101,0.16),rgba(138,166,255,0.05))]">
                      <span className="absolute inset-0 animate-ping rounded-2xl border border-accent/10 [animation-duration:3.4s] motion-reduce:animate-none" aria-hidden="true" />
                      <span className="font-display text-[1.6rem] font-semibold tracking-[-0.05em] text-white">
                        BN
                      </span>
                      <span className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#10141c] bg-accent">
                        <span className="h-1 w-1 rounded-full bg-ink" aria-hidden="true" />
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-[-0.035em] text-white sm:text-[1.45rem]">
                        Benedict Naldo P
                      </h3>
                      <p className="mt-1 text-[0.78rem] leading-5 text-muted">
                        Software Developer
                        <br />
                        <span className="text-faint">MCA Student</span>
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-7 h-px bg-white/[0.08]" />

                  <div className="relative mt-6 space-y-4">
                    {profileDetails.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03]">
                          <Icon
                            className="h-3.5 w-3.5 text-accent/70"
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="block font-mono text-[0.48rem] tracking-[0.12em] text-faint uppercase">
                            {label}
                          </span>
                          <span className="mt-0.5 block text-[0.78rem] font-medium text-white/85">
                            {value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-7 flex items-end justify-between gap-4 rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3">
                    <div>
                      <span className="font-mono text-[0.48rem] tracking-[0.12em] text-faint uppercase">
                        Current focus
                      </span>
                      <p className="mt-1 text-[0.76rem] font-medium text-white/85">
                        Python · Web · Machine Learning
                      </p>
                    </div>
                    <div className="flex h-5 items-end gap-[3px]" aria-hidden="true">
                      {[7, 12, 9, 16, 11, 20, 14, 8].map((height, index) => (
                        <span
                          key={index}
                          className="w-[2px] rounded-full bg-accent/35"
                          style={{ height: `${height}px` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative mt-4 flex items-center justify-between">
                    <span className="font-mono text-[0.48rem] tracking-[0.14em] text-faint uppercase">
                      Coimbatore · IN
                    </span>
                    <span className="font-mono text-[0.48rem] tracking-[0.14em] text-faint uppercase">
                      BN / 001
                    </span>
                  </div>
                </div>
              </SpotlightCard>
              </div>
          </div>
        </div>

        <div
          ref={strengthsRef}
          className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-20"
        >
          {strengths.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                data-strength
                className="group flex h-full items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/20 hover:bg-white/[0.03] sm:p-6"
              >
                <span className="mt-0.5 font-mono text-[0.55rem] tracking-[0.12em] text-faint">
                  0{index + 1}
                </span>
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] transition group-hover:border-accent/25 group-hover:bg-accent/[0.06]">
                  <Icon className="h-4 w-4 text-accent/75" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[0.88rem] font-bold tracking-[-0.01em] text-white">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[0.78rem] leading-5 text-faint">{description}</p>
                </div>
                <ArrowUpRight
                  className="mt-1 h-3.5 w-3.5 flex-none text-white/15 transition group-hover:text-accent/70"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>
          ))}
        </div>
      </div>
    </section>
  )
}
