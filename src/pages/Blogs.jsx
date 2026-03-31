import { motion } from 'framer-motion'

const POSTS = [
  {
    title:    'Harnessing the Power of AI: Why Some Thrive While Others Decline',
    date:     '2024',
    readTime: '5 min read',
    tags:     ['AI', 'Technology', 'Innovation'],
    href:     'https://medium.com/@ravkr9968/harnessing-the-power-of-ai-why-some-thrive-while-others-decline-bed3c4364bf4',
    live:     true,
  },
  {
    title:    'Building Scalable SaaS Applications',
    date:     'Coming Soon',
    readTime: '—',
    tags:     ['SaaS', 'Architecture', 'Scalability'],
    href:     null,
    live:     false,
  },
]

const stagger = { animate: { transition: { staggerChildren: 0.09 } } }
const fadeUp  = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } }

export default function Blogs() {
  return (
    <div className="page-wrapper page-viewport">
      <div className="container">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="blog-layout"
        >

          {/* ── LEFT — heading ────────────────────────────────── */}
          <motion.div variants={fadeUp} transition={{ duration: 0.45 }}>
            <p className="section-label" style={{ marginBottom: '0.6rem' }}>Writing</p>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: 'var(--text-1)',
              marginBottom: '1.25rem',
            }}>
              Blog
            </h1>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--text-2)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}>
              Thoughts on technology, development, and AI.
            </p>
            <a
              href="https://medium.com/@ravkr9968"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              style={{ fontSize: '0.78rem', padding: '0.6rem 1.2rem' }}
            >
              Follow on Medium →
            </a>
          </motion.div>

          {/* ── RIGHT — post list ─────────────────────────────── */}
          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <div style={{ borderTop: '1px solid var(--border)' }}>
              {POSTS.map((post, i) => {
                const Tag = post.live ? 'a' : 'div'
                const linkProps = post.live
                  ? { href: post.href, target: '_blank', rel: 'noreferrer' }
                  : {}

                return (
                  <Tag
                    key={i}
                    className={post.live ? 'blog-row' : undefined}
                    {...linkProps}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      gap: '1.5rem',
                      alignItems: 'center',
                      padding: '1.75rem 0',
                      borderBottom: '1px solid var(--border)',
                      cursor: post.live ? 'pointer' : 'default',
                      opacity: post.live ? 1 : 0.35,
                      transition: 'padding 0.2s',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <div>
                      <p style={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: 'var(--text-1)',
                        marginBottom: '0.35rem',
                        lineHeight: 1.4,
                        transition: 'color 0.2s',
                      }}>
                        {post.title}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--text-3)',
                        letterSpacing: '0.06em',
                      }}>
                        {post.date} · {post.readTime} · {post.tags.join(' · ')}
                      </p>
                    </div>
                    <span style={{
                      fontSize: '1rem',
                      color: 'var(--text-3)',
                      transition: 'transform 0.2s, color 0.2s',
                    }}>
                      {post.live ? '→' : '—'}
                    </span>
                  </Tag>
                )
              })}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}
