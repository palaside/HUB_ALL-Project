'use client';

import React, { forwardRef, useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// CVA Variants
// ============================================
const toggleVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md',
    'text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-transparent text-gray-600',
          'hover:bg-gray-100 hover:text-gray-900',
          'data-[state=on]:bg-gray-200 data-[state=on]:text-gray-900',
        ],
        outline: [
          'border border-gray-300 bg-transparent text-gray-600',
          'hover:bg-gray-50 hover:text-gray-900',
          'data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900',
        ],
        primary: [
          'bg-transparent text-gray-600',
          'hover:bg-blue-50 hover:text-blue-600',
          'data-[state=on]:bg-blue-500 data-[state=on]:text-white',
        ],
      },
      size: {
        sm: 'h-8 px-2',
        md: 'h-10 px-3',
        lg: 'h-12 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ============================================
// Types
// ============================================
export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  /** Whether the toggle is pressed */
  pressed?: boolean;
  /** Default pressed state */
  defaultPressed?: boolean;
  /** Callback when pressed state changes */
  onPressedChange?: (pressed: boolean) => void;
}

// ============================================
// Component
// ============================================
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant,
      size,
      pressed,
      defaultPressed = false,
      disabled,
      onPressedChange,
      children,
      ...props
    },
    ref
  ) => {
    const [internalPressed, setInternalPressed] = useState(defaultPressed);
    const isPressed = pressed ?? internalPressed;

    const handleClick = useCallback(() => {
      if (disabled) return;
      const newPressed = !isPressed;
      if (pressed === undefined) {
        setInternalPressed(newPressed);
      }
      onPressedChange?.(newPressed);
    }, [disabled, isPressed, pressed, onPressedChange]);

    return (
      <button
        type="button"
        ref={ref}
        aria-pressed={isPressed}
        data-state={isPressed ? 'on' : 'off'}
        disabled={disabled}
        className={cn(toggleVariants({ variant, size }), className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Toggle.displayName = 'Toggle';

export { toggleVariants };
export default Toggle;
