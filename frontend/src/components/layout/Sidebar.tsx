'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Dna,
  Lightbulb,
  Users,
  Wallet,
  Shield,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore, type AIProcessStatus } from '@/lib/store';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  aiProcessId?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Creator DNA', href: '/dashboard/dna', icon: Dna, aiProcessId: 'dna-scanner' },
  { label: 'Content Intelligence', href: '/dashboard/content', icon: Lightbulb },
  { label: 'Audience Intelligence', href: '/dashboard/audience', icon: Users, aiProcessId: 'emotion-analyzer' },
  { label: 'Monetization', href: '/dashboard/monetization', icon: Wallet, aiProcessId: 'revenue-detector' },
  { label: 'IP & Licensing', href: '/dashboard/ip', icon: Shield },
  { label: 'Growth & Memory', href: '/dashboard/growth', icon: TrendingUp, aiProcessId: 'growth-memory' },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

function AIStatusIndicator({ status }: { status: AIProcessStatus }) {
  return (
    <span
      className={cn(
        'w-2 h-2 rounded-full',
        status === 'active' && 'bg-ai-active animate-pulse',
        status === 'processing' && 'bg-ai-processing animate-pulse-slow',
        status === 'idle' && 'bg-ai-idle'
      )}
    />
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, aiProcesses } = useAppStore();

  const getAIStatus = (processId?: string): AIProcessStatus => {
    if (!processId) return 'idle';
    return aiProcesses.find((p) => p.id === processId)?.status || 'idle';
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-white border-r border-surface-200 flex flex-col transition-all duration-300 z-40',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-surface-200">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-surface-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-surface-900">CreatorOS</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-500 transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const aiStatus = getAIStatus(item.aiProcessId);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-surface-100 text-surface-900'
                  : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
              )}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-accent-primary')} />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {item.aiProcessId && <AIStatusIndicator status={aiStatus} />}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* AI Status Footer */}
      {!sidebarCollapsed && (
        <div className="p-4 border-t border-surface-200">
          <div className="text-xs text-surface-500 mb-2">AI Systems</div>
          <div className="flex items-center gap-2">
            <span className="ai-status-active" />
            <span className="text-xs text-surface-600">
              {aiProcesses.filter((p) => p.status === 'active').length} active
            </span>
            <span className="ai-status-processing" />
            <span className="text-xs text-surface-600">
              {aiProcesses.filter((p) => p.status === 'processing').length} processing
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
