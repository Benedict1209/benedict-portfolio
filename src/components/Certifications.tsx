import { BadgeCheck, CodeXml, MessagesSquare, Sparkles, Trophy } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const certifications: {
  title: string
  issuer: string
  category: string
  icon: LucideIcon
}[] = [
  {
    title: 'HTML, CSS and JavaScript',
    issuer: 'Coursera',
    category: 'Certificate',
    icon: CodeXml,
  },
  {
    title: 'Interpersonal Skills',
    issuer: 'NPTEL',
    category: 'Certificate',
    icon: MessagesSquare,
  },
  {
    title: "Neuroverse'26",
    issuer: 'KPR Institute of Engineering and Technology',
    category: 'Participant',
    icon: Sparkles,
  },
]

export function Certifications() {
  return (
    <section id="certifications" className="section-shell">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="Certifications & achievements"
            title={
              <>
                Proof of <span className="font-serif font-normal text-accent italic">curiosity.</span>
              </>
            }
            description="A record of the courses, events, and moments that have pushed my learning forward."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <article className="relative overflow-hidden rounded-[1.7rem] bg-accent p-6 text-ink sm:p-8">
            <div
              className="dot-grid pointer-events-none absolute inset-0 opacity-[0.11]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full border border-ink/[0.08]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute top-10 right-4 h-44 w-44 rounded-full border border-ink/[0.08]"
              aria-hidden="true"
            />

            <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-ink/20 bg-ink/[0.055] px-3 py-1.5 font-mono text-[0.54rem] font-semibold tracking-[0.13em] uppercase">
                    Achievement / 2026
                  </span>
                  <span className="font-mono text-[0.52rem] font-semibold tracking-[0.12em] text-ink/55 uppercase">
                    National innovation challenge
                  </span>
                </div>

                <h3 className="mt-6 font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[0.98] font-semibold tracking-[-0.055em]">
                  Smart India Hackathon
                  <br />
                  2026 finalist.
                </h3>

                <p className="mt-4 max-w-xl text-[0.86rem] leading-6 font-medium text-ink/70">
                  A finalist achievement with CropSentinel AI, a smart crop health early warning
                  system proposed alongside Team Code Bites.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {['Team Code Bites', 'Problem ID 26131', 'Agriculture & Rural Development'].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ink/15 bg-ink/[0.045] px-3 py-1.5 text-[0.65rem] font-bold text-ink/70"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="relative hidden h-44 w-44 flex-none items-center justify-center md:flex">
                <span className="absolute inset-0 rounded-full border border-ink/15" aria-hidden="true" />
                <span className="absolute inset-5 rounded-full border border-dashed border-ink/20" aria-hidden="true" />
                <span className="absolute inset-10 rounded-full border border-ink/15" aria-hidden="true" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-ink/20 bg-ink text-accent shadow-[0_16px_40px_rgba(8,10,15,0.2)]">
                  <Trophy className="h-8 w-8" strokeWidth={1.4} aria-hidden="true" />
                </span>
                <span className="absolute -bottom-1 rounded-full border border-ink/15 bg-accent px-2.5 py-1 font-mono text-[0.47rem] font-bold tracking-[0.1em] uppercase">
                  Finalist
                </span>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-6 grid gap-3.5 md:grid-cols-3">
          {certifications.map(({ title, issuer, category, icon: Icon }, index) => (
            <Reveal key={title} delay={0.07 + index * 0.05}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.033] sm:p-6">
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-accent/70 transition group-hover:border-accent/20 group-hover:text-accent">
                    <Icon className="h-4 w-4" strokeWidth={1.65} aria-hidden="true" />
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-white/[0.07] bg-white/[0.022] px-2.5 py-1 font-mono text-[0.46rem] tracking-[0.1em] text-faint uppercase">
                      {category}
                    </span>
                    <BadgeCheck className="h-3.5 w-3.5 text-white/20" strokeWidth={1.7} aria-hidden="true" />
                  </div>
                </div>

                <h3 className="mt-6 font-display text-[0.97rem] leading-snug font-semibold tracking-[-0.02em] text-white">
                  {title}
                </h3>
                <p className="mt-2 text-[0.74rem] leading-5 text-faint">{issuer}</p>

                <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                  <span className="font-mono text-[0.46rem] tracking-[0.11em] text-faint uppercase">
                    Learning record
                  </span>
                  <span className="font-mono text-[0.46rem] tracking-[0.1em] text-white/20">
                    0{index + 1}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
