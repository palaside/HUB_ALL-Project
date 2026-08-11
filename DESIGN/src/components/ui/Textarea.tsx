'use client';

import React, { forwardRef, useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// CVA Variants
// ============================================
const textareaVariants = cva(
  [
    'flex w-full rounded-lg border bg-white px-3 py-2',
    'text-sm text-gray-900 placeholder:text-gray-400',
    'transition-all duration-200 resize-y',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 disabled:resize-none',
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
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ============================================
// Types
// ============================================
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  /** Label for the textarea */
  label?: string;
  /** Helper text below the textarea */
  helperText?: string;
  /** Error message (also sets variant to error) */
  error?: string;
  /** Show character count */
  showCount?: boolean;
  /** Max character count */
  maxLength?: number;
  /** Auto-resize based on content */
  autoResize?: boolean;
  /** Test ID */
  testId?: string;
}

// ============================================
// Component
// ============================================
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant = 'default',
      label,
      helperText,
      error,
      showCount,
      maxLength,
      autoResize,
      disabled,
      testId = 'textarea',
      id,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(
      String(value ?? defaultValue ?? '').length
    );
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    // Determine effective variant
    const effectiveVariant = error ? 'error' : variant;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        
        // Auto-resize
        if (autoResize) {
          e.target.style.height = 'auto';
          e.target.style.height = `${e.target.scrollHeight}px`;
        }

        onChange?.(e);
      },
      [autoResize, onChange]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'text-sm font-medium text-gray-700',
              disabled && 'text-gray-400'
            )}
          >
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          maxLength={maxLength}
          className={cn(
            textareaVariants({ variant: effectiveVariant }),
            autoResize && 'resize-none overflow-hidden',
            className
          )}
          disabled={disabled}
          data-testid={testId}
          data-focused={isFocused || undefined}
          data-variant={effectiveVariant}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {/* Footer: Error, Helper Text, Character Count */}
        <div className="flex items-center justify-between">
          <div>
            {/* Error Message */}
            {error && (
              <p
                id={`${textareaId}-error`}
                className="text-sm text-red-500"
                role="alert"
              >
                {error}
              </p>
            )}

            {/* Helper Text */}
            {!error && helperText && (
              <p
                id={`${textareaId}-helper`}
                className="text-sm text-gray-500"
              >
                {helperText}
              </p>
            )}
          </div>

          {/* Character Count */}
          {showCount && (
            <span
              className={cn(
                'text-sm text-gray-400',
                maxLength && charCount >= maxLength && 'text-red-500'
              )}
            >
              {charCount}
              {maxLength && `/${maxLength}`}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { textareaVariants };
export default Textarea;
