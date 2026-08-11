'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// CVA Variants
// ============================================
const tooltipVariants = cva(
  [
    'absolute z-50 px-2 py-1 text-xs font-medium rounded-md shadow-md',
    'transition-all duration-150',
    'animate-fade-in',
  ],
  {
    variants: {
      variant: {
        default: 'bg-gray-900 text-white',
        light: 'bg-white text-gray-900 border border-gray-200',
        primary: 'bg-blue-600 text-white',
      },
      position: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'top',
    },
  }
);

// ============================================
// Type Definitions
// ============================================
export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  /** Content to display in the tooltip */
  content: React.ReactNode;
  /** The trigger element */
  children: React.ReactNode;
  /** Delay before showing (ms) */
  delay?: number;
  /** Whether tooltip is disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
}

// ============================================
// Component Implementation
// ============================================
export function Tooltip({
  content,
  children,
  variant,
  position,
  delay = 200,
  disabled = false,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = useCallback(() => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [delay, disabled]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && content && (
        <div
          id="tooltip"
          role="tooltip"
          className={cn(tooltipVariants({ variant, position }), className)}
        >
          {content}
          {/* Arrow */}
          <span
            className={cn(
              'absolute w-2 h-2 rotate-45',
              variant === 'light' ? 'bg-white border-gray-200' : '',
              variant === 'default' || !variant ? 'bg-gray-900' : '',
              variant === 'primary' ? 'bg-blue-600' : '',
              position === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2 border-b border-r',
              position === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2 border-t border-l',
              position === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2 border-t border-r',
              position === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2 border-b border-l'
            )}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

Tooltip.displayName = 'Tooltip';

export { tooltipVariants };
export default Tooltip;
