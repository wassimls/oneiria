import Mark from './Mark.jsx'
import Reveal from './Reveal.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'
import { asset } from '../config/site.js'

export default function Hero() {
  const { t } = useLocale()

  return (
    <section id="top" className="hero on-dark" aria-labelledby="hero-title">
      <div className="hero__media">
        <img
          src={asset('images/hero-filmset.jpg')}
          alt=""
          width="1920"
          height="1072"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <Mark
        aria-hidden="true"
        size={420}
        fill="gradient"
        glow
        spin
        className="aperture-mark pointer-events-none absolute -end-[9rem] -top-[7rem] z-[-1] hidden opacity-[0.28] lg:block"
      />

      <div className="shell relative">
        <Reveal delay={60}>
          <p className="eyebrow">{t.hero.eyebrow}</p>
        </Reveal>

        <Reveal delay={140} className="mt-6 md:mt-8">
          <h1 id="hero-title" className="hero__title max-w-[15ch]">
            {t.hero.titleLead} <br />
            <em>{t.hero.titleAccent}</em>
          </h1>
        </Reveal>

        <Reveal delay={240} className="mt-7 md:mt-9">
          <p className="max-w-[52ch] text-base leading-relaxed text-[color-mix(in_srgb,var(--color-astral)_78%,transparent)] md:text-lg">
            {t.hero.lede}
          </p>
        </Reveal>

        <Reveal delay={330} className="mt-9 flex flex-wrap items-center gap-3 md:mt-11">
          <a href="#contact" className="btn btn-solid">
            {t.hero.primary}
          </a>
          <a href="#work" className="btn btn-ghost">
            {t.hero.secondary}
          </a>
        </Reveal>

        <Reveal
          delay={430}
          className="mt-12 flex items-center justify-between gap-6 border-t border-[var(--color-space-line)] pt-6 md:mt-16"
        >
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-[color-mix(in_srgb,var(--color-astral)_62%,transparent)]">
            {t.hero.scroll}
          </span>
          <span aria-hidden="true" className="flex items-center gap-2">
            <span className="h-px w-16 bg-[color-mix(in_srgb,var(--color-astral)_38%,transparent)]" />
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" focusable="false">
              <path
                d="M5 1v11M1 8.5L5 12.5L9 8.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </Reveal>
      </div>
    </section>
  )
}
