'use client';

import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// CVA Variants
// ============================================
const avatarVariants = cva(
  [
    'relative inline-flex items-center justify-center',
    'rounded-full bg-gray-200 text-gray-600 font-medium',
    'overflow-hidden shrink-0',
    'transition-all duration-200',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl',
      },
      status: {
        online: '',
        offline: '',
        away: '',
        busy: '',
        none: '',
      },
    },
    defaultVariants: {
      size: 'md',
      status: 'none',
    },
  }
);

// ============================================
// Type Definitions
// ============================================
export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof avatarVariants> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback text (initials) */
  fallback?: string;
  /** Custom fallback element */
  fallbackElement?: React.ReactNode;
  /** Show status indicator */
  showStatus?: boolean;
  /** Test ID */
  testId?: string;
}

// ============================================
// Status Color Mapping
// ============================================
const statusColors: Record<string, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-amber-500',
  busy: 'bg-red-500',
  none: '',
};

// ============================================
// Component Implementation
// ============================================
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size,
      status = 'none',
      src,
      alt = '',
      fallback,
      fallbackElement,
      showStatus = false,
      testId = 'avatar',
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);
    const showFallback = !src || imageError;

    // Generate initials from fallback text
    const initials = fallback
      ?.split(' ')
      .map((word) => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    // Status indicator size based on avatar size
    const statusSizeClasses: Record<string, string> = {
      xs: 'h-1.5 w-1.5 border',
      sm: 'h-2 w-2 border',
      md: 'h-2.5 w-2.5 border-2',
      lg: 'h-3 w-3 border-2',
      xl: 'h-3.5 w-3.5 border-2',
      '2xl': 'h-4 w-4 border-2',
    };

    const sizeKey = size || 'md';

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, status }), className)}
        data-testid={testId}
        data-size={size}
        data-status={status}
        {...props}
      >
        {/* Image or Fallback */}
        {!showFallback ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : fallbackElement ? (
          fallbackElement
        ) : (
          <span aria-hidden="true">{initials || '?'}</span>
        )}

        {/* Status Indicator */}
        {showStatus && status && status !== 'none' && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full border-white',
              statusSizeClasses[sizeKey],
              statusColors[status]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// ============================================
// Avatar Group Component
// ============================================
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of avatars to show */
  max?: number;
  /** Size of avatars */
  size?: VariantProps<typeof avatarVariants>['size'];
  /** Children (Avatar components) */
  children: React.ReactNode;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max = 4, size = 'md', children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleAvatars = childrenArray.slice(0, max);
    const remainingCount = childrenArray.length - max;

    return (
      <div
        ref={ref}
        className={cn('flex items-center -space-x-2', className)}
        {...props}
      >
        {visibleAvatars.map((child, index) => (
          <div
            key={index}
            className="relative ring-2 ring-white rounded-full"
            style={{ zIndex: visibleAvatars.length - index }}
          >
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
              : child}
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div
            className={cn(
              avatarVariants({ size }),
              'ring-2 ring-white bg-gray-300 text-gray-700'
            )}
            style={{ zIndex: 0 }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export { avatarVariants };
export default Avatar;
