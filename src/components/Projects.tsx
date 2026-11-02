import { ArrowUpRight, BookOpen, Hash, Trophy, Users } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CropSentinelVisual, HeartDiseaseVisual, ParkingVisual } from './ProjectVisuals'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const cropSentinelDetails = [
  {
    label: 'Context',
    text: 'Collaborated with Team Code Bites on an early-warning concept for crop disease and pests.',
  },
  {
    label: 'Approach',
    text: 'Explored combining crop imagery, weather data, regional records, and outbreak history for risk assessment.',
  },
  {
    label: 'Signal',
    text: 'Contributed to risk alerts, crop recommendations, expert escalation, and hotspot tracking.',
  },
]

const otherProjects = [
  {
    number: '02',
    category: 'Individual Project',
    title: 'Heart Disease Prediction',
    subtitle: 'Using Machine Learning',
    description:
      'A Flask app that turns 13 health-related inputs into a classification and estimated probability.',
    bullets: [
      'Built an interactive Flask prediction flow around a trained Random Forest classifier.',
      'Prepared and preprocessed health data with pandas.',
      'Exposed predictions through a JSON API endpoint.',
    ],
    tags: ['Python', 'Flask', 'pandas', 'Random Forest', 'JSON API'],
    visual: HeartDiseaseVisual,
  },
  {
    number: '03',
    category: 'Individual Project',
    title: 'Smart Parking',
    subtitle: 'Management System',
    description:
      'A practical parking management system with PHP backend logic and a responsive HTML, CSS, and JavaScript frontend.',
    bullets: [
      'Built the application flow and backend logic in PHP.',
      'Set up XAMPP for local server execution and testing.',
      'Created responsive interfaces with HTML, CSS, and JavaScript.',
    ],
    tags: ['PHP', 'HTML', 'CSS', 'JavaScript', 'XAMPP'],
    visual: ParkingVisual,
  },
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const q = gsap.utils.selector(sectionRef)

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

      // Featured project: copy and visual converge from opposite sides.
      gsap.fromTo(
        q('[data-featured-body]'),
        { x: -110, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 85%',
            end: 'top 42%',
            scrub: 0.7,
          },
        },
      )

      gsap.fromTo(
        q('[data-featured-visual]'),
        { x: 120, opacity: 0, scale: 0.94 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 85%',
            end: 'top 42%',
            scrub: 0.7,
          },
        },
      )

      gsap.fromTo(
        q('[data-project]'),
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.14,
          scrollTrigger: {
            trigger: q('[data-project]')[0],
            start: 'top 86%',
            toggleActions: 'play none none none',
          },
        },
      )

      q('[data-project]').forEach((card, index) => {
        const visual = card.querySelector('[data-project-visual]')
        const body = card.querySelector('[data-project-body]')
        const direction = index % 2 === 0 ? -1 : 1

        gsap.fromTo(
          visual,
          { x: direction * 46, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 48%',
              scrub: 0.7,
            },
          },
        )

        gsap.fromTo(
          body,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 48%',
              scrub: 0.7,
            },
          },
        )
      })

      gsap.to(wordRef.current, {
        yPercent: -16,
        xPercent: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    })

    mm.add('(max-width: 1023px)', () => {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        },
      )

      gsap.fromTo(
        featuredRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )

      gsap.fromTo(
        gsap.utils.selector(sectionRef)('[data-project]'),
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gsap.utils.selector(sectionRef)('[data-project]')[0],
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="section-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span
          ref={wordRef}
          className="absolute top-[4%] -right-8 hidden font-display text-[clamp(9rem,22vw,22rem)] leading-none font-semibold tracking-[-0.09em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.035)] will-change-transform xl:block"
        >
          SELECTED
        </span>
      </div>
      <div
        className="pointer-events-none absolute top-[18%] left-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/[0.025] blur-[120px]"
        aria-hidden="true"
      />
      <div className="container-shell relative">
        <div ref={headingRef}>
          <SectionHeading
            index="03"
            eyebrow="Featured projects"
            title={[
              'Selected work,',
              <>
                built to <span className="font-serif font-normal text-accent italic">learn.</span>
              </>,
            ]}
            description="Academic projects and a hackathon concept — each one a chance to turn a technical idea into something tangible, considered, and useful."
          />
        </div>

        <article
          ref={featuredRef}
          className="project-card group relative mt-12 overflow-hidden rounded-[1.8rem] border border-white/[0.09] bg-[#0a0d14]"
        >
            <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-b border-white/[0.07] px-6 py-3.5 sm:px-8 lg:px-10">
              <span className="flex items-center gap-2 font-mono text-[0.5rem] tracking-[0.16em] text-white/55 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Case file / 01
              </span>
              <span className="font-mono text-[0.5rem] tracking-[0.14em] text-white/35 uppercase max-sm:hidden">
                Team Code Bites · Problem 26131
              </span>
              <span className="ml-auto font-mono text-[0.5rem] tracking-[0.14em] text-accent/80 uppercase">
                Status · Finalist
              </span>
            </div>

            <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
              <div
                data-featured-body
                className="relative order-2 flex flex-col border-t border-white/[0.07] p-6 sm:p-8 lg:order-1 lg:border-t-0 lg:border-r lg:p-10"
              >
                <div
                  className="pointer-events-none absolute top-0 left-0 h-56 w-56 bg-[radial-gradient(circle_at_top_left,rgba(216,255,101,0.06),transparent_70%)]"
                  aria-hidden="true"
                />
                <div className="relative flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.07] px-3 py-1.5 text-[0.65rem] font-bold text-accent">
                    <Trophy className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                    Smart India Hackathon 2026 Finalist
                  </span>
                  <span className="font-mono text-[0.52rem] tracking-[0.15em] text-faint uppercase">
                    Featured / 01
                  </span>
                </div>

                <div className="relative mt-7">
                  <span className="font-mono text-[0.54rem] tracking-[0.14em] text-faint uppercase">
                    Agriculture · Food Tech · Rural Development
                  </span>
                  <h3 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] font-semibold tracking-[-0.05em] text-white">
                    CropSentinel AI
                  </h3>
                  <p className="mt-2 font-serif text-[1.12rem] text-accent/80 italic">
                    Smart Crop Health Early Warning System
                  </p>
                  <p className="mt-5 max-w-lg text-[0.9rem] leading-7 text-muted">
                    A hackathon concept that combines multiple signals into one early warning
                    system for crop health risks.
                  </p>
                </div>

                <ul className="relative mt-7 space-y-5">
                  {cropSentinelDetails.map((detail, index) => (
                    <li key={detail.label} className="flex gap-3.5 text-[0.8rem] leading-6 text-white/65">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-accent/20 bg-accent/[0.06] font-mono text-[0.46rem] text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>
                        <span className="mb-1 block font-mono text-[0.46rem] tracking-[0.16em] text-white/35 uppercase">
                          {detail.label}
                        </span>
                        {detail.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-7 grid grid-cols-2 gap-2.5 border-t border-white/[0.06] pt-5 sm:grid-cols-3">
                  <div>
                    <span className="flex items-center gap-1.5 font-mono text-[0.46rem] tracking-[0.12em] text-faint uppercase">
                      <Users className="h-2.5 w-2.5" strokeWidth={1.8} aria-hidden="true" />
                      Team
                    </span>
                    <span className="mt-1 block text-[0.73rem] font-semibold text-white/80">Code Bites</span>
                  </div>
                  <div>
                    <span className="flex items-center gap-1.5 font-mono text-[0.46rem] tracking-[0.12em] text-faint uppercase">
                      <Hash className="h-2.5 w-2.5" strokeWidth={1.8} aria-hidden="true" />
                      Problem ID
                    </span>
                    <span className="mt-1 block text-[0.73rem] font-semibold text-white/80">26131</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="flex items-center gap-1.5 font-mono text-[0.46rem] tracking-[0.12em] text-faint uppercase">
                      <BookOpen className="h-2.5 w-2.5" strokeWidth={1.8} aria-hidden="true" />
                      Focus
                    </span>
                    <span className="mt-1 block text-[0.73rem] font-semibold text-white/80">
                      Early warning
                    </span>
                  </div>
                </div>

                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {['AI', 'Crop Health', 'Risk Alerts', 'Hotspot Tracking'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[0.61rem] font-semibold text-white/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div data-featured-visual className="order-1 overflow-hidden lg:order-2">
                <div className="project-visual h-full">
                  <CropSentinelVisual />
                </div>
              </div>
            </div>
        </article>

        <div className="mt-10 flex items-center gap-4">
          <span className="eyebrow text-white/45">Selected archive</span>
          <span className="h-px flex-1 bg-white/[0.08]" aria-hidden="true" />
          <span className="font-mono text-[0.5rem] tracking-[0.14em] text-faint uppercase">
            02 — 03
          </span>
        </div>

        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          {otherProjects.map((project) => {
            const Visual = project.visual
            return (
              <article
                key={project.title}
                data-project
                className="project-card group flex h-full flex-col overflow-hidden rounded-[1.55rem] border border-white/[0.08] bg-[#0a0d14]"
              >
                  <div
                    data-project-visual
                    className="relative overflow-hidden border-b border-white/[0.07]"
                  >
                    <div className="project-visual h-full">
                      <Visual />
                    </div>
                  </div>

                  <div data-project-body className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.52rem] tracking-[0.13em] text-accent uppercase">
                        {project.category}
                      </span>
                      <span className="font-mono text-[0.5rem] tracking-[0.12em] text-faint">
                        {project.number} / 03
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-[1.65rem] leading-[1.1] font-semibold tracking-[-0.035em] text-white sm:text-[1.8rem]">
                      {project.title}
                      <span className="block font-serif text-[1.05rem] font-normal text-accent italic">
                        {project.subtitle}
                      </span>
                    </h3>

                    <p className="mt-4 text-[0.83rem] leading-6 text-muted">{project.description}</p>

                    <ul className="mt-5 space-y-2.5">
                      {project.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5 text-[0.76rem] leading-5 text-white/55">
                          <span className="mt-[0.45rem] h-1 w-1 flex-none rounded-full bg-accent/60" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[0.6rem] font-semibold text-white/50 transition group-hover:border-white/[0.12] group-hover:text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
              </article>
            )
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.018] px-5 py-4 sm:flex-row sm:items-center sm:px-6">
            <p className="text-[0.8rem] leading-6 text-faint">
              Curious about the decisions behind these builds? I'd be glad to walk you through them.
            </p>
            <a
              href="#contact"
              className="group inline-flex flex-none items-center gap-2 text-[0.76rem] font-bold text-white transition hover:text-accent"
            >
              Start a conversation
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
