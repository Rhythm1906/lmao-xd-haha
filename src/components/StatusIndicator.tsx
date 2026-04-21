interface StatusIndicatorProps {
  online: boolean
}

export const StatusIndicator = ({ online }: StatusIndicatorProps) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-200">
    <span
      className={[
        'h-2.5 w-2.5 rounded-full',
        online ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]' : 'bg-rose-400',
      ].join(' ')}
    />
    Device {online ? 'Online' : 'Offline'}
  </div>
)
