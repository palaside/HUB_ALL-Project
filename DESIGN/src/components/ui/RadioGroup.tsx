'use client';

import React, { createContext, useContext, useState, useCallback, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// Context
// ============================================
interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
  name: string;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }
  return context;
}

// ============================================
// CVA Variants
// ============================================
const radioVariants = cva(
  [
    'aspect-square rounded-full border-2',
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
          'data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500',
        ],
        success: [
          'border-gray-300 bg-white',
          'data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500',
        ],
        danger: [
          'border-gray-300 bg-white',
          'data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500',
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
export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof radioVariants> {
  value: string;
  label?: string;
  description?: string;
}

// ============================================
// Components
// ============================================
export function RadioGroup({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  name,
  disabled,
  orientation = 'vertical',
  className,
  children,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const groupName = name || `radio-group-${Math.random().toString(36).substr(2, 9)}`;

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [controlledValue, onValueChange]
  );

  return (
    <RadioGroupContext.Provider
      value={{ value, onValueChange: handleValueChange, name: groupName, disabled }}
    >
      <div
        role="radiogroup"
        aria-orientation={orientation}
        className={cn(
          'flex gap-3',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  (
    {
      className,
      variant,
      size,
      value: itemValue,
      label,
      description,
      disabled: itemDisabled,
      id,
      ...props
    },
    ref
  ) => {
    const { value, onValueChange, name, disabled: groupDisabled } = useRadioGroupContext();
    const isChecked = value === itemValue;
    const isDisabled = groupDisabled || itemDisabled;
    const inputId = id || `radio-${itemValue}`;

    const dotSize = size === 'sm' ? 6 : size === 'lg' ? 10 : 8;

    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center justify-center">
          <input
            type="radio"
            ref={ref}
            id={inputId}
            name={name}
            value={itemValue}
            checked={isChecked}
            disabled={isDisabled}
            onChange={() => onValueChange(itemValue)}
            className="sr-only"
            {...props}
          />
          <div
            data-state={isChecked ? 'checked' : 'unchecked'}
            className={cn(
              radioVariants({ variant, size }),
              'flex items-center justify-center cursor-pointer',
              isDisabled && 'cursor-not-allowed',
              className
            )}
            onClick={() => !isDisabled && onValueChange(itemValue)}
          >
            {isChecked && (
              <div
                className="rounded-full bg-white"
                style={{ width: dotSize, height: dotSize }}
              />
            )}
          </div>
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  'text-sm font-medium text-gray-900 cursor-pointer',
                  isDisabled && 'text-gray-400 cursor-not-allowed'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn('text-sm text-gray-500', isDisabled && 'text-gray-400')}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
RadioGroupItem.displayName = 'RadioGroupItem';

export { radioVariants };
