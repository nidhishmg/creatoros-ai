import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-surface-700 mb-1.5">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'w-full px-3 py-2 bg-white border rounded-lg text-surface-900 text-sm',
            'placeholder:text-surface-400',
            'focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary',
            'transition-all duration-200',
            error
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
              : 'border-surface-300',
            props.disabled && 'bg-surface-100 cursor-not-allowed opacity-60',
            className
          )}
          ref={ref}
          {...props}
        />
        {(error || hint) && (
          <p
            className={cn(
              'mt-1.5 text-xs',
              error ? 'text-red-500' : 'text-surface-500'
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-surface-700 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'w-full px-3 py-2 bg-white border rounded-lg text-surface-900 text-sm',
            'placeholder:text-surface-400 resize-none',
            'focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary',
            'transition-all duration-200',
            error
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
              : 'border-surface-300',
            props.disabled && 'bg-surface-100 cursor-not-allowed opacity-60',
            className
          )}
          ref={ref}
          {...props}
        />
        {(error || hint) && (
          <p
            className={cn(
              'mt-1.5 text-xs',
              error ? 'text-red-500' : 'text-surface-500'
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
