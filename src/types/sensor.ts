export type TimeRange = '1h' | '24h' | '7d'

export type StressLevel = 'Low' | 'Medium' | 'High'

export interface ThingSpeakFeed {
  created_at: string
  entry_id: number
  [key: string]: string | number | null
}

export interface SensorPoint {
  timestamp: string
  ecg: number
  gsr: number
  heartRate?: number
  stressLevel: StressLevel
}

export interface SensorSeries {
  points: SensorPoint[]
  latest?: SensorPoint
  updatedAt: string
}
