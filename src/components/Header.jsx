import { useCallback, useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'

/** Highlights the nav item for the section currently in view. */
function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined

    const visible = new Map()
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let best = ''
        let bestRatio = 0
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        }
        setActive(bestRatio > 0 ? best : '')
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.6, 1] },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [ids.join('|')])

  return active
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Header() {
  const { t, locale, setLocale, locales } = useLocale()
  const links = t.nav.links
  const ids = links.map((l) => l.id)
  const active = useActiveSection(ids)

  const [stuck, setStuck] = useState(false)
  const [tinted, setTinted] = useState(true)
  const [open, setOpen] = useState(false)

  const drawerRef = useRef(null)
  const menuBtnRef = useRef(null)

  // Header appearance: transparent + light over the hero, solid once scrolled.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setStuck(y > 24)
      const hero = document.getElementById('top')
      if (hero) {
        setTinted(y < hero.offsetHeight - 96)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const closeDrawer = useCallback(() => {
    setOpen(false)
    // Return focus to the control that opened the drawer.
    window.requestAnimationFrame(() => menuBtnRef.current?.focus())
  }, [])

  // Drawer behaviour: scroll lock, Escape to close, focus containment.
  useEffect(() => {
    if (!open) return undefined

    document.documentElement.classList.add('nav-locked')
    const drawer = drawerRef.current
    const first = drawer?.querySelector(FOCUSABLE)
    window.requestAnimationFrame(() => first?.focus())

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeDrawer()
        return
      }
      if (e.key !== 'Tab' || !drawer) return
      const nodes = [...drawer.querySelectorAll(FOCUSABLE)].filter(
        (n) => n.offsetParent !== null || n === document.activeElement,
      )
      if (nodes.length === 0) return
      const firstNode = nodes[0]
      const lastNode = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === firstNode) {
        e.preventDefault()
        lastNode.focus()
      } else if (!e.shiftKey && document.activeElement === lastNode) {
        e.preventDefault()
        firstNode.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('nav-locked')
      document.removeEventListener('keydown', onKey)
    }
  }, [open, closeDrawer])

  const goto = (id) => (e) => {
    // Let in-page anchors behave normally, but close the drawer first on mobile.
    if (open) {
      e.preventDefault()
      closeDrawer()
      const el = document.getElementById(id)
      if (el) {
        window.requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'auto', block: 'start' })
          el.setAttribute('tabindex', '-1')
          el.focus({ preventScroll: true })
        })
      }
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>

      <header
        className="site-header"
        data-stuck={stuck}
        data-tinted={tinted && !stuck}
        style={{ color: tinted && !stuck ? 'var(--color-astral)' : undefined }}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 md:h-20">
          <a
            href="#top"
            className="shrink-0 rounded"
            aria-label="Oneiria — home"
            onClick={() => open && closeDrawer()}
          >
            <Logo size={26} />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="nav-link"
                aria-current={active === l.id ? 'true' : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="lang-switch" role="group" aria-label={t.nav.language}>
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

            <a href="#contact" className="btn btn-solid hidden !px-5 !py-2.5 sm:inline-flex">
              {t.nav.cta}
            </a>

            <button
              ref={menuBtnRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-current lg:hidden"
              aria-expanded={open}
              aria-controls="site-drawer"
              aria-label={open ? t.nav.close : t.nav.menu}
              onClick={() => (open ? closeDrawer() : setOpen(true))}
            >
              <span aria-hidden="true" className="sr-only">
                {open ? t.nav.close : t.nav.menu}
              </span>
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
                {open ? (
                  <path
                    d="M4 4l10 10M14 4L4 14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    fill="none"
                  />
                ) : (
                  <path
                    d="M2.5 6h13M2.5 12h13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — rendered only below the lg breakpoint via CSS. */}
      <div
        id="site-drawer"
        ref={drawerRef}
        className="nav-drawer on-dark"
        data-open={open}
        role="dialog"
        aria-modal={open ? 'true' : undefined}
        aria-label={t.nav.menu}
        aria-hidden={!open}
        // React 19 treats `inert` as a boolean attribute; pass a real boolean so
        // the closed drawer is unreachable by keyboard and screen readers.
        inert={!open}
      >
        <div className="flex items-center justify-between">
          <Logo size={26} />
          <button
            type="button"
            onClick={closeDrawer}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-current"
            aria-label={t.nav.close}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-col justify-center gap-1 self-stretch py-5">
          {links.map((l, i) => (
            <a key={l.id} href={`#${l.id}`} className="drawer-link" onClick={goto(l.id)}>
              {l.label}
              <span>{String(i + 1).padStart(2, '0')}</span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-4">
          <a href="#contact" className="btn btn-solid w-full" onClick={goto('contact')}>
            {t.nav.cta}
          </a>
          <div className="flex items-center justify-between gap-4 text-sm opacity-80">
            <span className="font-mono text-xs uppercase tracking-[0.2em]">
              {t.nav.language}
            </span>
            <div className="lang-switch" role="group" aria-label={t.nav.language}>
              {locales.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  aria-pressed={locale === l.id}
                  onClick={() => setLocale(l.id)}
                  lang={l.id}
                  hrefLang={l.id}
                >
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
