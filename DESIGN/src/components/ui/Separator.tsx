'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation of the separator */
  orientation?: 'horizontal' | 'vertical';
  /** Whether to add space around */
  decorative?: boolean;
  /** Label text in the middle */
  label?: string;
}

// ============================================
// Component
// ============================================
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      label,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === 'horizontal';

    if (label && isHorizontal) {
      return (
        <div
          ref={ref}
          role={decorative ? 'none' : 'separator'}
          aria-orientation={orientation}
          className={cn('flex items-center', className)}
          {...props}
        >
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-sm text-gray-500">{label}</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={orientation}
        className={cn(
          'shrink-0 bg-gray-200',
          isHorizontal ? 'h-px w-full' : 'h-full w-px',
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export default Separator;
