import Reveal from './Reveal.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'
import { asset } from '../config/site.js'

export default function Intro() {
  const { t } = useLocale()

  return (
    <section className="section" aria-labelledby="intro-title">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7" dir="left">
            <p className="eyebrow">{t.intro.eyebrow}</p>
            <h2 id="intro-title" className="statement mt-7">
              {t.intro.statement}
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120} dir="right">
            <div className="overflow-hidden rounded-[1.25rem] border border-[var(--color-astral-line)] bg-[var(--color-space)]">
              <img
                src={asset('images/studio-team.jpg')}
                alt=""
                width="1400"
                height="781"
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-12">
          {t.intro.body.map((para, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className="text-[color-mix(in_srgb,var(--color-space)_76%,transparent)] md:text-[1.05rem]">
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-[var(--color-astral-line)] bg-[var(--color-astral-line)] sm:grid-cols-3 md:mt-20">
          {t.intro.points.map((p, i) => (
            <Reveal
              key={p.k}
              as="div"
              delay={i * 90}
              className="group bg-[var(--color-white)] p-7 transition-colors duration-500 hover:bg-[color-mix(in_srgb,var(--color-dream)_7%,var(--color-white))] md:p-8"
            >
              <dt className="index-no">{p.k}</dt>
              <dd className="mt-5">
                <p className="font-display text-[1.25rem] font-semibold tracking-tight">
                  {p.v}
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--color-meteor)]">
                  {p.d}
                </p>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
