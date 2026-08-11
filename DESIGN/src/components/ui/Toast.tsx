'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

// ============================================
// Toast Types
// ============================================
export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

// ============================================
// Context
// ============================================
const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// ============================================
// CVA Variants
// ============================================
const toastVariants = cva(
  [
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 shadow-lg',
    'transition-all duration-300',
    'data-[state=open]:animate-slide-up',
    'data-[state=closed]:animate-fade-out',
  ],
  {
    variants: {
      variant: {
        default: 'bg-white border-gray-200 text-gray-900',
        success: 'bg-green-50 border-green-200 text-green-900',
        error: 'bg-red-50 border-red-200 text-red-900',
        warning: 'bg-amber-50 border-amber-200 text-amber-900',
        info: 'bg-blue-50 border-blue-200 text-blue-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ============================================
// Icon Map
// ============================================
const iconMap = {
  default: null,
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const iconColorMap = {
  default: 'text-gray-500',
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-amber-500',
  info: 'text-blue-500',
};

// ============================================
// Toast Provider
// ============================================
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

// ============================================
// Toast Viewport
// ============================================
function ToastViewport() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}

// ============================================
// Toast Component
// ============================================
interface ToastProps extends ToastData {}

function Toast({
  id,
  title,
  description,
  variant = 'default',
  duration = 5000,
  action,
}: ToastProps) {
  const { removeToast } = useToast();
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsLeaving(true);
        setTimeout(() => removeToast(id), 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, removeToast]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => removeToast(id), 300);
  };

  const Icon = iconMap[variant];

  return (
    <div
      data-state={isLeaving ? 'closed' : 'open'}
      className={cn(toastVariants({ variant }))}
      role="alert"
      aria-live="assertive"
    >
      {Icon && (
        <Icon size={20} className={cn('shrink-0', iconColorMap[variant])} />
      )}
      
      <div className="flex-1 space-y-1">
        {title && (
          <div className="text-sm font-semibold">{title}</div>
        )}
        {description && (
          <div className="text-sm opacity-90">{description}</div>
        )}
      </div>

      {action && (
        <button
          type="button"
          onClick={() => {
            action.onClick();
            handleClose();
          }}
          className={cn(
            'shrink-0 rounded-md px-3 py-1.5 text-sm font-medium',
            'transition-colors',
            variant === 'default' && 'bg-gray-100 hover:bg-gray-200',
            variant === 'success' && 'bg-green-100 hover:bg-green-200',
            variant === 'error' && 'bg-red-100 hover:bg-red-200',
            variant === 'warning' && 'bg-amber-100 hover:bg-amber-200',
            variant === 'info' && 'bg-blue-100 hover:bg-blue-200'
          )}
        >
          {action.label}
        </button>
      )}

      <button
        type="button"
        onClick={handleClose}
        className={cn(
          'shrink-0 rounded-md p-1 opacity-70 hover:opacity-100',
          'transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2',
          variant === 'default' && 'focus:ring-gray-400',
          variant === 'success' && 'focus:ring-green-400',
          variant === 'error' && 'focus:ring-red-400',
          variant === 'warning' && 'focus:ring-amber-400',
          variant === 'info' && 'focus:ring-blue-400'
        )}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}

// ============================================
// Helper function for easy use
// ============================================
export function toast(options: Omit<ToastData, 'id'>) {
  // This is a placeholder - in real usage, you'd use the hook
  console.log('Toast:', options);
}

Toast.displayName = 'Toast';
ToastProvider.displayName = 'ToastProvider';

export { toastVariants };
