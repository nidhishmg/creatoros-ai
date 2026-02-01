'use client';

import { motion } from 'framer-motion';
import { Sparkles, Brain, Rocket, Shield } from 'lucide-react';
import { Button } from '@/components/ui';

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  const features = [
    {
      icon: Brain,
      title: 'Creator DNA Analysis',
      description: 'AI-powered analysis of your unique creative identity',
    },
    {
      icon: Sparkles,
      title: 'Content Intelligence',
      description: 'Smart insights to optimize your content strategy',
    },
    {
      icon: Rocket,
      title: 'Growth Optimization',
      description: 'Data-driven recommendations for audience growth',
    },
    {
      icon: Shield,
      title: 'IP Protection',
      description: 'Safeguard your creative work and brand identity',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.1 }}
        className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg shadow-purple-500/25"
      >
        <span className="text-white font-bold text-2xl">C</span>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-surface-900 mb-3">
          Welcome to CreatorOS
        </h1>
        <p className="text-surface-600 text-lg max-w-md mx-auto">
          The AI-powered operating system built for creators. Let's understand
          your unique creative DNA.
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-surface-50 border border-surface-200"
          >
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <feature.icon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-surface-900 text-sm">
                {feature.title}
              </h3>
              <p className="text-xs text-surface-500 mt-0.5">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-center"
      >
        <Button onClick={onNext} size="lg" className="px-8">
          Get Started
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
        <p className="text-xs text-surface-400 mt-4">
          Takes about 2 minutes to complete
        </p>
      </motion.div>
    </div>
  );
}
