'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeStep } from './WelcomeStep';
import { IdentityStep } from './IdentityStep';
import { PlatformsStep } from './PlatformsStep';
import { IntentStep } from './IntentStep';
import { ConfirmationStep } from './ConfirmationStep';
import { CompleteStep } from './CompleteStep';
import type { OnboardingFormData, AccountType } from '@/lib/types';

/**
 * Onboarding Flow Steps:
 * 1. Welcome - Introduction to CreatorOS
 * 2. Identity - Creator name + account type
 * 3. Platforms - Connect social platforms (login/manual/skip)
 * 4. Intent - Select goals
 * 5. Confirmation - Review + Start AI Scan
 * 6. Complete - Show results
 */
export type OnboardingStep = 'welcome' | 'identity' | 'platforms' | 'intent' | 'confirmation' | 'complete';

const scanStepsConfig = [
  { label: 'Analyzing content patterns', duration: 2000 },
  { label: 'Detecting tone & voice', duration: 2500 },
  { label: 'Measuring humor signature', duration: 1500 },
  { label: 'Calculating risk profile', duration: 2000 },
  { label: 'Understanding audience', duration: 2500 },
  { label: 'Building Creator DNA', duration: 3000 },
];

export function OnboardingFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [data, setData] = useState<OnboardingFormData>({
    creator_name: '',
    account_type: 'individual' as AccountType,
    platforms: {
      instagram: { skipped: false },
      facebook: { skipped: false },
      youtube: { skipped: false },
      twitter: { skipped: false },
    },
    creator_goals: [],
  });

  // Scanning state
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [scanSteps, setScanSteps] = useState<{ label: string; status: 'pending' | 'active' | 'complete' }[]>(
    scanStepsConfig.map(s => ({ label: s.label, status: 'pending' }))
  );

  const updateData = (updates: Partial<OnboardingFormData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const steps: OnboardingStep[] = ['welcome', 'identity', 'platforms', 'intent', 'confirmation', 'complete'];

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanStepIndex(0);
    setScanSteps(scanStepsConfig.map(s => ({ label: s.label, status: 'pending' as const })));
  };

  // Handle scanning animation
  useEffect(() => {
    if (!isScanning) return;

    const totalTime = scanStepsConfig.reduce((sum, s) => sum + s.duration, 0);
    
    // Progress animation
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, totalTime / 100);

    // Step progression
    let stepTimeout: NodeJS.Timeout;
    const advanceStep = (index: number) => {
      if (index < scanStepsConfig.length) {
        setScanStepIndex(index);
        setScanSteps(prev => prev.map((s, i) => ({
          ...s,
          status: i < index ? 'complete' : i === index ? 'active' : 'pending'
        })));
        
        stepTimeout = setTimeout(() => advanceStep(index + 1), scanStepsConfig[index].duration);
      } else {
        // All steps complete
        setScanSteps(prev => prev.map(s => ({ ...s, status: 'complete' as const })));
        setTimeout(() => {
          setIsScanning(false);
          setCurrentStep('complete');
        }, 500);
      }
    };

    advanceStep(0);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [isScanning]);

  const stepComponents: Record<OnboardingStep, React.ReactNode> = {
    welcome: <WelcomeStep onNext={nextStep} />,
    identity: (
      <IdentityStep
        data={data}
        updateData={updateData}
        onNext={nextStep}
      />
    ),
    platforms: (
      <PlatformsStep
        data={data}
        updateData={updateData}
        onNext={nextStep}
        onBack={prevStep}
      />
    ),
    intent: (
      <IntentStep
        data={data}
        updateData={updateData}
        onNext={nextStep}
        onBack={prevStep}
      />
    ),
    confirmation: (
      <ConfirmationStep
        data={data}
        onBack={prevStep}
        onStartScan={startScan}
        isScanning={isScanning}
        scanProgress={scanProgress}
        scanSteps={scanSteps}
      />
    ),
    complete: <CompleteStep data={data} />,
  };

  // Calculate progress for indicators
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl"
        >
          {stepComponents[currentStep]}
        </motion.div>
      </AnimatePresence>

      {/* Progress indicators */}
      {!isScanning && currentStep !== 'complete' && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {steps.slice(0, -1).map((step, index) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStepIndex
                  ? 'bg-accent-primary'
                  : index < currentStepIndex
                  ? 'bg-accent-primary/50'
                  : 'bg-surface-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Re-export types for backward compatibility
export type { OnboardingFormData } from '@/lib/types';
