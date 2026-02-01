'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingFlow } from '@/components/onboarding';

export default function HomePage() {
  const router = useRouter();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has completed onboarding
    const completed = localStorage.getItem('creatoros_onboarding_complete');
    if (completed === 'true') {
      router.push('/dashboard');
    } else {
      setHasCompletedOnboarding(false);
    }
  }, [router]);

  // Show nothing while checking onboarding status
  if (hasCompletedOnboarding === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl" />
        </div>
      </div>
    );
  }

  return <OnboardingFlow />;
}
