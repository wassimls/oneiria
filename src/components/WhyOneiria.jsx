import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'

export default function WhyOneiria() {
  const { t } = useLocale()
  const { why } = t

  return (
    <Section
      id="why"
      index="04"
      eyebrow={why.eyebrow}
      title={why.title}
      className="bg-[var(--color-astral)]"
      headClassName="mb-12 md:mb-16"
    >
      <div className="grid gap-px overflow-hidden rounded-[1.25rem] border border-[var(--color-astral-line)] bg-[var(--color-astral-line)] sm:grid-cols-2">
        {why.points.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 80}
            className="group relative bg-[var(--color-white)] p-7 transition-colors duration-500 hover:bg-[var(--color-white)] md:p-9"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[var(--color-dream)] to-[var(--color-nebula)] transition-transform duration-500 group-hover:scale-x-100"
            />
            <div className="index-no">{String(i + 1).padStart(2, '0')}</div>
            <h3 className="mt-5 font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.025em]">
              {p.title}
            </h3>
            <p className="mt-3 max-w-[46ch] text-[0.96rem] leading-relaxed text-[var(--color-meteor)]">
              {p.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
