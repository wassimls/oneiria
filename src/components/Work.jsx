import { useCallback, useEffect, useMemo, useState } from 'react'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import WorkModal from './WorkModal.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'
import { asset } from '../config/site.js'

/** Reads `#work-<id>` from the URL so a project can be deep-linked. */
function projectFromHash(items) {
  const id = /^#work-(.+)$/.exec(window.location.hash)?.[1]
  return id && items.some((i) => i.id === id) ? id : null
}

export default function Work() {
  const { t } = useLocale()
  const { work } = t

  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(() => projectFromHash(work.items))

  const visible = useMemo(
    () => (filter === 'all' ? work.items : work.items.filter((i) => i.category === filter)),
    [filter, work.items],
  )

  const active = useMemo(
    () => work.items.find((i) => i.id === openId) || null,
    [openId, work.items],
  )

  const close = useCallback(() => setOpenId(null), [])

  // Update the URL hash without jumping, so a project can be linked to directly.
  useEffect(() => {
    const id = openId ? `work-${openId}` : null
    const url = new URL(window.location.href)
    if (id) url.hash = id
    else url.hash = ''
    window.history.replaceState(null, '', url.toString().replace(/#$/, ''))
  }, [openId])

  // Arriving on (or navigating back to) a project hash opens the matching card.
  useEffect(() => {
    const sync = () => setOpenId(projectFromHash(work.items))
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [work.items])

  return (
    <Section
      id="work"
      index="02"
      eyebrow={work.eyebrow}
      title={work.title}
      lede={work.lede}
      className="bg-[var(--color-white)]"
      headClassName="mb-9 md:mb-12"
    >
      <div className="filter-bar mb-8 md:mb-12" role="group" aria-label={work.eyebrow}>
        {work.filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className="filter-btn"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} projects shown
      </p>

      {visible.length === 0 ? (
        <p className="rounded-[1.25rem] border border-dashed border-[var(--color-astral-line)] p-10 text-center text-[var(--color-meteor)]">
          {work.empty}
        </p>
      ) : (
        <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 90}>
              <div className="card p-3 pb-6">
                <button
                  type="button"
                  className="work-card"
                  onClick={() => setOpenId(item.id)}
                  aria-haspopup="dialog"
                >
                  <span className="work-card__frame block">
                    <img
                      src={asset(item.image)}
                      alt={item.alt}
                      width="660"
                      height="420"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="badge">{item.badge}</span>
                    <span className="work-card__open" aria-hidden="true">
                      {work.open}
                    </span>
                  </span>

                  <span className="mt-5 block px-2">
                    <span className="block font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-meteor)]">
                      {item.discipline}
                    </span>
                    <span className="mt-2 block font-display text-[1.3rem] font-semibold leading-tight tracking-[-0.02em]">
                      {item.title}
                    </span>
                    <span className="mt-2 block max-w-[42ch] text-[0.94rem] leading-relaxed text-[var(--color-meteor)]">
                      {item.summary}
                    </span>
                  </span>

                  <span className="sr-only">— {work.open}</span>
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {active && <WorkModal item={active} onClose={close} />}
    </Section>
  )
}
