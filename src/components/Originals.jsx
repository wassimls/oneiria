import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'
import { asset } from '../config/site.js'

export default function Originals() {
  const { t } = useLocale()
  const { originals } = t

  return (
    <Section
      id="originals"
      index="05"
      eyebrow={originals.eyebrow}
      title={originals.title}
      lede={originals.lede}
      className="bg-[var(--color-white)]"
      headClassName="mb-10 md:mb-14"
    >
      <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-[1.25rem] border border-[var(--color-astral-line)]">
            <img
              src={asset('images/work-broadcast.jpg')}
              alt=""
              width="660"
              height="401"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="max-w-[56ch] text-[color-mix(in_srgb,var(--color-space)_74%,transparent)] md:text-[1.05rem]">
            {originals.body}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {originals.points.map((p, i) => (
              <Reveal key={p.title} delay={i * 90} as="div">
                <div className="border-t-2 border-[var(--color-space)] pt-4">
                  <h3 className="font-display text-[1.05rem] font-semibold leading-snug tracking-[-0.015em]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--color-meteor)]">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <a href="#contact" className="link-arrow mt-9 inline-flex">
            {originals.cta}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
