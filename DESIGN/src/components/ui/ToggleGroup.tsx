'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// Context
// ============================================
interface ToggleGroupContextValue {
  value: string | string[];
  onValueChange: (value: string) => void;
  type: 'single' | 'multiple';
  variant: 'default' | 'outline' | 'primary' | null | undefined;
  size: 'sm' | 'md' | 'lg' | null | undefined;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

function useToggleGroupContext() {
  const context = useContext(ToggleGroupContext);
  if (!context) {
    throw new Error('ToggleGroupItem must be used within a ToggleGroup');
  }
  return context;
}

// ============================================
// CVA Variants
// ============================================
const toggleGroupVariants = cva('inline-flex items-center', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const toggleGroupItemVariants = cva(
  [
    'inline-flex items-center justify-center',
    'text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'first:rounded-l-md last:rounded-r-md',
    '-ml-px first:ml-0',
  ],
  {
    variants: {
      variant: {
        default: [
          'border border-gray-300 bg-transparent text-gray-600',
          'hover:bg-gray-50 hover:text-gray-900',
          'data-[state=on]:bg-gray-200 data-[state=on]:text-gray-900 data-[state=on]:border-gray-400',
        ],
        outline: [
          'border border-gray-300 bg-transparent text-gray-600',
          'hover:bg-gray-50 hover:text-gray-900',
          'data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900',
        ],
        primary: [
          'border border-gray-300 bg-transparent text-gray-600',
          'hover:bg-blue-50 hover:text-blue-600',
          'data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:border-blue-500',
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
export interface ToggleGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toggleGroupVariants>,
    Omit<VariantProps<typeof toggleGroupItemVariants>, 'size' | 'variant'> {
  type?: 'single' | 'multiple';
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: 'default' | 'outline' | 'primary';
  size?: 'sm' | 'md' | 'lg';
}

export interface ToggleGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

// ============================================
// Components
// ============================================
export function ToggleGroup({
  type = 'single',
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = 'default',
  size = 'md',
  orientation,
  className,
  children,
  ...props
}: ToggleGroupProps) {
  const [internalValue, setInternalValue] = useState<string | string[]>(() => {
    if (defaultValue) return defaultValue;
    return type === 'multiple' ? [] : '';
  });

  const value = controlledValue ?? internalValue;

  const handleValueChange = useCallback(
    (itemValue: string) => {
      let newValue: string | string[];

      if (type === 'single') {
        newValue = value === itemValue ? '' : itemValue;
      } else {
        const currentValues = Array.isArray(value) ? value : [];
        if (currentValues.includes(itemValue)) {
          newValue = currentValues.filter((v) => v !== itemValue);
        } else {
          newValue = [...currentValues, itemValue];
        }
      }

      if (!controlledValue) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [type, value, controlledValue, onValueChange]
  );

  return (
    <ToggleGroupContext.Provider
      value={{ value, onValueChange: handleValueChange, type, variant, size }}
    >
      <div
        role="group"
        className={cn(toggleGroupVariants({ orientation }), className)}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

export function ToggleGroupItem({
  value: itemValue,
  className,
  children,
  disabled,
  ...props
}: ToggleGroupItemProps) {
  const { value, onValueChange, type, variant, size } = useToggleGroupContext();

  const isPressed =
    type === 'single'
      ? value === itemValue
      : Array.isArray(value) && value.includes(itemValue);

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isPressed}
      aria-pressed={isPressed}
      data-state={isPressed ? 'on' : 'off'}
      disabled={disabled}
      className={cn(toggleGroupItemVariants({ variant, size }), className)}
      onClick={() => onValueChange(itemValue)}
      {...props}
    >
      {children}
    </button>
  );
}

ToggleGroup.displayName = 'ToggleGroup';
ToggleGroupItem.displayName = 'ToggleGroupItem';

export { toggleGroupVariants, toggleGroupItemVariants };
