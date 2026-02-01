import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'ai';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-2.5 py-1 text-sm',
        variant === 'default' && 'bg-surface-100 text-surface-700',
        variant === 'success' && 'bg-green-100 text-green-700',
        variant === 'warning' && 'bg-amber-100 text-amber-700',
        variant === 'danger' && 'bg-red-100 text-red-700',
        variant === 'info' && 'bg-blue-100 text-blue-700',
        variant === 'ai' && 'bg-purple-100 text-purple-700',
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'default' && 'bg-surface-500',
            variant === 'success' && 'bg-green-500',
            variant === 'warning' && 'bg-amber-500',
            variant === 'danger' && 'bg-red-500',
            variant === 'info' && 'bg-blue-500',
            variant === 'ai' && 'bg-purple-500 animate-pulse'
          )}
        />
      )}
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'active' | 'processing' | 'idle' | 'error' | 'success';
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusConfig = {
    active: { variant: 'success' as const, text: label || 'Active', dot: true },
    processing: { variant: 'ai' as const, text: label || 'Processing', dot: true },
    idle: { variant: 'default' as const, text: label || 'Idle', dot: false },
    error: { variant: 'danger' as const, text: label || 'Error', dot: true },
    success: { variant: 'success' as const, text: label || 'Complete', dot: false },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} size="sm" dot={config.dot}>
      {config.text}
    </Badge>
  );
}
