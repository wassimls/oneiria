import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import Mark from './Mark.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'

export default function TechAi() {
  const { t } = useLocale()
  const { tech } = t

  return (
    <Section
      id="tech"
      index="06"
      tone="dark"
      eyebrow={tech.eyebrow}
      title={tech.title}
      lede={tech.lede}
      className="bg-[var(--color-ink)] text-[var(--color-astral)]"
      headClassName="mb-12 md:mb-16"
    >
      <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
        {tech.principles.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <div className="border-t border-[var(--color-space-line)] pt-5">
              <div className="flex items-center gap-3">
                <Mark size={16} fill="gradient" />
                <span className="index-no">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-4 font-display text-[1.1rem] font-semibold tracking-[-0.02em]">
                {p.title}
              </h3>
              <p className="mt-3 text-[0.93rem] leading-relaxed text-[color-mix(in_srgb,var(--color-astral)_68%,transparent)]">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} className="mt-12 md:mt-16">
        <p className="flex items-start gap-4 rounded-[1rem] border border-[var(--color-space-line)] bg-[color-mix(in_srgb,var(--color-astral)_5%,transparent)] p-6 text-[1.05rem] leading-relaxed md:p-7">
          <span
            aria-hidden="true"
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-dream-soft)]"
          />
          {tech.note}
        </p>
      </Reveal>
    </Section>
  )
}
