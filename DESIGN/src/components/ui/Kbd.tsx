'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// CVA Variants
// ============================================
const kbdVariants = cva(
  [
    'inline-flex items-center justify-center rounded',
    'font-mono font-medium',
    'border border-b-2 border-gray-300',
    'bg-gray-50 text-gray-600',
  ],
  {
    variants: {
      size: {
        sm: 'px-1 py-0.5 text-[10px] min-w-[18px]',
        md: 'px-1.5 py-0.5 text-xs min-w-[22px]',
        lg: 'px-2 py-1 text-sm min-w-[26px]',
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
export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  /** The keyboard key(s) to display */
  keys?: string | string[];
}

// ============================================
// Component
// ============================================
export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ className, size, keys, children, ...props }, ref) => {
    const keysArray = keys
      ? Array.isArray(keys)
        ? keys
        : [keys]
      : [];

    if (keysArray.length > 0) {
      return (
        <span className="inline-flex items-center gap-1">
          {keysArray.map((key, index) => (
            <React.Fragment key={index}>
              <kbd
                ref={index === 0 ? ref : undefined}
                className={cn(kbdVariants({ size }), className)}
                {...props}
              >
                {formatKey(key)}
              </kbd>
              {index < keysArray.length - 1 && (
                <span className="text-gray-400 text-xs">+</span>
              )}
            </React.Fragment>
          ))}
        </span>
      );
    }

    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ size }), className)}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);

// ============================================
// Helper: Format key names
// ============================================
function formatKey(key: string): string {
  const keyMap: Record<string, string> = {
    cmd: '⌘',
    command: '⌘',
    ctrl: 'Ctrl',
    control: 'Ctrl',
    alt: 'Alt',
    option: '⌥',
    opt: '⌥',
    shift: '⇧',
    enter: '↵',
    return: '↵',
    tab: '⇥',
    esc: 'Esc',
    escape: 'Esc',
    space: '␣',
    backspace: '⌫',
    delete: '⌦',
    up: '↑',
    down: '↓',
    left: '←',
    right: '→',
  };

  const lowerKey = key.toLowerCase();
  return keyMap[lowerKey] || key.toUpperCase();
}

Kbd.displayName = 'Kbd';

export { kbdVariants };
export default Kbd;
