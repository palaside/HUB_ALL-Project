'use client';

import React, { forwardRef, useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Check, Minus } from 'lucide-react';

// ============================================
// CVA Variants
// ============================================
const checkboxVariants = cva(
  [
    'peer shrink-0 rounded border-2',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-gray-300 bg-white',
          'hover:border-gray-400',
          'data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500',
          'data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:border-blue-500',
        ],
        success: [
          'border-gray-300 bg-white',
          'data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500',
        ],
        danger: [
          'border-gray-300 bg-white',
          'data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500',
        ],
      },
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
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
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants> {
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
}

// ============================================
// Component
// ============================================
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      variant,
      size,
      label,
      description,
      indeterminate = false,
      checked,
      defaultChecked,
      disabled,
      onCheckedChange,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
    const isChecked = checked ?? internalChecked;
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        if (checked === undefined) {
          setInternalChecked(newChecked);
        }
        onCheckedChange?.(newChecked);
        onChange?.(e);
      },
      [checked, onCheckedChange, onChange]
    );

    const getState = () => {
      if (indeterminate) return 'indeterminate';
      return isChecked ? 'checked' : 'unchecked';
    };

    const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;

    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            ref={ref}
            id={checkboxId}
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            className="sr-only"
            {...props}
          />
          <div
            data-state={getState()}
            className={cn(
              checkboxVariants({ variant, size }),
              'flex items-center justify-center cursor-pointer',
              disabled && 'cursor-not-allowed',
              className
            )}
            onClick={() => {
              if (!disabled) {
                const newChecked = !isChecked;
                if (checked === undefined) {
                  setInternalChecked(newChecked);
                }
                onCheckedChange?.(newChecked);
              }
            }}
          >
            {indeterminate ? (
              <Minus size={iconSize} className="text-white" strokeWidth={3} />
            ) : isChecked ? (
              <Check size={iconSize} className="text-white" strokeWidth={3} />
            ) : null}
          </div>
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={checkboxId}
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
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { checkboxVariants };
export default Checkbox;
