'use client';

import React, { forwardRef, useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// CVA Variants
// ============================================
const inputVariants = cva(
  [
    'flex w-full rounded-lg border bg-white px-3 py-2',
    'text-sm text-gray-900 placeholder:text-gray-400',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-gray-300',
          'focus:border-blue-500 focus:ring-blue-500/20',
        ],
        error: [
          'border-red-500 text-red-900',
          'focus:border-red-500 focus:ring-red-500/20',
          'placeholder:text-red-400',
        ],
        success: [
          'border-green-500',
          'focus:border-green-500 focus:ring-green-500/20',
        ],
      },
      inputSize: {
        sm: 'h-8 px-2.5 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

// ============================================
// Type Definitions
// ============================================
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Label for the input */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message (also sets variant to error) */
  error?: string;
  /** Icon to display on the left */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right */
  rightIcon?: React.ReactNode;
  /** Full width */
  fullWidth?: boolean;
  /** Test ID */
  testId?: string;
}

// ============================================
// Component Implementation
// ============================================
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'default',
      inputSize = 'md',
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth = true,
      disabled,
      testId = 'input',
      id,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Determine effective variant
    const effectiveVariant = error ? 'error' : variant;

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(event);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(event);
      },
      [onBlur]
    );

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium text-gray-700',
              disabled && 'text-gray-400'
            )}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant: effectiveVariant, inputSize }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            disabled={disabled}
            data-testid={testId}
            data-focused={isFocused || undefined}
            data-variant={effectiveVariant}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-gray-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { inputVariants };
export default Input;
