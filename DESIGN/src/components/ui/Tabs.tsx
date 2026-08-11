'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// Context
// ============================================
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
}

// ============================================
// CVA Variants
// ============================================
const tabsListVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 p-1 rounded-lg',
        underline: 'border-b border-gray-200 gap-4',
        pills: 'gap-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap',
    'text-sm font-medium transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'rounded-md px-3 py-1.5',
          'text-gray-600 hover:text-gray-900',
          'data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm',
        ],
        underline: [
          'pb-3 px-1 border-b-2 border-transparent -mb-px',
          'text-gray-500 hover:text-gray-700 hover:border-gray-300',
          'data-[state=active]:border-blue-500 data-[state=active]:text-blue-600',
        ],
        pills: [
          'rounded-full px-4 py-2',
          'text-gray-600 hover:bg-gray-100',
          'data-[state=active]:bg-blue-500 data-[state=active]:text-white',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ============================================
// Types
// ============================================
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
  value: string;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

// ============================================
// Components
// ============================================
export function Tabs({
  defaultValue,
  value,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value ?? internalValue;

  const setActiveTab = useCallback(
    (newValue: string) => {
      if (!value) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [value, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, variant, children, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  className,
  variant,
  value,
  children,
  ...props
}: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      className={cn(tabsTriggerVariants({ variant }), className)}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ className, value, children, ...props }: TabsContentProps) {
  const { activeTab } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      data-state={isActive ? 'active' : 'inactive'}
      className={cn('mt-4 animate-fade-in', className)}
      {...props}
    >
      {children}
    </div>
  );
}

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';

export { tabsListVariants, tabsTriggerVariants };
