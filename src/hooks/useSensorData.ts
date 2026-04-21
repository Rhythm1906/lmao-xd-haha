import { useCallback, useEffect, useState } from 'react'
import { fetchSensorSeries } from '../services/thingspeak'
import type { SensorSeries, TimeRange } from '../types/sensor'
import { isDeviceOnline } from '../utils/dataProcessing'

export const useSensorData = (range: TimeRange, refreshMs = 5000) => {
  const [series, setSeries] = useState<SensorSeries>({
    points: [],
    latest: undefined,
    updatedAt: new Date().toISOString(),
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    try {
      const next = await fetchSensorSeries(range)
      setSeries(next)
      setError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown fetch error'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [range])

  useEffect(() => {
    setLoading(true)
    void loadData()

    const intervalId = window.setInterval(() => {
      void loadData()
    }, refreshMs)

    return () => window.clearInterval(intervalId)
  }, [loadData, refreshMs])

  return {
    series,
    loading,
    error,
    isOnline: isDeviceOnline(series.latest?.timestamp),
  }
}
