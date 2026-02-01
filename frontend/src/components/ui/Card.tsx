import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div className={cn(hover ? 'card-hover' : 'card', 'p-6', className)}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action, icon, badge }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-2">
        {icon && <div className="text-surface-600">{icon}</div>}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-surface-900">{title}</h3>
            {badge}
          </div>
          {subtitle && <p className="text-sm text-surface-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    positive: boolean;
  };
  icon?: React.ReactNode;
  trend?: 'up' | 'down';
}

export function StatCard({ label, value, change, icon, trend }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-surface-500">{label}</p>
          <p className="text-2xl font-semibold text-surface-900 mt-1">{value}</p>
          {change && (
            <p
              className={cn(
                'text-sm mt-1',
                change.positive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {change.positive ? '+' : ''}{change.value}% from last week
            </p>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-surface-100 rounded-lg">{icon}</div>
        )}
      </div>
    </Card>
  );
}
