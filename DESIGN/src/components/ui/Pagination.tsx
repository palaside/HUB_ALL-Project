'use client';

import React, { forwardRef, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from './Button';

// ============================================
// Types
// ============================================
export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Number of page buttons to show */
  siblingCount?: number;
  /** Show first/last buttons */
  showFirstLast?: boolean;
  /** Disable all pagination */
  disabled?: boolean;
}

export interface PaginationContentProps extends React.HTMLAttributes<HTMLUListElement> {}
export interface PaginationItemProps extends React.HTMLAttributes<HTMLLIElement> {}
export interface PaginationLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

// ============================================
// Hook: Generate page numbers
// ============================================
function usePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | 'ellipsis')[] {
  return useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5; // first + last + current + 2*siblings + 2*ellipsis

    // Case 1: Total pages is less than page numbers we want to show
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, 'ellipsis' as const, totalPages];
    }

    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, 'ellipsis' as const, ...rightRange];
    }

    if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, 'ellipsis' as const, ...middleRange, 'ellipsis' as const, totalPages];
    }

    return [];
  }, [currentPage, totalPages, siblingCount]);
}

// ============================================
// Sub-components
// ============================================
export const PaginationContent = forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('flex flex-wrap items-center gap-1', className)}
      {...props}
    />
  )
);

export const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
  )
);

export const PaginationLink = forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'inline-flex items-center justify-center rounded-md h-9 w-9 text-sm font-medium',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'text-gray-700 hover:bg-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

export const PaginationEllipsis = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    aria-hidden
    {...props}
  >
    <MoreHorizontal size={16} className="text-gray-400" />
    <span className="sr-only">More pages</span>
  </span>
);

// ============================================
// Main Component
// ============================================
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  disabled = false,
  className,
  ...props
}: PaginationProps) {
  const pageRange = usePaginationRange(currentPage, totalPages, siblingCount);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('flex justify-center', className)}
      {...props}
    >
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            disabled={disabled || currentPage === 1}
            className="gap-1 pl-2.5"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </Button>
        </PaginationItem>

        {/* Page Numbers */}
        {pageRange.map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page)}
                disabled={disabled}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            disabled={disabled || currentPage === totalPages}
            className="gap-1 pr-2.5"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </nav>
  );
}

Pagination.displayName = 'Pagination';
PaginationContent.displayName = 'PaginationContent';
PaginationItem.displayName = 'PaginationItem';
PaginationLink.displayName = 'PaginationLink';
PaginationEllipsis.displayName = 'PaginationEllipsis';
