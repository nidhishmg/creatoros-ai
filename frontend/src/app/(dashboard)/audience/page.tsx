'use client';

import { motion } from 'framer-motion';
import {
  Users,
  UserPlus,
  Heart,
  MessageSquare,
  Globe,
  MapPin,
  Clock,
  TrendingUp,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  StatCard,
  Badge,
  ProgressBar,
  AIInsight,
} from '@/components/ui';

const audienceStats = [
  { label: 'Total Followers', value: '124K', change: { value: 3.2, positive: true }, trend: 'up' as const, icon: Users },
  { label: 'New This Week', value: '1.2K', change: { value: 18, positive: true }, trend: 'up' as const, icon: UserPlus },
  { label: 'Engagement Rate', value: '8.7%', change: { value: 0.5, positive: false }, trend: 'down' as const, icon: Heart },
  { label: 'Avg. Comments', value: '234', change: { value: 12, positive: true }, trend: 'up' as const, icon: MessageSquare },
];

const demographics = {
  age: [
    { range: '13-17', percentage: 5 },
    { range: '18-24', percentage: 28 },
    { range: '25-34', percentage: 42 },
    { range: '35-44', percentage: 18 },
    { range: '45+', percentage: 7 },
  ],
  gender: [
    { type: 'Male', percentage: 68 },
    { type: 'Female', percentage: 29 },
    { type: 'Other', percentage: 3 },
  ],
  locations: [
    { country: 'United States', percentage: 45 },
    { country: 'United Kingdom', percentage: 12 },
    { country: 'India', percentage: 10 },
    { country: 'Germany', percentage: 8 },
    { country: 'Canada', percentage: 6 },
  ],
};

const interests = [
  { name: 'Technology', percentage: 85 },
  { name: 'Productivity', percentage: 72 },
  { name: 'Career Growth', percentage: 65 },
  { name: 'Gaming', percentage: 58 },
  { name: 'Finance', percentage: 45 },
  { name: 'Design', percentage: 38 },
];

const activeHours = [
  { hour: '6AM', activity: 15 },
  { hour: '9AM', activity: 45 },
  { hour: '12PM', activity: 62 },
  { hour: '3PM', activity: 78 },
  { hour: '6PM', activity: 85 },
  { hour: '9PM', activity: 92 },
  { hour: '12AM', activity: 35 },
];

const audienceInsights = [
  {
    type: 'success' as const,
    insight: 'Your core audience (25-34 tech professionals) grew 18% this month. Keep creating content for them!',
  },
  {
    type: 'info' as const,
    insight: 'Peak engagement time is 9PM EST. Schedule your most important content for this window.',
  },
  {
    type: 'suggestion' as const,
    insight: 'Growing interest in AI topics among your audience. Consider more AI-focused content.',
  },
];

export default function AudiencePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Audience Intelligence</h1>
          <p className="text-surface-500 mt-1">
            Deep insights into who's watching and engaging with your content
          </p>
        </div>
        <Badge variant="ai" dot>
          Updated 2h ago
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {audienceStats.map((stat, index) => (
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
        {/* Age Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader
              title="Age Distribution"
              icon={<Users className="w-5 h-5 text-blue-600" />}
            />
            <div className="p-6 pt-0 space-y-3">
              {demographics.age.map((item) => (
                <div key={item.range}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-surface-700">{item.range}</span>
                    <span className="text-surface-500">{item.percentage}%</span>
                  </div>
                  <ProgressBar
                    value={item.percentage}
                    showValue={false}
                    size="sm"
                    color={item.range === '25-34' ? 'success' : 'default'}
                  />
                </div>
              ))}
              <div className="pt-2">
                <Badge variant="success" size="sm">
                  Core: 25-34 (42%)
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Top Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader
              title="Top Interests"
              icon={<Heart className="w-5 h-5 text-red-500" />}
            />
            <div className="p-6 pt-0 space-y-3">
              {interests.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-surface-700">{item.name}</span>
                    <span className="text-surface-500">{item.percentage}%</span>
                  </div>
                  <ProgressBar
                    value={item.percentage}
                    showValue={false}
                    size="sm"
                    color={item.percentage >= 70 ? 'success' : item.percentage >= 50 ? 'warning' : 'default'}
                  />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Top Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader
              title="Top Locations"
              icon={<MapPin className="w-5 h-5 text-green-600" />}
            />
            <div className="p-6 pt-0 space-y-3">
              {demographics.locations.map((item, index) => (
                <div
                  key={item.country}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {['🇺🇸', '🇬🇧', '🇮🇳', '🇩🇪', '🇨🇦'][index]}
                    </span>
                    <span className="text-sm text-surface-700">{item.country}</span>
                  </div>
                  <Badge variant="default" size="sm">
                    {item.percentage}%
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Activity Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader
            title="Audience Activity Timeline"
            icon={<Clock className="w-5 h-5 text-purple-600" />}
            badge={<Badge variant="info" size="sm">Peak: 9PM EST</Badge>}
          />
          <div className="p-6 pt-0">
            <div className="flex items-end justify-between h-32 gap-2">
              {activeHours.map((hour) => (
                <div
                  key={hour.hour}
                  className="flex flex-col items-center flex-1"
                >
                  <div
                    className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg transition-all hover:from-purple-600 hover:to-purple-500"
                    style={{ height: `${hour.activity}%` }}
                  />
                  <span className="text-xs text-surface-500 mt-2">{hour.hour}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-surface-500 text-center mt-4">
              Best times to post: <strong>2PM-3PM</strong> and <strong>8PM-10PM EST</strong>
            </p>
          </div>
        </Card>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader
            title="AI Audience Insights"
            icon={<Sparkles className="w-5 h-5 text-purple-600" />}
          />
          <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-3 gap-4">
            {audienceInsights.map((insight, index) => (
              <AIInsight key={index} type={insight.type} insight={insight.insight} />
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
