import { CalendarDays, GraduationCap, MapPin } from 'lucide-react'
import { education } from '../lib/site'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

export function Education() {
  return (
    <section id="education" className="section-shell">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 xl:gap-24">
          <div>
            <Reveal>
              <SectionHeading
                index="05"
                eyebrow="Education"
                title={
                  <>
                    A foundation built
                    <br />
                    one <span className="font-serif font-normal text-accent italic">step</span> at a time.
                  </>
                }
                description="From school fundamentals to postgraduate study, each stage has added another layer to how I understand and build with technology."
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-9 flex items-center gap-3 lg:mt-12">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                  <GraduationCap className="h-4 w-4 text-accent/75" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <span className="block font-mono text-[0.48rem] tracking-[0.12em] text-faint uppercase">
                    Academic journey
                  </span>
                  <span className="mt-1 block text-[0.74rem] font-semibold text-white/70">
                    2021 — Present
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <ol className="relative space-y-4">
            <span
              className="absolute top-5 bottom-5 left-[0.33rem] w-px bg-gradient-to-b from-accent/45 via-white/[0.12] to-transparent"
              aria-hidden="true"
            />

            {education.map((item, index) => {
              const isCurrent = index === 0
              return (
                <li key={item.degree} className="relative pl-8">
                  <span
                    className={`absolute top-7 left-0 flex h-[0.7rem] w-[0.7rem] items-center justify-center rounded-full border ${
                      isCurrent
                        ? 'border-accent/50 bg-ink'
                        : 'border-white/20 bg-ink'
                    }`}
                    aria-hidden="true"
                  >
                    <span
                      className={`h-1 w-1 rounded-full ${isCurrent ? 'bg-accent' : 'bg-white/35'}`}
                    />
                  </span>

                  <Reveal delay={index * 0.055}>
                    <article
                      className={`group relative overflow-hidden rounded-2xl border p-5 transition duration-300 hover:-translate-y-0.5 sm:p-6 ${
                        isCurrent
                          ? 'border-accent/[0.16] bg-[linear-gradient(145deg,rgba(216,255,101,0.045),rgba(255,255,255,0.015))]'
                          : 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.13]'
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <span className="flex items-center gap-2 font-mono text-[0.53rem] tracking-[0.13em] text-faint uppercase">
                          <CalendarDays className="h-2.5 w-2.5" strokeWidth={1.8} aria-hidden="true" />
                          {item.period}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[0.58rem] font-bold ${
                              isCurrent
                                ? 'border-accent/20 bg-accent/[0.06] text-accent/90'
                                : 'border-white/[0.08] bg-white/[0.025] text-white/45'
                            }`}
                          >
                            {item.status}
                          </span>
                          <span className="font-mono text-[0.48rem] tracking-[0.1em] text-faint">
                            {item.abbreviation}
                          </span>
                        </div>
                      </div>

                      <h3 className="mt-4 font-display text-[1.05rem] leading-snug font-semibold tracking-[-0.025em] text-white sm:text-[1.18rem]">
                        {item.degree}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="text-[0.8rem] font-medium text-muted">{item.institution}</span>
                        {item.affiliation ? (
                          <span className="text-[0.72rem] text-faint">· {item.affiliation}</span>
                        ) : null}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-[0.74rem] leading-5 text-faint">{item.detail}</p>
                        <span className="flex items-center gap-1.5 text-[0.63rem] text-faint">
                          <MapPin className="h-2.5 w-2.5" strokeWidth={1.8} aria-hidden="true" />
                          {item.location}
                        </span>
                      </div>

                      <span
                        className="pointer-events-none absolute -right-2 -bottom-7 font-display text-[5.5rem] font-bold tracking-[-0.08em] text-white/[0.016]"
                        aria-hidden="true"
                      >
                        0{education.length - index}
                      </span>
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
