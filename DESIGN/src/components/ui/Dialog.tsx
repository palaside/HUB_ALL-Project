'use client';

import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

// ============================================
// Context
// ============================================
interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog provider');
  }
  return context;
}

// ============================================
// CVA Variants
// ============================================
const dialogOverlayVariants = cva(
  [
    'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
    'data-[state=open]:animate-fade-in',
    'data-[state=closed]:animate-fade-out',
  ]
);

const dialogContentVariants = cva(
  [
    'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
    'bg-white rounded-xl shadow-xl',
    'w-full max-h-[90vh] overflow-auto',
    'animate-scale-in',
    'focus:outline-none',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-[95vw]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ============================================
// Types
// ============================================
export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogContentVariants> {
  showClose?: boolean;
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

// ============================================
// Components
// ============================================
export function Dialog({ open, onOpenChange, children }: DialogProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogOverlay({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { onOpenChange } = useDialogContext();

  return (
    <div
      data-state="open"
      className={cn(dialogOverlayVariants(), className)}
      onClick={() => onOpenChange(false)}
      aria-hidden="true"
      {...props}
    />
  );
}

export function DialogContent({
  className,
  size,
  showClose = true,
  children,
  ...props
}: DialogContentProps) {
  const { onOpenChange } = useDialogContext();

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <>
      <DialogOverlay />
      <div
        role="dialog"
        aria-modal="true"
        data-state="open"
        className={cn(dialogContentVariants({ size }), className)}
        onClick={handleContentClick}
        {...props}
      >
        {showClose && (
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(
              'absolute right-4 top-4 rounded-md p-1',
              'text-gray-400 hover:text-gray-600',
              'transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500'
            )}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        )}
        {children}
      </div>
    </>
  );
}

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn('p-6 pb-0', className)}
      {...props}
    />
  );
}

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn(
        'p-6 pt-4 flex items-center justify-end gap-3',
        'border-t border-gray-100 mt-6',
        className
      )}
      {...props}
    />
  );
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <h2
      className={cn('text-lg font-semibold text-gray-900', className)}
      {...props}
    />
  );
}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <p
      className={cn('text-sm text-gray-500 mt-1', className)}
      {...props}
    />
  );
}

export function DialogBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('p-6', className)}
      {...props}
    />
  );
}

Dialog.displayName = 'Dialog';
DialogOverlay.displayName = 'DialogOverlay';
DialogContent.displayName = 'DialogContent';
DialogHeader.displayName = 'DialogHeader';
DialogFooter.displayName = 'DialogFooter';
DialogTitle.displayName = 'DialogTitle';
DialogDescription.displayName = 'DialogDescription';
DialogBody.displayName = 'DialogBody';

export { dialogContentVariants };
