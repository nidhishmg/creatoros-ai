'use client';

import { motion } from 'framer-motion';
import { Sparkles, Brain, Zap, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AILoadingProps {
  message?: string;
  subMessage?: string;
  progress?: number;
  steps?: {
    label: string;
    status: 'pending' | 'active' | 'complete';
  }[];
}

export function AILoading({
  message = 'AI is thinking...',
  subMessage,
  progress,
  steps,
}: AILoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Animated AI Icon */}
      <div className="relative mb-6">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25"
        >
          <Brain className="w-8 h-8 text-white" />
        </motion.div>
        
        {/* Orbiting particles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <Sparkles className="absolute -top-1 left-1/2 w-4 h-4 text-purple-400" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <Zap className="absolute -bottom-1 right-0 w-3 h-3 text-blue-400" />
        </motion.div>
      </div>

      {/* Message */}
      <h3 className="text-lg font-semibold text-surface-900 mb-1">{message}</h3>
      {subMessage && (
        <p className="text-sm text-surface-500 mb-4">{subMessage}</p>
      )}

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="w-full max-w-xs mb-4">
          <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-surface-500 mt-1">{progress}% complete</p>
        </div>
      )}

      {/* Steps */}
      {steps && steps.length > 0 && (
        <div className="w-full max-w-xs space-y-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'flex items-center gap-3 p-2 rounded-lg text-sm',
                step.status === 'active' && 'bg-purple-50',
                step.status === 'complete' && 'bg-green-50'
              )}
            >
              {step.status === 'pending' && (
                <div className="w-5 h-5 rounded-full border-2 border-surface-300" />
              )}
              {step.status === 'active' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 rounded-full border-2 border-purple-500 border-t-transparent"
                />
              )}
              {step.status === 'complete' && (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              )}
              <span
                className={cn(
                  step.status === 'pending' && 'text-surface-400',
                  step.status === 'active' && 'text-purple-700 font-medium',
                  step.status === 'complete' && 'text-green-700'
                )}
              >
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

interface AIInsightProps {
  insight: string;
  type?: 'suggestion' | 'warning' | 'info' | 'success';
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function AIInsight({ insight, type = 'info', action }: AIInsightProps) {
  const icons = {
    suggestion: Sparkles,
    warning: Zap,
    info: Brain,
    success: CheckCircle2,
  };
  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border',
        type === 'suggestion' && 'bg-purple-50 border-purple-200',
        type === 'warning' && 'bg-amber-50 border-amber-200',
        type === 'info' && 'bg-blue-50 border-blue-200',
        type === 'success' && 'bg-green-50 border-green-200'
      )}
    >
      <div
        className={cn(
          'p-2 rounded-lg',
          type === 'suggestion' && 'bg-purple-100',
          type === 'warning' && 'bg-amber-100',
          type === 'info' && 'bg-blue-100',
          type === 'success' && 'bg-green-100'
        )}
      >
        <Icon
          className={cn(
            'w-4 h-4',
            type === 'suggestion' && 'text-purple-600',
            type === 'warning' && 'text-amber-600',
            type === 'info' && 'text-blue-600',
            type === 'success' && 'text-green-600'
          )}
        />
      </div>
      <div className="flex-1">
        <p
          className={cn(
            'text-sm',
            type === 'suggestion' && 'text-purple-800',
            type === 'warning' && 'text-amber-800',
            type === 'info' && 'text-blue-800',
            type === 'success' && 'text-green-800'
          )}
        >
          {insight}
        </p>
        {action && (
          <button
            onClick={action.onClick}
            className={cn(
              'mt-2 text-sm font-medium',
              type === 'suggestion' && 'text-purple-600 hover:text-purple-700',
              type === 'warning' && 'text-amber-600 hover:text-amber-700',
              type === 'info' && 'text-blue-600 hover:text-blue-700',
              type === 'success' && 'text-green-600 hover:text-green-700'
            )}
          >
            {action.label} →
          </button>
        )}
      </div>
    </motion.div>
  );
}
