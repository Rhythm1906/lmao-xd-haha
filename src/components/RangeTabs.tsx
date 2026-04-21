import type { TimeRange } from '../types/sensor'

interface RangeTabsProps {
  range: TimeRange
  onChange: (range: TimeRange) => void
}

const ranges: Array<{ value: TimeRange; label: string }> = [
  { value: '1h', label: 'Last Hour' },
  { value: '24h', label: 'Last Day' },
  { value: '7d', label: 'Last Week' },
]

export const RangeTabs = ({ range, onChange }: RangeTabsProps) => (
  <div className="flex flex-wrap gap-2 rounded-xl border border-slate-700/80 bg-slate-900/70 p-1">
    {ranges.map((item) => (
      <button
        key={item.value}
        type="button"
        onClick={() => onChange(item.value)}
        className={[
          'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          range === item.value
            ? 'bg-cyan-500/20 text-cyan-200'
            : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100',
        ].join(' ')}
      >
        {item.label}
      </button>
    ))}
  </div>
)
