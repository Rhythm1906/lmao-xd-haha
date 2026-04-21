import type { SensorPoint } from '../types/sensor'
import {
  getEcgSignalStatus,
  getHeartRateStatus,
  getStressStatus,
  getStressThresholds,
  type ReadingStatus,
} from '../utils/dataProcessing'
import type { ReactNode } from 'react'

interface ReferenceStandardsPanelProps {
  latest?: SensorPoint
}

const statusTone: Record<ReadingStatus, string> = {
  Normal: 'text-emerald-200 border-emerald-400/40 bg-emerald-500/15',
  'Below Standard': 'text-amber-100 border-amber-400/40 bg-amber-500/15',
  'Above Standard': 'text-rose-100 border-rose-400/40 bg-rose-500/15',
  Unavailable: 'text-slate-200 border-slate-500/40 bg-slate-700/30',
}

const Cell = ({ children }: { children: ReactNode }) => (
  <td className="px-3 py-2 text-sm text-slate-200">{children}</td>
)

export const ReferenceStandardsPanel = ({ latest }: ReferenceStandardsPanelProps) => {
  const heartRateStatus = getHeartRateStatus(latest?.heartRate)
  const ecgStatus = latest ? getEcgSignalStatus(latest.ecg) : 'Unavailable'
  const stressStatus = latest ? getStressStatus(latest.stressLevel) : 'Unavailable'
  const { low, medium } = getStressThresholds()

  return (
    <section className="glass-card fade-in rounded-2xl p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-100 sm:text-xl">Reference Standards</h2>
        <p className="mt-1 text-sm text-slate-400">
          Plain-language comparison of live values against common monitoring ranges.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-700/70">
        <table className="min-w-full divide-y divide-slate-700/70 bg-slate-900/50">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-3 py-2">Parameter</th>
              <th className="px-3 py-2">Current</th>
              <th className="px-3 py-2">Standard</th>
              <th className="px-3 py-2">Interpretation</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            <tr>
              <Cell>Heart Rate</Cell>
              <Cell>
                {typeof latest?.heartRate === 'number'
                  ? `${latest.heartRate.toFixed(0)} BPM`
                  : 'N/A'}
              </Cell>
              <Cell>60 to 100 BPM (resting adult)</Cell>
              <Cell>
                {heartRateStatus === 'Below Standard'
                  ? 'Lower than resting reference; can be expected in sleep or high fitness, review if persistent with symptoms.'
                  : heartRateStatus === 'Above Standard'
                    ? 'Higher than resting reference; may reflect stress or activity, monitor when sustained at rest.'
                    : heartRateStatus === 'Normal'
                      ? 'Within expected resting adult range.'
                      : 'No reliable heart-rate sample yet.'}
              </Cell>
              <td className="px-3 py-2">
                <span className={["rounded-full border px-2.5 py-1 text-xs font-medium", statusTone[heartRateStatus]].join(' ')}>
                  {heartRateStatus}
                </span>
              </td>
            </tr>
            <tr>
              <Cell>ECG Signal</Cell>
              <Cell>{latest ? latest.ecg.toFixed(1) : 'N/A'}</Cell>
              <Cell>0 to 1023 raw ADC range</Cell>
              <Cell>
                {ecgStatus === 'Normal'
                  ? 'Signal value is inside expected ADC bounds.'
                  : ecgStatus === 'Unavailable'
                    ? 'No valid ECG sample available.'
                    : 'Outside expected ADC range, likely artifact or sensor issue.'}
              </Cell>
              <td className="px-3 py-2">
                <span className={["rounded-full border px-2.5 py-1 text-xs font-medium", statusTone[ecgStatus]].join(' ')}>
                  {ecgStatus}
                </span>
              </td>
            </tr>
            <tr>
              <Cell>Stress (GSR)</Cell>
              <Cell>{latest ? `${latest.gsr.toFixed(1)} (${latest.stressLevel})` : 'N/A'}</Cell>
              <Cell>{`Low < ${low}, Medium < ${medium}, High >= ${medium}`}</Cell>
              <Cell>
                {stressStatus === 'Above Standard'
                  ? 'Elevated sympathetic response zone; validate with trend persistence and context.'
                  : stressStatus === 'Normal'
                    ? 'Low-to-moderate stress zone under current thresholds.'
                    : 'No valid stress sample available.'}
              </Cell>
              <td className="px-3 py-2">
                <span className={["rounded-full border px-2.5 py-1 text-xs font-medium", statusTone[stressStatus]].join(' ')}>
                  {stressStatus}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-slate-400">
        Note: Resting heart-rate guidance uses 60 to 100 BPM for adults. Individual baselines can differ by age,
        fitness, medication, and clinical context.
      </p>
    </section>
  )
}
