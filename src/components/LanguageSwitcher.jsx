import { useState, useRef, useEffect } from 'react'
import { useI18n } from '../i18n/I18nContext'

/**
 * Compact language selector that sits in the Navbar.
 * Shows a small globe icon + current language code.
 * On click, opens a dropdown with search + language list.
 */
export default function LanguageSwitcher() {
  const { lang, setLang, t, currentLang, languages } = useI18n()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef(null)
  const searchRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Focus search when opened
  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus()
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const filtered = languages.filter((l) =>
    l.label.toLowerCase().includes(search.toLowerCase()) ||
    l.code.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-trigger"
        onClick={() => { setOpen((o) => !o); setSearch('') }}
        aria-label={t('lang.label')}
        aria-expanded={open}
        id="language-selector"
      >
        <svg
          className="lang-globe"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
        </svg>
        <span className="lang-code">{lang.toUpperCase()}</span>
        <svg
          className={`lang-chevron${open ? ' is-open' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>
      </button>

      {open && (
        <div className="lang-dropdown" role="listbox" aria-label={t('lang.label')}>
          {/* Search input */}
          <div className="lang-search-wrap">
            <svg
              className="lang-search-icon"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="6.5" cy="6.5" r="5" />
              <path d="M10.5 10.5L14.5 14.5" />
            </svg>
            <input
              ref={searchRef}
              className="lang-search"
              type="text"
              placeholder={t('lang.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Language list */}
          <div className="lang-list">
            {filtered.length === 0 && (
              <div className="lang-empty">—</div>
            )}
            {filtered.map((l) => (
              <button
                key={l.code}
                role="option"
                aria-selected={l.code === lang}
                className={`lang-option${l.code === lang ? ' is-active' : ''}`}
                onClick={() => { setLang(l.code); setOpen(false) }}
              >
                <span className="lang-option-flag">{l.flag}</span>
                <span className="lang-option-label">{l.label}</span>
                {l.code === lang && (
                  <svg
                    className="lang-check"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M3 8.5L6.5 12L13 4" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
