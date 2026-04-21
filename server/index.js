const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 3001)

const channelId = process.env.THINGSPEAK_CHANNEL_ID
const readApiKey = process.env.THINGSPEAK_READ_API_KEY

app.use(cors())

app.get('/api/thingspeak', async (req, res) => {
  try {
    if (!channelId) {
      return res.status(500).json({ error: 'Missing THINGSPEAK_CHANNEL_ID' })
    }

    const results = String(req.query.results || '240')
    const params = new URLSearchParams({ results })

    if (readApiKey) {
      params.set('api_key', readApiKey)
    }

    const endpoint = `https://api.thingspeak.com/channels/${channelId}/feeds.json?${params.toString()}`
    const response = await fetch(endpoint)

    if (!response.ok) {
      return res.status(response.status).json({ error: 'ThingSpeak fetch failed' })
    }

    const payload = await response.json()
    return res.json(payload)
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unexpected proxy error',
    })
  }
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() })
})

app.listen(port, () => {
  console.log(`ThingSpeak proxy running on http://localhost:${port}`)
})
