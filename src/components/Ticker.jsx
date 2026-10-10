import { useLocale } from '../i18n/LocaleContext.jsx'
import Mark from './Mark.jsx'

/**
 * Capability ticker. Purely decorative, aria-hidden, and it stops animating
 * entirely when the visitor prefers reduced motion (see index.css).
 */
export default function Ticker() {
  const { t } = useLocale()
  const items = t.ticker.items

  // Two identical passes so the loop is seamless.
  const pass = (keyPrefix) =>
    items.map((item, i) => (
      <span key={`${keyPrefix}-${i}`} className="flex items-center gap-4 whitespace-nowrap">
        <span className="font-display text-lg font-medium tracking-tight md:text-2xl">
          {item}
        </span>
        <Mark size={16} fill="currentColor" className="shrink-0 opacity-45" />
      </span>
    ))

  return (
    <div
      className="on-dark border-y border-[var(--color-space-line)] bg-[var(--color-space)] py-5 text-[var(--color-astral)] md:py-7"
      aria-label={t.ticker.label}
    >
      <div className="marquee">
        <div className="marquee__track">
          <div className="flex items-center gap-[var(--marquee-gap)]">{pass('a')}</div>
          <div className="flex items-center gap-[var(--marquee-gap)]" aria-hidden="true">
            {pass('b')}
          </div>
        </div>
      </div>
      <p className="sr-only">{items.join(' — ')}</p>
    </div>
  )
}
