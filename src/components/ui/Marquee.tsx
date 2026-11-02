type MarqueeProps = {
  items: string[]
  className?: string
  itemClassName?: string
}

export function Marquee({ items, className = '', itemClassName = '' }: MarqueeProps) {
  const track = (
    <div className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center">
          <span className={itemClassName}>{item}</span>
          <span
            className="mx-5 h-1 w-1 flex-none rounded-full bg-current opacity-35 sm:mx-7"
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  )

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {track}
        {track}
      </div>
    </div>
  )
}
