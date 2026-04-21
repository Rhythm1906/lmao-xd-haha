import type { ReactNode } from 'react'

interface MetricCardProps {
  title: string
  value: string
  subtitle?: string
  trend?: string
  icon?: ReactNode
}

export const MetricCard = ({ title, value, subtitle, trend, icon }: MetricCardProps) => (
  <article className="glass-card fade-in rounded-2xl p-4 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 sm:p-5">
    <div className="mb-3 flex items-center justify-between text-slate-400">
      <p className="text-sm font-medium">{title}</p>
      {icon}
    </div>
    <p className="text-2xl font-semibold text-slate-100 sm:text-3xl">{value}</p>
    {subtitle ? <p className="mt-2 text-sm text-slate-400">{subtitle}</p> : null}
    {trend ? (
      <p className="mt-3 inline-flex rounded-full border border-slate-600/80 bg-slate-900/70 px-2.5 py-1 text-xs text-slate-300">
        {trend}
      </p>
    ) : null}
  </article>
)
