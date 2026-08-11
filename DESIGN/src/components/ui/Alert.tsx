'use client';

import React, { forwardRef, useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  X 
} from 'lucide-react';

// ============================================
// CVA Variants
// ============================================
const alertVariants = cva(
  [
    'relative flex w-full gap-3 rounded-lg border p-4',
    'transition-all duration-200',
  ],
  {
    variants: {
      variant: {
        default: 'bg-gray-50 border-gray-200 text-gray-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        warning: 'bg-amber-50 border-amber-200 text-amber-800',
        danger: 'bg-red-50 border-red-200 text-red-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ============================================
// Type Definitions
// ============================================
export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Title of the alert */
  title?: string;
  /** Whether the alert is dismissible */
  dismissible?: boolean;
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
  /** Custom icon override */
  icon?: React.ReactNode;
  /** Hide the default icon */
  hideIcon?: boolean;
  /** Test ID */
  testId?: string;
}

// ============================================
// Icon Mapping
// ============================================
const iconMap = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
};

const iconColorMap = {
  default: 'text-gray-500',
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-amber-500',
  danger: 'text-red-500',
};

// ============================================
// Component Implementation
// ============================================
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'default',
      title,
      dismissible,
      onDismiss,
      icon,
      hideIcon,
      children,
      testId = 'alert',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = useCallback(() => {
      setIsVisible(false);
      onDismiss?.();
    }, [onDismiss]);

    if (!isVisible) return null;

    const IconComponent = iconMap[variant || 'default'];
    const iconColor = iconColorMap[variant || 'default'];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        data-testid={testId}
        data-variant={variant}
        {...props}
      >
        {/* Icon */}
        {!hideIcon && (
          <div className={cn('shrink-0 mt-0.5', iconColor)}>
            {icon || <IconComponent size={20} aria-hidden="true" />}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h5 className="font-semibold mb-1">{title}</h5>
          )}
          <div className="text-sm opacity-90">{children}</div>
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              'shrink-0 rounded-md p-1 transition-colors',
              'hover:bg-black/5 focus:outline-none focus:ring-2',
              variant === 'danger' && 'focus:ring-red-500',
              variant === 'success' && 'focus:ring-green-500',
              variant === 'warning' && 'focus:ring-amber-500',
              variant === 'info' && 'focus:ring-blue-500',
              variant === 'default' && 'focus:ring-gray-500'
            )}
            aria-label="Dismiss alert"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { alertVariants };
export default Alert;
