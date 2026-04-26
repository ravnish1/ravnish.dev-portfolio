import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useI18n } from '../i18n/I18nContext'

const PROJECTS = [
  {
    index: '01',
    titleKey: 'project.01.title',
    descKey: 'project.01.desc',
    tags: ['Next.js', 'React', 'Framer Motion', 'Tailwind CSS', 'UI/UX'],
    href: 'https://www.launchlive.studio/',
    isLive: true,
  },
  {
    index: '02',
    titleKey: 'project.02.title',
    descKey: 'project.02.desc',
    tags: [
      'DistilBERT/BERT', 'scikit-learn', 'SHAP/LIME',
      'Kafka+Spark', 'MongoDB+HDFS', 'FastAPI+Uvicorn',
      'Streamlit', 'Docker'
    ],
    href: 'https://github.com/ravnish1/equilens-ai',
  },
  {
    index: '03',
    titleKey: 'project.03.title',
    descKey: 'project.03.desc',
    tags: ['Python', 'Streamlit', 'Ollama', 'Pandas', 'Plotly'],
    href: 'https://github.com/ravnish1/local_llm-evaluator',
  },

  {
    index: '04',
    titleKey: 'project.04.title',
    descKey: 'project.04.desc',
    tags: ['Python', 'Discord.py', 'AI', 'Music'],
    href: 'https://github.com/ravnish1/HeyQT',
  },
]

const cardV = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export default function Projects() {
  const { t } = useI18n()

  return (
    <div className="page-wrapper projects-viewport">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* ── Compact header row ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="projects-header-row"
        >
          <div>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: 'var(--text-1)',
            }}>
              {t('projects.title')}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link 
              to="/more-about-me" 
              className="btn btn-primary"
              style={{ fontSize: '0.78rem', padding: '0.8rem 1.4rem' }}
            >
              {t('projects.collaborate')}
            </Link>
            <a
              href="https://github.com/ravnish1?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              style={{ fontSize: '0.78rem', padding: '0.8rem 1.4rem' }}
            >
              {t('projects.viewAll')}
            </a>
          </div>
        </motion.div>

        {/* ── 2×2 card grid ──────────────────────────────────── */}
        <motion.div
          className="projects-grid"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {PROJECTS.map((p) => (
            <motion.article
              key={p.index}
              variants={cardV}
              transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                padding: '1.25rem 1.5rem',
                background: 'var(--bg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                transition: 'background 0.2s',
                cursor: 'default',
                overflow: 'hidden',
              }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-3)',
                letterSpacing: '0.1em',
              }}>
                {p.index}
              </span>

              <h2 style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--text-1)',
                letterSpacing: '-0.01em',
              }}>
                {t(p.titleKey)}
              </h2>

              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-2)',
                lineHeight: 1.65,
                flex: 1,
              }}>
                {t(p.descKey)}
              </p>

              {/* Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border)',
                marginTop: '0.25rem',
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '0.3rem', columnGap: '0.4rem', flex: 1, paddingRight: '1rem' }}>
                  {p.tags.map((tag, i) => (
                    <span key={tag} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--text-3)',
                      letterSpacing: '0.05em',
                    }}>
                      {tag}{i < p.tags.length - 1 ? <span style={{ opacity: 0.5, margin: '0 0.1rem' }}>·</span> : ''}
                    </span>
                  ))}
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--text-3)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
                >
                  {p.isLive ? (
                    <>
                      <FaExternalLinkAlt size={10} /> {t('projects.liveSite')}
                    </>
                  ) : (
                    <>
                      <FaGithub size={11} /> {t('projects.github')}
                    </>
                  )}
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
