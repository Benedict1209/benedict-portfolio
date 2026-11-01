import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, MapPin, Trophy } from 'lucide-react'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { AnimatedHeading } from './ui/AnimatedHeading'
import { MagneticLink } from './ui/MagneticLink'
import { Marquee } from './ui/Marquee'
import { SocialLinks } from './ui/SocialLinks'

const codeLines: ReactNode[] = [
  <>
    <span className="text-[#c7a7ff]">const</span> <span className="text-[#8aa6ff]">developer</span>{' '}
    <span className="text-[#6f7b90]">=</span> <span className="text-[#8b95a7]">{'{'}</span>
  </>,
  <>
    <span className="pl-4 text-[#8aa6ff]">name</span>
    <span className="text-[#6f7b90]">:</span>{' '}
    <span className="text-accent">"Benedict Naldo"</span>
    <span className="text-[#8b95a7]">,</span>
  </>,
  <>
    <span className="pl-4 text-[#8aa6ff]">role</span>
    <span className="text-[#6f7b90]">:</span>{' '}
    <span className="text-accent">"Software Developer"</span>
    <span className="text-[#8b95a7]">,</span>
  </>,
  <>
    <span className="pl-4 text-[#8aa6ff]">education</span>
    <span className="text-[#6f7b90]">:</span>{' '}
    <span className="text-accent">"MCA · 2026—Present"</span>
    <span className="text-[#8b95a7]">,</span>
  </>,
  <>
    <span className="pl-4 text-[#8aa6ff]">focus</span>
    <span className="text-[#6f7b90]">:</span> <span className="text-[#8b95a7]">[</span>
    <span className="text-accent">"Python"</span>
    <span className="text-[#8b95a7]">,</span> <span className="text-accent">"Web"</span>
    <span className="text-[#8b95a7]">,</span> <span className="text-accent">"ML"</span>
    <span className="text-[#8b95a7]">]</span>
    <span className="text-[#8b95a7]">,</span>
  </>,
  <>
    <span className="pl-4 text-[#8aa6ff]">location</span>
    <span className="text-[#6f7b90]">:</span>{' '}
    <span className="text-accent">"Coimbatore, IN"</span>
    <span className="text-[#8b95a7]">,</span>
  </>,
  <>
    <span className="pl-4 text-[#8aa6ff]">status</span>
    <span className="text-[#6f7b90]">:</span>{' '}
    <span className="text-accent">"open to opportunities"</span>
    <span className="text-[#8b95a7]">,</span>
  </>,
  <>
    <span className="text-[#8b95a7]">{'}'}</span>
    <span className="text-[#8b95a7]">;</span>
  </>,
  <>&nbsp;</>,
  <>
    <span className="text-[#c7a7ff]">function</span> <span className="text-[#8aa6ff]">next</span>
    <span className="text-[#8b95a7]">() {'{'}</span>
  </>,
  <>
    <span className="pl-4 text-[#c7a7ff]">return</span>{' '}
    <span className="text-accent">"build. learn. repeat."</span>
    <span className="text-[#8b95a7]">;</span>
  </>,
  <>
    <span className="text-[#8b95a7]">{'}'}</span>
  </>,
]

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const visualRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start start', 'end start'],
  })
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -46])
  const chipY = useTransform(scrollYProgress, [0, 1], [0, 38])

  const fadeUp = (delay: number) => ({
    initial: prefersReducedMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-14 sm:pt-36 lg:pt-36 lg:pb-16"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="grid-fade absolute inset-0 opacity-70" />
        <div className="absolute top-[6%] right-[-14%] h-[30rem] w-[30rem] rounded-full bg-sky/[0.07] blur-[110px] sm:h-[42rem] sm:w-[42rem]" />
        <div className="absolute bottom-[4%] left-[-16%] h-[26rem] w-[26rem] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute top-[18%] left-1/2 hidden h-[46rem] w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent lg:block" />
      </div>

      <div className="container-shell relative">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,1.04fr)_minmax(23rem,0.96fr)] lg:gap-10 xl:gap-16">
          <div className="min-w-0 max-w-2xl">
            <motion.div
              {...fadeUp(0.04)}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-2 pr-4 pl-3 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-55" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[0.61rem] tracking-[0.16em] text-white/80 uppercase">
                Open to opportunities
              </span>
            </motion.div>

            <AnimatedHeading
              as="h1"
              animateOnMount
              delay={0.1}
              lines={[
                'Building ideas',
                <>
                  into{' '}
                  <span className="font-serif font-normal text-accent italic">digital</span>
                </>,
                'experiences.',
              ]}
              className="mt-7 font-display text-[clamp(3.2rem,6.6vw,6.15rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-white"
            />

            <motion.p
              {...fadeUp(0.3)}
              className="mt-7 max-w-[35rem] text-[0.98rem] leading-7 text-muted sm:text-[1.06rem] sm:leading-8"
            >
              I'm Benedict Naldo, an MCA student and aspiring software developer passionate about
              Python, web development, and machine learning.
            </motion.p>

            <motion.div
              {...fadeUp(0.36)}
              className="mt-6 flex flex-wrap items-center gap-2 text-[0.78rem] font-medium text-faint"
            >
              <MapPin className="h-3.5 w-3.5 text-accent/75" strokeWidth={1.8} aria-hidden="true" />
              <span>Coimbatore, India</span>
              <span className="mx-1.5 h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
              <span>Available for opportunities</span>
            </motion.div>

            <motion.div {...fadeUp(0.42)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticLink href="#projects" className="btn btn-primary group">
                View my projects
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </MagneticLink>
              <MagneticLink href="#contact" className="btn btn-secondary group">
                Let's connect
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </MagneticLink>
            </motion.div>

            <motion.div {...fadeUp(0.5)} className="mt-9 flex items-center gap-4">
              <span className="eyebrow text-faint">Find me on</span>
              <span className="h-px w-7 bg-white/10" aria-hidden="true" />
              <SocialLinks />
            </motion.div>
          </div>

          <div ref={visualRef} className="relative mx-auto w-full min-w-0 max-w-[35rem] px-1 py-9 sm:px-3 lg:mx-0 lg:max-w-none">
            <div className="pointer-events-none absolute inset-[-2.4rem] -z-10" aria-hidden="true">
              <div className="orbital-spin absolute inset-[6%] rounded-full border border-dashed border-white/[0.055]" />
              <div className="orbital-spin-reverse absolute inset-[16%] rounded-full border border-white/[0.05]" />
              <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(216,255,101,0.075),transparent_64%)] blur-2xl" />
              <div className="absolute top-1/2 left-1/2 h-[1px] w-[82%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              <div className="absolute top-1/2 left-1/2 h-[70%] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
            </div>

            <motion.div
              style={prefersReducedMotion ? undefined : { y: visualY }}
              initial={prefersReducedMotion ? false : { opacity: 0, rotate: 1.2 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                className="absolute inset-x-5 top-6 bottom-0 -z-10 rotate-[1.6deg] rounded-[1.5rem] border border-white/[0.06] bg-white/[0.015]"
                aria-hidden="true"
              />

              <motion.div
                style={prefersReducedMotion ? undefined : { y: chipY }}
                className="absolute -top-4 right-2 z-20 hidden sm:block sm:right-5"
              >
                <div className="flex items-center gap-2 rounded-full border border-accent/20 bg-[#10150c]/95 py-2 pr-3.5 pl-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
                    <Trophy className="h-3 w-3 text-accent" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[0.56rem] tracking-[0.12em] text-accent uppercase">
                    SIH 2026 · Finalist
                  </span>
                </div>
              </motion.div>

              <div className="glass relative overflow-hidden rounded-[1.5rem]">
                <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]/80" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffd36b]/80" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#74e08b]/80" aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1">
                    <Code2 className="h-3 w-3 text-accent/80" strokeWidth={1.8} aria-hidden="true" />
                    <span className="font-mono text-[0.59rem] text-white/60">developer.ts</span>
                  </div>
                  <span className="font-mono text-[0.54rem] text-faint">UTF-8</span>
                </div>

                <div className="p-4 font-mono text-[0.65rem] leading-[1.85] sm:p-5 sm:text-[0.7rem] md:text-[0.73rem]">
                  <div className="mb-3.5 flex items-center justify-between">
                    <span className="text-[0.56rem] tracking-[0.1em] text-faint uppercase">
                      ~/portfolio
                    </span>
                    <span className="flex items-center gap-1.5 text-[0.53rem] tracking-[0.08em] text-accent/70 uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                      ready
                    </span>
                  </div>
                  <div className="space-y-0.5 overflow-x-auto pb-1 text-[#a7afbd]">
                    {codeLines.map((line, index) => (
                      <div className="terminal-line" key={index}>
                        <span className="terminal-number">{String(index + 1).padStart(2, '0')}</span>
                        <span className="whitespace-pre">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.07] bg-black/15 px-4 py-3">
                  <div className="flex items-center gap-2 font-mono text-[0.58rem] text-white/45">
                    <span className="text-accent">$</span>
                    <span>python --future</span>
                    <span
                      className="inline-block h-3 w-[5px] animate-pulse bg-accent/80"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="hidden font-mono text-[0.52rem] tracking-[0.1em] text-faint uppercase sm:block">
                    Python · Flask · ML
                  </span>
                </div>
              </div>

              <motion.div
                style={prefersReducedMotion ? undefined : { y: chipY }}
                className="absolute -bottom-4 left-0 z-20 sm:left-2"
              >
                <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0c1016]/95 px-3.5 py-2.5 shadow-[0_16px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-sky/20 bg-sky/[0.08]">
                    <MapPin className="h-3.5 w-3.5 text-sky" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-mono text-[0.5rem] tracking-[0.12em] text-faint uppercase">
                      Based in
                    </span>
                    <span className="mt-0.5 block text-[0.68rem] font-semibold text-white">
                      Coimbatore, India
                    </span>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-14 border-t border-white/[0.07] pt-5 lg:mt-16"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <span className="flex flex-none items-center gap-2.5 font-mono text-[0.58rem] tracking-[0.15em] text-faint uppercase">
              Scroll to explore
              <ArrowDown className="h-3.5 w-3.5 text-accent/70" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <Marquee
              items={[
                'Python',
                'Flask',
                'Machine Learning',
                'Web Development',
                'Problem Solving',
                'Coimbatore, India',
              ]}
              className="min-w-0 flex-1 text-white/35"
              itemClassName="font-mono text-[0.58rem] tracking-[0.18em] whitespace-nowrap uppercase"
            />
            <span className="hidden flex-none font-mono text-[0.58rem] tracking-[0.14em] text-faint uppercase lg:block">
              Aspiring software developer
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
