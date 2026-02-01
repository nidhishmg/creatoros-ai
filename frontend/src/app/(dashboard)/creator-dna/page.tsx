'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Sparkles,
  RefreshCw,
  Download,
  Share2,
  Info,
  TrendingUp,
  MessageSquare,
  Zap,
  Users,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  Button,
  Badge,
  ConfidenceBar,
  ProgressBar,
  AIInsight,
} from '@/components/ui';

// Mock DNA data - in real app this comes from API
const creatorDNA = {
  lastAnalyzed: '2 days ago',
  contentSamples: 15,
  confidence: 0.87,
  toneProfile: {
    primary: 'Educational & Engaging',
    secondary: 'Conversational',
    confidence: 0.85,
    traits: [
      { name: 'Clarity', score: 0.92 },
      { name: 'Enthusiasm', score: 0.88 },
      { name: 'Authority', score: 0.79 },
      { name: 'Approachability', score: 0.85 },
    ],
    description:
      'Your content strikes a balance between being informative and entertaining. You explain complex topics clearly while maintaining viewer engagement through enthusiasm and relatable examples.',
  },
  humorSignature: {
    primary: 'Witty & Observational',
    style: 'Self-deprecating with pop culture references',
    confidence: 0.72,
    frequency: 'Moderate (2-3 per piece)',
    types: [
      { name: 'Self-deprecation', percentage: 35 },
      { name: 'Pop culture refs', percentage: 28 },
      { name: 'Observational', percentage: 22 },
      { name: 'Wordplay', percentage: 15 },
    ],
    description:
      'Your humor is natural and relatable. You tend to poke fun at yourself and reference current trends/memes that resonate with your tech-savvy audience.',
  },
  riskProfile: {
    level: 'Moderate',
    score: 0.45,
    description:
      'You balance safe, widely-accepted takes with occasional bold opinions. You rarely venture into truly controversial territory but aren\'t afraid to share unpopular opinions when warranted.',
    factors: [
      { name: 'Controversial takes', score: 0.3 },
      { name: 'Hot topics', score: 0.5 },
      { name: 'Brand safety', score: 0.8 },
      { name: 'Edgy humor', score: 0.4 },
    ],
  },
  audienceResonance: {
    primary: 'Tech-savvy Millennials',
    confidence: 0.88,
    demographics: {
      age: '25-34',
      interests: ['Technology', 'Productivity', 'Career Growth', 'Gaming'],
      platforms: ['YouTube', 'Twitter', 'LinkedIn'],
    },
    engagement: {
      attention: 'High (avg. 65% watch time)',
      loyalty: 'Strong (40% return viewers)',
      interaction: 'Active commenters',
    },
    description:
      'Your content resonates most with young professionals interested in technology and self-improvement. They appreciate your depth of knowledge and accessible presentation style.',
  },
};

const recommendations = [
  {
    type: 'suggestion' as const,
    title: 'Lean into educational series',
    insight:
      'Your highest-performing content is educational. Consider creating a structured series format for complex topics.',
  },
  {
    type: 'info' as const,
    title: 'Optimize humor placement',
    insight:
      'Data shows your audience engages most when humor appears in the first 2 minutes. Front-load your jokes!',
  },
  {
    type: 'warning' as const,
    title: 'Risk calibration needed',
    insight:
      'Recent content has been playing it safe. Your audience expects occasional hot takes - don\'t be afraid to share opinions.',
  },
];

export default function CreatorDNAPage() {
  const [isRescanning, setIsRescanning] = useState(false);

  const handleRescan = () => {
    setIsRescanning(true);
    // Simulate rescan
    setTimeout(() => setIsRescanning(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Creator DNA</h1>
          <p className="text-surface-500 mt-1">
            Your unique creative fingerprint, analyzed by AI
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={handleRescan} disabled={isRescanning}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRescanning ? 'animate-spin' : ''}`} />
            {isRescanning ? 'Scanning...' : 'Rescan DNA'}
          </Button>
          <Button variant="ghost">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-surface-900">
                    DNA Analysis Complete
                  </h2>
                  <Badge variant="success" size="sm">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {Math.round(creatorDNA.confidence * 100)}% Confidence
                  </Badge>
                </div>
                <p className="text-surface-600 mb-3">
                  Based on {creatorDNA.contentSamples} content samples • Last analyzed{' '}
                  {creatorDNA.lastAnalyzed}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="ai">{creatorDNA.toneProfile.primary}</Badge>
                  <Badge variant="info">{creatorDNA.humorSignature.primary}</Badge>
                  <Badge variant="warning">{creatorDNA.riskProfile.level} Risk</Badge>
                  <Badge variant="success">{creatorDNA.audienceResonance.primary}</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* DNA Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tone Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader
              title="Tone Profile"
              icon={<MessageSquare className="w-5 h-5 text-blue-600" />}
              badge={
                <Badge variant="info" size="sm">
                  {Math.round(creatorDNA.toneProfile.confidence * 100)}%
                </Badge>
              }
            />
            <div className="p-6 pt-0 space-y-4">
              <div>
                <p className="text-lg font-semibold text-surface-900">
                  {creatorDNA.toneProfile.primary}
                </p>
                <p className="text-sm text-surface-500">
                  Secondary: {creatorDNA.toneProfile.secondary}
                </p>
              </div>

              <p className="text-sm text-surface-600">
                {creatorDNA.toneProfile.description}
              </p>

              <div className="space-y-3">
                {creatorDNA.toneProfile.traits.map((trait) => (
                  <ConfidenceBar
                    key={trait.name}
                    label={trait.name}
                    value={trait.score}
                  />
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Humor Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader
              title="Humor Signature"
              icon={<Sparkles className="w-5 h-5 text-yellow-500" />}
              badge={
                <Badge variant="warning" size="sm">
                  {Math.round(creatorDNA.humorSignature.confidence * 100)}%
                </Badge>
              }
            />
            <div className="p-6 pt-0 space-y-4">
              <div>
                <p className="text-lg font-semibold text-surface-900">
                  {creatorDNA.humorSignature.primary}
                </p>
                <p className="text-sm text-surface-500">
                  {creatorDNA.humorSignature.style}
                </p>
              </div>

              <p className="text-sm text-surface-600">
                {creatorDNA.humorSignature.description}
              </p>

              <div>
                <p className="text-xs text-surface-500 mb-2">Humor Type Breakdown</p>
                {creatorDNA.humorSignature.types.map((type) => (
                  <div key={type.name} className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-surface-700">{type.name}</span>
                      <span className="text-surface-500">{type.percentage}%</span>
                    </div>
                    <ProgressBar
                      value={type.percentage}
                      showValue={false}
                      size="sm"
                      color="default"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Risk Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader
              title="Risk Profile"
              icon={<AlertTriangle className="w-5 h-5 text-orange-500" />}
              badge={
                <Badge
                  variant={
                    creatorDNA.riskProfile.score > 0.7
                      ? 'danger'
                      : creatorDNA.riskProfile.score > 0.4
                      ? 'warning'
                      : 'success'
                  }
                  size="sm"
                >
                  {creatorDNA.riskProfile.level}
                </Badge>
              }
            />
            <div className="p-6 pt-0 space-y-4">
              <p className="text-sm text-surface-600">
                {creatorDNA.riskProfile.description}
              </p>

              <div className="space-y-3">
                {creatorDNA.riskProfile.factors.map((factor) => (
                  <ConfidenceBar
                    key={factor.name}
                    label={factor.name}
                    value={factor.score}
                  />
                ))}
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-800">
                  <strong>Tip:</strong> Your brand safety score is high, making you
                  attractive to mainstream advertisers.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Audience Resonance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader
              title="Audience Resonance"
              icon={<Users className="w-5 h-5 text-green-600" />}
              badge={
                <Badge variant="success" size="sm">
                  {Math.round(creatorDNA.audienceResonance.confidence * 100)}%
                </Badge>
              }
            />
            <div className="p-6 pt-0 space-y-4">
              <div>
                <p className="text-lg font-semibold text-surface-900">
                  {creatorDNA.audienceResonance.primary}
                </p>
                <p className="text-sm text-surface-500">
                  Age range: {creatorDNA.audienceResonance.demographics.age}
                </p>
              </div>

              <p className="text-sm text-surface-600">
                {creatorDNA.audienceResonance.description}
              </p>

              <div>
                <p className="text-xs text-surface-500 mb-2">Key Interests</p>
                <div className="flex flex-wrap gap-2">
                  {creatorDNA.audienceResonance.demographics.interests.map(
                    (interest) => (
                      <Badge key={interest} variant="default" size="sm">
                        {interest}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="text-center p-3 bg-surface-50 rounded-lg">
                  <p className="text-lg font-bold text-surface-900">65%</p>
                  <p className="text-xs text-surface-500">Avg Watch Time</p>
                </div>
                <div className="text-center p-3 bg-surface-50 rounded-lg">
                  <p className="text-lg font-bold text-surface-900">40%</p>
                  <p className="text-xs text-surface-500">Return Viewers</p>
                </div>
                <div className="text-center p-3 bg-surface-50 rounded-lg">
                  <p className="text-lg font-bold text-surface-900">High</p>
                  <p className="text-xs text-surface-500">Engagement</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader
            title="AI Recommendations"
            icon={<Zap className="w-5 h-5 text-purple-600" />}
          />
          <div className="p-6 pt-0 space-y-3">
            {recommendations.map((rec, index) => (
              <AIInsight
                key={index}
                type={rec.type}
                insight={`**${rec.title}:** ${rec.insight}`}
                action={{
                  label: 'Apply Insight',
                  onClick: () => console.log('Apply:', rec.title),
                }}
              />
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
