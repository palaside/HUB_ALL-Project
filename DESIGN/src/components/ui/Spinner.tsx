'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps {
  /** Size of the spinner in pixels */
  size?: number;
  /** Color of the spinner (CSS color value) */
  color?: string;
  /** Additional CSS classes */
  className?: string;
  /** Label for accessibility */
  label?: string;
}

/**
 * Spinner Component
 * Displays a loading indicator with customizable size and color
 * 
 * @example
 * ```tsx
 * <Spinner size={24} color="var(--color-primary-500)" />
 * ```
 */
export function Spinner({
  size = 16,
  color = 'currentColor',
  className,
  label = 'Loading...',
}: SpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('animate-spin', className)}
      role="progressbar"
      aria-label={label}
      aria-live="polite"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={0.25}
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

Spinner.displayName = 'Spinner';

export default Spinner;
