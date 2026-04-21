import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { SensorPoint } from '../types/sensor'

interface HistoricalChartsProps {
  points: SensorPoint[]
}

const formatTime = (timestamp: string): string =>
  new Date(timestamp).toLocaleString([], {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

export const HistoricalCharts = ({ points }: HistoricalChartsProps) => (
  <div className="grid gap-5 lg:grid-cols-2">
    <section className="glass-card fade-in rounded-2xl p-4 sm:p-5">
      <h2 className="mb-4 text-lg font-semibold text-slate-100 sm:text-xl">ECG History</h2>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTime}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              stroke="#334155"
              minTickGap={40}
            />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} stroke="#334155" width={40} />
            <Tooltip
              labelFormatter={(value) => formatTime(String(value))}
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '0.75rem',
              }}
            />
            <Line
              type="monotone"
              dataKey="ecg"
              stroke="#22d3ee"
              strokeWidth={2}
              dot={false}
              name="ECG"
              animationDuration={400}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>

    <section className="glass-card fade-in rounded-2xl p-4 sm:p-5">
      <h2 className="mb-4 text-lg font-semibold text-slate-100 sm:text-xl">GSR and Stress Trend</h2>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTime}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              stroke="#334155"
              minTickGap={40}
            />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} stroke="#334155" width={40} />
            <Tooltip
              labelFormatter={(value) => formatTime(String(value))}
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '0.75rem',
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="gsr"
              stroke="#f97316"
              fill="#f97316"
              fillOpacity={0.2}
              name="GSR"
              animationDuration={450}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  </div>
)
