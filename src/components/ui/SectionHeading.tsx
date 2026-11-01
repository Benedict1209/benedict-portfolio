import type { ReactNode } from 'react'
import { AnimatedHeading } from './AnimatedHeading'

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
        <span className={`eyebrow ${isLight ? 'text-ink/55' : 'text-accent'}`}>{index}</span>
        <span className={`h-px w-9 ${isLight ? 'bg-ink/20' : 'bg-white/20'}`} aria-hidden="true" />
        <span className={`eyebrow ${isLight ? 'text-ink/55' : 'text-faint'}`}>{eyebrow}</span>
      </div>
      <AnimatedHeading
        lines={lines}
        className={`mt-6 max-w-3xl font-display text-[clamp(2.25rem,4.8vw,4.3rem)] leading-[0.98] font-semibold tracking-[-0.055em] text-balance ${
          isLight ? 'text-ink' : 'text-white'
        } ${titleClassName}`}
      />
      {description ? (
        <p
          className={`mt-6 max-w-2xl text-[0.975rem] leading-7 sm:text-base sm:leading-8 ${
            isLight ? 'text-ink/65' : 'text-muted'
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
