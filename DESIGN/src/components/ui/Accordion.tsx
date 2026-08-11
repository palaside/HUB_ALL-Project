'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

// ============================================
// Context
// ============================================
interface AccordionContextValue {
  value: string[];
  onValueChange: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion provider');
  }
  return context;
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionItem components must be used within an AccordionItem');
  }
  return context;
}

// ============================================
// Types
// ============================================
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Type of accordion - single or multiple items open */
  type?: 'single' | 'multiple';
  /** Controlled value */
  value?: string | string[];
  /** Default value */
  defaultValue?: string | string[];
  /** Callback when value changes */
  onValueChange?: (value: string | string[]) => void;
  /** Allow collapsing all items */
  collapsible?: boolean;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

// ============================================
// Components
// ============================================
export function Accordion({
  type = 'single',
  value: controlledValue,
  defaultValue,
  onValueChange,
  collapsible = true,
  className,
  children,
  ...props
}: AccordionProps) {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const value = controlledValue
    ? Array.isArray(controlledValue)
      ? controlledValue
      : [controlledValue]
    : internalValue;

  const handleValueChange = useCallback(
    (itemValue: string) => {
      let newValue: string[];

      if (type === 'single') {
        if (value.includes(itemValue) && collapsible) {
          newValue = [];
        } else {
          newValue = [itemValue];
        }
      } else {
        if (value.includes(itemValue)) {
          newValue = value.filter((v) => v !== itemValue);
        } else {
          newValue = [...value, itemValue];
        }
      }

      if (!controlledValue) {
        setInternalValue(newValue);
      }

      onValueChange?.(type === 'single' ? (newValue[0] ?? '') : newValue);
    },
    [type, value, collapsible, controlledValue, onValueChange]
  );

  return (
    <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, type }}>
      <div className={cn('divide-y divide-gray-200 border-y border-gray-200', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  disabled,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const { value: openValues } = useAccordionContext();
  const isOpen = openValues.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        data-disabled={disabled || undefined}
        className={cn(disabled && 'opacity-50', className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const { onValueChange } = useAccordionContext();
  const { value, isOpen } = useAccordionItemContext();

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      className={cn(
        'flex w-full items-center justify-between py-4 px-1',
        'text-left text-sm font-medium text-gray-900',
        'hover:underline',
        'transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
      <ChevronDown
        size={16}
        className={cn(
          'shrink-0 text-gray-500 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  const { isOpen } = useAccordionItemContext();

  return (
    <div
      data-state={isOpen ? 'open' : 'closed'}
      className={cn(
        'overflow-hidden transition-all duration-200',
        isOpen ? 'animate-accordion-down' : 'animate-accordion-up hidden'
      )}
      {...props}
    >
      <div className={cn('pb-4 pt-0 text-sm text-gray-600', className)}>
        {children}
      </div>
    </div>
  );
}

Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent';
