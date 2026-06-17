export default async function handler(req, res) {
  // Setup CORS just in case
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN
    const USERNAME = 'ravnish1'

    if (!GITHUB_TOKEN) {
      console.warn('GITHUB_TOKEN is missing')
    }

    // 1. Fetch Contribution Calendar (GraphQL)
    let contributionData = null
    if (GITHUB_TOKEN) {
      const graphqlQuery = `
        query {
          user(login: "${USERNAME}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    weekday
                  }
                }
              }
            }
          }
        }
      `

      const graphqlRes = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ query: graphqlQuery }),
      })

      if (graphqlRes.ok) {
        const json = await graphqlRes.json()
        contributionData = json.data?.user?.contributionsCollection?.contributionCalendar
      }
    }

    // 2. Fetch Last Shipped (REST Events)
    let lastShipped = null
    const eventsRes = await fetch(`https://api.github.com/users/${USERNAME}/events/public`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` })
      }
    })

    if (eventsRes.ok) {
      const events = await eventsRes.json()
      // Find the most recent PushEvent
      const pushEvent = events.find(e => e.type === 'PushEvent')
      if (pushEvent) {
        lastShipped = {
          repo: pushEvent.repo.name.replace(`${USERNAME}/`, ''),
          timestampISO: pushEvent.created_at
        }
      }
    }

    // 3. Combine Response
    const responseData = {
      totalContributions: contributionData?.totalContributions || 0,
      weeks: contributionData?.weeks || [],
      lastShipped: lastShipped
    }

    // Cache the response on the Vercel Edge/CDN for 1 hour
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    res.status(200).json(responseData)

  } catch (error) {
    console.error('GitHub API Error:', error)
    res.status(500).json({ error: 'Failed to fetch GitHub data' })
  }
}
