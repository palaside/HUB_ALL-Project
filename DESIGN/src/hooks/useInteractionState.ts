'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

export interface InteractionStateOptions {
  /** Whether the element is disabled */
  disabled?: boolean;
  /** Callback when hover state changes */
  onHover?: (isHovered: boolean) => void;
  /** Callback when press state changes */
  onPress?: (isPressed: boolean) => void;
  /** Callback when focus state changes */
  onFocus?: (isFocused: boolean) => void;
}

export interface InteractionState {
  isHovered: boolean;
  isPressed: boolean;
  isFocused: boolean;
  isInteractive: boolean;
}

export interface InteractionHandlers {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onKeyUp: (event: React.KeyboardEvent) => void;
}

/**
 * Hook for managing interactive states (hover, press, focus)
 * Provides consistent interaction behavior across components
 */
export function useInteractionState(options: InteractionStateOptions = {}) {
  const { disabled = false, onHover, onPress, onFocus } = options;

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPressedRef = useRef(false);

  // Reset states when disabled changes
  useEffect(() => {
    if (disabled) {
      setIsHovered(false);
      setIsPressed(false);
      isPressedRef.current = false;
    }
  }, [disabled]);

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setIsHovered(true);
    onHover?.(true);
  }, [disabled, onHover]);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);
    isPressedRef.current = false;
    onHover?.(false);
    onPress?.(false);
  }, [onHover, onPress]);

  // Handle mouse down
  const handleMouseDown = useCallback(() => {
    if (disabled) return;
    setIsPressed(true);
    isPressedRef.current = true;
    onPress?.(true);
  }, [disabled, onPress]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
    isPressedRef.current = false;
    onPress?.(false);
  }, [onPress]);

  // Handle focus
  const handleFocus = useCallback(() => {
    if (disabled) return;
    setIsFocused(true);
    onFocus?.(true);
  }, [disabled, onFocus]);

  // Handle blur
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsPressed(false);
    isPressedRef.current = false;
    onFocus?.(false);
    onPress?.(false);
  }, [onFocus, onPress]);

  // Handle keyboard interaction
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (disabled) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsPressed(true);
        isPressedRef.current = true;
        onPress?.(true);
      }
    },
    [disabled, onPress]
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        setIsPressed(false);
        isPressedRef.current = false;
        onPress?.(false);
      }
    },
    [onPress]
  );

  // Computed state
  const state: InteractionState = {
    isHovered,
    isPressed,
    isFocused,
    isInteractive: !disabled,
  };

  // Event handlers
  const handlers: InteractionHandlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
  };

  return {
    ...state,
    handlers,
    setHovered: setIsHovered,
    setPressed: setIsPressed,
    setFocused: setIsFocused,
  };
}

export type UseInteractionStateReturn = ReturnType<typeof useInteractionState>;
