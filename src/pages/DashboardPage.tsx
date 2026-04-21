import { AlertCircle, Brain, Heart, HeartPulse } from 'lucide-react'
import { getStressThresholds } from '../utils/dataProcessing'

const heartRateFacts = [
  {
    zone: 'Below Standard',
    range: '< 60 BPM (resting adult)',
    tone: 'border-amber-400/35 bg-amber-500/10 text-amber-100',
  },
  {
    zone: 'Normal Range',
    range: '60 to 100 BPM (resting adult)',
    tone: 'border-emerald-400/35 bg-emerald-500/10 text-emerald-100',
  },
  {
    zone: 'Above Standard',
    range: '> 100 BPM (resting adult)',
    tone: 'border-rose-400/35 bg-rose-500/10 text-rose-100',
  },
]

export const DashboardPage = () => {
  const { low, medium } = getStressThresholds()
  const stressFacts = [
    {
      zone: 'Low Stress',
      range: `< ${low} GSR`,
      tone: 'border-emerald-400/35 bg-emerald-500/10 text-emerald-100',
    },
    {
      zone: 'Normal / Moderate Stress',
      range: `${low} to < ${medium} GSR`,
      tone: 'border-amber-400/35 bg-amber-500/10 text-amber-100',
    },
    {
      zone: 'High Stress',
      range: `>= ${medium} GSR`,
      tone: 'border-rose-400/35 bg-rose-500/10 text-rose-100',
    },
  ]

  return (
    <section className="space-y-6">
      <div className="fade-in">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200/85">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-50 sm:text-4xl">Health Reference Ranges</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-card fade-in rounded-2xl p-4">
          <div className="mb-4 flex items-center gap-2">
            <HeartPulse size={20} className="text-rose-200" />
            <h2 className="text-base font-semibold text-slate-100">Heart Rate (BPM)</h2>
          </div>
          <div className="grid gap-3 grid-cols-3">
            {heartRateFacts.map((fact) => (
              <article key={fact.zone} className={['rounded-lg border p-3', fact.tone].join(' ')}>
                <p className="text-sm font-semibold uppercase tracking-wide">{fact.zone}</p>
                <p className="mt-2 text-sm font-medium">{fact.range}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="glass-card fade-in rounded-2xl p-4">
          <div className="mb-4 flex items-center gap-2">
            <Brain size={20} className="text-cyan-200" />
            <h2 className="text-base font-semibold text-slate-100">Stress Level (GSR)</h2>
          </div>
          <div className="grid gap-3 grid-cols-3">
            {stressFacts.map((fact) => (
              <article key={fact.zone} className={['rounded-lg border p-3', fact.tone].join(' ')}>
                <p className="text-sm font-semibold uppercase tracking-wide">{fact.zone}</p>
                <p className="mt-2 text-sm font-medium">{fact.range}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-700/50 bg-slate-900/30 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Heart size={18} className="text-rose-300" />
            <p className="text-sm font-semibold text-slate-300">Heart Rate</p>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Your resting heart rate reflects how hard your heart works at rest. Lower is generally healthier, but what's "normal" varies by age, fitness, and medications.
          </p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-900/30 p-4">
          <div className="mb-3 flex items-center gap-2">
            <AlertCircle size={18} className="text-amber-300" />
            <p className="text-sm font-semibold text-slate-300">Stress (GSR)</p>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            GSR measures skin conductance, linked to your nervous system. Changes often reflect emotional or physical arousal—context matters more than a single reading.
          </p>
        </div>
      </div>
    </section>
  )
}
