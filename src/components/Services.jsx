import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'

export default function Services() {
  const { t } = useLocale()
  const { services } = t

  return (
    <Section
      id="services"
      index="01"
      eyebrow={services.eyebrow}
      title={services.title}
      lede={services.lede}
      className="bg-[var(--color-astral)]"
      headClassName="mb-12 md:mb-16"
    >
      <div>
        {services.items.map((svc, i) => (
          <Reveal key={svc.no} delay={i * 60} className="svc">
            <span className="index-no">{svc.no}</span>

            <div>
              <h3 className="svc__title">{svc.title}</h3>
            </div>

            <div>
              <p className="max-w-[52ch] text-[color-mix(in_srgb,var(--color-space)_72%,transparent)]">
                {svc.blurb}
              </p>
              <ul className="svc__list mt-5">
                {svc.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
