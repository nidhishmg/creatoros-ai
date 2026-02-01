'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  TrendingUp,
  DollarSign,
  Briefcase,
  Shield,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui';
import type { OnboardingFormData, CreatorGoal } from '@/lib/types';
import { GOAL_LABELS } from '@/lib/types';

interface IntentStepProps {
  data: OnboardingFormData;
  updateData: (updates: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface GoalOption {
  key: CreatorGoal;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
}

const goalOptions: GoalOption[] = [
  {
    key: 'understand_content_style',
    icon: Sparkles,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Analyze your unique creative DNA and voice',
  },
  {
    key: 'grow_audience',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Data-driven strategies to expand your reach',
  },
  {
    key: 'monetize_audience',
    icon: DollarSign,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    description: 'Unlock revenue opportunities from your content',
  },
  {
    key: 'brand_collaborations',
    icon: Briefcase,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Connect with brands that match your values',
  },
  {
    key: 'avoid_content_risks',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Stay compliant and protect your reputation',
  },
  {
    key: 'license_content',
    icon: FileText,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    description: 'Monetize your IP through licensing deals',
  },
];

export function IntentStep({ data, updateData, onNext, onBack }: IntentStepProps) {
  const toggleGoal = (goal: CreatorGoal) => {
    const currentGoals = data.creator_goals || [];
    
    // If selecting "all_of_above", clear other selections and select all
    if (goal === 'all_of_above') {
      if (currentGoals.includes('all_of_above')) {
        updateData({ creator_goals: [] });
      } else {
        updateData({ creator_goals: ['all_of_above'] });
      }
      return;
    }
    
    // Remove "all_of_above" if selecting individual goals
    const filteredGoals = currentGoals.filter(g => g !== 'all_of_above');
    
    if (filteredGoals.includes(goal)) {
      updateData({ creator_goals: filteredGoals.filter(g => g !== goal) });
    } else {
      updateData({ creator_goals: [...filteredGoals, goal] });
    }
  };

  const isSelected = (goal: CreatorGoal) => {
    if (data.creator_goals?.includes('all_of_above') && goal !== 'all_of_above') {
      return true;
    }
    return data.creator_goals?.includes(goal) || false;
  };

  const isValid = data.creator_goals && data.creator_goals.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-surface-900 mb-2">
          What do you want CreatorOS to help you with?
        </h2>
        <p className="text-surface-600">
          Select all that apply. This helps us personalize your experience.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Goal Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {goalOptions.map((option, index) => {
            const Icon = option.icon;
            const selected = isSelected(option.key);
            
            return (
              <motion.button
                key={option.key}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => toggleGoal(option.key)}
                className={`
                  flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all
                  ${selected
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-surface-200 bg-white hover:border-surface-300 hover:bg-surface-50'
                  }
                `}
              >
                <div className={`p-2 rounded-lg ${selected ? 'bg-purple-100' : option.bgColor}`}>
                  <Icon className={`w-5 h-5 ${selected ? 'text-purple-600' : option.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${selected ? 'text-purple-900' : 'text-surface-900'}`}>
                      {GOAL_LABELS[option.key]}
                    </span>
                    {selected && (
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                  <p className={`text-xs mt-1 ${selected ? 'text-purple-700' : 'text-surface-500'}`}>
                    {option.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* All of the Above Option */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => toggleGoal('all_of_above')}
          className={`
            w-full flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all
            ${data.creator_goals?.includes('all_of_above')
              ? 'border-purple-500 bg-purple-100 text-purple-900'
              : 'border-surface-300 border-dashed bg-surface-50 text-surface-700 hover:border-purple-300 hover:bg-purple-50'
            }
          `}
        >
          {data.creator_goals?.includes('all_of_above') ? (
            <CheckCircle className="w-5 h-5 text-purple-600" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          <span className="font-medium">{GOAL_LABELS.all_of_above}</span>
        </motion.button>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between pt-6"
        >
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button onClick={onNext} disabled={!isValid} className="gap-2">
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
