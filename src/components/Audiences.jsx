import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'

export default function Audiences() {
  const { t } = useLocale()
  const { audiences } = t

  return (
    <Section
      id="audiences"
      index="08"
      eyebrow={audiences.eyebrow}
      title={audiences.title}
      className="bg-[var(--color-white)]"
      headClassName="mb-12 md:mb-16"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {audiences.items.map((a, i) => (
          <Reveal
            key={a.title}
            delay={i * 80}
            className="card card-flat flex flex-col justify-between gap-8 p-7 md:p-8"
          >
            <div>
              <span className="index-no">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-5 font-display text-[1.2rem] font-semibold leading-tight tracking-[-0.025em]">
                {a.title}
              </h3>
            </div>
            <p className="text-[0.94rem] leading-relaxed text-[var(--color-meteor)]">{a.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
