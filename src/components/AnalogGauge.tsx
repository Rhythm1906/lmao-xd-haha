
import type { LucideIcon } from 'lucide-react';

interface AnalogGaugeProps {
  value?: number;
  max: number;
  label: string;
  unit: string;
  status: string;
  Icon: LucideIcon;
}

const HALF_CIRCUMFERENCE = 141.3715

const GAUGE_STYLES = {
  '--gauge-circumference': '282.743',
  '--gauge-stroke-width': '16',
  '--gauge-radius': '45',
} as React.CSSProperties;

const getStrokeColor = (status: string) => {
  switch (status) {
    case 'Resting':
    case 'Low':
      return '#34d399'; // Emerald 500
    case 'Normal':
    case 'Medium':
      return '#facc15'; // Yellow 400
    case 'Elevated':
    case 'High':
      return '#f87171'; // Red 400
    default:
      return '#9ca3af'; // Gray 400
  }
};

export const AnalogGauge = ({ value, max, label, unit, status, Icon }: AnalogGaugeProps) => {
  const percentage = value != null ? Math.min(Math.max(value / max, 0), 1) : 0;
  const offset = HALF_CIRCUMFERENCE * (1 - percentage)
  const strokeColor = getStrokeColor(status);

  return (
    <div className="glass-card flex flex-col items-center justify-center gap-3 rounded-2xl p-4 text-center">
      <div className="flex items-center gap-2 text-lg font-semibold text-slate-200">
        <Icon size={20} className="text-slate-400" />
        <span>{label}</span>
      </div>
      <div className="relative h-24 w-48">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 50"
          style={GAUGE_STYLES}
        >
          {/* Background track */}
          <path
            d="M 5,50 A 45,45 0 0 1 95,50"
            fill="none"
            stroke="#374151" // Gray-700
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Value arc */}
          <path
            d="M 5,50 A 45,45 0 0 1 95,50"
            fill="none"
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={HALF_CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
          <span className="text-3xl font-bold text-white">
            {value != null ? value.toFixed(0) : '00'}
          </span>
          <span className="text-sm text-slate-400">{unit}</span>
        </div>
      </div>
      <div
        className="mt-1 rounded-full px-3 py-1 text-sm font-medium"
        style={{ backgroundColor: `${strokeColor}20`, color: strokeColor }}
      >
        {status}
      </div>
    </div>
  );
};
