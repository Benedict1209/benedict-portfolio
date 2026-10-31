import {
  BrainCircuit,
  Code2,
  Database,
  LayoutTemplate,
  Server,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

type SkillGroup = {
  title: string
  description: string
  skills: string[]
  icon: LucideIcon
  span: string
  highlighted?: boolean
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Programming Languages',
    description: 'The languages I use to reason through problems, structure logic, and build solutions.',
    skills: ['Python', 'C++', 'Java', 'PHP'],
    icon: Code2,
    span: 'md:col-span-2 xl:col-span-7',
  },
  {
    title: 'Frontend Development',
    description: 'Turning layouts and interactions into responsive, considered interfaces.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    icon: LayoutTemplate,
    span: 'md:col-span-2 xl:col-span-5',
  },
  {
    title: 'Backend & Frameworks',
    description: 'Connecting interfaces to application logic, APIs, and local environments.',
    skills: ['Flask', 'JSON APIs', 'XAMPP'],
    icon: Server,
    span: 'xl:col-span-4',
  },
  {
    title: 'Data Processing',
    description: 'Shaping and preparing data before it reaches a model or application.',
    skills: ['SQL', 'pandas', 'Data Preprocessing'],
    icon: Database,
    span: 'xl:col-span-4',
  },
  {
    title: 'Machine Learning',
    description: 'Exploring practical classification and prediction through data-driven projects.',
    skills: ['Random Forest', 'Predictive Modeling'],
    icon: BrainCircuit,
    span: 'md:col-span-2 xl:col-span-4',
    highlighted: true,
  },
]

export function Skills() {
  return (
    <section id="skills" className="section-shell">
      <div
        className="pointer-events-none absolute top-1/3 right-0 h-[28rem] w-[28rem] translate-x-1/2 rounded-full bg-sky/[0.045] blur-[110px]"
        aria-hidden="true"
      />
      <div className="container-shell relative">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              index="02"
              eyebrow="Technical skills"
              title={
                <>
                  The tools behind
                  <br />
                  the <span className="font-serif font-normal text-accent italic">work.</span>
                </>
              }
              description="A practical toolkit shaped by coursework, projects, and hands-on learning — from writing Python logic to shaping responsive interfaces."
            />
            <div className="hidden max-w-[13rem] border-l border-white/10 pl-5 lg:block">
              <span className="font-mono text-[0.54rem] tracking-[0.16em] text-faint uppercase">
                Approach
              </span>
              <p className="mt-2 text-[0.8rem] leading-6 text-muted">
                Choose the right tool for the problem, then keep learning.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-3.5 md:grid-cols-2 xl:grid-cols-12">
          {skillGroups.map(({ title, description, skills, icon: Icon, span, highlighted }, index) => (
            <Reveal key={title} className={span} delay={index * 0.045}>
              <article
                className={`group relative h-full overflow-hidden rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 sm:p-7 ${
                  highlighted
                    ? 'border-accent/[0.16] bg-[linear-gradient(145deg,rgba(216,255,101,0.055),rgba(255,255,255,0.018))] hover:border-accent/[0.28]'
                    : 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.032]'
                }`}
              >
                {highlighted ? (
                  <div
                    className="pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full bg-accent/[0.06] blur-3xl"
                    aria-hidden="true"
                  />
                ) : null}

                <div className="relative flex items-start justify-between">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                      highlighted
                        ? 'border-accent/20 bg-accent/[0.075] text-accent'
                        : 'border-white/[0.08] bg-white/[0.035] text-accent/75 group-hover:border-accent/20 group-hover:text-accent'
                    }`}
                  >
                    <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.65} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[0.52rem] tracking-[0.15em] text-faint">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="relative mt-6 font-display text-[1.05rem] font-semibold tracking-[-0.025em] text-white sm:text-[1.13rem]">
                  {title}
                </h3>
                <p className="relative mt-2 max-w-md text-[0.8rem] leading-6 text-faint">
                  {description}
                </p>

                <ul className="relative mt-6 flex flex-wrap gap-2" aria-label={`${title} skills`}>
                  {skills.map((skill) => (
                    <li
                      key={skill}
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

                <span
                  className="pointer-events-none absolute -right-8 -bottom-10 font-display text-[6.5rem] font-bold tracking-[-0.08em] text-white/[0.018] transition duration-500 group-hover:text-white/[0.028]"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center">
            <p className="font-mono text-[0.57rem] tracking-[0.13em] text-faint uppercase">
              No percentages — just tools I've used and concepts I'm continuing to develop.
            </p>
            <span className="font-mono text-[0.57rem] tracking-[0.13em] text-white/35 uppercase">
              Always learning
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
