'use client';

import { useCallback, useMemo } from 'react';
import { tokens, resolveTokenValue, cssVar } from '@/lib/tokens';

/**
 * Hook for accessing design tokens in components
 * Provides runtime access to token values and CSS variable helpers
 */
export function useDesignTokens() {
  /**
   * Get a CSS variable reference for a token path
   */
  const getVar = useCallback((tokenPath: string): string => {
    return cssVar(tokenPath);
  }, []);

  /**
   * Get the raw value of a token
   */
  const getValue = useCallback((tokenPath: string): string | number => {
    try {
      return resolveTokenValue(tokenPath);
    } catch {
      console.warn(`Token not found: ${tokenPath}`);
      return '';
    }
  }, []);

  /**
   * Get a token value from the DOM (computed CSS variable)
   */
  const getComputedToken = useCallback((name: string): string => {
    if (typeof document === 'undefined') return '';
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--${name}`)
      .trim();
  }, []);

  /**
   * Get color palette tokens
   */
  const colors = useMemo(() => tokens.color, []);

  /**
   * Get spacing tokens
   */
  const spacing = useMemo(() => tokens.spacing, []);

  /**
   * Get typography tokens
   */
  const typography = useMemo(() => tokens.typography, []);

  return {
    getVar,
    getValue,
    getComputedToken,
    colors,
    spacing,
    typography,
    tokens,
  };
}

export type UseDesignTokensReturn = ReturnType<typeof useDesignTokens>;
