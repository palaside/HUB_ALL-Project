/**
 * Design Tokens - W3C Design Token Standard
 * Base token definitions for the design system
 */

export interface DesignToken {
  $value: string | number;
  $type: 'color' | 'dimension' | 'fontFamily' | 'fontWeight' | 'duration' | 'cubicBezier' | 'shadow' | 'number';
  $description?: string;
  $extensions?: {
    'com.figma'?: {
      variableId: string;
      collection: string;
    };
  };
}

export interface TokenGroup {
  [key: string]: DesignToken | TokenGroup;
}

// ============================================
// Color Tokens
// ============================================
export const colorTokens = {
  primary: {
    50: { $value: '#eff6ff', $type: 'color' as const, $description: 'Lightest primary shade' },
    100: { $value: '#dbeafe', $type: 'color' as const },
    200: { $value: '#bfdbfe', $type: 'color' as const },
    300: { $value: '#93c5fd', $type: 'color' as const },
    400: { $value: '#60a5fa', $type: 'color' as const },
    500: { $value: '#3b82f6', $type: 'color' as const, $description: 'Primary brand color' },
    600: { $value: '#2563eb', $type: 'color' as const },
    700: { $value: '#1d4ed8', $type: 'color' as const },
    800: { $value: '#1e40af', $type: 'color' as const },
    900: { $value: '#1e3a8a', $type: 'color' as const, $description: 'Darkest primary shade' },
  },
  secondary: {
    50: { $value: '#f5f3ff', $type: 'color' as const },
    100: { $value: '#ede9fe', $type: 'color' as const },
    200: { $value: '#ddd6fe', $type: 'color' as const },
    300: { $value: '#c4b5fd', $type: 'color' as const },
    400: { $value: '#a78bfa', $type: 'color' as const },
    500: { $value: '#8b5cf6', $type: 'color' as const, $description: 'Secondary brand color' },
    600: { $value: '#7c3aed', $type: 'color' as const },
    700: { $value: '#6d28d9', $type: 'color' as const },
    800: { $value: '#5b21b6', $type: 'color' as const },
    900: { $value: '#4c1d95', $type: 'color' as const },
  },
  neutral: {
    0: { $value: '#ffffff', $type: 'color' as const, $description: 'Pure white' },
    50: { $value: '#f9fafb', $type: 'color' as const },
    100: { $value: '#f3f4f6', $type: 'color' as const },
    200: { $value: '#e5e7eb', $type: 'color' as const },
    300: { $value: '#d1d5db', $type: 'color' as const },
    400: { $value: '#9ca3af', $type: 'color' as const },
    500: { $value: '#6b7280', $type: 'color' as const },
    600: { $value: '#4b5563', $type: 'color' as const },
    700: { $value: '#374151', $type: 'color' as const },
    800: { $value: '#1f2937', $type: 'color' as const },
    900: { $value: '#111827', $type: 'color' as const },
    1000: { $value: '#030712', $type: 'color' as const, $description: 'Near black' },
  },
  success: {
    50: { $value: '#f0fdf4', $type: 'color' as const },
    100: { $value: '#dcfce7', $type: 'color' as const },
    500: { $value: '#22c55e', $type: 'color' as const, $description: 'Success color' },
    600: { $value: '#16a34a', $type: 'color' as const },
    700: { $value: '#15803d', $type: 'color' as const },
  },
  warning: {
    50: { $value: '#fffbeb', $type: 'color' as const },
    100: { $value: '#fef3c7', $type: 'color' as const },
    500: { $value: '#f59e0b', $type: 'color' as const, $description: 'Warning color' },
    600: { $value: '#d97706', $type: 'color' as const },
    700: { $value: '#b45309', $type: 'color' as const },
  },
  error: {
    50: { $value: '#fef2f2', $type: 'color' as const },
    100: { $value: '#fee2e2', $type: 'color' as const },
    500: { $value: '#ef4444', $type: 'color' as const, $description: 'Error color' },
    600: { $value: '#dc2626', $type: 'color' as const },
    700: { $value: '#b91c1c', $type: 'color' as const },
  },
};

// ============================================
// Spacing Tokens
// ============================================
export const spacingTokens = {
  '0': { $value: '0px', $type: 'dimension' as const },
  px: { $value: '1px', $type: 'dimension' as const },
  '0.5': { $value: '0.125rem', $type: 'dimension' as const },
  '1': { $value: '0.25rem', $type: 'dimension' as const },
  '1.5': { $value: '0.375rem', $type: 'dimension' as const },
  '2': { $value: '0.5rem', $type: 'dimension' as const },
  '2.5': { $value: '0.625rem', $type: 'dimension' as const },
  '3': { $value: '0.75rem', $type: 'dimension' as const },
  '3.5': { $value: '0.875rem', $type: 'dimension' as const },
  '4': { $value: '1rem', $type: 'dimension' as const },
  '5': { $value: '1.25rem', $type: 'dimension' as const },
  '6': { $value: '1.5rem', $type: 'dimension' as const },
  '7': { $value: '1.75rem', $type: 'dimension' as const },
  '8': { $value: '2rem', $type: 'dimension' as const },
  '9': { $value: '2.25rem', $type: 'dimension' as const },
  '10': { $value: '2.5rem', $type: 'dimension' as const },
  '11': { $value: '2.75rem', $type: 'dimension' as const },
  '12': { $value: '3rem', $type: 'dimension' as const },
  '14': { $value: '3.5rem', $type: 'dimension' as const },
  '16': { $value: '4rem', $type: 'dimension' as const },
  '20': { $value: '5rem', $type: 'dimension' as const },
  '24': { $value: '6rem', $type: 'dimension' as const },
  '28': { $value: '7rem', $type: 'dimension' as const },
  '32': { $value: '8rem', $type: 'dimension' as const },
  '36': { $value: '9rem', $type: 'dimension' as const },
  '40': { $value: '10rem', $type: 'dimension' as const },
  '44': { $value: '11rem', $type: 'dimension' as const },
  '48': { $value: '12rem', $type: 'dimension' as const },
  '52': { $value: '13rem', $type: 'dimension' as const },
  '56': { $value: '14rem', $type: 'dimension' as const },
  '60': { $value: '15rem', $type: 'dimension' as const },
  '64': { $value: '16rem', $type: 'dimension' as const },
  '72': { $value: '18rem', $type: 'dimension' as const },
  '80': { $value: '20rem', $type: 'dimension' as const },
  '96': { $value: '24rem', $type: 'dimension' as const },
  xs: { $value: '0.25rem', $type: 'dimension' as const, $description: '4px' },
  sm: { $value: '0.5rem', $type: 'dimension' as const, $description: '8px' },
  md: { $value: '1rem', $type: 'dimension' as const, $description: '16px' },
  lg: { $value: '1.5rem', $type: 'dimension' as const, $description: '24px' },
  xl: { $value: '2rem', $type: 'dimension' as const, $description: '32px' },
  '2xl': { $value: '3rem', $type: 'dimension' as const, $description: '48px' },
  '3xl': { $value: '4rem', $type: 'dimension' as const, $description: '64px' },
};

// ============================================
// Typography Tokens
// ============================================
export const typographyTokens = {
  fontFamily: {
    sans: {
      $value: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      $type: 'fontFamily' as const,
      $description: 'Default sans-serif font stack',
    },
    serif: {
      $value: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      $type: 'fontFamily' as const,
    },
    mono: {
      $value: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
      $type: 'fontFamily' as const,
      $description: 'Monospace font for code',
    },
  },
  fontSize: {
    xs: { $value: '0.75rem', $type: 'dimension' as const, $description: '12px' },
    sm: { $value: '0.875rem', $type: 'dimension' as const, $description: '14px' },
    base: { $value: '1rem', $type: 'dimension' as const, $description: '16px' },
    lg: { $value: '1.125rem', $type: 'dimension' as const, $description: '18px' },
    xl: { $value: '1.25rem', $type: 'dimension' as const, $description: '20px' },
    '2xl': { $value: '1.5rem', $type: 'dimension' as const, $description: '24px' },
    '3xl': { $value: '1.875rem', $type: 'dimension' as const, $description: '30px' },
    '4xl': { $value: '2.25rem', $type: 'dimension' as const, $description: '36px' },
    '5xl': { $value: '3rem', $type: 'dimension' as const, $description: '48px' },
    '6xl': { $value: '3.75rem', $type: 'dimension' as const, $description: '60px' },
    '7xl': { $value: '4.5rem', $type: 'dimension' as const, $description: '72px' },
  },
  fontWeight: {
    thin: { $value: 100, $type: 'fontWeight' as const },
    extralight: { $value: 200, $type: 'fontWeight' as const },
    light: { $value: 300, $type: 'fontWeight' as const },
    normal: { $value: 400, $type: 'fontWeight' as const },
    medium: { $value: 500, $type: 'fontWeight' as const },
    semibold: { $value: 600, $type: 'fontWeight' as const },
    bold: { $value: 700, $type: 'fontWeight' as const },
    extrabold: { $value: 800, $type: 'fontWeight' as const },
    black: { $value: 900, $type: 'fontWeight' as const },
  },
  lineHeight: {
    none: { $value: 1, $type: 'number' as const },
    tight: { $value: 1.25, $type: 'number' as const },
    snug: { $value: 1.375, $type: 'number' as const },
    normal: { $value: 1.5, $type: 'number' as const },
    relaxed: { $value: 1.625, $type: 'number' as const },
    loose: { $value: 2, $type: 'number' as const },
  },
};

// ============================================
// Border Radius Tokens
// ============================================
export const borderRadiusTokens = {
  none: { $value: '0px', $type: 'dimension' as const },
  sm: { $value: '0.125rem', $type: 'dimension' as const, $description: '2px' },
  DEFAULT: { $value: '0.25rem', $type: 'dimension' as const, $description: '4px' },
  md: { $value: '0.375rem', $type: 'dimension' as const, $description: '6px' },
  lg: { $value: '0.5rem', $type: 'dimension' as const, $description: '8px' },
  xl: { $value: '0.75rem', $type: 'dimension' as const, $description: '12px' },
  '2xl': { $value: '1rem', $type: 'dimension' as const, $description: '16px' },
  '3xl': { $value: '1.5rem', $type: 'dimension' as const, $description: '24px' },
  full: { $value: '9999px', $type: 'dimension' as const, $description: 'Fully rounded' },
};

// ============================================
// Shadow Tokens
// ============================================
export const shadowTokens = {
  sm: { $value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', $type: 'shadow' as const },
  DEFAULT: { $value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', $type: 'shadow' as const },
  md: { $value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', $type: 'shadow' as const },
  lg: { $value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', $type: 'shadow' as const },
  xl: { $value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', $type: 'shadow' as const },
  '2xl': { $value: '0 25px 50px -12px rgb(0 0 0 / 0.25)', $type: 'shadow' as const },
  inner: { $value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)', $type: 'shadow' as const },
  none: { $value: '0 0 #0000', $type: 'shadow' as const },
};

// ============================================
// Duration Tokens (Animation)
// ============================================
export const durationTokens = {
  0: { $value: '0ms', $type: 'duration' as const },
  75: { $value: '75ms', $type: 'duration' as const },
  100: { $value: '100ms', $type: 'duration' as const },
  150: { $value: '150ms', $type: 'duration' as const },
  200: { $value: '200ms', $type: 'duration' as const },
  300: { $value: '300ms', $type: 'duration' as const },
  500: { $value: '500ms', $type: 'duration' as const },
  700: { $value: '700ms', $type: 'duration' as const },
  1000: { $value: '1000ms', $type: 'duration' as const },
  fast: { $value: '150ms', $type: 'duration' as const, $description: 'Fast transition' },
  normal: { $value: '200ms', $type: 'duration' as const, $description: 'Normal transition' },
  slow: { $value: '300ms', $type: 'duration' as const, $description: 'Slow transition' },
};

// ============================================
// Easing Tokens
// ============================================
export const easingTokens = {
  linear: { $value: 'linear', $type: 'cubicBezier' as const },
  in: { $value: 'cubic-bezier(0.4, 0, 1, 1)', $type: 'cubicBezier' as const },
  out: { $value: 'cubic-bezier(0, 0, 0.2, 1)', $type: 'cubicBezier' as const },
  inOut: { $value: 'cubic-bezier(0.4, 0, 0.2, 1)', $type: 'cubicBezier' as const },
};

// ============================================
// Complete Token Set
// ============================================
export const tokens = {
  color: colorTokens,
  spacing: spacingTokens,
  typography: typographyTokens,
  borderRadius: borderRadiusTokens,
  shadow: shadowTokens,
  duration: durationTokens,
  easing: easingTokens,
};

export type Tokens = typeof tokens;
