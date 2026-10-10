import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import Mark from './Mark.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'

export default function Process() {
  const { t } = useLocale()
  const { process } = t

  return (
    <Section
      id="process"
      index="03"
      tone="dark"
      eyebrow={process.eyebrow}
      title={process.title}
      lede={process.lede}
      className="bg-[var(--color-space)] text-[var(--color-astral)]"
      headClassName="mb-12 md:mb-16"
    >
      <Mark
        aria-hidden="true"
        size={340}
        fill="gradient"
        spin
        className="pointer-events-none absolute -start-[7rem] bottom-[6rem] hidden opacity-[0.16] xl:block"
      />

      <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
        {process.steps.map((step, i) => (
          <Reveal as="li" key={step.no} delay={i * 80} className="step">
            <div className="step__no" aria-hidden="true">
              {step.no}
            </div>
            <h3 className="mt-4 font-display text-[1.15rem] font-semibold tracking-[-0.02em]">
              {step.title}
            </h3>
            <p className="mt-3 text-[0.93rem] leading-relaxed text-[color-mix(in_srgb,var(--color-astral)_70%,transparent)]">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
