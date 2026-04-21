import type { SensorSeries, ThingSpeakFeed, TimeRange } from '../types/sensor'
import { normalizeFeeds } from '../utils/dataProcessing'

interface ThingSpeakResponse {
  feeds: ThingSpeakFeed[]
}

const rangeToResults: Record<TimeRange, number> = {
  '1h': 240,
  '24h': 500,
  '7d': 1000,
}

const useProxy = String(import.meta.env.VITE_THINGSPEAK_USE_PROXY ?? 'false') === 'true'
const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001')
const channelId = String(import.meta.env.VITE_THINGSPEAK_CHANNEL_ID ?? '')
const readApiKey = String(import.meta.env.VITE_THINGSPEAK_READ_API_KEY ?? '')

const buildDirectUrl = (range: TimeRange): string => {
  if (!channelId) {
    throw new Error('VITE_THINGSPEAK_CHANNEL_ID is missing')
  }

  const params = new URLSearchParams({
    results: rangeToResults[range].toString(),
  })

  if (readApiKey) {
    params.set('api_key', readApiKey)
  }

  return `https://api.thingspeak.com/channels/${channelId}/feeds.json?${params.toString()}`
}

const buildProxyUrl = (range: TimeRange): string => {
  const params = new URLSearchParams({
    results: rangeToResults[range].toString(),
  })
  return `${apiBaseUrl}/api/thingspeak?${params.toString()}`
}

export const fetchSensorSeries = async (range: TimeRange): Promise<SensorSeries> => {
  const url = useProxy ? buildProxyUrl(range) : buildDirectUrl(range)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`ThingSpeak request failed: ${response.status}`)
  }

  const data = (await response.json()) as ThingSpeakResponse
  const points = normalizeFeeds(data.feeds ?? [])

  return {
    points,
    latest: points.at(-1),
    updatedAt: new Date().toISOString(),
  }
}
