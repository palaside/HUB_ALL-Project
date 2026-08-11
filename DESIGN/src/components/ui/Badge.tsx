'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// CVA Variants
// ============================================
const badgeVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-full font-medium',
    'transition-colors duration-200',
  ],
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-blue-100 text-blue-800',
        secondary: 'bg-purple-100 text-purple-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-amber-100 text-amber-800',
        danger: 'bg-red-100 text-red-800',
        outline: 'border border-gray-300 text-gray-700 bg-transparent',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ============================================
// Type Definitions
// ============================================
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Icon to display before the text */
  icon?: React.ReactNode;
  /** Whether to show a dot indicator */
  dot?: boolean;
  /** Test ID */
  testId?: string;
}

// ============================================
// Component Implementation
// ============================================
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      dot,
      children,
      testId = 'badge',
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        data-testid={testId}
        data-variant={variant}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'mr-1.5 h-1.5 w-1.5 rounded-full',
              variant === 'success' && 'bg-green-500',
              variant === 'warning' && 'bg-amber-500',
              variant === 'danger' && 'bg-red-500',
              variant === 'primary' && 'bg-blue-500',
              variant === 'secondary' && 'bg-purple-500',
              (!variant || variant === 'default' || variant === 'outline') && 'bg-gray-500'
            )}
            aria-hidden="true"
          />
        )}
        {icon && (
          <span className="mr-1" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { badgeVariants };
export default Badge;
