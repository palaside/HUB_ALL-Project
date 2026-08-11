'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Make it circular */
  circle?: boolean;
  /** Animation type */
  animation?: 'pulse' | 'shimmer' | 'none';
}

// ============================================
// Component
// ============================================
export function Skeleton({
  className,
  width,
  height,
  circle,
  animation = 'pulse',
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-gray-200',
        circle ? 'rounded-full' : 'rounded-md',
        animation === 'pulse' && 'animate-pulse',
        animation === 'shimmer' && 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

// ============================================
// Preset Skeletons
// ============================================
export function SkeletonText({
  lines = 3,
  className,
  ...props
}: { lines?: number } & Omit<SkeletonProps, 'height'>) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={16}
          width={i === lines - 1 ? '75%' : '100%'}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({
  size = 'md',
  className,
  ...props
}: { size?: 'sm' | 'md' | 'lg' | 'xl' } & Omit<SkeletonProps, 'width' | 'height' | 'circle'>) {
  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  };

  return (
    <Skeleton
      circle
      width={sizeMap[size]}
      height={sizeMap[size]}
      className={className}
      {...props}
    />
  );
}

export function SkeletonButton({
  size = 'md',
  className,
  ...props
}: { size?: 'sm' | 'md' | 'lg' } & Omit<SkeletonProps, 'height'>) {
  const heightMap = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  return (
    <Skeleton
      height={heightMap[size]}
      width={120}
      className={cn('rounded-lg', className)}
      {...props}
    />
  );
}

export function SkeletonCard({ className, ...props }: Omit<SkeletonProps, 'height' | 'width'>) {
  return (
    <div
      className={cn('rounded-xl border border-gray-200 p-4 space-y-4', className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        <SkeletonAvatar size="md" />
        <div className="flex-1 space-y-2">
          <Skeleton height={14} width="60%" />
          <Skeleton height={12} width="40%" />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div className="flex gap-2 pt-2">
        <SkeletonButton size="sm" />
        <SkeletonButton size="sm" width={80} />
      </div>
    </div>
  );
}

Skeleton.displayName = 'Skeleton';
SkeletonText.displayName = 'SkeletonText';
SkeletonAvatar.displayName = 'SkeletonAvatar';
SkeletonButton.displayName = 'SkeletonButton';
SkeletonCard.displayName = 'SkeletonCard';

export default Skeleton;
