import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Check, Trophy } from 'lucide-react'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { projects } from '../lib/content'
import { CropSentinelVisual, HeartDiseaseVisual, ParkingVisual } from './ProjectVisuals'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { SpotlightCard } from './ui/SpotlightCard'

const visualMap = {
  crop: CropSentinelVisual,
  heart: HeartDiseaseVisual,
  parking: ParkingVisual,
}

function ProjectFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-3.5%', '3.5%'])

  return (
    <div className="relative overflow-hidden rounded-[1.15rem] border border-white/[0.08] bg-[#06080c]">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#ff6b6b]/70" />
          <span className="h-2 w-2 rounded-full bg-[#ffd36b]/70" />
          <span className="h-2 w-2 rounded-full bg-[#74e08b]/70" />
        </div>
        <span className="font-mono text-[0.5rem] tracking-[0.12em] text-faint uppercase">
          project.preview
        </span>
        <span className="font-mono text-[0.48rem] tracking-[0.1em] text-white/20">2026</span>
      </div>

      <div ref={ref} className="relative overflow-hidden p-2 sm:p-3">
        <div className="project-visual overflow-hidden rounded-[0.9rem]">
          <motion.div
            className="h-full scale-[1.045]"
            style={prefersReducedMotion ? undefined : { y }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const featured = projects.find((project) => project.featured) ?? projects[0]
  const otherProjects = projects.filter((project) => !project.featured)
  const FeaturedVisual = visualMap[featured.visual]

  return (
    <section id="projects" className="section-shell">
      <div
        className="pointer-events-none absolute top-[18%] left-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/[0.025] blur-[120px]"
        aria-hidden="true"
      />
      <div className="container-shell relative">
        <Reveal>
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
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <article className="project-card group relative overflow-hidden rounded-[1.8rem] border border-white/[0.09] bg-[#0a0d14]">
            <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr]">
              <div className="relative order-2 flex flex-col border-t border-white/[0.07] p-6 sm:p-8 lg:order-1 lg:border-t-0 lg:border-r lg:p-10">
                <div
                  className="pointer-events-none absolute top-0 left-0 h-56 w-56 bg-[radial-gradient(circle_at_top_left,rgba(216,255,101,0.06),transparent_70%)]"
                  aria-hidden="true"
                />

                <div className="relative flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.07] px-3 py-1.5 text-[0.65rem] font-bold text-accent">
                    <Trophy className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                    {featured.badge}
                  </span>
                  <span className="font-mono text-[0.52rem] tracking-[0.15em] text-faint uppercase">
                    Featured / {featured.number}
                  </span>
                </div>

                <div className="relative mt-7">
                  <span className="font-mono text-[0.54rem] tracking-[0.14em] text-faint uppercase">
                    {featured.category}
                  </span>
                  <h3 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] font-semibold tracking-[-0.05em] text-white">
                    {featured.title}
                  </h3>
                  <p className="mt-2 font-serif text-[1.12rem] text-accent/80 italic">
                    {featured.subtitle}
                  </p>
                  <p className="mt-5 max-w-lg text-[0.9rem] leading-7 text-muted">
                    {featured.description}
                  </p>
                </div>

                <ul className="relative mt-6 space-y-3.5">
                  {featured.bullets.map((detail) => (
                    <li key={detail} className="flex gap-3 text-[0.8rem] leading-6 text-white/65">
                      <span className="mt-1 flex h-4 w-4 flex-none items-center justify-center rounded-full border border-accent/20 bg-accent/[0.06]">
                        <Check className="h-2.5 w-2.5 text-accent" strokeWidth={2.4} aria-hidden="true" />
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-7 grid grid-cols-2 gap-2.5 border-t border-white/[0.06] pt-5 sm:grid-cols-3">
                  {featured.meta?.map(({ icon: Icon, label, value }) => (
                    <div key={label}>
                      <span className="flex items-center gap-1.5 font-mono text-[0.46rem] tracking-[0.12em] text-faint uppercase">
                        <Icon className="h-2.5 w-2.5" strokeWidth={1.8} aria-hidden="true" />
                        {label}
                      </span>
                      <span className="mt-1 block text-[0.73rem] font-semibold text-white/80">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[0.61rem] font-semibold text-white/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="order-1 p-3 sm:p-4 lg:order-2 lg:p-5">
                <ProjectFrame>
                  <FeaturedVisual />
                </ProjectFrame>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-6 space-y-6">
          {otherProjects.map((project, index) => {
            const Visual = visualMap[project.visual]
            return (
              <Reveal key={project.title} delay={0.08 + index * 0.06}>
                <SpotlightCard
                  as="article"
                  className="project-card group relative overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[#0a0d14]"
                >
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.98fr_1.02fr]">
                    <div
                      className={`relative border-b border-white/[0.07] p-3 sm:p-4 lg:border-b-0 ${
                        index % 2 === 1 ? 'lg:order-2 lg:border-l' : 'lg:border-r'
                      }`}
                    >
                      <ProjectFrame>
                        <Visual />
                      </ProjectFrame>
                    </div>

                    <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[0.52rem] tracking-[0.13em] text-accent/70 uppercase">
                          {project.category}
                        </span>
                        <span className="font-mono text-[0.5rem] tracking-[0.12em] text-faint">
                          {project.number} / 03
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-[1.7rem] leading-[1.08] font-semibold tracking-[-0.035em] text-white sm:text-[1.9rem]">
                        {project.title}
                        <span className="block font-serif text-[1.05rem] font-normal text-accent/70 italic">
                          {project.subtitle}
                        </span>
                      </h3>

                      <p className="mt-4 text-[0.84rem] leading-6 text-muted">
                        {project.description}
                      </p>

                      <ul className="mt-5 space-y-2.5">
                        {project.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-2.5 text-[0.77rem] leading-5 text-white/55"
                          >
                            <span
                              className="mt-[0.45rem] h-1 w-1 flex-none rounded-full bg-accent/60"
                              aria-hidden="true"
                            />
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
                  </div>
                </SpotlightCard>
              </Reveal>
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
