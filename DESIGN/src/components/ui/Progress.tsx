'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// CVA Variants
// ============================================
const progressVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-gray-200',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const progressBarVariants = cva(
  'h-full rounded-full transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        default: 'bg-blue-500',
        success: 'bg-green-500',
        warning: 'bg-amber-500',
        danger: 'bg-red-500',
        gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
      },
      animated: {
        true: 'animate-pulse',
        false: '',
      },
      striped: {
        true: 'bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animated: false,
      striped: false,
    },
  }
);

// ============================================
// Type Definitions
// ============================================
export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressBarVariants> {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label formatter */
  labelFormatter?: (value: number, max: number) => string;
  /** Indeterminate state (loading) */
  indeterminate?: boolean;
  /** Test ID */
  testId?: string;
}

// ============================================
// Component Implementation
// ============================================
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      size,
      variant,
      animated,
      striped,
      value,
      max = 100,
      showLabel = false,
      labelFormatter,
      indeterminate = false,
      testId = 'progress',
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const displayLabel = labelFormatter
      ? labelFormatter(value, max)
      : `${Math.round(percentage)}%`;

    return (
      <div className="w-full">
        {showLabel && (
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{displayLabel}</span>
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          aria-label={`Progress: ${displayLabel}`}
          className={cn(progressVariants({ size }), className)}
          data-testid={testId}
          data-value={value}
          data-max={max}
          {...props}
        >
          <div
            className={cn(
              progressBarVariants({ variant, animated, striped }),
              indeterminate && 'animate-[progress-indeterminate_1.5s_ease-in-out_infinite] w-1/3'
            )}
            style={{
              width: indeterminate ? undefined : `${percentage}%`,
            }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { progressVariants, progressBarVariants };
export default Progress;
