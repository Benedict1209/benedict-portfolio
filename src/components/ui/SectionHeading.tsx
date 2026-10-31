import type { ReactNode } from 'react'

type SectionHeadingProps = {
  index: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  className?: string
  titleClassName?: string
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className = '',
  titleClassName = '',
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <span className="eyebrow text-accent">{index}</span>
        <span className="h-px w-9 bg-white/20" aria-hidden="true" />
        <span className="eyebrow text-faint">{eyebrow}</span>
      </div>
      <h2
        className={`mt-6 max-w-3xl font-display text-[clamp(2.15rem,4.6vw,4rem)] leading-[1.04] font-semibold tracking-[-0.045em] text-balance text-white ${titleClassName}`}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-[0.975rem] leading-7 text-muted sm:text-base sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  )
}
