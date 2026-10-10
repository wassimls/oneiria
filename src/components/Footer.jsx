import Logo from './Logo.jsx'
import Mark from './Mark.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'
import { LEGAL_LINKS, SOCIAL_LINKS } from '../config/site.js'

export default function Footer() {
  const { t, locale, setLocale, locales } = useLocale()
  const year = new Date().getFullYear()

  // Social and legal links are config placeholders. Until they are filled in the
  // extra column must not render as an empty hole in the grid.
  const hasExtra = SOCIAL_LINKS.length > 0 || LEGAL_LINKS.length > 0
  const brandSpan = hasExtra ? 'md:col-span-5' : 'md:col-span-7'
  const navSpan = hasExtra ? 'md:col-span-3' : 'md:col-span-5'

  return (
    <footer className="site-footer on-dark">
      <Mark
        aria-hidden="true"
        size={300}
        fill="gradient"
        spin
        className="pointer-events-none absolute -end-[6rem] -bottom-[8rem] hidden opacity-[0.14] lg:block"
      />

      <div className="shell relative">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className={brandSpan}>
            <Logo size={30} tagline />
            <p className="mt-6 max-w-[36ch] text-[0.96rem] leading-relaxed text-[color-mix(in_srgb,var(--color-astral)_68%,transparent)]">
              {t.footer.blurb}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-astral)_55%,transparent)]">
                {t.footer.languageLabel}
              </span>
              <div className="lang-switch" role="group" aria-label={t.footer.languageLabel}>
                {locales.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    aria-pressed={locale === l.id}
                    onClick={() => setLocale(l.id)}
                    lang={l.id}
                    hrefLang={l.id}
                    title={l.name}
                  >
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <nav className={navSpan} aria-label={t.footer.navLabel}>
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-astral)_55%,transparent)]">
              {t.footer.navLabel}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {t.nav.links.map((l) => (
                <li key={l.id}>
                  <a className="footer-link" href={`#${l.id}`}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {hasExtra && (
            <div className="md:col-span-4">
            {SOCIAL_LINKS.length > 0 && (
              <>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-astral)_55%,transparent)]">
                  {t.footer.contactLabel}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                  {SOCIAL_LINKS.map((s) => (
                    <li key={s.href}>
                      <a
                        className="footer-link"
                        href={s.href}
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                      >
                        {s.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {LEGAL_LINKS.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {LEGAL_LINKS.map((l) => (
                  <li key={l.href}>
                    <a className="footer-link" href={l.href}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            </div>
          )}
        </div>

        <hr className="footer-rule" />

        <p className="max-w-[78ch] text-[0.85rem] leading-relaxed text-[color-mix(in_srgb,var(--color-astral)_66%,transparent)]">
          {t.footer.disclosure}
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.85rem] text-[color-mix(in_srgb,var(--color-astral)_58%,transparent)]">
            © {year} Oneiria. {t.footer.rights}
          </p>
          <a className="link-arrow !border-[color-mix(in_srgb,var(--color-astral)_40%,transparent)] text-[0.85rem]" href="#top">
            {t.footer.toTop}
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
