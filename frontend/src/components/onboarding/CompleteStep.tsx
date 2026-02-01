'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Button, ConfidenceBar, Badge } from '@/components/ui';
import type { OnboardingFormData } from '@/lib/types';

interface CompleteStepProps {
  data: OnboardingFormData;
}

// Mock analysis results - in real app, this would come from API
const mockResults = {
  toneProfile: {
    primary: 'Educational & Engaging',
    confidence: 0.85,
    traits: ['Clear', 'Enthusiastic', 'Authoritative'],
  },
  humorSignature: {
    primary: 'Witty & Observational',
    confidence: 0.72,
    style: 'Light humor with pop culture references',
  },
  riskProfile: {
    level: 'Moderate',
    score: 0.45,
    insights: 'Balances safety with occasional bold takes',
  },
  audienceResonance: {
    primary: 'Tech-savvy millennials',
    confidence: 0.88,
    engagement: 'High attention, loyal following',
  },
};

export function CompleteStep({ data }: CompleteStepProps) {
  const router = useRouter();

  const handleEnterDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      {/* Success Header */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.1 }}
        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto"
      >
        <CheckCircle2 className="w-8 h-8 text-green-600" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-surface-900 mb-2">
          Your Creator DNA is Ready!
        </h2>
        <p className="text-surface-600">
          We've analyzed your content and built your unique creator profile
        </p>
      </motion.div>

      {/* Quick Results Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 mb-8"
      >
        <div className="p-4 bg-surface-50 rounded-xl border border-surface-200">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="font-semibold text-surface-900">
              {data.creator_name}
            </span>
            <Badge variant="ai" size="sm">
              DNA Analyzed
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ConfidenceBar
              label="Tone Profile"
              value={mockResults.toneProfile.confidence}
              explanation={mockResults.toneProfile.primary}
            />
            <ConfidenceBar
              label="Humor Signature"
              value={mockResults.humorSignature.confidence}
              explanation={mockResults.humorSignature.primary}
            />
            <ConfidenceBar
              label="Risk Profile"
              value={mockResults.riskProfile.score}
              explanation={mockResults.riskProfile.level}
            />
            <ConfidenceBar
              label="Audience Match"
              value={mockResults.audienceResonance.confidence}
              explanation={mockResults.audienceResonance.primary}
            />
          </div>
        </div>

        {/* Key Traits */}
        <div className="flex flex-wrap gap-2 justify-center">
          {mockResults.toneProfile.traits.map((trait) => (
            <Badge key={trait} variant="info" size="sm">
              {trait}
            </Badge>
          ))}
          <Badge variant="success" size="sm">
            {mockResults.audienceResonance.engagement}
          </Badge>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <Button onClick={handleEnterDashboard} size="lg" className="px-8">
          Enter Your Dashboard
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <p className="text-xs text-surface-400 mt-4">
          View detailed analysis and get AI-powered recommendations
        </p>
      </motion.div>
    </div>
  );
}
