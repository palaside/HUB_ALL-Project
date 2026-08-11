'use client';

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from 'lucide-react';

// ============================================
// Context
// ============================================
interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  onValueChange: (value: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a Select provider');
  }
  return context;
}

// ============================================
// CVA Variants
// ============================================
const selectTriggerVariants = cva(
  [
    'flex items-center justify-between w-full rounded-lg border bg-white px-3 py-2',
    'text-sm text-gray-900',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
  ],
  {
    variants: {
      variant: {
        default: 'border-gray-300 hover:border-gray-400',
        error: 'border-red-500 focus:ring-red-500',
      },
      size: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
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
export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof selectTriggerVariants> {
  placeholder?: string;
}

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

// ============================================
// Components
// ============================================
export function Select({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  disabled,
  children,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const value = controlledValue ?? internalValue;

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!controlledValue) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
      setOpen(false);
    },
    [controlledValue, onValueChange]
  );

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen: disabled ? () => {} : setOpen,
        value,
        onValueChange: handleValueChange,
        triggerRef,
      }}
    >
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  className,
  variant,
  size,
  placeholder = 'Select an option',
  children,
  ...props
}: SelectTriggerProps) {
  const { open, setOpen, value, triggerRef } = useSelectContext();

  return (
    <button
      type="button"
      ref={triggerRef}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      className={cn(selectTriggerVariants({ variant, size }), className)}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <span className={cn(!value && 'text-gray-400')}>
        {children || (value ? value : placeholder)}
      </span>
      <ChevronDown
        size={16}
        className={cn(
          'text-gray-400 transition-transform duration-200',
          open && 'rotate-180'
        )}
      />
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = useSelectContext();
  return <span className={cn(!value && 'text-gray-400')}>{value || placeholder}</span>;
}

export function SelectContent({ className, children, ...props }: SelectContentProps) {
  const { open, setOpen, triggerRef } = useSelectContext();
  const contentRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, setOpen, triggerRef]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      role="listbox"
      className={cn(
        'absolute z-50 mt-1 w-full',
        'bg-white rounded-lg border border-gray-200 shadow-lg',
        'py-1 max-h-60 overflow-auto',
        'animate-scale-in',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectItem({
  className,
  value: itemValue,
  disabled,
  children,
  ...props
}: SelectItemProps) {
  const { value, onValueChange } = useSelectContext();
  const isSelected = value === itemValue;

  return (
    <div
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      data-disabled={disabled || undefined}
      className={cn(
        'relative flex items-center px-3 py-2 text-sm cursor-pointer',
        'transition-colors',
        isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={() => !disabled && onValueChange(itemValue)}
      {...props}
    >
      <span className="flex-1">{children}</span>
      {isSelected && (
        <Check size={16} className="text-blue-600" />
      )}
    </div>
  );
}

export function SelectGroup({ className, children, ...props }: SelectGroupProps) {
  return (
    <div className={cn('py-1', className)} {...props}>
      {children}
    </div>
  );
}

export function SelectLabel({ className, children, ...props }: SelectLabelProps) {
  return (
    <div
      className={cn('px-3 py-1.5 text-xs font-medium text-gray-500', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectSeparator({ className }: { className?: string }) {
  return <div className={cn('h-px bg-gray-200 my-1', className)} />;
}

Select.displayName = 'Select';
SelectTrigger.displayName = 'SelectTrigger';
SelectValue.displayName = 'SelectValue';
SelectContent.displayName = 'SelectContent';
SelectItem.displayName = 'SelectItem';
SelectGroup.displayName = 'SelectGroup';
SelectLabel.displayName = 'SelectLabel';
SelectSeparator.displayName = 'SelectSeparator';

export { selectTriggerVariants };
