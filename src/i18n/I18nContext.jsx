import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import translations, { LANGUAGES } from './translations'

const I18nContext = createContext(null)

const STORAGE_KEY = 'rk-lang'

/**
 * Provides language state & a `t(key)` translation helper.
 * Persists the user's choice to localStorage.
 */
export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored && translations[stored]) return stored
    } catch { /* SSR / incognito */ }
    return 'en'
  })

  // Persist whenever lang changes
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* noop */ }
  }, [lang])

  const setLang = useCallback((code) => {
    if (translations[code]) setLangState(code)
  }, [])

  /** Translate key → current language. Falls back to English. */
  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations.en?.[key] ?? key,
    [lang],
  )

  /** Current language metadata. */
  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  return (
    <I18nContext.Provider value={{ lang, setLang, t, currentLang, languages: LANGUAGES }}>
      {children}
    </I18nContext.Provider>
  )
}

/** Hook to consume i18n context from any component. */
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>')
  return ctx
}
