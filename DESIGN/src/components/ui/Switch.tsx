'use client';

import React, { forwardRef, useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// CVA Variants
// ============================================
const switchVariants = cva(
  [
    'relative inline-flex shrink-0 cursor-pointer rounded-full',
    'transition-colors duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'bg-gray-200 data-[state=checked]:bg-blue-500',
        success: 'bg-gray-200 data-[state=checked]:bg-green-500',
        danger: 'bg-gray-200 data-[state=checked]:bg-red-500',
      },
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const switchThumbVariants = cva(
  [
    'pointer-events-none inline-block rounded-full bg-white shadow-md',
    'transform transition-transform duration-200 ease-in-out',
    'ring-0',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4 data-[state=checked]:translate-x-4 translate-x-0.5',
        md: 'h-5 w-5 data-[state=checked]:translate-x-5 translate-x-0.5',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-7 translate-x-0.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ============================================
// Types
// ============================================
export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof switchVariants> {
  /** Whether the switch is checked */
  checked?: boolean;
  /** Default checked state */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Label position */
  labelPosition?: 'left' | 'right';
}

// ============================================
// Component
// ============================================
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      variant,
      size,
      checked,
      defaultChecked = false,
      disabled,
      onCheckedChange,
      label,
      description,
      labelPosition = 'right',
      id,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = checked ?? internalChecked;
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    const handleClick = useCallback(() => {
      if (disabled) return;
      const newChecked = !isChecked;
      if (checked === undefined) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    }, [disabled, isChecked, checked, onCheckedChange]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      },
      [handleClick]
    );

    const switchElement = (
      <button
        type="button"
        role="switch"
        ref={ref}
        id={switchId}
        aria-checked={isChecked}
        data-state={isChecked ? 'checked' : 'unchecked'}
        disabled={disabled}
        className={cn(switchVariants({ variant, size }), className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <span
          data-state={isChecked ? 'checked' : 'unchecked'}
          className={cn(switchThumbVariants({ size }), 'mt-0.5')}
        />
      </button>
    );

    if (!label && !description) {
      return switchElement;
    }

    return (
      <div className={cn('flex items-center gap-3', labelPosition === 'left' && 'flex-row-reverse')}>
        {switchElement}
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={switchId}
              className={cn(
                'text-sm font-medium text-gray-900 cursor-pointer',
                disabled && 'text-gray-400 cursor-not-allowed'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className={cn('text-sm text-gray-500', disabled && 'text-gray-400')}>
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export { switchVariants, switchThumbVariants };
export default Switch;
