'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

// ============================================
// Types
// ============================================
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}

export interface BreadcrumbListProps extends React.HTMLAttributes<HTMLOListElement> {}

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {}

export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLLIElement> {}

export interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {}

// ============================================
// Components
// ============================================
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cn('', className)}
      {...props}
    />
  )
);

export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-1.5 text-sm text-gray-500',
        className
      )}
      {...props}
    />
  )
);

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  )
);

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, asChild, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          'text-gray-500 hover:text-gray-900 transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded',
          className
        )}
        {...props}
      />
    );
  }
);

export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('font-medium text-gray-900', className)}
      {...props}
    />
  )
);

export const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  ({ className, children, ...props }, ref) => (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn('text-gray-400', className)}
      {...props}
    >
      {children || <ChevronRight size={14} />}
    </li>
  )
);

export const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn('flex h-6 w-6 items-center justify-center text-gray-400', className)}
      {...props}
    >
      <MoreHorizontal size={16} />
      <span className="sr-only">More</span>
    </span>
  )
);

Breadcrumb.displayName = 'Breadcrumb';
BreadcrumbList.displayName = 'BreadcrumbList';
BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbLink.displayName = 'BreadcrumbLink';
BreadcrumbPage.displayName = 'BreadcrumbPage';
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
