'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Badge,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Slider,
} from '@/components/ui';
import { allMotions, type MotionLanguage, motionsByCategory } from '@/lib/motions';
import {
  ArrowLeft,
  Play,
  Copy,
  Check,
  Search,
  Eye,
  Code,
  Sparkles,
  Zap,
  Film,
  Globe,
  Cpu,
  MousePointer,
} from 'lucide-react';

export function MotionGallery() {
  const [selectedMotion, setSelectedMotion] = useState<MotionLanguage>(allMotions[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [isAnimating, setIsAnimating] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  // Sliders for customizer
  const [duration, setDuration] = useState(500);
  const [delay, setDelay] = useState(0);
  const [scale, setScale] = useState(100);

  const filteredMotions = allMotions.filter((motion) => {
    const matchesSearch =
      motion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      motion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      motion.origin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || motion.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedMotion.cssTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerAnimation = () => {
    setIsAnimating(true);
    setReplayKey((k) => k + 1);
    setTimeout(() => setIsAnimating(false), duration + 200);
  };

  useEffect(() => {
    triggerAnimation();
  }, [selectedMotion]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'classical': return <Film size={16} />;
      case 'modern': return <Sparkles size={16} />;
      case 'cultural': return <Globe size={16} />;
      case 'futuristic': return <Cpu size={16} />;
      case 'ux': return <MousePointer size={16} />;
      case 'experimental': return <Zap size={16} />;
      default: return <Play size={16} />;
    }
  };

  const getPreviewStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transform: `scale(${scale / 100})`,
    };

    switch (selectedMotion.id) {
      case 'disney-twelve':
        return {
          ...base,
          animation: isAnimating ? `motionBounceArc ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` : 'none',
        };
      case 'stop-motion':
        return {
          ...base,
          animation: isAnimating ? `motionStepShake ${duration}ms steps(4)` : 'none',
        };
      case 'ios-spring':
        return {
          ...base,
          animation: isAnimating ? `motionSpringPop ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)` : 'none',
        };
      case 'fluent-motion':
        return {
          ...base,
          animation: isAnimating ? `motionFluentFadeUp ${duration}ms cubic-bezier(0.08, 0.52, 0.52, 1)` : 'none',
        };
      case 'japanese-anime':
        return {
          ...base,
          animation: isAnimating ? `motionAnimeImpact ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)` : 'none',
        };
      case 'chinese-ink':
        return {
          ...base,
          animation: isAnimating ? `motionInkReveal ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards` : 'none',
        };
      case 'indian-classical':
        return {
          ...base,
          animation: isAnimating ? `motionMudra ${duration}ms steps(8) infinite` : 'none',
        };
      case 'glitch-motion':
        return {
          ...base,
          animation: isAnimating ? `motionGlitch ${Math.max(100, duration / 4)}ms infinite` : 'none',
        };
      case 'liquid-morph':
        return {
          ...base,
          animation: `motionLiquidMorph ${Math.max(1000, duration * 2)}ms ease-in-out infinite`,
        };
      case 'skeleton-shimmer':
        return {
          ...base,
          position: 'relative',
          overflow: 'hidden',
        };
      case 'staggered-list':
        return {
          ...base,
        };
      case 'page-transitions':
        return {
          ...base,
          animation: isAnimating ? `motionPageSlideIn ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
        };
      case 'cyberpunk-hud':
        return {
          ...base,
          position: 'relative',
          overflow: 'hidden',
        };
      default:
        return {
          ...base,
          animation: isAnimating ? `motionFadeInUp ${duration}ms ease` : 'none',
        };
    }
  };

  const categoryStats = {
    all: allMotions.length,
    classical: motionsByCategory.classical.length,
    modern: motionsByCategory.modern.length,
    cultural: motionsByCategory.cultural.length,
    futuristic: motionsByCategory.futuristic.length,
    ux: motionsByCategory.ux.length,
    experimental: motionsByCategory.experimental.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft size={20} />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Zap className="text-blue-500" size={24} />
                  Motion & Animation Gallery
                </h1>
                <p className="text-xs text-gray-500">360° Global Motion Languages (Classic to Futuristic)</p>
              </div>
            </div>
            <Badge variant="primary" size="lg">
              {allMotions.length} Motions
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Motion & Animation 360° ✨
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            สำรวจภาษาการเคลื่อนไหวจากทั่วโลก ตั้งแต่หลักการแอนิเมชันคลาสสิก (Disney 12 Principles)
            ไปจนถึง Micro-interactions, Cyberpunk HUD, Liquid Morphing, Japanese Sakuga, Chinese Ink และ Gesture-Driven Motion
          </p>
        </div>

        {/* Category Stats & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'classical', label: '🎬 Classical' },
              { key: 'modern', label: '✨ Modern UI' },
              { key: 'cultural', label: '🌏 Cultural' },
              { key: 'futuristic', label: '🤖 Futuristic' },
              { key: 'ux', label: '🖱️ UX Patterns' },
              { key: 'experimental', label: '🧪 Experimental' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === key
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <Input
              placeholder="Search motions..."
              leftIcon={<Search size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Motion List Sidebar */}
          <div className="lg:col-span-4 space-y-3 max-h-[700px] overflow-y-auto pr-2">
            {filteredMotions.map((motion) => {
              const isSelected = selectedMotion.id === motion.id;
              return (
                <div
                  key={motion.id}
                  onClick={() => setSelectedMotion(motion)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                      <span className={isSelected ? 'text-blue-500' : 'text-gray-400'}>
                        {getCategoryIcon(motion.category)}
                      </span>
                      {motion.name}
                    </h4>
                    <Badge
                      variant={
                        motion.category === 'classical' ? 'secondary' :
                        motion.category === 'modern' ? 'primary' :
                        motion.category === 'cultural' ? 'warning' :
                        motion.category === 'futuristic' ? 'success' :
                        motion.category === 'ux' ? 'default' : 'danger'
                      }
                      size="sm"
                    >
                      {motion.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    {motion.origin} • {motion.era}
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {motion.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Preview & Code Panel */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="shadow-lg">
              <CardHeader
                title={selectedMotion.name}
                subtitle={`${selectedMotion.origin} • ${selectedMotion.era}`}
                action={
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode('preview')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                        viewMode === 'preview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      Live Preview
                    </button>
                    <button
                      onClick={() => setViewMode('code')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                        viewMode === 'code' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      CSS / Keyframes
                    </button>
                  </div>
                }
              />
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedMotion.description}
                </p>

                {/* Characteristics */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selectedMotion.characteristics.map((char) => (
                    <span
                      key={char}
                      className="px-2.5 py-1 text-xs bg-purple-50 text-purple-700 rounded-full border border-purple-100 font-medium"
                    >
                      ✓ {char}
                    </span>
                  ))}
                </div>

                <Separator className="my-6" />

                {viewMode === 'code' ? (
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
                      <pre>{selectedMotion.cssTemplate}</pre>
                    </div>
                    <Button
                      onClick={handleCopy}
                      variant="primary"
                      fullWidth
                      leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
                    >
                      {copied ? 'COPIED TO CLIPBOARD!' : 'COPY MOTION CSS'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Animation Stage */}
                    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-10 flex items-center justify-center min-h-[320px] relative overflow-hidden">
                      {/* Grid lines for stage */}
                      <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                      }} />

                      {/* Animated Subject */}
                      {selectedMotion.id === 'staggered-list' ? (
                        <div className="relative z-10 space-y-3 w-64">
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="h-12 bg-blue-500 rounded-lg shadow-lg"
                              style={{
                                opacity: isAnimating ? 0 : 1,
                                transform: isAnimating ? 'translateY(20px)' : 'translateY(0)',
                                animation: isAnimating ? `motionFadeInUp ${duration}ms ease ${i * 100}ms forwards` : 'none',
                              }}
                            />
                          ))}
                        </div>
                      ) : selectedMotion.id === 'skeleton-shimmer' ? (
                        <div className="relative z-10 w-64 space-y-3">
                          <div className="h-32 bg-gray-700 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0" style={{
                              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                              transform: 'translateX(-100%)',
                              animation: 'motionShimmer 1.5s infinite',
                            }} />
                          </div>
                          <div className="h-4 bg-gray-700 rounded w-3/4 relative overflow-hidden">
                            <div className="absolute inset-0" style={{
                              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                              transform: 'translateX(-100%)',
                              animation: 'motionShimmer 1.5s infinite 0.2s',
                            }} />
                          </div>
                        </div>
                      ) : selectedMotion.id === 'liquid-morph' ? (
                        <div
                          className="relative z-10 w-32 h-32 bg-gradient-to-br from-pink-500 to-violet-600"
                          style={getPreviewStyle()}
                        />
                      ) : (
                        <div
                          key={replayKey}
                          className="relative z-10 w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 shadow-2xl flex items-center justify-center text-white font-bold"
                          style={getPreviewStyle()}
                        >
                          <Play size={32} />
                        </div>
                      )}
                    </div>

                    {/* Customizer Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-gray-600">
                          <span>Duration</span>
                          <span>{duration}ms</span>
                        </div>
                        <Slider
                          value={duration}
                          onValueChange={setDuration}
                          min={100}
                          max={2000}
                          step={50}
                          size="sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-gray-600">
                          <span>Delay</span>
                          <span>{delay}ms</span>
                        </div>
                        <Slider
                          value={delay}
                          onValueChange={setDelay}
                          min={0}
                          max={1000}
                          step={50}
                          size="sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-gray-600">
                          <span>Scale</span>
                          <span>{scale}%</span>
                        </div>
                        <Slider
                          value={scale}
                          onValueChange={setScale}
                          min={50}
                          max={150}
                          step={10}
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        onClick={triggerAnimation}
                        variant="primary"
                        leftIcon={<Play size={16} />}
                      >
                        Replay Animation
                      </Button>
                      <Button
                        onClick={handleCopy}
                        variant="outline"
                        leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
                      >
                        {copied ? 'Copied!' : 'Copy CSS'}
                      </Button>
                    </div>

                    {/* Motion Specs */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Easing</p>
                        <p className="text-sm font-mono font-medium text-gray-900 mt-1">{selectedMotion.easing || 'ease'}</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-sm font-mono font-medium text-gray-900 mt-1">{selectedMotion.duration || `${duration}ms`}</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Category</p>
                        <p className="text-sm font-medium text-gray-900 mt-1 capitalize">{selectedMotion.category}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">
            ✨ Motion & Animation Gallery • {allMotions.length} Global Motion Languages
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Disney 12 Principles • iOS Spring • Material Motion • Japanese Sakuga • Cyberpunk HUD
          </p>
        </div>
      </footer>
    </div>
  );
}

MotionGallery.displayName = 'MotionGallery';
export default MotionGallery;
