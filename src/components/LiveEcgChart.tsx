import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { SensorPoint } from '../types/sensor'

interface LiveEcgChartProps {
  points: SensorPoint[]
}

const formatTime = (timestamp: string): string =>
  new Date(timestamp).toLocaleTimeString([], {
    minute: '2-digit',
    second: '2-digit',
  })

export const LiveEcgChart = ({ points }: LiveEcgChartProps) => {
  const visiblePoints = points.slice(-120)
  const ecgValues = visiblePoints.map((point) => point.ecg)
  const ecgAverage =
    ecgValues.length > 0
      ? ecgValues.reduce((sum, value) => sum + value, 0) / ecgValues.length
      : 0

  return (
    <section className="glass-card fade-in rounded-2xl p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100 sm:text-xl">Live ECG Waveform</h2>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="rounded-full border border-slate-700/80 bg-slate-900/70 px-2 py-1">Auto refresh: 5s</span>
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-1">Avg: {ecgAverage.toFixed(1)}</span>
        </div>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={visiblePoints}>
            <CartesianGrid strokeDasharray="4 4" stroke="rgba(100, 116, 139, 0.22)" vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTime}
              tick={{ fill: '#cbd5e1', fontSize: 11 }}
              stroke="rgba(100, 116, 139, 0.4)"
              minTickGap={24}
            />
            <YAxis
              tick={{ fill: '#cbd5e1', fontSize: 11 }}
              stroke="rgba(100, 116, 139, 0.4)"
              width={40}
            />
            <Tooltip
              labelFormatter={(value) => formatTime(String(value))}
              formatter={(value) => [Number(value).toFixed(1), 'ECG']}
              contentStyle={{
                backgroundColor: '#020617',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 35px rgba(2, 6, 23, 0.35)',
              }}
              labelStyle={{ color: '#bae6fd' }}
              itemStyle={{ color: '#67e8f9' }}
            />
            <ReferenceLine y={ecgAverage} stroke="rgba(45, 212, 191, 0.45)" strokeDasharray="6 6" />
            <Line
              type="monotone"
              dataKey="ecg"
              stroke="#22d3ee"
              strokeWidth={2.5}
              dot={false}
              animationDuration={300}
              activeDot={{ r: 3, fill: '#22d3ee', stroke: '#0f172a', strokeWidth: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
