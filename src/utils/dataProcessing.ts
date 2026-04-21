import type { SensorPoint, StressLevel, ThingSpeakFeed } from '../types/sensor'

const ECG_FIELD = Number(import.meta.env.VITE_THINGSPEAK_FIELD_ECG ?? 1)
const GSR_FIELD = Number(import.meta.env.VITE_THINGSPEAK_FIELD_GSR ?? 2)
const HEART_RATE_FIELD = Number(import.meta.env.VITE_THINGSPEAK_FIELD_HEART_RATE ?? 3)

const GSR_LOW_THRESHOLD = Number(import.meta.env.VITE_GSR_LOW_THRESHOLD ?? 300)
const GSR_MEDIUM_THRESHOLD = Number(import.meta.env.VITE_GSR_MEDIUM_THRESHOLD ?? 700)

export type ReadingStatus = 'Normal' | 'Below Standard' | 'Above Standard' | 'Unavailable'

const parseNumericField = (feed: ThingSpeakFeed, fieldNumber: number): number => {
  const raw = feed[`field${fieldNumber}`]
  if (typeof raw === 'number') {
    return raw
  }

  if (typeof raw === 'string') {
    const parsed = Number(raw)
    return Number.isFinite(parsed) ? parsed : 0
  }

  return 0
}

export const deriveStressLevel = (gsr: number): StressLevel => {
  if (gsr < GSR_LOW_THRESHOLD) {
    return 'Low'
  }
  if (gsr < GSR_MEDIUM_THRESHOLD) {
    return 'Medium'
  }
  return 'High'
}

export const getStressThresholds = () => ({
  low: GSR_LOW_THRESHOLD,
  medium: GSR_MEDIUM_THRESHOLD,
})

export const getHeartRateStatus = (heartRate?: number): ReadingStatus => {
  if (typeof heartRate !== 'number') {
    return 'Unavailable'
  }

  if (heartRate < 60) {
    return 'Below Standard'
  }

  if (heartRate > 100) {
    return 'Above Standard'
  }

  return 'Normal'
}

export const getHeartRatePhrase = (heartRate?: number): string => {
  if (typeof heartRate !== 'number') {
    return '---';
  }
  if (heartRate < 60) {
    return 'Resting';
  }
  if (heartRate > 100) {
    return 'Elevated';
  }
  return 'Normal';
};

export const getEcgSignalStatus = (ecg: number): ReadingStatus => {
  if (!Number.isFinite(ecg)) {
    return 'Unavailable'
  }

  if (ecg < 0) {
    return 'Below Standard'
  }

  if (ecg > 1023) {
    return 'Above Standard'
  }

  return 'Normal'
}

export const getStressStatus = (stressLevel: StressLevel): ReadingStatus => {
  if (stressLevel === 'High') {
    return 'Above Standard'
  }

  return 'Normal'
}

export const normalizeFeeds = (feeds: ThingSpeakFeed[]): SensorPoint[] =>
  feeds.map((feed) => {
    const ecg = parseNumericField(feed, ECG_FIELD)
    const gsr = parseNumericField(feed, GSR_FIELD)
    const heartRateValue = parseNumericField(feed, HEART_RATE_FIELD)

    const point: SensorPoint = {
      timestamp: feed.created_at,
      ecg,
      gsr,
      stressLevel: deriveStressLevel(gsr),
    }

    if (heartRateValue > 0) {
      point.heartRate = heartRateValue
    }

    return point
  })

export const formatTimestamp = (iso: string): string =>
  new Date(iso).toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: 'short',
  })

export const isDeviceOnline = (iso: string | undefined, timeoutMs = 120000): boolean => {
  if (!iso) {
    return false
  }
  const age = Date.now() - new Date(iso).getTime()
  return Number.isFinite(age) && age <= timeoutMs
}

export const exportPointsToCsv = (points: SensorPoint[]): string => {
  const headers = ['timestamp', 'ecg', 'gsr', 'stressLevel', 'heartRate']
  const rows = points.map((point) => [
    point.timestamp,
    point.ecg.toString(),
    point.gsr.toString(),
    point.stressLevel,
    point.heartRate?.toString() ?? '',
  ])

  return [headers, ...rows]
    .map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(','))
    .join('\n')
}
