'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Youtube,
  Twitter,
  Instagram,
  Plus,
  X,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui';

/**
 * @deprecated This component is no longer used in the new onboarding flow.
 * Kept for backward compatibility. Use PlatformsStep and IntentStep instead.
 */

// Legacy types for backward compatibility
interface LegacyOnboardingData {
  creatorName: string;
  platforms: string[];
  contentSamples: string[];
  contentType: string[];
  goals: string[];
  socialLinks: {
    youtube?: string;
    twitter?: string;
    instagram?: string;
    tiktok?: string;
  };
}

interface DataInputStepProps {
  data: LegacyOnboardingData;
  updateData: (updates: Partial<LegacyOnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const contentTypes = [
  'Educational',
  'Entertainment',
  'News & Commentary',
  'Lifestyle',
  'Gaming',
  'Tech Reviews',
  'Vlogs',
  'Tutorials',
  'Podcasts',
  'Music',
];

const goals = [
  'Grow audience',
  'Increase engagement',
  'Monetize content',
  'Build brand deals',
  'Launch products',
  'Protect IP',
  'Improve content quality',
  'Expand platforms',
];

export function DataInputStep({
  data,
  updateData,
  onNext,
  onBack,
}: DataInputStepProps) {
  const [currentSample, setCurrentSample] = useState('');

  const addContentSample = () => {
    if (currentSample.trim()) {
      updateData({
        contentSamples: [...data.contentSamples, currentSample.trim()],
      });
      setCurrentSample('');
    }
  };

  const removeContentSample = (index: number) => {
    updateData({
      contentSamples: data.contentSamples.filter((_: string, i: number) => i !== index),
    });
  };

  const toggleContentType = (type: string) => {
    if (data.contentType.includes(type)) {
      updateData({
        contentType: data.contentType.filter((t: string) => t !== type),
      });
    } else {
      updateData({
        contentType: [...data.contentType, type],
      });
    }
  };

  const toggleGoal = (goal: string) => {
    if (data.goals.includes(goal)) {
      updateData({
        goals: data.goals.filter((g: string) => g !== goal),
      });
    } else {
      updateData({
        goals: [...data.goals, goal],
      });
    }
  };

  const isValid =
    data.creatorName.trim() &&
    data.contentSamples.length > 0 &&
    data.contentType.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-surface-900 mb-2">
          Tell us about your content
        </h2>
        <p className="text-surface-600">
          We'll use this to analyze your unique creator DNA
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Creator Name */}
        <Input
          label="Creator / Channel Name"
          placeholder="e.g., MrBeast, MKBHD, Emma Chamberlain"
          value={data.creatorName}
          onChange={(e) => updateData({ creatorName: e.target.value })}
        />

        {/* Content Samples */}
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">
            Content Samples
          </label>
          <p className="text-xs text-surface-500 mb-2">
            Paste video titles, tweets, or descriptions that represent your style
          </p>
          <div className="flex gap-2 mb-3">
            <Textarea
              placeholder="Paste a content sample (title, description, tweet, etc.)"
              value={currentSample}
              onChange={(e) => setCurrentSample(e.target.value)}
              className="flex-1"
              rows={2}
            />
            <Button onClick={addContentSample} variant="secondary" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {data.contentSamples.length > 0 && (
            <div className="space-y-2">
              {data.contentSamples.map((sample: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-2 p-3 bg-surface-50 rounded-lg border border-surface-200"
                >
                  <span className="flex-1 text-sm text-surface-700 line-clamp-2">
                    {sample}
                  </span>
                  <button
                    onClick={() => removeContentSample(index)}
                    className="p-1 text-surface-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Social Links */}
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-2">
            Social Links (optional)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative">
              <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
              <input
                type="url"
                placeholder="YouTube channel URL"
                value={data.socialLinks.youtube || ''}
                onChange={(e) =>
                  updateData({
                    socialLinks: { ...data.socialLinks, youtube: e.target.value },
                  })
                }
                className="w-full pl-10 pr-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary"
              />
            </div>
            <div className="relative">
              <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
              <input
                type="url"
                placeholder="Twitter / X profile URL"
                value={data.socialLinks.twitter || ''}
                onChange={(e) =>
                  updateData({
                    socialLinks: { ...data.socialLinks, twitter: e.target.value },
                  })
                }
                className="w-full pl-10 pr-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary"
              />
            </div>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-500" />
              <input
                type="url"
                placeholder="Instagram profile URL"
                value={data.socialLinks.instagram || ''}
                onChange={(e) =>
                  updateData({
                    socialLinks: {
                      ...data.socialLinks,
                      instagram: e.target.value,
                    },
                  })
                }
                className="w-full pl-10 pr-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary"
              />
            </div>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V9.82a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.25z" />
              </svg>
              <input
                type="url"
                placeholder="TikTok profile URL"
                value={data.socialLinks.tiktok || ''}
                onChange={(e) =>
                  updateData({
                    socialLinks: { ...data.socialLinks, tiktok: e.target.value },
                  })
                }
                className="w-full pl-10 pr-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary"
              />
            </div>
          </div>
        </div>

        {/* Content Type */}
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-2">
            Content Type (select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {contentTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleContentType(type)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  data.contentType.includes(type)
                    ? 'bg-accent-primary text-white'
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-2">
            Your Goals (select what matters most)
          </label>
          <div className="flex flex-wrap gap-2">
            {goals.map((goal) => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  data.goals.includes(goal)
                    ? 'bg-purple-600 text-white'
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Analyze My DNA
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
