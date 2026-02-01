'use client';

import { Bell, Search, Sparkles, X } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function Header() {
  const { user, rightPanelOpen, toggleRightPanel } = useAppStore();

  return (
    <header className="h-16 bg-white border-b border-surface-200 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 bg-surface-50 border-0 rounded-lg text-sm placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-primary"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* AI Assistant Toggle */}
        <button
          onClick={toggleRightPanel}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
            rightPanelOpen
              ? 'bg-accent-primary text-white'
              : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
          )}
        >
          <Sparkles className="w-4 h-4" />
          AI Insights
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-500 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-danger rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-3 border-l border-surface-200">
          <div className="w-8 h-8 bg-surface-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-surface-600">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export function RightPanel() {
  const { rightPanelOpen, toggleRightPanel, aiProcesses } = useAppStore();

  if (!rightPanelOpen) return null;

  return (
    <aside className="fixed right-0 top-0 h-screen w-80 bg-white border-l border-surface-200 z-40 animate-fade-in">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-surface-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent-primary" />
          <span className="font-semibold text-surface-900">AI Insights</span>
        </div>
        <button
          onClick={toggleRightPanel}
          className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-4rem)]">
        {/* AI Status Overview */}
        <div className="card p-4">
          <h3 className="text-sm font-medium text-surface-900 mb-3">System Status</h3>
          <div className="space-y-2">
            {aiProcesses.map((process) => (
              <div key={process.id} className="flex items-center justify-between">
                <span className="text-sm text-surface-600">{process.name}</span>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'text-xs capitalize',
                      process.status === 'active' && 'text-green-600',
                      process.status === 'processing' && 'text-amber-600',
                      process.status === 'idle' && 'text-surface-400'
                    )}
                  >
                    {process.status}
                  </span>
                  <span
                    className={cn(
                      'w-2 h-2 rounded-full',
                      process.status === 'active' && 'bg-ai-active',
                      process.status === 'processing' && 'bg-ai-processing',
                      process.status === 'idle' && 'bg-ai-idle'
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Insights */}
        <div className="card p-4">
          <h3 className="text-sm font-medium text-surface-900 mb-3">Live Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
              <p className="text-sm text-green-800">
                Your audience engagement is 23% higher than last week
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800">
                New monetization opportunity detected in tech content
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-sm text-amber-800">
                Consider posting during 6-8 PM for better reach
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
