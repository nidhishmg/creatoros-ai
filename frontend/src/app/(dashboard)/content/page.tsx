'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  TrendingUp,
  Clock,
  Calendar,
  BarChart3,
  Play,
  ThumbsUp,
  MessageSquare,
  Share2,
  Filter,
  Plus,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  StatCard,
  Button,
  Badge,
  ProgressBar,
  AIInsight,
} from '@/components/ui';

const contentStats = [
  { label: 'Total Content', value: '156', change: { value: 8, positive: true }, trend: 'up' as const, icon: FileText },
  { label: 'Avg. Views', value: '89K', change: { value: 12, positive: true }, trend: 'up' as const, icon: Play },
  { label: 'Avg. Engagement', value: '8.7%', change: { value: 0.3, positive: false }, trend: 'down' as const, icon: ThumbsUp },
  { label: 'Posting Freq.', value: '2.3/wk', change: { value: 0.5, positive: true }, trend: 'up' as const, icon: Calendar },
];

const recentContent = [
  {
    id: 1,
    title: 'Why AI Will Change Everything in 2025',
    type: 'Long-form Video',
    platform: 'YouTube',
    publishDate: '2 days ago',
    views: '156K',
    likes: '12.4K',
    comments: '892',
    dnaMatch: 92,
    status: 'trending',
  },
  {
    id: 2,
    title: 'Hot take: Apple is behind on AI',
    type: 'Short',
    platform: 'Twitter',
    publishDate: '3 days ago',
    views: '234K',
    likes: '18.9K',
    comments: '1.2K',
    dnaMatch: 88,
    status: 'viral',
  },
  {
    id: 3,
    title: 'The truth about productivity apps...',
    type: 'Long-form Video',
    platform: 'YouTube',
    publishDate: '5 days ago',
    views: '89K',
    likes: '7.8K',
    comments: '456',
    dnaMatch: 78,
    status: 'stable',
  },
  {
    id: 4,
    title: 'My morning routine as a tech creator',
    type: 'Short',
    platform: 'YouTube',
    publishDate: '1 week ago',
    views: '45K',
    likes: '4.2K',
    comments: '234',
    dnaMatch: 65,
    status: 'underperforming',
  },
];

const contentIdeas = [
  {
    title: 'AI Coding Tools Deep Dive',
    type: 'suggestion',
    confidence: 94,
    reason: 'High audience interest + matches your educational tone',
  },
  {
    title: 'Tech Hot Takes Compilation',
    type: 'suggestion',
    confidence: 87,
    reason: 'Your opinion content performs 40% better than average',
  },
  {
    title: 'Behind the Scenes: My Setup',
    type: 'info',
    confidence: 72,
    reason: 'Audience has requested this in comments',
  },
];

const performanceInsights = [
  {
    type: 'success' as const,
    insight: 'Videos with "2025" in title get 35% more clicks. Keep using future-focused hooks!',
  },
  {
    type: 'warning' as const,
    insight: 'Your lifestyle content underperforms by 40%. Consider reducing or repositioning.',
  },
  {
    type: 'info' as const,
    insight: 'Best posting time: Tuesday/Thursday 2PM EST based on your audience activity.',
  },
];

export default function ContentIntelligencePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Content Intelligence</h1>
          <p className="text-surface-500 mt-1">
            AI-powered insights to optimize your content strategy
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Plan Content
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contentStats.map((stat, index) => (
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader
              title="Content Performance"
              icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
              action={
                <button className="text-sm text-accent-primary hover:underline">
                  View All
                </button>
              }
            />
            <div className="p-6 pt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-surface-500 border-b border-surface-200">
                      <th className="pb-3 font-medium">Content</th>
                      <th className="pb-3 font-medium">Performance</th>
                      <th className="pb-3 font-medium">DNA Match</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentContent.map((content) => (
                      <tr
                        key={content.id}
                        className="border-b border-surface-100 last:border-0 hover:bg-surface-50 transition-colors"
                      >
                        <td className="py-4">
                          <div>
                            <p className="font-medium text-surface-900 truncate max-w-xs">
                              {content.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="default" size="sm">
                                {content.platform}
                              </Badge>
                              <span className="text-xs text-surface-500">
                                {content.publishDate}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-surface-600">
                              <Play className="w-3 h-3" />
                              {content.views}
                            </span>
                            <span className="flex items-center gap-1 text-surface-600">
                              <ThumbsUp className="w-3 h-3" />
                              {content.likes}
                            </span>
                            <span className="flex items-center gap-1 text-surface-600">
                              <MessageSquare className="w-3 h-3" />
                              {content.comments}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="w-24">
                            <ProgressBar
                              value={content.dnaMatch}
                              size="sm"
                              color={
                                content.dnaMatch >= 80
                                  ? 'success'
                                  : content.dnaMatch >= 60
                                  ? 'warning'
                                  : 'danger'
                              }
                            />
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge
                            variant={
                              content.status === 'viral'
                                ? 'success'
                                : content.status === 'trending'
                                ? 'info'
                                : content.status === 'underperforming'
                                ? 'danger'
                                : 'default'
                            }
                            size="sm"
                            dot={
                              content.status === 'viral' ||
                              content.status === 'trending'
                            }
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

        {/* AI Content Ideas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader
              title="AI Content Ideas"
              icon={<Sparkles className="w-5 h-5 text-purple-600" />}
              badge={
                <Badge variant="ai" size="sm">
                  Generated
                </Badge>
              }
            />
            <div className="p-6 pt-0 space-y-4">
              {contentIdeas.map((idea, index) => (
                <div
                  key={index}
                  className="p-3 bg-surface-50 rounded-lg border border-surface-200 hover:border-purple-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-surface-900 text-sm">
                      {idea.title}
                    </p>
                    <Badge
                      variant={idea.confidence >= 85 ? 'success' : 'warning'}
                      size="sm"
                    >
                      {idea.confidence}%
                    </Badge>
                  </div>
                  <p className="text-xs text-surface-500">{idea.reason}</p>
                </div>
              ))}
              <Button variant="secondary" className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate More Ideas
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader
            title="Performance Insights"
            icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          />
          <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-3 gap-4">
            {performanceInsights.map((insight, index) => (
              <AIInsight key={index} type={insight.type} insight={insight.insight} />
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
