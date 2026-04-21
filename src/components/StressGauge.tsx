import type { StressLevel } from '../types/sensor'
import { getStressThresholds } from '../utils/dataProcessing'

interface StressGaugeProps {
  level: StressLevel
  gsr: number
}

const stressStyles: Record<StressLevel, { tone: string; width: string }> = {
  Low: {
    tone: 'text-emerald-300 border-emerald-400/40 bg-emerald-500/15',
    width: 'w-1/3',
  },
  Medium: {
    tone: 'text-amber-200 border-amber-400/40 bg-amber-500/15',
    width: 'w-2/3',
  },
  High: {
    tone: 'text-rose-200 border-rose-400/40 bg-rose-500/15',
    width: 'w-full',
  },
}

export const StressGauge = ({ level, gsr }: StressGaugeProps) => {
  const style = stressStyles[level]
  const { low, medium } = getStressThresholds()
  const maxScale = Math.max(medium * 1.25, gsr + 80, 900)
  const fillRatio = Math.min(100, (gsr / maxScale) * 100)
  const lowMarker = (low / maxScale) * 100
  const mediumMarker = (medium / maxScale) * 100

  return (
    <section className="glass-card fade-in rounded-2xl p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100 sm:text-xl">Stress Level</h2>
        <span className={["rounded-full border px-3 py-1 text-xs font-semibold", style.tone].join(' ')}>
          {level}
        </span>
      </div>
      <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className={[
            'h-full rounded-full bg-gradient-to-r transition-all duration-500',
            level === 'Low'
              ? 'from-emerald-500 to-teal-400'
              : level === 'Medium'
                ? 'from-amber-500 to-yellow-400'
                : 'from-rose-500 to-orange-400',
          ].join(' ')}
          style={{ width: `${fillRatio}%` }}
        />
        <span className="absolute inset-y-0 w-px bg-slate-200/60" style={{ left: `${lowMarker}%` }} />
        <span className="absolute inset-y-0 w-px bg-slate-200/70" style={{ left: `${mediumMarker}%` }} />
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
        <span>Low &lt; {low}</span>
        <span>Medium &lt; {medium}</span>
        <span>High ≥ {medium}</span>
      </div>
      <p className="mt-3 text-sm text-slate-400">Current GSR value: {gsr.toFixed(0)}</p>
      <p className="mt-2 rounded-xl border border-slate-700/70 bg-slate-900/55 px-3 py-2 text-xs leading-relaxed text-slate-300">
        {level === 'High'
          ? 'Elevated sympathetic response detected. Check for sustained trend and potential stress triggers.'
          : level === 'Medium'
            ? 'Moderate stress response. Continue observing whether this state persists over several windows.'
            : 'Low stress response. Current GSR is within the calmer baseline zone.'}
      </p>
    </section>
  )
}
