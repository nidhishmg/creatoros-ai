'use client';

import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
import { Header, RightPanel } from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarCollapsed, rightPanelOpen } = useAppStore();

  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar />
      
      <div
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'ml-16' : 'ml-64',
          rightPanelOpen && 'mr-80'
        )}
      >
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>

      <RightPanel />
    </div>
  );
}
