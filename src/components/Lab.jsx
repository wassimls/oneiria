import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'

export default function Lab() {
  const { t } = useLocale()
  const { lab } = t

  return (
    <Section
      id="lab"
      index="07"
      eyebrow={lab.eyebrow}
      title={lab.title}
      lede={lab.lede}
      className="bg-[var(--color-astral)]"
      headClassName="mb-10 md:mb-14"
    >
      {/* Status pill — Lab is explicitly a future initiative, never a service. */}
      <Reveal className="mb-9 flex flex-wrap items-center gap-4 md:mb-12">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-dashed border-[var(--color-nebula)] bg-[color-mix(in_srgb,var(--color-nebula)_9%,var(--color-white))] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-nebula)]">
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
          {lab.status}
        </span>
        <span
          aria-hidden="true"
          className="hidden h-px flex-1 border-t border-dashed border-[var(--color-astral-line)] sm:block"
        />
      </Reveal>

      <div className="grid gap-9 rounded-[1.35rem] border border-[var(--color-astral-line)] bg-[var(--color-white)] p-7 md:grid-cols-12 md:gap-12 md:p-10">
        <Reveal className="md:col-span-5">
          <p className="max-w-[48ch] text-[color-mix(in_srgb,var(--color-space)_74%,transparent)] md:text-[1.05rem]">
            {lab.body}
          </p>
          <p className="mt-6 border-s-2 border-[var(--color-dream)] ps-4 text-[0.93rem] font-medium text-[var(--color-space)]">
            {lab.note}
          </p>
        </Reveal>

        <div className="md:col-span-7">
          <div className="grid gap-7 sm:grid-cols-3">
            {lab.points.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="h-full">
                  <span
                    aria-hidden="true"
                    className="block h-[3px] w-10 rounded-full bg-[var(--color-nebula)]"
                  />
                  <h3 className="mt-4 font-display text-[1.05rem] font-semibold leading-snug tracking-[-0.015em]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--color-meteor)]">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
