'use client';

import React, { forwardRef, useCallback, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { Spinner } from './Spinner';

// ============================================
// CVA (Class Variance Authority) - Style Variants
// ============================================
const buttonVariants = cva(
  // Base Styles (ทุก variant ใช้ร่วมกัน)
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-lg font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.98]',
    'cursor-pointer select-none',
    'whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-blue-500 text-white',
          'hover:bg-blue-600',
          'active:bg-blue-700',
          'focus-visible:ring-blue-500',
          'shadow-sm hover:shadow-md',
        ],
        secondary: [
          'bg-gray-100 text-gray-900',
          'hover:bg-gray-200',
          'active:bg-gray-300',
          'focus-visible:ring-gray-400',
        ],
        outline: [
          'border-2 border-blue-500 text-blue-500',
          'bg-transparent',
          'hover:bg-blue-50',
          'active:bg-blue-100',
          'focus-visible:ring-blue-500',
        ],
        ghost: [
          'bg-transparent text-blue-600',
          'hover:bg-blue-50',
          'active:bg-blue-100',
          'focus-visible:ring-blue-500',
        ],
        danger: [
          'bg-red-500 text-white',
          'hover:bg-red-600',
          'active:bg-red-700',
          'focus-visible:ring-red-500',
          'shadow-sm hover:shadow-md',
        ],
        success: [
          'bg-green-500 text-white',
          'hover:bg-green-600',
          'active:bg-green-700',
          'focus-visible:ring-green-500',
          'shadow-sm hover:shadow-md',
        ],
        warning: [
          'bg-amber-500 text-white',
          'hover:bg-amber-600',
          'active:bg-amber-700',
          'focus-visible:ring-amber-500',
          'shadow-sm hover:shadow-md',
        ],
        link: [
          'text-blue-600 underline-offset-4',
          'hover:underline',
          'focus-visible:ring-blue-500',
          'p-0 h-auto',
        ],
      },
      size: {
        xs: 'h-7 px-2.5 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0',
        'icon-lg': 'h-12 w-12 p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

// ============================================
// Type Definitions
// ============================================
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a child component (Radix Slot) */
  asChild?: boolean;
  /** Show loading state */
  loading?: boolean;
  /** Icon to display on the left */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right */
  rightIcon?: React.ReactNode;
  /** Text to show while loading */
  loadingText?: string;
  /** Test ID for testing */
  testId?: string;
}

// ============================================
// Component Implementation
// ============================================
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      asChild = false,
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      loadingText,
      children,
      testId = 'button',
      onClick,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      onKeyDown,
      onKeyUp,
      ...props
    },
    ref
  ) => {
    // --- State Management ---
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    // --- Computed Properties ---
    const isDisabled = disabled || loading;
    const showLoading = loading;
    const displayText = showLoading && loadingText ? loadingText : children;
    const Comp = asChild ? Slot : 'button';

    // --- Event Handlers (Interactive 100%) ---
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClick?.(event);
      },
      [isDisabled, onClick]
    );

    const handleMouseEnter = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!isDisabled) {
          setIsHovered(true);
        }
        onMouseEnter?.(event);
      },
      [isDisabled, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsHovered(false);
        setIsPressed(false);
        onMouseLeave?.(event);
      },
      [onMouseLeave]
    );

    const handleMouseDown = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!isDisabled) {
          setIsPressed(true);
        }
        onMouseDown?.(event);
      },
      [isDisabled, onMouseDown]
    );

    const handleMouseUp = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsPressed(false);
        onMouseUp?.(event);
      },
      [onMouseUp]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if ((event.key === 'Enter' || event.key === ' ') && !isDisabled) {
          event.preventDefault();
          setIsPressed(true);
        }
        onKeyDown?.(event);
      },
      [isDisabled, onKeyDown]
    );

    const handleKeyUp = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          setIsPressed(false);
        }
        onKeyUp?.(event);
      },
      [onKeyUp]
    );

    // --- Spinner Size Mapping ---
    const spinnerSize = size === 'xs' || size === 'sm' || size === 'icon-sm' 
      ? 14 
      : size === 'lg' || size === 'xl' || size === 'icon-lg' 
        ? 20 
        : 16;

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          // Dynamic state classes
          showLoading && 'cursor-wait',
          className
        )}
        disabled={isDisabled}
        data-testid={testId}
        data-variant={variant}
        data-size={size}
        data-loading={loading || undefined}
        data-hovered={isHovered || undefined}
        data-pressed={isPressed || undefined}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        {...props}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        {/* Loading Spinner */}
        {showLoading && (
          <Spinner 
            size={spinnerSize} 
            className="shrink-0" 
            label="Loading"
          />
        )}

        {/* Left Icon (hidden during loading) */}
        {!showLoading && leftIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Button Text */}
        {displayText && (
          <span className="truncate">{displayText}</span>
        )}

        {/* Right Icon */}
        {!showLoading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

// Export variants for external use
export { buttonVariants };
export default Button;
