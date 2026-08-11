'use client';

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronRight, Circle } from 'lucide-react';

// ============================================
// Context
// ============================================
interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error('DropdownMenu components must be used within a DropdownMenu');
  }
  return context;
}

// ============================================
// Types
// ============================================
export interface DropdownMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  onSelect?: () => void;
  destructive?: boolean;
}

export interface DropdownMenuCheckboxItemProps extends DropdownMenuItemProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export interface DropdownMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface DropdownMenuRadioItemProps extends DropdownMenuItemProps {
  value: string;
}

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DropdownMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

// ============================================
// Radio Group Context
// ============================================
interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// ============================================
// Components
// ============================================
export function DropdownMenu({
  open: controlledOpen,
  onOpenChange,
  children,
}: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const open = controlledOpen ?? internalOpen;

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [controlledOpen, onOpenChange]
  );

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  className,
  children,
  ...props
}: DropdownMenuTriggerProps) {
  const { open, setOpen, triggerRef } = useDropdownMenuContext();

  return (
    <button
      type="button"
      ref={triggerRef}
      aria-expanded={open}
      aria-haspopup="menu"
      data-state={open ? 'open' : 'closed'}
      className={cn('', className)}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  className,
  align = 'start',
  sideOffset = 4,
  children,
  ...props
}: DropdownMenuContentProps) {
  const { open, setOpen, triggerRef } = useDropdownMenuContext();
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

    // Close on escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, setOpen, triggerRef]);

  if (!open) return null;

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <div
      ref={contentRef}
      role="menu"
      data-state={open ? 'open' : 'closed'}
      className={cn(
        'absolute z-50 min-w-[8rem]',
        'bg-white rounded-lg border border-gray-200 shadow-lg',
        'py-1',
        'animate-scale-in',
        alignClasses[align],
        className
      )}
      style={{ marginTop: sideOffset }}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  className,
  disabled,
  onSelect,
  destructive,
  children,
  ...props
}: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenuContext();

  const handleClick = () => {
    if (disabled) return;
    onSelect?.();
    setOpen(false);
  };

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      data-disabled={disabled || undefined}
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none',
        'transition-colors',
        destructive
          ? 'text-red-600 focus:bg-red-50 focus:text-red-600'
          : 'text-gray-700 focus:bg-gray-100 focus:text-gray-900',
        'hover:bg-gray-100',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuCheckboxItem({
  className,
  checked,
  onCheckedChange,
  children,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuItem
      className={cn('pl-8 pr-3', className)}
      onSelect={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        {checked && <Check size={14} />}
      </span>
      {children}
    </DropdownMenuItem>
  );
}

export function DropdownMenuRadioGroup({
  value,
  onValueChange,
  children,
  ...props
}: DropdownMenuRadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="group" {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export function DropdownMenuRadioItem({
  className,
  value,
  children,
  ...props
}: DropdownMenuRadioItemProps) {
  const radioContext = useContext(RadioGroupContext);
  const isChecked = radioContext?.value === value;

  return (
    <DropdownMenuItem
      className={cn('pl-8 pr-3', className)}
      onSelect={() => radioContext?.onValueChange?.(value)}
      {...props}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        {isChecked && <Circle size={6} fill="currentColor" />}
      </span>
      {children}
    </DropdownMenuItem>
  );
}

export function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <div
      className={cn(
        'px-3 py-1.5 text-xs font-semibold text-gray-500',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <div
      role="separator"
      className={cn('my-1 h-px bg-gray-200', className)}
      {...props}
    />
  );
}

export function DropdownMenuShortcut({
  className,
  ...props
}: DropdownMenuShortcutProps) {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest text-gray-400', className)}
      {...props}
    />
  );
}

export function DropdownMenuGroup({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="group" {...props}>{children}</div>;
}

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';
DropdownMenuContent.displayName = 'DropdownMenuContent';
DropdownMenuItem.displayName = 'DropdownMenuItem';
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';
DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';
DropdownMenuLabel.displayName = 'DropdownMenuLabel';
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
DropdownMenuGroup.displayName = 'DropdownMenuGroup';
