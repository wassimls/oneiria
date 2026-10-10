import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from './en.js'
import ar from './ar.js'

const DICT = { en, ar }
const STORAGE_KEY = 'oneiria:locale'
const RTL = new Set(['ar'])

const LocaleContext = createContext(null)

function readInitialLocale() {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && DICT[saved]) return saved
  } catch {
    /* storage can be blocked — fall through to language negotiation */
  }
  const nav = (navigator.language || 'en').slice(0, 2)
  return DICT[nav] ? nav : 'en'
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(readInitialLocale)

  // Keep <html lang/dir> in sync so screen readers, hyphenation, bidi text and
  // the CSS direction-aware rules all follow the active language.
  useEffect(() => {
    const html = document.documentElement
    html.lang = locale
    html.dir = RTL.has(locale) ? 'rtl' : 'ltr'
    try {
      window.localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      /* preference simply won't persist */
    }
  }, [locale])

  const setLocale = useCallback((next) => {
    if (DICT[next]) setLocaleState(next)
  }, [])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      locales: [
        { id: 'en', label: 'EN', name: 'English' },
        { id: 'ar', label: 'AR', name: 'العربية' },
      ],
      dir: RTL.has(locale) ? 'rtl' : 'ltr',
      t: DICT[locale],
      /** Translate a stable key used in aria-labels / headings. */
      tr: (path) => path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), DICT[locale]),
    }),
    [locale, setLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>')
  return ctx
}
