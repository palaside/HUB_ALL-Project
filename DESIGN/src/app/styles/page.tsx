'use client';

import React, { useState } from 'react';
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
  Avatar,
  AvatarGroup,
  Alert,
  Progress,
  StyleProvider,
  StyleSwitcher,
  StylePreview,
  StyleCustomizer,
  LayoutGallery as StylesGallery,
  useStyle,
} from '@/components/ui';
import { allStyles, stylesByEra, type ThemeStyle } from '@/lib/styles';
import {
  ArrowLeft,
  Palette,
  Clock,
  Globe,
  Sparkles,
  Search,
  Heart,
  Share2,
  Download,
  Check,
  Star,
  Sliders,
} from 'lucide-react';

// ============================================
// Style Detail Card
// ============================================
function StyleDetailCard({ style }: { style: ThemeStyle }) {
  const { currentStyle, setStyle } = useStyle();
  const isSelected = currentStyle.id === style.id;

  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer group"
      onClick={() => setStyle(style.id)}
    >
      {/* Preview Header */}
      <div
        className="h-20 relative"
        style={{
          background: style.effects?.gradient || style.colors.primary,
        }}
      >
        {isSelected && (
          <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
            <Check size={14} className="text-green-500" />
          </div>
        )}
        <div className="absolute bottom-2 left-3 flex gap-1">
          {[style.colors.primary, style.colors.secondary, style.colors.accent, style.colors.background].map((color, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <CardContent className="pt-3 pb-4">
        <div className="flex items-start justify-between mb-1">
          <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
            {style.name}
          </h4>
          <Badge variant={
            style.era === 'classic' ? 'secondary' :
            style.era === 'modern' ? 'primary' :
            style.era === 'cultural' ? 'warning' :
            'success'
          } size="sm">
            {style.era}
          </Badge>
        </div>

        <p className="text-[11px] text-gray-500 mb-2">
          {style.origin} {style.year && `• ${style.year}`}
        </p>

        <p className="text-xs text-gray-600 line-clamp-2 mb-3">
          {style.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {style.characteristics.slice(0, 3).map((char) => (
            <span
              key={char}
              className="px-1.5 py-0.5 text-[10px] bg-gray-100 text-gray-600 rounded"
            >
              {char}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// Main Page Content
// ============================================
function StyleGalleryContent() {
  const { currentStyle } = useStyle();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeEra, setActiveEra] = useState<'all' | 'classic' | 'modern' | 'cultural' | 'futuristic'>('all');

  const filteredStyles = allStyles.filter((style) => {
    const matchesSearch = style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.origin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEra = activeEra === 'all' || style.era === activeEra;
    return matchesSearch && matchesEra;
  });

  const eraStats = {
    all: allStyles.length,
    classic: stylesByEra.classic.length,
    modern: stylesByEra.modern.length,
    cultural: stylesByEra.cultural.length,
    futuristic: stylesByEra.futuristic.length,
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
                  <Palette className="text-blue-500" size={24} />
                  Style Gallery & Generator
                </h1>
                <p className="text-xs text-gray-500">360° Global Design Aesthetics & Real-World Generator</p>
              </div>
            </div>
            <Badge variant="primary" size="lg">
              {allStyles.length} Styles
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Design Styles & Interactive Generator 🎨
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            เลือกสไตล์จากทั่วโลก ปรับแต่งค่าพารามิเตอร์แบบ Real-time (Transparency, Blur, Outline) 
            และดูผลลัพธ์บนหน้างานจริง (Real-World UI Application) พร้อมคัดลอก CSS ไปใช้งานทันที
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { key: 'all', label: 'All Styles', icon: <Palette size={20} />, color: 'bg-gray-500' },
            { key: 'classic', label: 'Classic', icon: <Clock size={20} />, color: 'bg-amber-500' },
            { key: 'modern', label: 'Modern', icon: <Sparkles size={20} />, color: 'bg-blue-500' },
            { key: 'cultural', label: 'Cultural', icon: <Globe size={20} />, color: 'bg-purple-500' },
            { key: 'futuristic', label: 'Futuristic', icon: <Sparkles size={20} />, color: 'bg-cyan-500' },
          ].map(({ key, label, icon, color }) => (
            <button
              key={key}
              onClick={() => setActiveEra(key as typeof activeEra)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                activeEra === key
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-white mb-2`}>
                {icon}
              </div>
              <p className="font-semibold text-gray-900">{eraStats[key as keyof typeof eraStats]}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-8">
          <Input
            placeholder="Search styles by name, origin, or description..."
            leftIcon={<Search size={18} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputSize="lg"
          />
        </div>

        {/* Style Selection Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Palette size={20} className="text-blue-500" />
              Select a Style to Customize ({filteredStyles.length} available)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-1">
            {filteredStyles.map((style) => (
              <StyleDetailCard key={style.id} style={style} />
            ))}
          </div>
        </div>

        {/* Interactive Customizer & Real-World Application Preview Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Sliders className="text-blue-500" size={24} />
            <h3 className="text-2xl font-bold text-gray-900">
              Interactive CSS Generator & Real-World Application Preview
            </h3>
          </div>

          <StyleCustomizer style={currentStyle} />
        </section>

        {/* Era Showcase Tabs */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Explore All Styles by Era
          </h3>

          <Tabs defaultValue="classic">
            <TabsList variant="pills" className="justify-center mb-8">
              <TabsTrigger value="classic" variant="pills">🏛️ Classic</TabsTrigger>
              <TabsTrigger value="modern" variant="pills">✨ Modern</TabsTrigger>
              <TabsTrigger value="cultural" variant="pills">🌏 Cultural</TabsTrigger>
              <TabsTrigger value="futuristic" variant="pills">🚀 Futuristic</TabsTrigger>
            </TabsList>

            <TabsContent value="classic">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stylesByEra.classic.map((style) => (
                  <StylePreview key={style.id} style={style} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="modern">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stylesByEra.modern.map((style) => (
                  <StylePreview key={style.id} style={style} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cultural">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stylesByEra.cultural.map((style) => (
                  <StylePreview key={style.id} style={style} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="futuristic">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stylesByEra.futuristic.map((style) => (
                  <StylePreview key={style.id} style={style} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">
            🎨 Design System Style Gallery & Generator • {allStyles.length} Global Design Styles
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Real-World UI Preview • Interactive Sliders • CSS Code Export
          </p>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// Page Export
// ============================================
export default function StylesPage() {
  return (
    <StyleProvider defaultStyle="glassmorphism">
      <StyleGalleryContent />
    </StyleProvider>
  );
}
