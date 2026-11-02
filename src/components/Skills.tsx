import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillGroups } from '../lib/content'
import { SectionHeading } from './ui/SectionHeading'
import { SpotlightCard } from './ui/SpotlightCard'

gsap.registerPlugin(ScrollTrigger)

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { x: -80, opacity: 0 },
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

      cardRefs.current.forEach((card, index) => {
        if (!card) return
        const fromLeft = index % 2 === 0

        gsap.fromTo(
          card,
          { x: fromLeft ? -90 : 90, y: 26, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.05,
            ease: 'power3.out',
            delay: (index % 2) * 0.06,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        )

        const chips = card.querySelectorAll('[data-skill-chip]')
        gsap.fromTo(
          chips,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.05,
            ease: 'power2.out',
            delay: 0.18,
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      gsap.fromTo(
        footerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        },
      )

      gsap.to(wordRef.current, {
        yPercent: -14,
        xPercent: -3,
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
    <section id="skills" ref={sectionRef} className="section-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span
          ref={wordRef}
          className="absolute bottom-[4%] left-[-4%] hidden font-display text-[clamp(9rem,22vw,22rem)] leading-none font-semibold tracking-[-0.09em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.035)] will-change-transform xl:block"
        >
          STACK
        </span>
      </div>
      <div
        className="pointer-events-none absolute top-1/3 right-0 h-[28rem] w-[28rem] translate-x-1/2 rounded-full bg-sky/[0.045] blur-[110px]"
        aria-hidden="true"
      />
      <div className="container-shell relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div ref={headingRef}>
            <SectionHeading
              index="02"
              eyebrow="Technical skills"
              title={[
                'The tools behind',
                <>
                  the <span className="font-serif font-normal text-accent italic">work.</span>
                </>,
              ]}
              description="A practical toolkit shaped by coursework, projects, and hands-on learning — from writing Python logic to shaping responsive interfaces."
            />
          </div>
          <div className="hidden max-w-[13rem] border-l border-white/10 pl-5 lg:block">
            <span className="font-mono text-[0.54rem] tracking-[0.16em] text-faint uppercase">
              Approach
            </span>
            <p className="mt-2 text-[0.8rem] leading-6 text-muted">
              Choose the right tool for the problem, then keep learning.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-3.5 md:grid-cols-2 xl:grid-cols-12">
          {skillGroups.map(
            ({ title, description, skills, icon: Icon, span, highlighted }, index) => (
              <SpotlightCard
                as="article"
                key={title}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className={`group relative h-full overflow-hidden rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 sm:p-7 ${span} ${
                  highlighted
                    ? 'border-accent/[0.18] bg-[linear-gradient(145deg,rgba(42,32,14,0.86),rgba(10,11,15,0.92))] backdrop-blur-md hover:border-accent/[0.32]'
                    : 'border-white/[0.07] bg-[#080a0f]/75 backdrop-blur-md hover:border-white/[0.14] hover:bg-[#0a0c12]/85'
                }`}
              >
                {highlighted ? (
                  <div
                    className="pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full bg-accent/[0.06] blur-3xl"
                    aria-hidden="true"
                  />
                ) : null}

                <div className="relative z-10 flex items-start justify-between">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                      highlighted
                        ? 'border-accent/20 bg-accent/[0.075] text-accent'
                        : 'border-white/[0.08] bg-white/[0.035] text-accent/75 group-hover:border-accent/20 group-hover:text-accent'
                    }`}
                  >
                    <Icon
                      className="h-[1.15rem] w-[1.15rem]"
                      strokeWidth={1.65}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="font-mono text-[0.52rem] tracking-[0.15em] text-faint">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="relative z-10 mt-6 font-display text-[1.05rem] font-semibold tracking-[-0.025em] text-white sm:text-[1.13rem]">
                  {title}
                </h3>
                <p className="relative z-10 mt-2 max-w-md text-[0.8rem] leading-6 text-muted/80">
                  {description}
                </p>

                <ul className="relative z-10 mt-6 flex flex-wrap gap-2" aria-label={`${title} skills`}>
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      data-skill-chip
                      className={`rounded-full border px-3 py-1.5 text-[0.68rem] font-semibold transition ${
                        highlighted
                          ? 'border-accent/15 bg-accent/[0.045] text-white/80 group-hover:border-accent/25'
                          : 'border-white/[0.08] bg-black/15 text-white/65 group-hover:border-white/[0.14] group-hover:text-white/85'
                      }`}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>

              </SpotlightCard>
            ),
          )}
        </div>

        <div
          ref={footerRef}
          className="mt-8 flex flex-col justify-between gap-3 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center"
        >
          <p className="font-mono text-[0.57rem] tracking-[0.13em] text-faint uppercase">
            No percentages — just tools I've used and concepts I'm continuing to develop.
          </p>
          <span className="font-mono text-[0.57rem] tracking-[0.13em] text-white/55 uppercase">
            Always learning
          </span>
        </div>
      </div>
    </section>
  )
}
