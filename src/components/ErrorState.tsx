interface ErrorStateProps {
  message: string
}

export const ErrorState = ({ message }: ErrorStateProps) => (
  <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 p-6 text-rose-200">
    <p className="text-base font-semibold">Data fetch failed</p>
    <p className="mt-2 text-sm text-rose-100/90">{message}</p>
  </div>
)
