'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { type ThemeStyle, allStyles, stylesByEra, getStyleById } from '@/lib/styles';
import { Check, Palette, Globe, Sparkles, Leaf, Clock } from 'lucide-react';

// ============================================
// Context
// ============================================
interface StyleContextValue {
  currentStyle: ThemeStyle;
  setStyle: (styleId: string) => void;
  applyStyle: (style: ThemeStyle) => void;
}

const StyleContext = createContext<StyleContextValue | null>(null);

export function useStyle() {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
}

// ============================================
// Style Provider
// ============================================
interface StyleProviderProps {
  children: React.ReactNode;
  defaultStyle?: string;
}

export function StyleProvider({ children, defaultStyle = 'minimalist' }: StyleProviderProps) {
  const [currentStyle, setCurrentStyle] = useState<ThemeStyle>(() => {
    return getStyleById(defaultStyle) || allStyles[0];
  });

  const applyStyle = useCallback((style: ThemeStyle) => {
    const root = document.documentElement;
    
    // Apply colors
    root.style.setProperty('--style-primary', style.colors.primary);
    root.style.setProperty('--style-secondary', style.colors.secondary);
    root.style.setProperty('--style-accent', style.colors.accent);
    root.style.setProperty('--style-background', style.colors.background);
    root.style.setProperty('--style-surface', style.colors.surface);
    root.style.setProperty('--style-text', style.colors.text);
    root.style.setProperty('--style-text-muted', style.colors.textMuted);
    root.style.setProperty('--style-border', style.colors.border);
    
    // Apply typography
    root.style.setProperty('--style-font-family', style.typography.fontFamily);
    root.style.setProperty('--style-font-family-heading', style.typography.fontFamilyHeading || style.typography.fontFamily);
    root.style.setProperty('--style-font-weight', style.typography.fontWeight);
    root.style.setProperty('--style-letter-spacing', style.typography.letterSpacing);
    root.style.setProperty('--style-line-height', style.typography.lineHeight);
    
    // Apply border radius
    root.style.setProperty('--style-radius', style.borderRadius);
    
    // Apply shadows
    root.style.setProperty('--style-shadow-sm', style.shadows.sm);
    root.style.setProperty('--style-shadow-md', style.shadows.md);
    root.style.setProperty('--style-shadow-lg', style.shadows.lg);

    // Apply effects
    if (style.effects?.blur) {
      root.style.setProperty('--style-blur', style.effects.blur);
    }
    if (style.effects?.gradient) {
      root.style.setProperty('--style-gradient', style.effects.gradient);
    }
  }, []);

  const setStyle = useCallback((styleId: string) => {
    const style = getStyleById(styleId);
    if (style) {
      setCurrentStyle(style);
      applyStyle(style);
    }
  }, [applyStyle]);

  useEffect(() => {
    applyStyle(currentStyle);
  }, [currentStyle, applyStyle]);

  return (
    <StyleContext.Provider value={{ currentStyle, setStyle, applyStyle }}>
      {children}
    </StyleContext.Provider>
  );
}

// ============================================
// Style Card Component
// ============================================
interface StyleCardProps {
  style: ThemeStyle;
  isSelected: boolean;
  onClick: () => void;
}

function StyleCard({ style, isSelected, onClick }: StyleCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-start p-4 rounded-xl border-2 transition-all duration-200',
        'hover:scale-[1.02] hover:shadow-lg',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        isSelected
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
          : 'border-gray-200 bg-white hover:border-gray-300'
      )}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
          <Check size={12} className="text-white" />
        </div>
      )}

      {/* Color swatches */}
      <div className="flex gap-1 mb-3">
        <div
          className="w-6 h-6 rounded-full border border-gray-200"
          style={{ backgroundColor: style.colors.primary }}
        />
        <div
          className="w-6 h-6 rounded-full border border-gray-200"
          style={{ backgroundColor: style.colors.secondary }}
        />
        <div
          className="w-6 h-6 rounded-full border border-gray-200"
          style={{ backgroundColor: style.colors.accent }}
        />
        <div
          className="w-6 h-6 rounded-full border border-gray-200"
          style={{ backgroundColor: style.colors.background }}
        />
      </div>

      {/* Name and origin */}
      <h4 className="font-semibold text-gray-900 text-sm">
        {style.name}
        {style.nameLocal && (
          <span className="ml-1 text-gray-500 font-normal">({style.nameLocal})</span>
        )}
      </h4>
      <p className="text-xs text-gray-500 mt-0.5">
        {style.origin} {style.year && `• ${style.year}`}
      </p>

      {/* Characteristics */}
      <div className="flex flex-wrap gap-1 mt-2">
        {style.characteristics.slice(0, 3).map((char) => (
          <span
            key={char}
            className="px-1.5 py-0.5 text-[10px] bg-gray-100 text-gray-600 rounded"
          >
            {char}
          </span>
        ))}
      </div>
    </button>
  );
}

// ============================================
// Style Switcher Component
// ============================================
interface StyleSwitcherProps {
  className?: string;
}

export function StyleSwitcher({ className }: StyleSwitcherProps) {
  const { currentStyle, setStyle } = useStyle();
  const [activeTab, setActiveTab] = useState<'classic' | 'modern' | 'cultural' | 'futuristic'>('modern');

  const eraIcons = {
    classic: <Clock size={16} />,
    modern: <Palette size={16} />,
    cultural: <Globe size={16} />,
    futuristic: <Sparkles size={16} />,
  };

  const eraTitles = {
    classic: 'Classic (Pre-2000)',
    modern: 'Modern (2000-2020)',
    cultural: 'Cultural Styles',
    futuristic: 'Futuristic & Nature',
  };

  // Combine futuristic and nature for display
  const displayStyles = {
    classic: stylesByEra.classic,
    modern: stylesByEra.modern,
    cultural: stylesByEra.cultural,
    futuristic: [...stylesByEra.futuristic, ...allStyles.filter(s => ['organic', 'ocean', 'forest'].includes(s.id))],
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Era Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(Object.keys(eraIcons) as Array<keyof typeof eraIcons>).map((era) => (
          <button
            key={era}
            onClick={() => setActiveTab(era)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
              activeTab === era
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {eraIcons[era]}
            {eraTitles[era]}
          </button>
        ))}
      </div>

      {/* Style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayStyles[activeTab].map((style) => (
          <StyleCard
            key={style.id}
            style={style}
            isSelected={currentStyle.id === style.id}
            onClick={() => setStyle(style.id)}
          />
        ))}
      </div>

      {/* Current Style Info */}
      <div className="mt-8 p-6 rounded-xl bg-gray-50 border border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Current Style: {currentStyle.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{currentStyle.description}</p>
          </div>
          <div className="flex gap-1">
            {[currentStyle.colors.primary, currentStyle.colors.secondary, currentStyle.colors.accent].map((color, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-lg border border-gray-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {currentStyle.characteristics.map((char) => (
            <span
              key={char}
              className="px-2 py-1 text-xs bg-white border border-gray-200 text-gray-700 rounded-full"
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// Style Preview Component
// ============================================
interface StylePreviewProps {
  style: ThemeStyle;
  className?: string;
}

export function StylePreview({ style, className }: StylePreviewProps) {
  return (
    <div
      className={cn('rounded-xl overflow-hidden', className)}
      style={{
        backgroundColor: style.colors.background,
        fontFamily: style.typography.fontFamily,
      }}
    >
      {/* Header */}
      <div
        className="p-4"
        style={{ backgroundColor: style.colors.primary }}
      >
        <h3
          className="font-semibold"
          style={{
            color: style.colors.text === '#FFFFFF' ? '#FFFFFF' : style.colors.background,
            fontFamily: style.typography.fontFamilyHeading || style.typography.fontFamily,
          }}
        >
          {style.name}
        </h3>
      </div>

      {/* Content */}
      <div className="p-4" style={{ backgroundColor: style.colors.surface }}>
        <p
          className="text-sm mb-3"
          style={{ color: style.colors.text, lineHeight: style.typography.lineHeight }}
        >
          {style.description}
        </p>

        {/* Sample Button */}
        <button
          className="px-4 py-2 text-sm font-medium transition-all"
          style={{
            backgroundColor: style.colors.primary,
            color: '#FFFFFF',
            borderRadius: style.borderRadius,
            boxShadow: style.shadows.sm,
          }}
        >
          Sample Button
        </button>

        {/* Sample Card */}
        <div
          className="mt-4 p-3"
          style={{
            backgroundColor: style.colors.background,
            borderRadius: style.borderRadius,
            border: `1px solid ${style.colors.border}`,
            boxShadow: style.shadows.md,
          }}
        >
          <p
            className="text-xs"
            style={{ color: style.colors.textMuted }}
          >
            Sample card content with {style.name} styling
          </p>
        </div>
      </div>
    </div>
  );
}

StyleProvider.displayName = 'StyleProvider';
StyleSwitcher.displayName = 'StyleSwitcher';
StylePreview.displayName = 'StylePreview';
