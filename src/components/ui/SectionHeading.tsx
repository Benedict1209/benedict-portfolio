import type { ReactNode } from 'react'
import { AnimatedHeading } from './AnimatedHeading'
import { SplitReveal } from './SplitReveal'

type SectionHeadingProps = {
  index: string
  eyebrow: string
  title: ReactNode | ReactNode[]
  description?: ReactNode
  className?: string
  titleClassName?: string
  tone?: 'dark' | 'light'
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className = '',
  titleClassName = '',
  tone = 'dark',
}: SectionHeadingProps) {
  const lines = Array.isArray(title) ? title : [title]
  const isLight = tone === 'light'

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <span className={`font-mono text-[0.62rem] font-semibold tracking-[0.2em] ${isLight ? 'text-ink/55' : 'text-accent'}`}>
          {index}
        </span>
        <span className={`h-px w-10 ${isLight ? 'bg-ink/20' : 'bg-white/20'}`} aria-hidden="true" />
        <span className={`eyebrow ${isLight ? 'text-ink/55' : 'text-white/55'}`}>{eyebrow}</span>
      </div>
      <AnimatedHeading
        lines={lines}
        className={`mt-5 max-w-4xl font-display text-[clamp(2.5rem,5.6vw,5.5rem)] leading-[0.86] font-medium tracking-[-0.05em] text-balance uppercase ${
          isLight ? 'text-ink' : 'text-white'
        } ${titleClassName}`}
      />
      {description ? (
        typeof description === 'string' ? (
          <SplitReveal
            text={description}
            className={`mt-6 max-w-2xl text-[0.94rem] leading-7 sm:text-[0.98rem] sm:leading-8 ${
              isLight ? 'text-ink/65' : 'text-white/55'
            }`}
          />
        ) : (
          <p
            className={`mt-6 max-w-2xl text-[0.94rem] leading-7 sm:text-[0.98rem] sm:leading-8 ${
              isLight ? 'text-ink/65' : 'text-white/55'
            }`}
          >
            {description}
          </p>
        )
      ) : null}
    </div>
  )
}
