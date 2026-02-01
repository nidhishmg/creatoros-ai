'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  Target,
  Zap,
  History,
  Calendar,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Brain,
  Sparkles,
  Lightbulb,
  BookOpen,
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

const growthStats = [
  { label: 'Growth Score', value: '78', change: { value: 5, positive: true }, trend: 'up' as const, icon: TrendingUp },
  { label: 'Goals Completed', value: '12/15', change: { value: 2, positive: true }, trend: 'up' as const, icon: Target },
  { label: 'Streak Days', value: '23', change: { value: 1, positive: true }, trend: 'up' as const, icon: Zap },
  { label: 'AI Lessons', value: '8', change: { value: 3, positive: true }, trend: 'up' as const, icon: Brain },
];

const goals = [
  {
    id: 1,
    title: 'Reach 150K subscribers',
    current: 124000,
    target: 150000,
    deadline: 'Q1 2025',
    status: 'on-track',
  },
  {
    id: 2,
    title: 'Launch first digital product',
    current: 75,
    target: 100,
    deadline: 'Dec 2024',
    status: 'behind',
  },
  {
    id: 3,
    title: 'Improve avg. watch time to 70%',
    current: 65,
    target: 70,
    deadline: 'Jan 2025',
    status: 'on-track',
  },
  {
    id: 4,
    title: 'Secure 5 brand partnerships',
    current: 3,
    target: 5,
    deadline: 'Q1 2025',
    status: 'on-track',
  },
];

const recentActivity = [
  {
    type: 'achievement',
    title: 'Hit 120K subscribers milestone',
    date: '3 days ago',
    icon: CheckCircle2,
  },
  {
    type: 'insight',
    title: 'AI detected new content opportunity',
    date: '5 days ago',
    icon: Sparkles,
  },
  {
    type: 'lesson',
    title: 'Completed: YouTube Algorithm Mastery',
    date: '1 week ago',
    icon: BookOpen,
  },
  {
    type: 'milestone',
    title: '20-day posting streak achieved',
    date: '1 week ago',
    icon: Zap,
  },
];

const aiLessons = [
  {
    title: 'Thumbnail Psychology',
    duration: '12 min',
    relevance: 95,
    description: 'Based on your click-through rate data, learn advanced thumbnail techniques.',
  },
  {
    title: 'Hook Optimization',
    duration: '8 min',
    relevance: 92,
    description: 'Your audience drops off in the first 30s. Master the art of hooks.',
  },
  {
    title: 'Community Building',
    duration: '15 min',
    relevance: 88,
    description: 'Convert viewers into superfans with these engagement strategies.',
  },
];

const growthInsights = [
  {
    type: 'success' as const,
    insight: 'Your consistency score improved 15% this month. Keep up the posting rhythm!',
  },
  {
    type: 'suggestion' as const,
    insight: 'Collaborations could accelerate your path to 150K. Consider reaching out to similar creators.',
  },
  {
    type: 'info' as const,
    insight: 'Your content velocity is optimal. Focus on quality over increasing frequency.',
  },
];

export default function GrowthMemoryPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Growth & Memory</h1>
          <p className="text-surface-500 mt-1">
            Track your progress and let AI remember what works
          </p>
        </div>
        <Button>
          <Target className="w-4 h-4 mr-2" />
          Set New Goal
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {growthStats.map((stat, index) => (
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
        {/* Active Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader
              title="Active Goals"
              icon={<Target className="w-5 h-5 text-blue-600" />}
              badge={
                <Badge variant="info" size="sm">
                  4 Active
                </Badge>
              }
            />
            <div className="p-6 pt-0 space-y-4">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="p-4 bg-surface-50 rounded-xl border border-surface-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-surface-900">{goal.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-surface-400" />
                        <span className="text-xs text-surface-500">
                          {goal.deadline}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={goal.status === 'on-track' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {goal.status}
                    </Badge>
                  </div>
                  <ProgressBar
                    value={(goal.current / goal.target) * 100}
                    label={`${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}`}
                    color={goal.status === 'on-track' ? 'success' : 'warning'}
                  />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader
              title="Recent Activity"
              icon={<History className="w-5 h-5 text-purple-600" />}
            />
            <div className="p-6 pt-0 space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-50 transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activity.type === 'achievement'
                        ? 'bg-green-100'
                        : activity.type === 'insight'
                        ? 'bg-purple-100'
                        : activity.type === 'lesson'
                        ? 'bg-blue-100'
                        : 'bg-amber-100'
                    }`}
                  >
                    <activity.icon
                      className={`w-4 h-4 ${
                        activity.type === 'achievement'
                          ? 'text-green-600'
                          : activity.type === 'insight'
                          ? 'text-purple-600'
                          : activity.type === 'lesson'
                          ? 'text-blue-600'
                          : 'text-amber-600'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-900">
                      {activity.title}
                    </p>
                    <p className="text-xs text-surface-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* AI Lessons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader
            title="AI-Personalized Lessons"
            icon={<Lightbulb className="w-5 h-5 text-yellow-500" />}
            badge={
              <Badge variant="ai" size="sm" dot>
                For You
              </Badge>
            }
          />
          <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiLessons.map((lesson, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-surface-50 to-surface-100 rounded-xl border border-surface-200 hover:border-purple-300 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-surface-900">{lesson.title}</h4>
                  <Badge variant="success" size="sm">
                    {lesson.relevance}% match
                  </Badge>
                </div>
                <p className="text-sm text-surface-600 mb-3">{lesson.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-surface-500">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {lesson.duration}
                  </span>
                  <Button variant="ghost" size="sm">
                    Start
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Growth Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader
            title="Growth Insights"
            icon={<Sparkles className="w-5 h-5 text-purple-600" />}
          />
          <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-3 gap-4">
            {growthInsights.map((insight, index) => (
              <AIInsight key={index} type={insight.type} insight={insight.insight} />
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
