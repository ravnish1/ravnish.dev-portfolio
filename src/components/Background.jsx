import '../styles/background.css'

/**
 * Background — thin wrapper for the grain overlay only.
 * All complex canvas/blob systems removed in the minimal redesign.
 */
export default function Background() {
  return <div className="grain-overlay" aria-hidden="true" />
}
