import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'success' | 'warning' | 'danger';
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  size = 'md',
  color = 'default',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-surface-600">{label}</span>}
          {showValue && (
            <span className="text-sm font-medium text-surface-900">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full bg-surface-200 rounded-full overflow-hidden',
          size === 'sm' && 'h-1.5',
          size === 'md' && 'h-2',
          size === 'lg' && 'h-3'
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            color === 'default' && 'bg-accent-primary',
            color === 'success' && 'bg-green-500',
            color === 'warning' && 'bg-amber-500',
            color === 'danger' && 'bg-red-500'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface ConfidenceBarProps {
  label: string;
  value: number; // 0-1
  explanation?: string;
}

export function ConfidenceBar({ label, value, explanation }: ConfidenceBarProps) {
  const color = value >= 0.7 ? 'success' : value >= 0.4 ? 'warning' : 'danger';
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-surface-700">{label}</span>
        <span
          className={cn(
            'text-xs font-medium px-2 py-0.5 rounded',
            value >= 0.7 && 'bg-green-100 text-green-700',
            value >= 0.4 && value < 0.7 && 'bg-amber-100 text-amber-700',
            value < 0.4 && 'bg-red-100 text-red-700'
          )}
        >
          {value >= 0.7 ? 'High' : value >= 0.4 ? 'Medium' : 'Low'}
        </span>
      </div>
      <ProgressBar value={value * 100} showValue={false} size="sm" color={color} />
      {explanation && (
        <p className="text-xs text-surface-500 mt-1">{explanation}</p>
      )}
    </div>
  );
}
