import { useCallback, useEffect, useRef } from 'react'
import { useLocale } from '../i18n/LocaleContext.jsx'
import { asset } from '../config/site.js'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Accessible project dialog: focus is moved in on open, trapped while open,
 * restored to the originating card on close, Escape and backdrop both close,
 * and the page behind is scroll-locked.
 */
export default function WorkModal({ item, onClose }) {
  const { t } = useLocale()
  const panelRef = useRef(null)
  const returnFocusRef = useRef(null)

  useEffect(() => {
    returnFocusRef.current = document.activeElement
    const panel = panelRef.current
    const first = panel?.querySelector(FOCUSABLE)
    window.requestAnimationFrame(() => (first || panel)?.focus())

    document.documentElement.classList.add('nav-locked')

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const nodes = [...panel.querySelectorAll(FOCUSABLE)].filter(
        (n) => n.offsetWidth > 0 || n.offsetHeight > 0,
      )
      if (nodes.length === 0) {
        e.preventDefault()
        panel.focus()
        return
      }
      const firstNode = nodes[0]
      const lastNode = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === firstNode) {
        e.preventDefault()
        lastNode.focus()
      } else if (!e.shiftKey && document.activeElement === lastNode) {
        e.preventDefault()
        firstNode.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('nav-locked')
      const target = returnFocusRef.current
      if (target && typeof target.focus === 'function') {
        window.requestAnimationFrame(() => target.focus())
      }
    }
  }, [onClose])

  const onBackdrop = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose],
  )

  if (!item) return null

  return (
    <div className="modal-backdrop" onMouseDown={onBackdrop}>
      <div
        ref={panelRef}
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-modal-title"
        tabIndex={-1}
      >
        <div className="relative">
          <img
            src={asset(item.image)}
            alt={item.alt}
            width="660"
            height="420"
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full object-cover"
          />
          <span className="badge">{item.badge}</span>
          <button
            type="button"
            onClick={onClose}
            className="absolute end-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-space)] text-[var(--color-astral)] transition-transform duration-300 hover:scale-105"
            aria-label={t.work.modal.close}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path
                d="M3.5 3.5l9 9M12.5 3.5l-9 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <p className="eyebrow">{item.discipline}</p>
          <h3
            id="work-modal-title"
            className="mt-4 font-display text-[clamp(1.7rem,1.3rem+2vw,2.6rem)] font-semibold leading-none tracking-[-0.03em]"
            lang="en"
          >
            {item.title}
          </h3>

          <p className="lede mt-5 max-w-[56ch]">{item.summary}</p>
          <p className="mt-4 max-w-[62ch] text-[color-mix(in_srgb,var(--color-space)_74%,transparent)]">
            {item.body}
          </p>

          <div className="mt-8 grid gap-8 border-t border-[var(--color-astral-line)] pt-7 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-meteor)]">
                {t.work.modal.scope}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {item.scope.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[0.95rem]">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-dream)]"
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-meteor)]">
                {t.work.modal.note}
              </p>
              <p className="mt-4 text-[0.9rem] leading-relaxed text-[var(--color-meteor)]">
                {item.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
