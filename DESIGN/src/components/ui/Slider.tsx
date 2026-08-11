'use client';

import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// CVA Variants
// ============================================
const sliderTrackVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-gray-200',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const sliderRangeVariants = cva(
  'absolute h-full',
  {
    variants: {
      variant: {
        default: 'bg-blue-500',
        success: 'bg-green-500',
        warning: 'bg-amber-500',
        danger: 'bg-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const sliderThumbVariants = cva(
  [
    'absolute top-1/2 -translate-y-1/2 rounded-full border-2 bg-white shadow-md',
    'transition-transform duration-100',
    'hover:scale-110',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'border-blue-500 focus-visible:ring-blue-500',
        success: 'border-green-500 focus-visible:ring-green-500',
        warning: 'border-amber-500 focus-visible:ring-amber-500',
        danger: 'border-red-500 focus-visible:ring-red-500',
      },
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
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
export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof sliderTrackVariants>,
    VariantProps<typeof sliderRangeVariants> {
  /** Current value */
  value?: number;
  /** Default value */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Callback when value changes */
  onValueChange?: (value: number) => void;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Show value label */
  showValue?: boolean;
  /** Custom value formatter */
  formatValue?: (value: number) => string;
}

// ============================================
// Component
// ============================================
export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      variant,
      size,
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      disabled,
      showValue,
      formatValue = (v) => String(v),
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = controlledValue ?? internalValue;
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    const percentage = ((value - min) / (max - min)) * 100;

    const updateValue = useCallback(
      (clientX: number) => {
        if (!trackRef.current || disabled) return;

        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const rawValue = min + percent * (max - min);
        const steppedValue = Math.round(rawValue / step) * step;
        const clampedValue = Math.max(min, Math.min(max, steppedValue));

        if (controlledValue === undefined) {
          setInternalValue(clampedValue);
        }
        onValueChange?.(clampedValue);
      },
      [min, max, step, disabled, controlledValue, onValueChange]
    );

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        if (disabled) return;
        setIsDragging(true);
        updateValue(e.clientX);
      },
      [disabled, updateValue]
    );

    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (disabled) return;
        setIsDragging(true);
        updateValue(e.touches[0].clientX);
      },
      [disabled, updateValue]
    );

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          updateValue(e.clientX);
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (isDragging) {
          updateValue(e.touches[0].clientX);
        }
      };

      const handleTouchEnd = () => {
        setIsDragging(false);
      };

      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }, [isDragging, updateValue]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        let newValue = value;

        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            newValue = Math.min(max, value + step);
            break;
          case 'ArrowLeft':
          case 'ArrowDown':
            newValue = Math.max(min, value - step);
            break;
          case 'Home':
            newValue = min;
            break;
          case 'End':
            newValue = max;
            break;
          default:
            return;
        }

        e.preventDefault();
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [value, min, max, step, disabled, controlledValue, onValueChange]
    );

    return (
      <div className={cn('w-full', className)} ref={ref} {...props}>
        {showValue && (
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{formatValue(min)}</span>
            <span className="font-medium text-gray-900">{formatValue(value)}</span>
            <span>{formatValue(max)}</span>
          </div>
        )}
        <div
          ref={trackRef}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          className={cn(
            sliderTrackVariants({ size }),
            'cursor-pointer',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onKeyDown={handleKeyDown}
        >
          {/* Range (filled portion) */}
          <div
            className={cn(sliderRangeVariants({ variant }))}
            style={{ width: `${percentage}%` }}
          />

          {/* Thumb */}
          <div
            className={cn(
              sliderThumbVariants({ variant, size }),
              isDragging && 'scale-110'
            )}
            style={{ left: `calc(${percentage}% - ${size === 'sm' ? 6 : size === 'lg' ? 10 : 8}px)` }}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export { sliderTrackVariants, sliderRangeVariants, sliderThumbVariants };
export default Slider;
