'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Check,
  User,
  Target,
} from 'lucide-react';
import { Button, Badge, AILoading } from '@/components/ui';
import type { OnboardingFormData, CreatorGoal } from '@/lib/types';
import { ACCOUNT_TYPE_LABELS, GOAL_LABELS } from '@/lib/types';

interface ConfirmationStepProps {
  data: OnboardingFormData;
  onBack: () => void;
  onStartScan: () => void;
  isScanning: boolean;
  scanProgress: number;
  scanSteps: { label: string; status: 'pending' | 'active' | 'complete' }[];
}

const platformIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
};

const platformColors = {
  instagram: 'text-pink-600 bg-pink-50',
  facebook: 'text-blue-600 bg-blue-50',
  youtube: 'text-red-600 bg-red-50',
  twitter: 'text-sky-500 bg-sky-50',
};

export function ConfirmationStep({
  data,
  onBack,
  onStartScan,
  isScanning,
  scanProgress,
  scanSteps,
}: ConfirmationStepProps) {
  // Get added platforms
  const addedPlatforms = Object.entries(data.platforms || {})
    .filter(([_, platformData]) => platformData && !platformData.skipped)
    .map(([key, platformData]) => ({
      key: key as keyof typeof platformIcons,
      data: platformData,
    }));

  // Get selected goals
  const selectedGoals = data.creator_goals || [];

  if (isScanning) {
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
            Analyzing your content across {addedPlatforms.length} platform{addedPlatforms.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        <AILoading
          message="AI Analysis in Progress"
          subMessage="This usually takes about 30 seconds"
          progress={scanProgress}
          steps={scanSteps}
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

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-surface-900 mb-2">
          Ready to analyze your Creator DNA
        </h2>
        <p className="text-surface-600">
          Review your information before we begin the AI analysis
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Identity Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-surface-50 rounded-xl border border-surface-200"
        >
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-surface-900">Identity</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-surface-500">Creator Name</p>
              <p className="font-medium text-surface-900">{data.creator_name}</p>
            </div>
            <div>
              <p className="text-xs text-surface-500">Account Type</p>
              <p className="font-medium text-surface-900">
                {data.account_type ? ACCOUNT_TYPE_LABELS[data.account_type] : '-'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Platforms Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-surface-50 rounded-xl border border-surface-200"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-pink-500 to-purple-600" />
            <span className="font-semibold text-surface-900">Connected Platforms</span>
            <Badge variant="default" size="sm">{addedPlatforms.length}</Badge>
          </div>
          <div className="space-y-2">
            {addedPlatforms.map(({ key, data: platformData }) => {
              const Icon = platformIcons[key];
              const colors = platformColors[key];
              return (
                <div
                  key={key}
                  className="flex items-center justify-between p-2 bg-white rounded-lg border border-surface-100"
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded ${colors}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-900 capitalize">{key}</p>
                      <p className="text-xs text-surface-500">
                        {'handle' in platformData && platformData.handle 
                          ? platformData.handle 
                          : 'channel_url' in platformData && platformData.channel_url 
                            ? platformData.channel_url 
                            : 'Connected'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {platformData?.followers !== undefined && platformData.followers > 0 && (
                      <p className="text-sm font-medium text-surface-900">
                        {platformData.followers.toLocaleString()} followers
                      </p>
                    )}
                    <Badge variant="ai" size="sm">
                      {platformData?.auth_method === 'credentials' ? 'Login' : 
                       platformData?.auth_method === 'url' ? 'URL' : 'Manual'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Goals Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-surface-50 rounded-xl border border-surface-200"
        >
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-surface-900">Goals</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedGoals.includes('all_of_above') ? (
              <Badge variant="success" className="gap-1">
                <Check className="w-3 h-3" />
                All Goals Selected
              </Badge>
            ) : (
              selectedGoals.map((goal) => (
                <Badge key={goal} variant="default" className="gap-1">
                  <Check className="w-3 h-3" />
                  {GOAL_LABELS[goal as CreatorGoal]}
                </Badge>
              ))
            )}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between pt-6"
        >
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button onClick={onStartScan} className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Play className="w-4 h-4" />
            Start AI Analysis
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
