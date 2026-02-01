'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  AlertTriangle,
  SkipForward,
  Check,
} from 'lucide-react';
import { Button, Input, Badge } from '@/components/ui';
import type { OnboardingFormData } from '@/lib/types';

interface PlatformsStepProps {
  data: OnboardingFormData;
  updateData: (updates: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

type PlatformKey = 'instagram' | 'facebook' | 'youtube' | 'twitter';

interface PlatformConfig {
  key: PlatformKey;
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  supportsCredentials: boolean;
  handlePlaceholder: string;
}

const platforms: PlatformConfig[] = [
  {
    key: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    supportsCredentials: true,
    handlePlaceholder: '@yourhandle',
  },
  {
    key: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    supportsCredentials: true,
    handlePlaceholder: 'Your Page Name',
  },
  {
    key: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    supportsCredentials: false,
    handlePlaceholder: 'https://youtube.com/@yourchannel',
  },
  {
    key: 'twitter',
    name: 'Twitter / X',
    icon: Twitter,
    color: 'text-sky-500',
    bgColor: 'bg-sky-50',
    supportsCredentials: true,
    handlePlaceholder: '@yourhandle',
  },
];

export function PlatformsStep({ data, updateData, onNext, onBack }: PlatformsStepProps) {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [expandedPlatform, setExpandedPlatform] = useState<PlatformKey | null>('instagram');

  const togglePassword = (platform: string) => {
    setShowPasswords(prev => ({ ...prev, [platform]: !prev[platform] }));
  };

  const updatePlatform = (
    platform: PlatformKey,
    field: string,
    value: string | number | boolean | undefined
  ) => {
    const currentPlatforms = data.platforms || {};
    const currentPlatform = currentPlatforms[platform] || { skipped: false };
    
    updateData({
      platforms: {
        ...currentPlatforms,
        [platform]: {
          ...currentPlatform,
          [field]: value,
        },
      },
    });
  };

  const skipPlatform = (platform: PlatformKey) => {
    updatePlatform(platform, 'skipped', true);
    // Move to next platform
    const currentIndex = platforms.findIndex(p => p.key === platform);
    if (currentIndex < platforms.length - 1) {
      setExpandedPlatform(platforms[currentIndex + 1].key);
    } else {
      setExpandedPlatform(null);
    }
  };

  const unskipPlatform = (platform: PlatformKey) => {
    updatePlatform(platform, 'skipped', false);
    setExpandedPlatform(platform);
  };

  const getPlatformData = (platform: PlatformKey) => {
    return data.platforms?.[platform] || { skipped: false };
  };

  const isPlatformComplete = (platform: PlatformKey): boolean => {
    const platformData = getPlatformData(platform);
    if (platformData.skipped) return true;
    
    // For credentials method, we just need email (password is optional for demo)
    if (platformData.auth_method === 'credentials') {
      return !!('email' in platformData && platformData.email);
    }
    
    // For URL method (YouTube)
    if (platformData.auth_method === 'url') {
      return !!('channel_url' in platformData && platformData.channel_url);
    }
    
    // For manual method, need handle/channel_url and followers
    if (platformData.auth_method === 'manual') {
      if (platform === 'youtube') {
        return !!platformData.followers;
      }
      return !!('handle' in platformData && platformData.handle && platformData.followers !== undefined);
    }
    
    return false;
  };

  const allPlatformsHandled = platforms.every(p => {
    const platformData = getPlatformData(p.key);
    return platformData.skipped || isPlatformComplete(p.key);
  });

  const atLeastOnePlatformAdded = platforms.some(p => {
    const platformData = getPlatformData(p.key);
    return !platformData.skipped && isPlatformComplete(p.key);
  });

  const canProceed = allPlatformsHandled && atLeastOnePlatformAdded;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-surface-900 mb-2">
          Where do you create content?
        </h2>
        <p className="text-surface-600">
          Connect your platforms or enter details manually. You can skip platforms you don't use.
        </p>
      </motion.div>

      {/* Disclaimer Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2"
      >
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-amber-800 font-medium">Demo Mode</p>
          <p className="text-xs text-amber-700">
            Social platform credentials are optional and used only for demo simulation.
            No actual login or data sync occurs.
          </p>
        </div>
      </motion.div>

      {/* Platforms */}
      <div className="space-y-3">
        {platforms.map((platform, index) => {
          const Icon = platform.icon;
          const platformData = getPlatformData(platform.key);
          const isExpanded = expandedPlatform === platform.key;
          const isSkipped = platformData.skipped;
          const isComplete = isPlatformComplete(platform.key);

          return (
            <motion.div
              key={platform.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`border rounded-xl overflow-hidden transition-all ${
                isSkipped ? 'border-surface-200 bg-surface-50' : 
                isComplete ? 'border-green-200 bg-green-50/50' :
                isExpanded ? 'border-purple-300 bg-white' : 'border-surface-200 bg-white'
              }`}
            >
              {/* Platform Header */}
              <div
                className={`flex items-center justify-between p-4 cursor-pointer ${
                  isSkipped ? 'opacity-60' : ''
                }`}
                onClick={() => isSkipped ? unskipPlatform(platform.key) : setExpandedPlatform(isExpanded ? null : platform.key)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${platform.bgColor}`}>
                    <Icon className={`w-5 h-5 ${platform.color}`} />
                  </div>
                  <div>
                    <span className="font-medium text-surface-900">{platform.name}</span>
                    {isSkipped && (
                      <Badge variant="default" size="sm" className="ml-2">Skipped</Badge>
                    )}
                    {isComplete && !isSkipped && (
                      <Badge variant="success" size="sm" className="ml-2">
                        <Check className="w-3 h-3 mr-1" />
                        Added
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isSkipped && !isComplete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        skipPlatform(platform.key);
                      }}
                      className="text-surface-500 hover:text-surface-700"
                    >
                      <SkipForward className="w-4 h-4 mr-1" />
                      Skip
                    </Button>
                  )}
                  {isSkipped && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        unskipPlatform(platform.key);
                      }}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      Add Platform
                    </Button>
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && !isSkipped && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-surface-200"
                  >
                    <div className="p-4 space-y-4">
                      {/* Auth Method Toggle */}
                      <div className="flex gap-2">
                        {platform.supportsCredentials && (
                          <button
                            type="button"
                            onClick={() => updatePlatform(platform.key, 'auth_method', 'credentials')}
                            className={`flex-1 py-2 px-3 text-sm rounded-lg border transition-all ${
                              platformData.auth_method === 'credentials'
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-surface-200 text-surface-600 hover:border-surface-300'
                            }`}
                          >
                            Login (Demo)
                          </button>
                        )}
                        {platform.key === 'youtube' && (
                          <button
                            type="button"
                            onClick={() => updatePlatform(platform.key, 'auth_method', 'url')}
                            className={`flex-1 py-2 px-3 text-sm rounded-lg border transition-all ${
                              platformData.auth_method === 'url'
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-surface-200 text-surface-600 hover:border-surface-300'
                            }`}
                          >
                            Paste URL
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => updatePlatform(platform.key, 'auth_method', 'manual')}
                          className={`flex-1 py-2 px-3 text-sm rounded-lg border transition-all ${
                            platformData.auth_method === 'manual'
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-surface-200 text-surface-600 hover:border-surface-300'
                          }`}
                        >
                          Manual Entry
                        </button>
                      </div>

                      {/* Credentials Form */}
                      {platformData.auth_method === 'credentials' && (
                        <div className="space-y-3 p-3 bg-surface-50 rounded-lg">
                          <p className="text-xs text-surface-500 mb-2">
                            ⚠️ Demo only - credentials are not sent to any platform
                          </p>
                          <Input
                            label="Email ID"
                            type="email"
                            placeholder="your@email.com"
                            value={platformData.email || ''}
                            onChange={(e) => updatePlatform(platform.key, 'email', e.target.value)}
                          />
                          <div className="relative">
                            <Input
                              label="Password (optional)"
                              type={showPasswords[platform.key] ? 'text' : 'password'}
                              placeholder="••••••••"
                              value={platformData.password || ''}
                              onChange={(e) => updatePlatform(platform.key, 'password', e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => togglePassword(platform.key)}
                              className="absolute right-3 top-8 text-surface-400 hover:text-surface-600"
                            >
                              {showPasswords[platform.key] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* URL Form (YouTube) */}
                      {platformData.auth_method === 'url' && (
                        <div className="space-y-3">
                          <Input
                            label="Channel URL"
                            type="url"
                            placeholder={platform.handlePlaceholder}
                            value={platformData.channel_url || ''}
                            onChange={(e) => updatePlatform(platform.key, 'channel_url', e.target.value)}
                          />
                        </div>
                      )}

                      {/* Manual Form */}
                      {platformData.auth_method === 'manual' && (
                        <div className="space-y-3">
                          <Input
                            label={platform.key === 'youtube' ? 'Channel Name' : 'Handle / Page Name'}
                            placeholder={platform.handlePlaceholder}
                            value={'handle' in platformData ? (platformData.handle || '') : ''}
                            onChange={(e) => updatePlatform(platform.key, 'handle', e.target.value)}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <Input
                              label="Approximate Followers"
                              type="number"
                              placeholder="e.g., 10000"
                              value={platformData.followers || ''}
                              onChange={(e) => updatePlatform(platform.key, 'followers', parseInt(e.target.value) || 0)}
                            />
                            <Input
                              label="Avg. Engagement Rate (%)"
                              type="number"
                              step="0.1"
                              placeholder="e.g., 4.5"
                              value={platformData.engagement_rate || ''}
                              onChange={(e) => updatePlatform(platform.key, 'engagement_rate', parseFloat(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                      )}

                      {/* Done Button */}
                      {platformData.auth_method && (
                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            onClick={() => {
                              const currentIndex = platforms.findIndex(p => p.key === platform.key);
                              if (currentIndex < platforms.length - 1) {
                                setExpandedPlatform(platforms[currentIndex + 1].key);
                              } else {
                                setExpandedPlatform(null);
                              }
                            }}
                            disabled={!isPlatformComplete(platform.key)}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Done
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

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
        <Button onClick={onNext} disabled={!canProceed} className="gap-2">
          Continue
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>

      {!atLeastOnePlatformAdded && (
        <p className="text-xs text-amber-600 text-center mt-3">
          Please add at least one platform to continue
        </p>
      )}
    </div>
  );
}
