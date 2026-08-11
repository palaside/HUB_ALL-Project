'use client';

import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Badge,
  Input,
  Slider,
  Separator,
  Avatar,
  AvatarGroup,
  Alert,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui';
import { type ThemeStyle } from '@/lib/styles';
import { Copy, Check, Sliders, Code, Eye, RefreshCw, Star, ArrowRight, Shield, Zap } from 'lucide-react';

interface StyleCustomizerProps {
  style: ThemeStyle;
  onUpdate?: (customizedStyle: ThemeStyle) => void;
}

export function StyleCustomizer({ style }: StyleCustomizerProps) {
  // Customization state
  const [transparency, setTransparency] = useState<number>(15); // percentage or alpha
  const [blurAmount, setBlurAmount] = useState<number>(12); // px
  const [borderRadius, setBorderRadius] = useState<number>(
    style.borderRadius === '0px' ? 0 : style.borderRadius.includes('24') ? 24 : style.borderRadius.includes('16') ? 16 : 8
  ); // px
  const [outlineWidth, setOutlineWidth] = useState<number>(style.id === 'brutalism' || style.id === 'bauhaus' ? 2 : 1); // px
  const [primaryColor, setPrimaryColor] = useState<string>(style.colors.primary);
  const [backgroundColor, setBackgroundColor] = useState<string>(style.colors.background);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  // Reset when style changes
  React.useEffect(() => {
    setPrimaryColor(style.colors.primary);
    setBackgroundColor(style.colors.background);
    setBorderRadius(
      style.borderRadius === '0px' ? 0 : style.borderRadius.includes('24') ? 24 : style.borderRadius.includes('20') ? 20 : style.borderRadius.includes('16') ? 16 : 8
    );
    setOutlineWidth(style.id === 'brutalism' || style.id === 'bauhaus' ? 2 : 1);
  }, [style]);

  // Generate CSS string tailored to the style
  const getStyleSpecificCss = () => {
    if (style.id === 'neumorphism') {
      return `/* ${style.name} Style */
background: ${style.colors.background};
border-radius: ${borderRadius}px;
box-shadow: ${style.shadows.md};
color: ${style.colors.text};
border: none;`;
    }
    if (style.id === 'brutalism' || style.id === 'bauhaus') {
      return `/* ${style.name} Style */
background: ${style.colors.surface};
border-radius: ${borderRadius}px;
border: ${outlineWidth}px solid ${style.colors.border};
box-shadow: ${style.shadows.md};
color: ${style.colors.text};`;
    }
    if (style.id === 'cyberpunk' || style.id === 'vaporwave') {
      return `/* ${style.name} Style */
background: ${style.colors.surface};
border-radius: ${borderRadius}px;
border: ${outlineWidth}px solid ${primaryColor};
box-shadow: ${style.shadows.md};
color: ${style.colors.text};`;
    }
    return `/* ${style.name} Custom Style */
background: ${primaryColor}${Math.round(transparency * 2.55).toString(16).padStart(2, '0')};
border-radius: ${borderRadius}px;
backdrop-filter: blur(${blurAmount}px);
-webkit-backdrop-filter: blur(${blurAmount}px);
border: ${outlineWidth}px solid ${primaryColor}33;
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
color: ${style.colors.text};`;
  };

  const generatedCss = getStyleSpecificCss();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render style-specific component styling wrapper
  const getPreviewContainerStyle = (): React.CSSProperties => {
    if (style.id === 'neumorphism') {
      return {
        backgroundColor: style.colors.background,
        borderRadius: `${borderRadius}px`,
        boxShadow: style.shadows.lg,
        color: style.colors.text,
        border: 'none',
      };
    }
    if (style.id === 'brutalism' || style.id === 'bauhaus') {
      return {
        backgroundColor: style.colors.surface,
        borderRadius: `${borderRadius}px`,
        border: `${outlineWidth}px solid ${style.colors.border}`,
        boxShadow: style.shadows.md,
        color: style.colors.text,
      };
    }
    if (style.id === 'cyberpunk' || style.id === 'vaporwave') {
      return {
        backgroundColor: style.colors.surface,
        borderRadius: `${borderRadius}px`,
        border: `${outlineWidth}px solid ${primaryColor}`,
        boxShadow: style.shadows.lg,
        color: style.colors.text,
      };
    }
    // Glassmorphism / Default
    return {
      backgroundColor: `${primaryColor}${Math.round(transparency * 2.55).toString(16).padStart(2, '0')}`,
      borderRadius: `${borderRadius}px`,
      backdropFilter: `blur(${blurAmount}px)`,
      WebkitBackdropFilter: `blur(${blurAmount}px)`,
      border: `${outlineWidth}px solid ${primaryColor}33`,
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
      color: style.colors.text,
    };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Controls Column */}
      <div className="lg:col-span-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sliders className="text-blue-400" size={20} />
              <h3 className="text-lg font-bold">
                {style.name} Generator
              </h3>
            </div>
            <Badge variant="primary" size="sm">{style.era}</Badge>
          </div>

          <p className="text-xs text-gray-400 mb-6">
            Customize parameters for <span className="text-white font-semibold">{style.name}</span> in real-time and preview live components below.
          </p>

          <div className="space-y-6">
            {/* Transparency Slider (for glass/modern) */}
            {['glassmorphism', 'minimalist', 'ocean'].includes(style.id) && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-300">TRANSPARENCY</span>
                  <span className="text-blue-400">{transparency}%</span>
                </div>
                <Slider
                  value={transparency}
                  onValueChange={setTransparency}
                  min={0}
                  max={100}
                  step={1}
                  size="sm"
                />
              </div>
            )}

            {/* Blur Slider */}
            {style.id === 'glassmorphism' && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-300">BLUR</span>
                  <span className="text-blue-400">{blurAmount}px</span>
                </div>
                <Slider
                  value={blurAmount}
                  onValueChange={setBlurAmount}
                  min={0}
                  max={40}
                  step={1}
                  size="sm"
                />
              </div>
            )}

            {/* Border Radius Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-300">BORDER RADIUS</span>
                <span className="text-blue-400">{borderRadius}px</span>
              </div>
              <Slider
                value={borderRadius}
                onValueChange={setBorderRadius}
                min={0}
                max={40}
                step={1}
                size="sm"
              />
            </div>

            {/* Outline Width Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-300">OUTLINE / BORDER</span>
                <span className="text-blue-400">{outlineWidth}px</span>
              </div>
              <Slider
                value={outlineWidth}
                onValueChange={setOutlineWidth}
                min={0}
                max={5}
                step={1}
                size="sm"
              />
            </div>

            {/* Color Pickers */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-300">PRIMARY COLOR</span>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white px-3 py-1.5 rounded-lg text-sm font-mono w-32"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copy CSS Button */}
        <div className="mt-8 pt-4 border-t border-gray-700">
          <Button
            onClick={handleCopy}
            variant="primary"
            fullWidth
            leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
          >
            {copied ? 'COPIED TO CLIPBOARD!' : 'COPY CSS TO CLIPBOARD'}
          </Button>
        </div>
      </div>

      {/* Live Real-world Application Preview Column */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {/* Toggle View */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Eye size={20} className="text-blue-500" />
              Live Preview: <span className="text-blue-600">{style.name}</span>
            </h3>
            <p className="text-xs text-gray-500">
              {style.description}
            </p>
          </div>
          <div className="flex bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'preview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              UI Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'code' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              CSS Code
            </button>
          </div>
        </div>

        {activeTab === 'code' ? (
          <div className="bg-gray-900 text-green-400 p-6 rounded-2xl font-mono text-sm overflow-x-auto shadow-lg">
            <pre>{generatedCss}</pre>
          </div>
        ) : (
          /* Style-Specific Real-world UI Container */
          <div
            className="p-8 rounded-2xl relative overflow-hidden transition-all duration-300 shadow-2xl"
            style={{
              backgroundColor: backgroundColor,
              backgroundImage: style.id === 'cyberpunk'
                ? 'linear-gradient(rgba(0,245,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.05) 1px, transparent 1px)'
                : style.id === 'vaporwave'
                ? 'linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)'
                : 'radial-gradient(circle at 20% 20%, #3b82f6 0%, transparent 40%), radial-gradient(circle at 80% 80%, #8b5cf6 0%, transparent 40%)',
              backgroundSize: '20px 20px',
              minHeight: '520px',
              fontFamily: style.typography.fontFamily,
            }}
          >
            {/* The customized style container */}
            <div
              className="p-6 transition-all duration-300"
              style={getPreviewContainerStyle()}
            >
              {/* Header inside real preview */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {style.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4
                      className="font-bold text-base"
                      style={{
                        fontFamily: style.typography.fontFamilyHeading || style.typography.fontFamily,
                        color: style.colors.text,
                      }}
                    >
                      {style.name} System UI
                    </h4>
                    <p className="text-xs" style={{ color: style.colors.textMuted }}>
                      {style.origin} • Active Style
                    </p>
                  </div>
                </div>
                <Badge
                  style={{
                    backgroundColor: primaryColor,
                    color: '#FFFFFF',
                  }}
                >
                  {style.era}
                </Badge>
              </div>

              {/* Stats Grid tailored to style */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: style.id === 'neumorphism' ? style.colors.background : 'rgba(255,255,255,0.5)',
                    border: `1px solid ${style.colors.border}`,
                    boxShadow: style.shadows.sm,
                  }}
                >
                  <p className="text-xs" style={{ color: style.colors.textMuted }}>Active Users</p>
                  <p className="text-2xl font-bold mt-1" style={{ color: style.colors.text }}>12,845</p>
                  <span className="text-xs text-green-600 font-semibold">↑ +14.2%</span>
                </div>
                <div
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: style.id === 'neumorphism' ? style.colors.background : 'rgba(255,255,255,0.5)',
                    border: `1px solid ${style.colors.border}`,
                    boxShadow: style.shadows.sm,
                  }}
                >
                  <p className="text-xs" style={{ color: style.colors.textMuted }}>Revenue</p>
                  <p className="text-2xl font-bold mt-1" style={{ color: style.colors.text }}>$48,290</p>
                  <span className="text-xs text-green-600 font-semibold">↑ +8.1%</span>
                </div>
              </div>

              {/* Interactive Form Elements with style characteristics */}
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder={`Search ${style.name} elements...`}
                  className="w-full px-4 py-2.5 text-sm transition-all focus:outline-none"
                  style={{
                    backgroundColor: style.colors.background,
                    color: style.colors.text,
                    border: `${outlineWidth}px solid ${style.colors.border}`,
                    borderRadius: `${borderRadius}px`,
                  }}
                />
                <div className="flex gap-3">
                  <button
                    className="px-4 py-2.5 text-sm font-medium transition-all shadow-md hover:opacity-90"
                    style={{
                      backgroundColor: primaryColor,
                      color: '#FFFFFF',
                      borderRadius: `${borderRadius}px`,
                      boxShadow: style.shadows.sm,
                    }}
                  >
                    Primary Action
                  </button>
                  <button
                    className="px-4 py-2.5 text-sm font-medium transition-all"
                    style={{
                      backgroundColor: 'transparent',
                      color: primaryColor,
                      borderRadius: `${borderRadius}px`,
                      border: `${outlineWidth}px solid ${primaryColor}`,
                    }}
                  >
                    Secondary
                  </button>
                </div>
              </div>

              {/* Characteristics Pills */}
              <div className="flex flex-wrap gap-1.5">
                {style.characteristics.map((char) => (
                  <span
                    key={char}
                    className="px-2.5 py-1 text-xs rounded-full font-medium"
                    style={{
                      backgroundColor: `${primaryColor}20`,
                      color: primaryColor,
                      border: `1px solid ${primaryColor}40`,
                    }}
                  >
                    ✓ {char}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

StyleCustomizer.displayName = 'StyleCustomizer';
export default StyleCustomizer;
