import { Briefcase, Check, Code2, LayoutTemplate } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { SpotlightCard } from './ui/SpotlightCard'

export function Experience() {
  return (
    <section id="experience" className="section-shell">
      <div className="container-shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 xl:gap-24">
          <div>
            <Reveal>
              <SectionHeading
                index="04"
                eyebrow="Experience"
                title={[
                  'A first look at',
                  <>
                    the craft in{' '}
                    <span className="font-serif font-normal text-accent italic">practice.</span>
                  </>,
                ]}
                description="A one-month internship that introduced me to front-end development beyond the classroom — and to the value of building carefully, page by page."
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-9 hidden border-l border-white/[0.1] pl-5 lg:block">
                <span className="font-mono text-[0.52rem] tracking-[0.15em] text-faint uppercase">
                  The takeaway
                </span>
                <p className="mt-2 max-w-xs text-[0.83rem] leading-6 text-muted">
                  Good interfaces begin with structure, patience, and a willingness to keep refining
                  the details.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <span
                className="pointer-events-none mt-10 hidden select-none font-display text-[7rem] leading-none font-semibold tracking-[-0.08em] text-white/[0.035] lg:block"
                aria-hidden="true"
              >
                01
              </span>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.06}>
              <div className="relative pl-7 sm:pl-9">
                <span
                  className="absolute top-3 bottom-3 left-[0.34rem] w-px bg-gradient-to-b from-accent/40 via-white/[0.1] to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute top-3 left-0 flex h-[0.72rem] w-[0.72rem] items-center justify-center rounded-full border border-accent/40 bg-ink">
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                </span>

                <SpotlightCard className="glass relative overflow-hidden rounded-[1.6rem] p-6 sm:p-8">
                  <div
                    className="pointer-events-none absolute top-0 right-0 h-48 w-48 bg-[radial-gradient(circle_at_top_right,rgba(138,166,255,0.09),transparent_70%)]"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex flex-wrap items-start justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.035]">
                        <span className="font-display text-[0.82rem] font-semibold tracking-[-0.03em] text-white">
                          AT
                        </span>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 font-mono text-[0.5rem] tracking-[0.13em] text-accent/70 uppercase">
                          <Briefcase className="h-2.5 w-2.5" strokeWidth={1.8} aria-hidden="true" />
                          Internship
                        </span>
                        <h3 className="mt-1.5 font-display text-[1.2rem] font-semibold tracking-[-0.03em] text-white sm:text-[1.35rem]">
                          Web Development Intern
                        </h3>
                        <p className="mt-1 text-[0.8rem] font-medium text-muted">Accent Techno Soft</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 font-mono text-[0.5rem] tracking-[0.1em] text-white/45 uppercase">
                      One month
                    </span>
                  </div>

                  <div className="relative z-10 mt-7 flex gap-4 rounded-xl border border-white/[0.06] bg-black/15 p-4">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-accent/15 bg-accent/[0.05]">
                      <Code2
                        className="h-3.5 w-3.5 text-accent/80"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                    <p className="text-[0.83rem] leading-6 text-white/65">
                      Hands-on exposure to the fundamentals of front-end development, focused on
                      turning structure and styling into responsive web pages.
                    </p>
                  </div>

                  <ul className="relative z-10 mt-6 space-y-4">
                    <li className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]">
                        <Check className="h-3 w-3 text-accent" strokeWidth={2.2} aria-hidden="true" />
                      </span>
                      <p className="text-[0.84rem] leading-6 text-muted">
                        Gained practical exposure to front-end development using HTML and CSS.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]">
                        <Check className="h-3 w-3 text-accent" strokeWidth={2.2} aria-hidden="true" />
                      </span>
                      <p className="text-[0.84rem] leading-6 text-muted">
                        Structured and styled responsive web pages using HTML and CSS fundamentals.
                      </p>
                    </li>
                  </ul>

                  <div className="relative z-10 mt-7 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-5">
                    <span className="mr-1 flex items-center gap-1.5 font-mono text-[0.48rem] tracking-[0.12em] text-faint uppercase">
                      <LayoutTemplate className="h-2.5 w-2.5" strokeWidth={1.8} aria-hidden="true" />
                      Focus areas
                    </span>
                    {['HTML', 'CSS', 'Responsive pages'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[0.61rem] font-semibold text-white/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>

                <div className="mt-4 flex items-center gap-3 pl-1">
                  <span className="h-px flex-1 bg-white/[0.06]" aria-hidden="true" />
                  <span className="font-mono text-[0.48rem] tracking-[0.13em] text-faint uppercase">
                    Foundation · Front-end
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
