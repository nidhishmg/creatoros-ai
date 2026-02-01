'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  FileCheck,
  AlertTriangle,
  Eye,
  Lock,
  Search,
  Globe,
  Copy,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
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

const ipStats = [
  { label: 'Protected Assets', value: '42', change: { value: 3, positive: true }, trend: 'up' as const, icon: Shield },
  { label: 'Violations Found', value: '7', change: { value: 2, positive: false }, trend: 'down' as const, icon: AlertTriangle },
  { label: 'Active Monitors', value: '12', change: { value: 1, positive: true }, trend: 'up' as const, icon: Eye },
  { label: 'Resolved Issues', value: '28', change: { value: 5, positive: true }, trend: 'up' as const, icon: CheckCircle2 },
];

const protectedAssets = [
  {
    id: 1,
    name: 'Creator Logo',
    type: 'Trademark',
    status: 'protected',
    registrationDate: 'Jan 2024',
    coverage: 'US, EU, UK',
  },
  {
    id: 2,
    name: 'Intro Animation',
    type: 'Copyright',
    status: 'protected',
    registrationDate: 'Mar 2024',
    coverage: 'Global',
  },
  {
    id: 3,
    name: 'Catchphrase',
    type: 'Trademark',
    status: 'pending',
    registrationDate: 'Oct 2024',
    coverage: 'US',
  },
  {
    id: 4,
    name: 'Course Content',
    type: 'Copyright',
    status: 'protected',
    registrationDate: 'May 2024',
    coverage: 'Global',
  },
];

const recentViolations = [
  {
    id: 1,
    platform: 'YouTube',
    type: 'Content Re-upload',
    content: 'AI 2025 Predictions (full video)',
    severity: 'high',
    status: 'in-progress',
    detected: '2 days ago',
  },
  {
    id: 2,
    platform: 'TikTok',
    type: 'Clip Usage',
    content: '30-sec clip without credit',
    severity: 'medium',
    status: 'resolved',
    detected: '5 days ago',
  },
  {
    id: 3,
    platform: 'Instagram',
    type: 'Logo Misuse',
    content: 'Unauthorized merchandise',
    severity: 'high',
    status: 'pending',
    detected: '1 week ago',
  },
];

const licensingOpportunities = [
  {
    type: 'info' as const,
    title: 'Stock Footage Licensing',
    insight: 'Your b-roll footage could generate passive income on platforms like Storyblocks.',
    potential: '$200-500/mo',
  },
  {
    type: 'suggestion' as const,
    title: 'Sound Bites Marketplace',
    insight: 'Your catchphrases and sound effects are being requested by other creators.',
    potential: '$100-300/mo',
  },
];

export default function IPLicensingPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">IP & Licensing</h1>
          <p className="text-surface-500 mt-1">
            Protect your creative work and manage licensing opportunities
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Search className="w-4 h-4 mr-2" />
            Scan for Violations
          </Button>
          <Button>
            <Shield className="w-4 h-4 mr-2" />
            Register Asset
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ipStats.map((stat, index) => (
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Protected Assets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader
              title="Protected Assets"
              action={
                <button className="text-sm text-accent-primary hover:underline">
                  View All
                </button>
              }
            />
            <div className="p-6 pt-0 space-y-3">
              {protectedAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="flex items-center justify-between p-3 bg-surface-50 rounded-lg hover:bg-surface-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        asset.type === 'Trademark'
                          ? 'bg-blue-100'
                          : 'bg-purple-100'
                      }`}
                    >
                      {asset.type === 'Trademark' ? (
                        <FileCheck
                          className={`w-5 h-5 ${
                            asset.type === 'Trademark'
                              ? 'text-blue-600'
                              : 'text-purple-600'
                          }`}
                        />
                      ) : (
                        <Copy className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-surface-900">{asset.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="default" size="sm">
                          {asset.type}
                        </Badge>
                        <span className="text-xs text-surface-500">
                          {asset.coverage}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={asset.status === 'protected' ? 'success' : 'warning'}
                    size="sm"
                  >
                    {asset.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Violations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader
              title="Recent Violations"
              badge={
                <Badge variant="danger" size="sm">
                  3 Active
                </Badge>
              }
            />
            <div className="p-6 pt-0 space-y-3">
              {recentViolations.map((violation) => (
                <div
                  key={violation.id}
                  className="p-3 bg-surface-50 rounded-lg border border-surface-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-surface-400" />
                      <span className="text-sm font-medium text-surface-900">
                        {violation.platform}
                      </span>
                      <Badge
                        variant={
                          violation.severity === 'high' ? 'danger' : 'warning'
                        }
                        size="sm"
                      >
                        {violation.severity}
                      </Badge>
                    </div>
                    <Badge
                      variant={
                        violation.status === 'resolved'
                          ? 'success'
                          : violation.status === 'in-progress'
                          ? 'info'
                          : 'warning'
                      }
                      size="sm"
                    >
                      {violation.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-surface-700 mb-1">{violation.type}</p>
                  <p className="text-xs text-surface-500">{violation.content}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-surface-400">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {violation.detected}
                    </span>
                    <button className="text-xs text-accent-primary hover:underline flex items-center gap-1">
                      Take Action
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Licensing Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader
            title="Licensing Opportunities"
            badge={
              <Badge variant="ai" size="sm" dot>
                AI Detected
              </Badge>
            }
          />
          <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
            {licensingOpportunities.map((opp, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-surface-900">{opp.title}</h4>
                  <Badge variant="success" size="sm">
                    {opp.potential}
                  </Badge>
                </div>
                <p className="text-sm text-surface-600 mb-3">{opp.insight}</p>
                <Button variant="secondary" size="sm">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
