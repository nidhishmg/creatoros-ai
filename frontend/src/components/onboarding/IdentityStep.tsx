'use client';

import { motion } from 'framer-motion';
import { User, Building2, Users, Briefcase, Heart, Globe, Flag, ArrowRight } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import type { OnboardingFormData, AccountType } from '@/lib/types';
import { ACCOUNT_TYPE_LABELS } from '@/lib/types';

interface IdentityStepProps {
  data: OnboardingFormData;
  updateData: (updates: Partial<OnboardingFormData>) => void;
  onNext: () => void;
}

const accountTypeIcons: Record<AccountType, React.ElementType> = {
  individual: User,
  team: Users,
  organization: Building2,
  club: Users,
  brand: Briefcase,
  community: Heart,
  ngo: Globe,
  political: Flag,
};

const accountTypes: AccountType[] = [
  'individual',
  'team',
  'organization',
  'club',
  'brand',
  'community',
  'ngo',
  'political',
];

export function IdentityStep({ data, updateData, onNext }: IdentityStepProps) {
  const isValid = data.creator_name.trim() && data.account_type;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-surface-900 mb-2">
          Let's start with your identity
        </h2>
        <p className="text-surface-600">
          Tell us about yourself so we can personalize your CreatorOS experience
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Creator Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            label="Creator / Organization Name"
            placeholder="e.g., Priya Sharma, Tech Talkies, Mumbai Cricket Academy"
            value={data.creator_name}
            onChange={(e) => updateData({ creator_name: e.target.value })}
            required
          />
          <p className="text-xs text-surface-500 mt-1">
            This is how you'll appear across CreatorOS
          </p>
        </motion.div>

        {/* Account Type */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-surface-700 mb-3">
            Account Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {accountTypes.map((type) => {
              const Icon = accountTypeIcons[type];
              const isSelected = data.account_type === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateData({ account_type: type })}
                  className={`
                    flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all
                    ${isSelected
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-surface-200 bg-white text-surface-600 hover:border-surface-300 hover:bg-surface-50'
                    }
                  `}
                >
                  <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-purple-600' : 'text-surface-400'}`} />
                  <span className="text-xs font-medium text-center">
                    {ACCOUNT_TYPE_LABELS[type]}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end pt-6"
        >
          <Button
            onClick={onNext}
            disabled={!isValid}
            className="gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
