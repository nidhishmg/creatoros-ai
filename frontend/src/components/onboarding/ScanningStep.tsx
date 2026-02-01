'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AILoading } from '@/components/ui';

/**
 * @deprecated This component is no longer used in the new onboarding flow.
 * The scanning functionality is now integrated into ConfirmationStep.
 */

// Legacy types for backward compatibility
interface LegacyOnboardingData {
  creatorName: string;
  platforms: string[];
  contentSamples: string[];
  contentType: string[];
  goals: string[];
}

interface ScanningStepProps {
  data: LegacyOnboardingData;
  onNext: () => void;
}

const scanSteps = [
  { label: 'Analyzing content patterns', duration: 2000 },
  { label: 'Detecting tone & voice', duration: 2500 },
  { label: 'Measuring humor signature', duration: 1500 },
  { label: 'Calculating risk profile', duration: 2000 },
  { label: 'Mapping audience resonance', duration: 2500 },
  { label: 'Generating creator DNA', duration: 3000 },
];

export function ScanningStep({ data, onNext }: ScanningStepProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let totalDuration = 0;
    const stepDurations = scanSteps.map((s) => s.duration);
    const totalTime = stepDurations.reduce((a, b) => a + b, 0);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, totalTime / 100);

    // Step progression
    const advanceStep = (index: number) => {
      if (index < scanSteps.length) {
        setCurrentStepIndex(index);
        setTimeout(() => advanceStep(index + 1), stepDurations[index]);
      } else {
        // All steps complete
        setTimeout(() => {
          onNext();
        }, 500);
      }
    };

    advanceStep(0);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onNext]);

  const steps = scanSteps.map((step, index) => ({
    label: step.label,
    status:
      index < currentStepIndex
        ? 'complete'
        : index === currentStepIndex
        ? 'active'
        : 'pending',
  })) as { label: string; status: 'pending' | 'active' | 'complete' }[];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-surface-900 mb-2">
          Scanning Your Creator DNA
        </h2>
        <p className="text-surface-600">
          Analyzing {data.contentSamples.length} content samples for{' '}
          {data.creatorName}
        </p>
      </motion.div>

      <AILoading
        message="AI Analysis in Progress"
        subMessage="This usually takes about 30 seconds"
        progress={progress}
        steps={steps}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 p-4 bg-surface-50 rounded-xl border border-surface-200"
      >
        <h4 className="text-sm font-medium text-surface-700 mb-2">
          What we're analyzing:
        </h4>
        <ul className="text-xs text-surface-500 space-y-1">
          <li>• Communication style and tone patterns</li>
          <li>• Humor types and frequency</li>
          <li>• Content risk tolerance</li>
          <li>• Audience engagement triggers</li>
          <li>• Unique voice fingerprint</li>
        </ul>
      </motion.div>
    </div>
  );
}
