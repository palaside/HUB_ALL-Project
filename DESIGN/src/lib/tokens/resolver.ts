/**
 * Token Resolution Engine
 * Resolves design tokens with support for aliases and theme overrides
 */

import { tokens, type DesignToken, type TokenGroup } from './base.tokens';

// ============================================
// Error Classes
// ============================================
export class TokenResolutionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenResolutionError';
  }
}

export class TokenCircularReferenceError extends Error {
  constructor(path: string) {
    super(`Circular reference detected in token: ${path}`);
    this.name = 'TokenCircularReferenceError';
  }
}

// ============================================
// Type Guards
// ============================================
function isDesignToken(value: unknown): value is DesignToken {
  return (
    typeof value === 'object' &&
    value !== null &&
    '$value' in value &&
    '$type' in value
  );
}

// ============================================
// Token Resolution
// ============================================

/**
 * Resolve a token value by its path
 * @param tokenPath - Dot-notated path to the token (e.g., "color.primary.500")
 * @param tokenSet - Token set to resolve from (defaults to base tokens)
 * @param visited - Set of visited paths (for circular reference detection)
 * @returns The resolved token value
 */
export function resolveTokenValue(
  tokenPath: string,
  tokenSet: TokenGroup = tokens as unknown as TokenGroup,
  visited: Set<string> = new Set()
): string | number {
  // Circular reference detection
  if (visited.has(tokenPath)) {
    throw new TokenCircularReferenceError(tokenPath);
  }
  visited.add(tokenPath);

  const pathParts = tokenPath.split('.');
  let current: DesignToken | TokenGroup | undefined = tokenSet;

  for (const part of pathParts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as TokenGroup)[part];
    } else {
      throw new TokenResolutionError(`Token path not found: ${tokenPath}`);
    }
  }

  if (isDesignToken(current)) {
    const value = current.$value;
    
    // Handle token references (aliases)
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      const refPath = value.slice(1, -1);
      return resolveTokenValue(refPath, tokenSet, new Set(visited));
    }
    
    return value;
  }

  throw new TokenResolutionError(`Invalid token at path: ${tokenPath}`);
}

/**
 * Get a design token object by path
 */
export function getToken(
  tokenPath: string,
  tokenSet: TokenGroup = tokens as unknown as TokenGroup
): DesignToken | null {
  const pathParts = tokenPath.split('.');
  let current: DesignToken | TokenGroup | undefined = tokenSet;

  for (const part of pathParts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as TokenGroup)[part];
    } else {
      return null;
    }
  }

  return isDesignToken(current) ? current : null;
}

/**
 * Get all tokens in a category
 */
export function getTokensByCategory(category: string): Record<string, DesignToken> {
  const result: Record<string, DesignToken> = {};
  
  function traverse(obj: TokenGroup, path: string = '') {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (isDesignToken(value)) {
        result[currentPath] = value;
      } else if (typeof value === 'object' && value !== null) {
        traverse(value as TokenGroup, currentPath);
      }
    }
  }

  const categoryTokens = (tokens as unknown as TokenGroup)[category];
  if (categoryTokens && typeof categoryTokens === 'object') {
    traverse(categoryTokens as TokenGroup, category);
  }

  return result;
}

/**
 * Convert tokens to CSS custom properties
 */
export function tokensToCssVariables(
  prefix: string = '',
  tokenSet: TokenGroup = tokens as unknown as TokenGroup
): Record<string, string> {
  const cssVars: Record<string, string> = {};

  function traverse(obj: TokenGroup, path: string = '') {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}-${key}` : key;
      const varName = `--${prefix}${currentPath}`.replace(/\./g, '-');

      if (isDesignToken(value)) {
        cssVars[varName] = String(value.$value);
      } else if (typeof value === 'object' && value !== null) {
        traverse(value as TokenGroup, currentPath);
      }
    }
  }

  traverse(tokenSet);
  return cssVars;
}

/**
 * Generate CSS string from tokens
 */
export function generateCssFromTokens(
  prefix: string = '',
  tokenSet: TokenGroup = tokens as unknown as TokenGroup
): string {
  const cssVars = tokensToCssVariables(prefix, tokenSet);
  const lines = Object.entries(cssVars).map(([name, value]) => `  ${name}: ${value};`);
  return `:root {\n${lines.join('\n')}\n}`;
}

/**
 * Get token value for CSS usage
 */
export function cssVar(tokenPath: string): string {
  const varName = `--${tokenPath.replace(/\./g, '-')}`;
  return `var(${varName})`;
}

/**
 * Theme-aware token resolver
 */
export function resolveThemedToken(
  tokenPath: string,
  theme: 'light' | 'dark' = 'light',
  themeOverrides?: Record<string, Record<string, DesignToken>>
): string | number {
  // Check for theme-specific override
  if (themeOverrides && themeOverrides[theme]) {
    const themeTokens = themeOverrides[theme];
    if (tokenPath in themeTokens) {
      return themeTokens[tokenPath].$value;
    }
  }

  // Fall back to base token
  return resolveTokenValue(tokenPath);
}

// ============================================
// Semantic Token Mappings
// ============================================
export const semanticTokens = {
  // Background colors
  'bg-primary': '{color.primary.500}',
  'bg-secondary': '{color.secondary.500}',
  'bg-success': '{color.success.500}',
  'bg-warning': '{color.warning.500}',
  'bg-error': '{color.error.500}',
  'bg-surface': '{color.neutral.0}',
  'bg-muted': '{color.neutral.100}',
  
  // Text colors
  'text-primary': '{color.neutral.900}',
  'text-secondary': '{color.neutral.600}',
  'text-muted': '{color.neutral.400}',
  'text-inverse': '{color.neutral.0}',
  'text-link': '{color.primary.600}',
  
  // Border colors
  'border-default': '{color.neutral.200}',
  'border-focus': '{color.primary.500}',
  'border-error': '{color.error.500}',
  
  // Interactive states
  'interactive-hover': '{color.primary.600}',
  'interactive-active': '{color.primary.700}',
  'interactive-disabled': '{color.neutral.300}',
};

export type SemanticTokenKey = keyof typeof semanticTokens;
