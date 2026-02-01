'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  MessageSquare,
  Heart,
  Share2,
} from 'lucide-react';
import { Card, CardHeader, StatCard, Badge, AIInsight, ProgressBar } from '@/components/ui';

// Mock data - in real app, this would come from API/state
const stats = [
  {
    label: 'Total Views',
    value: '2.4M',
    change: { value: 12.5, positive: true },
    trend: 'up' as const,
    icon: Eye,
  },
  {
    label: 'Subscribers',
    value: '124K',
    change: { value: 3.2, positive: true },
    trend: 'up' as const,
    icon: Users,
  },
  {
    label: 'Engagement Rate',
    value: '8.7%',
    change: { value: 0.5, positive: false },
    trend: 'down' as const,
    icon: Heart,
  },
  {
    label: 'Est. Revenue',
    value: '$4,280',
    change: { value: 18.3, positive: true },
    trend: 'up' as const,
    icon: DollarSign,
  },
];

const recentContent = [
  {
    title: 'Why AI Will Change Everything in 2025',
    views: '156K',
    engagement: '12.4%',
    status: 'trending',
    platform: 'YouTube',
  },
  {
    title: 'The truth about productivity apps...',
    views: '89K',
    engagement: '9.8%',
    status: 'stable',
    platform: 'YouTube',
  },
  {
    title: 'Hot take: Apple is behind on AI',
    views: '234K',
    engagement: '15.2%',
    status: 'viral',
    platform: 'Twitter',
  },
];

const aiInsights = [
  {
    type: 'suggestion' as const,
    insight:
      'Your audience engages 40% more with AI-related content. Consider a weekly AI news segment.',
  },
  {
    type: 'warning' as const,
    insight:
      "Posting frequency dropped this week. Consistency impacts algorithm performance.",
  },
  {
    type: 'success' as const,
    insight:
      'Your latest video matched your DNA profile perfectly - tone and humor were spot-on!',
  },
];

const actionItems = [
  {
    label: 'Review brand deal from TechCorp',
    priority: 'high',
    due: 'Today',
  },
  {
    label: 'Respond to top 10 comments',
    priority: 'medium',
    due: 'Today',
  },
  {
    label: 'Schedule next week content',
    priority: 'low',
    due: 'Tomorrow',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Dashboard</h1>
          <p className="text-surface-500 mt-1">Welcome back! Here's your creator snapshot.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="ai" dot>
            AI Active
          </Badge>
          <span className="text-sm text-surface-500">Last updated: 2 min ago</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard
              label={stat.label}
              value={stat.value}
              change={stat.change}
              trend={stat.trend}
              icon={<stat.icon className="w-5 h-5" />}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader
              title="AI Insights Today"
              icon={<Sparkles className="w-5 h-5 text-purple-600" />}
              action={
                <button className="text-sm text-accent-primary hover:underline">
                  View All
                </button>
              }
            />
            <div className="p-6 pt-0 space-y-3">
              {aiInsights.map((insight, index) => (
                <AIInsight
                  key={index}
                  type={insight.type}
                  insight={insight.insight}
                  action={{
                    label: 'Take Action',
                    onClick: () => console.log('Action clicked'),
                  }}
                />
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Action Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader
              title="Action Items"
              badge={
                <Badge variant="warning" size="sm">
                  {actionItems.length}
                </Badge>
              }
            />
            <div className="p-6 pt-0 space-y-3">
              {actionItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-surface-50 rounded-lg hover:bg-surface-100 transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-surface-300 text-accent-primary focus:ring-accent-primary/20"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-900 truncate">
                      {item.label}
                    </p>
                    <p className="text-xs text-surface-500">{item.due}</p>
                  </div>
                  <Badge
                    variant={
                      item.priority === 'high'
                        ? 'danger'
                        : item.priority === 'medium'
                        ? 'warning'
                        : 'default'
                    }
                    size="sm"
                  >
                    {item.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Content Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader
            title="Recent Content Performance"
            icon={<Play className="w-5 h-5 text-red-500" />}
            action={
              <button className="text-sm text-accent-primary hover:underline">
                View Analytics
              </button>
            }
          />
          <div className="p-6 pt-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-surface-500 border-b border-surface-200">
                    <th className="pb-3 font-medium">Content</th>
                    <th className="pb-3 font-medium">Platform</th>
                    <th className="pb-3 font-medium">Views</th>
                    <th className="pb-3 font-medium">Engagement</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentContent.map((content, index) => (
                    <tr
                      key={index}
                      className="border-b border-surface-100 last:border-0 hover:bg-surface-50 transition-colors"
                    >
                      <td className="py-4">
                        <p className="font-medium text-surface-900 truncate max-w-xs">
                          {content.title}
                        </p>
                      </td>
                      <td className="py-4">
                        <Badge variant="default" size="sm">
                          {content.platform}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <span className="text-surface-700">{content.views}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-surface-700">
                          {content.engagement}
                        </span>
                      </td>
                      <td className="py-4">
                        <Badge
                          variant={
                            content.status === 'viral'
                              ? 'success'
                              : content.status === 'trending'
                              ? 'info'
                              : 'default'
                          }
                          size="sm"
                          dot={content.status === 'viral' || content.status === 'trending'}
                        >
                          {content.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Creator DNA Quick View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900">Your Creator DNA</h3>
                  <p className="text-sm text-surface-500">Last analyzed: 2 days ago</p>
                </div>
              </div>
              <button className="text-sm text-purple-600 font-medium hover:underline">
                View Full Analysis →
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-surface-500 mb-1">Tone Profile</p>
                <p className="font-semibold text-surface-900">Educational & Engaging</p>
                <ProgressBar value={85} showValue={false} size="sm" color="default" />
              </div>
              <div>
                <p className="text-xs text-surface-500 mb-1">Humor Style</p>
                <p className="font-semibold text-surface-900">Witty & Observational</p>
                <ProgressBar value={72} showValue={false} size="sm" color="default" />
              </div>
              <div>
                <p className="text-xs text-surface-500 mb-1">Risk Profile</p>
                <p className="font-semibold text-surface-900">Moderate</p>
                <ProgressBar value={45} showValue={false} size="sm" color="warning" />
              </div>
              <div>
                <p className="text-xs text-surface-500 mb-1">Audience Match</p>
                <p className="font-semibold text-surface-900">Tech-Savvy Millennials</p>
                <ProgressBar value={88} showValue={false} size="sm" color="success" />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
