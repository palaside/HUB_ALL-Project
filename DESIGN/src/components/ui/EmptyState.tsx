'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Inbox, Search, FileX, AlertCircle, FolderOpen } from 'lucide-react';

// ============================================
// Types
// ============================================
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Preset icon type */
  type?: 'empty' | 'search' | 'error' | 'no-data' | 'folder';
  /** Custom icon */
  icon?: React.ReactNode;
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Action button/element */
  action?: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

// ============================================
// Icon Map
// ============================================
const iconMap = {
  empty: Inbox,
  search: Search,
  error: AlertCircle,
  'no-data': FileX,
  folder: FolderOpen,
};

const defaultTitles = {
  empty: 'No items yet',
  search: 'No results found',
  error: 'Something went wrong',
  'no-data': 'No data available',
  folder: 'Empty folder',
};

const defaultDescriptions = {
  empty: "You haven't added any items yet. Get started by creating your first one.",
  search: "We couldn't find anything matching your search. Try different keywords.",
  error: 'An error occurred while loading the data. Please try again.',
  'no-data': 'There is no data to display at the moment.',
  folder: 'This folder is empty. Add files to get started.',
};

// ============================================
// Component
// ============================================
export function EmptyState({
  className,
  type = 'empty',
  icon,
  title,
  description,
  action,
  size = 'md',
  ...props
}: EmptyStateProps) {
  const IconComponent = iconMap[type];
  const displayTitle = title ?? defaultTitles[type];
  const displayDescription = description ?? defaultDescriptions[type];

  const sizeClasses = {
    sm: {
      container: 'py-8 px-4',
      icon: 40,
      title: 'text-base',
      description: 'text-sm max-w-xs',
    },
    md: {
      container: 'py-12 px-6',
      icon: 56,
      title: 'text-lg',
      description: 'text-sm max-w-sm',
    },
    lg: {
      container: 'py-16 px-8',
      icon: 72,
      title: 'text-xl',
      description: 'text-base max-w-md',
    },
  };

  const sizes = sizeClasses[size];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizes.container,
        className
      )}
      {...props}
    >
      {/* Icon */}
      <div className="mb-4 text-gray-300">
        {icon || <IconComponent size={sizes.icon} strokeWidth={1.5} />}
      </div>

      {/* Title */}
      {displayTitle && (
        <h3 className={cn('font-semibold text-gray-900 mb-2', sizes.title)}>
          {displayTitle}
        </h3>
      )}

      {/* Description */}
      {displayDescription && (
        <p className={cn('text-gray-500 mb-6', sizes.description)}>
          {displayDescription}
        </p>
      )}

      {/* Action */}
      {action && <div>{action}</div>}
    </div>
  );
}

EmptyState.displayName = 'EmptyState';

export default EmptyState;
