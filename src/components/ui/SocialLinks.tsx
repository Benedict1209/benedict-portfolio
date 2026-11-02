import type { ComponentType, SVGProps } from 'react'
import { site } from '../../lib/site'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'

type SocialLinksProps = {
  showLabels?: boolean
  className?: string
  tone?: 'dark' | 'light'
}

const links: {
  label: string
  href: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}[] = [
  { label: 'GitHub', href: site.github, Icon: GitHubIcon },
  { label: 'LinkedIn', href: site.linkedin, Icon: LinkedInIcon },
]

export function SocialLinks({ showLabels = false, className = '', tone = 'dark' }: SocialLinksProps) {
  const isLight = tone === 'light'

  const iconButtonClass = isLight
    ? 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-ink/[0.035] text-ink/60 transition hover:-translate-y-0.5 hover:border-ink/35 hover:bg-ink/[0.07] hover:text-ink'
    : 'icon-button'

  const labelClass = isLight
    ? 'group inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-ink/[0.035] px-4 py-2.5 text-xs font-semibold text-ink/60 transition hover:border-ink/35 hover:bg-ink/[0.07] hover:text-ink'
    : 'group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5 text-xs font-semibold text-muted transition hover:border-accent/30 hover:bg-accent/[0.06] hover:text-accent'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={showLabels ? labelClass : iconButtonClass}
          aria-label={`${label} — opens in a new tab`}
        >
          <Icon className="h-4 w-4" />
          {showLabels ? <span>{label}</span> : null}
          {showLabels ? (
            <span
              className={`text-[10px] transition ${isLight ? 'text-ink/40 group-hover:text-ink/70' : 'text-faint group-hover:text-accent/70'}`}
              aria-hidden="true"
            >
              ↗
            </span>
          ) : null}
        </a>
      ))}
    </div>
  )
}
