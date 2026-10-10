import Mark from './Mark.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'

/**
 * Primary lockup: the aperture mark doubles as the "O" of *oneiria*,
 * exactly as it appears on the supplied identity board.
 */
export default function Logo({ size = 30, tone = 'solid', tagline = false, className = '' }) {
  const { t } = useLocale()

  return (
    <span className={`inline-flex items-center gap-[0.42em] ${className}`}>
      <span className="sr-only">Oneiria</span>
      <Mark
        aria-hidden="true"
        size={size}
        fill={tone === 'gradient' ? 'gradient' : 'currentColor'}
        glow={tone === 'gradient'}
        className="shrink-0"
      />
      <span
        aria-hidden="true"
        className="font-display leading-none"
        style={{
          fontSize: `${size * 1.12}px`,
          fontWeight: 600,
          letterSpacing: '-0.045em',
        }}
      >
        neiria
      </span>
      {tagline && (
        <span
          aria-hidden="true"
          className="hidden font-mono uppercase sm:inline"
          style={{
            fontSize: `${Math.max(8, size * 0.34)}px`,
            letterSpacing: '0.3em',
            opacity: 0.72,
            marginInlineStart: '0.7em',
          }}
        >
          {t.footer.tagline}
        </span>
      )}
    </span>
  )
}
