import { Download } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ErrorState } from '../components/ErrorState'
import { HistoricalCharts } from '../components/HistoricalCharts'
import { LoadingState } from '../components/LoadingState'
import { RangeTabs } from '../components/RangeTabs'
import { useSensorData } from '../hooks/useSensorData'
import type { TimeRange } from '../types/sensor'
import { exportPointsToCsv, formatTimestamp } from '../utils/dataProcessing'

export const HistoricalPage = () => {
  const [range, setRange] = useState<TimeRange>('24h')
  const { series, loading, error } = useSensorData(range, 8000)

  const latestLabel = useMemo(() => {
    if (!series.latest) {
      return 'No samples yet'
    }
    return formatTimestamp(series.latest.timestamp)
  }, [series.latest])

  const handleExport = () => {
    const csv = exportPointsToCsv(series.points)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `sensor-history-${range}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (loading && series.points.length === 0) {
    return <LoadingState />
  }

  return (
    <section className="space-y-5">
      <div className="glass-card fade-in flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-50">Historical Trends</h2>
          <p className="mt-1 text-sm text-slate-400">Latest sample: {latestLabel}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RangeTabs range={range} onChange={setRange} />
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/30 bg-cyan-500/20 px-3 py-2 text-sm font-medium text-cyan-100 transition-colors hover:bg-cyan-500/30"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {error ? <ErrorState message={error} /> : null}

      <HistoricalCharts points={series.points} />
    </section>
  )
}
