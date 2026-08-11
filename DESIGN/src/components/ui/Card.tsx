'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// CVA Variants
// ============================================
const cardVariants = cva(
  [
    'rounded-xl bg-white',
    'transition-all duration-200',
  ],
  {
    variants: {
      variant: {
        default: 'border border-gray-200',
        elevated: 'shadow-lg border border-gray-100',
        outlined: 'border-2 border-gray-300',
        filled: 'bg-gray-50 border border-gray-100',
        ghost: 'bg-transparent',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
      interactive: {
        true: [
          'cursor-pointer',
          'hover:shadow-md hover:border-gray-300',
          'active:scale-[0.99]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        ],
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      interactive: false,
    },
  }
);

// ============================================
// Type Definitions
// ============================================
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Test ID */
  testId?: string;
}

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Title of the card */
  title?: React.ReactNode;
  /** Subtitle or description */
  subtitle?: React.ReactNode;
  /** Actions to display on the right */
  action?: React.ReactNode;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Align footer content */
  align?: 'left' | 'center' | 'right' | 'between';
}

// ============================================
// Card Component
// ============================================
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      interactive,
      testId = 'card',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, interactive }), className)}
        data-testid={testId}
        data-variant={variant}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? 'button' : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ============================================
// Card Header Component
// ============================================
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-start justify-between gap-4', className)}
        {...props}
      >
        <div className="flex flex-col gap-1">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {children}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// ============================================
// Card Content Component
// ============================================
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mt-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

// ============================================
// Card Footer Component
// ============================================
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, align = 'right', children, ...props }, ref) => {
    const alignClasses = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'mt-6 flex items-center gap-3 border-t border-gray-100 pt-4',
          alignClasses[align],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export { cardVariants };
export default Card;
