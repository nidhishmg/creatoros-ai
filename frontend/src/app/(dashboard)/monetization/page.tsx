'use client';

import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Briefcase,
  Gift,
  ShoppingBag,
  Building2,
  ArrowUpRight,
  Calendar,
  Sparkles,
  Check,
  X,
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

const revenueStats = [
  { label: 'Total Revenue', value: '$4,280', change: { value: 18.3, positive: true }, trend: 'up' as const, icon: DollarSign },
  { label: 'Ad Revenue', value: '$2,840', change: { value: 12, positive: true }, trend: 'up' as const, icon: TrendingUp },
  { label: 'Sponsorships', value: '$1,200', change: { value: 45, positive: true }, trend: 'up' as const, icon: Briefcase },
  { label: 'Products', value: '$240', change: { value: 8, positive: true }, trend: 'up' as const, icon: ShoppingBag },
];

const revenueBreakdown = [
  { source: 'YouTube AdSense', amount: 2840, percentage: 66, color: 'bg-red-500' },
  { source: 'Brand Deals', amount: 1200, percentage: 28, color: 'bg-blue-500' },
  { source: 'Affiliate Links', amount: 180, percentage: 4, color: 'bg-green-500' },
  { source: 'Digital Products', amount: 60, percentage: 2, color: 'bg-purple-500' },
];

const brandDeals = [
  {
    id: 1,
    brand: 'TechCorp',
    type: 'Sponsorship',
    value: '$3,500',
    status: 'pending',
    deadline: 'Dec 15',
    dnaMatch: 92,
  },
  {
    id: 2,
    brand: 'ProductivityApp',
    type: 'Integration',
    value: '$1,800',
    status: 'negotiating',
    deadline: 'Dec 20',
    dnaMatch: 87,
  },
  {
    id: 3,
    brand: 'SaaS Startup',
    type: 'Review',
    value: '$800',
    status: 'approved',
    deadline: 'Dec 10',
    dnaMatch: 78,
  },
];

const opportunities = [
  {
    type: 'suggestion' as const,
    title: 'Launch a Notion Template',
    potential: '$500-2000/mo',
    match: 94,
    reason: 'Your productivity content has high engagement. Audience would buy templates.',
  },
  {
    type: 'info' as const,
    title: 'Start a Patreon/Membership',
    potential: '$1000-3000/mo',
    match: 82,
    reason: '40% of your audience are return viewers who would support exclusive content.',
  },
  {
    type: 'suggestion' as const,
    title: 'Affiliate: Course Platform',
    potential: '$200-500/mo',
    match: 88,
    reason: 'Your educational content naturally leads to course recommendations.',
  },
];

export default function MonetizationPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Monetization</h1>
          <p className="text-surface-500 mt-1">
            Track revenue streams and discover new opportunities
          </p>
        </div>
        <Button>
          <DollarSign className="w-4 h-4 mr-2" />
          Connect Payment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueStats.map((stat, index) => (
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
        {/* Revenue Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader
              title="Revenue Breakdown"
              icon={<CreditCard className="w-5 h-5 text-green-600" />}
              badge={<Badge variant="success" size="sm">This Month</Badge>}
            />
            <div className="p-6 pt-0">
              {/* Visual bar */}
              <div className="flex h-4 rounded-full overflow-hidden mb-4">
                {revenueBreakdown.map((item) => (
                  <div
                    key={item.source}
                    className={`${item.color} transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="space-y-3">
                {revenueBreakdown.map((item) => (
                  <div
                    key={item.source}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm text-surface-700">{item.source}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-surface-900">
                        ${item.amount.toLocaleString()}
                      </span>
                      <span className="text-xs text-surface-500 ml-2">
                        ({item.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Brand Deals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader
              title="Active Brand Deals"
              icon={<Briefcase className="w-5 h-5 text-blue-600" />}
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
                      <th className="pb-3 font-medium">Brand</th>
                      <th className="pb-3 font-medium">Type</th>
                      <th className="pb-3 font-medium">Value</th>
                      <th className="pb-3 font-medium">DNA Match</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brandDeals.map((deal) => (
                      <tr
                        key={deal.id}
                        className="border-b border-surface-100 last:border-0"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-surface-200 rounded-lg flex items-center justify-center">
                              <Building2 className="w-4 h-4 text-surface-500" />
                            </div>
                            <div>
                              <p className="font-medium text-surface-900">
                                {deal.brand}
                              </p>
                              <p className="text-xs text-surface-500">
                                Due: {deal.deadline}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge variant="default" size="sm">
                            {deal.type}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <span className="font-semibold text-surface-900">
                            {deal.value}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="w-20">
                            <ProgressBar
                              value={deal.dnaMatch}
                              size="sm"
                              color={
                                deal.dnaMatch >= 85
                                  ? 'success'
                                  : deal.dnaMatch >= 70
                                  ? 'warning'
                                  : 'danger'
                              }
                            />
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge
                            variant={
                              deal.status === 'approved'
                                ? 'success'
                                : deal.status === 'pending'
                                ? 'warning'
                                : 'info'
                            }
                            size="sm"
                          >
                            {deal.status}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <Check className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* AI Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader
            title="AI-Detected Opportunities"
            icon={<Sparkles className="w-5 h-5 text-purple-600" />}
            badge={
              <Badge variant="ai" size="sm" dot>
                3 New
              </Badge>
            }
          />
          <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-3 gap-4">
            {opportunities.map((opp, index) => (
              <div
                key={index}
                className="p-4 bg-surface-50 rounded-xl border border-surface-200 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-surface-900">{opp.title}</h4>
                    <p className="text-lg font-bold text-green-600">
                      {opp.potential}
                    </p>
                  </div>
                  <Badge variant="success" size="sm">
                    {opp.match}% match
                  </Badge>
                </div>
                <p className="text-sm text-surface-600 mb-3">{opp.reason}</p>
                <Button variant="secondary" size="sm" className="w-full">
                  Explore
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
