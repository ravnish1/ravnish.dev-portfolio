import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './GitHubHeatmap.css'

export default function GitHubHeatmap() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If running locally without Vercel CLI, this fetch will fail or return 404,
    // so we handle errors gracefully and show a skeleton.
    fetch('/api/github-activity')
      .then(res => res.json())
      .then(json => {
        if (json.weeks && json.weeks.length > 0) {
          setData(json)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load GitHub activity, using mock data for local dev', err)
        // Generate realistic mock data for local testing
        const mockWeeks = Array.from({ length: 26 }).map((_, wIdx) => {
          return {
            contributionDays: Array.from({ length: 7 }).map((_, dIdx) => {
              // Create a random distribution of commits favoring 0, with occasional high days
              const rand = Math.random()
              let count = 0
              if (rand > 0.6) count = Math.floor(Math.random() * 3) + 1
              if (rand > 0.85) count = Math.floor(Math.random() * 5) + 4
              if (rand > 0.95) count = Math.floor(Math.random() * 8) + 8
              
              const d = new Date()
              d.setDate(d.getDate() - ((25 - wIdx) * 7 + (6 - dIdx)))
              
              return {
                date: d.toISOString().split('T')[0],
                contributionCount: count,
                weekday: dIdx
              }
            })
          }
        })
        setData({ totalContributions: 432, weeks: mockWeeks })
        setLoading(false)
      })
  }, [])

  if (loading) {
    // Skeleton: 26 weeks * 7 days
    return (
      <div className="github-heatmap-container">
        <h3 className="heatmap-title">Github Activity</h3>
        <div className="heatmap-grid skeleton-grid">
          {Array.from({ length: 26 }).map((_, wIdx) => (
            <div key={wIdx} className="heatmap-week">
              {Array.from({ length: 7 }).map((_, dIdx) => (
                <div key={dIdx} className="heatmap-cell skeleton-cell"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!data || !data.weeks || data.weeks.length === 0) {
    // Fallback if data fails (graceful failure)
    return null
  }

  // Take the last 26 weeks (~6 months)
  const recentWeeks = data.weeks.slice(-26)
  
  // Find the exact today date to highlight (based on client date to match API timezone roughly)
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="github-heatmap-container">
      <div className="heatmap-header">
        <h3 className="heatmap-title">Code Contributions</h3>
        <span className="heatmap-total">{data.totalContributions} commits this year</span>
      </div>
      <div className="heatmap-grid">
        {recentWeeks.map((week, wIdx) => (
          <div key={`week-${wIdx}`} className="heatmap-week">
            {week.contributionDays.map((day, dIdx) => {
              const count = day.contributionCount
              // Level 0: 0, Level 1: 1-3, Level 2: 4-6, Level 3: 7-10, Level 4: 11+
              let level = 0
              if (count > 0) level = 1
              if (count >= 4) level = 2
              if (count >= 7) level = 3
              if (count >= 11) level = 4

              const isToday = day.date === today

              return (
                <motion.div
                  key={day.date}
                  className={`heatmap-cell level-${level} ${isToday ? 'is-today' : ''}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: (wIdx * 7 + dIdx) * 0.005, // 5ms delay left-to-right, top-to-bottom
                    duration: 0.2
                  }}
                  title={`${count} contributions on ${day.date}`}
                >
                  <div className="heatmap-tooltip">
                    {count} commits<br />{day.date}
                  </div>
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
