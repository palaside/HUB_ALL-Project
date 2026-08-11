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
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui';
import { allLayouts, type LayoutArchitecture } from '@/lib/layouts';
import {
  ArrowLeft,
  Layout,
  Grid,
  Columns,
  Layers,
  Copy,
  Check,
  Search,
  Eye,
  Code,
  Sparkles,
} from 'lucide-react';

export function LayoutGallery() {
  const [selectedLayout, setSelectedLayout] = useState<LayoutArchitecture>(allLayouts[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  const filteredLayouts = allLayouts.filter((layout) => {
    const matchesSearch =
      layout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      layout.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      layout.origin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || layout.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedLayout.cssTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render preview based on selected layout structure
  const renderLayoutPreview = () => {
    switch (selectedLayout.id) {
      case 'single-column':
        return (
          <div className="max-w-md mx-auto flex flex-col gap-4 min-h-[350px]">
            <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-6 text-center">
              <Badge variant="primary" size="sm" className="mb-2">Hero Section</Badge>
              <h4 className="font-bold text-lg text-gray-900">Single Column Layout</h4>
              <p className="text-xs text-gray-600 mt-1">Mobile-first, content stacks vertically in one linear flow.</p>
              <Button size="sm" className="mt-3">Primary CTA</Button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <Badge variant="secondary" size="sm" className="mb-2">Features</Badge>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">1</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Feature One</p>
                    <p className="text-xs text-gray-500">Description goes here</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">2</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Feature Two</p>
                    <p className="text-xs text-gray-500">Description goes here</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">3</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Feature Three</p>
                    <p className="text-xs text-gray-500">Description goes here</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500">Footer / Contact Section</p>
            </div>
          </div>
        );

      case 'golden-ratio':
        return (
          <div className="grid grid-cols-[1.618fr_1fr] gap-4 min-h-[350px]">
            <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <Badge variant="primary" size="sm" className="mb-2">Phi Primary (61.8%)</Badge>
                <h4 className="font-bold text-lg text-gray-900">Main Content / Hero Canvas</h4>
                <p className="text-xs text-gray-600 mt-1">Natural human visual focal point based on Fibonacci scaling.</p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm">Explore</Button>
                <Button size="sm" variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="bg-purple-500/10 border-2 border-purple-500/30 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <Badge variant="secondary" size="sm" className="mb-2">Sidebar (38.2%)</Badge>
                <h4 className="font-bold text-md text-gray-900">Secondary Info</h4>
                <p className="text-xs text-gray-600 mt-1">Supporting widgets & metadata.</p>
              </div>
              <div className="space-y-2 mt-4">
                <div className="h-2 bg-purple-500/20 rounded-full w-3/4" />
                <div className="h-2 bg-purple-500/20 rounded-full w-1/2" />
              </div>
            </div>
          </div>
        );

      case 'bento-grid':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-h-[350px]">
            <div className="sm:col-span-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white flex flex-col justify-between shadow-md">
              <Badge className="w-fit bg-white/20 text-white border-0">Featured Bento</Badge>
              <div>
                <h4 className="text-xl font-bold">Apple-Style Modular Card</h4>
                <p className="text-xs opacity-80 mt-1">Spanning 2 columns for high-impact visual display.</p>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 flex flex-col justify-between">
              <Badge variant="warning" size="sm" className="w-fit">Stats</Badge>
              <div>
                <p className="text-2xl font-bold text-gray-900">+248%</p>
                <p className="text-xs text-gray-600 mt-1">Growth rate</p>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 flex flex-col justify-between">
              <Badge variant="success" size="sm" className="w-fit">Status</Badge>
              <div>
                <h4 className="font-semibold text-gray-900">All Systems Operational</h4>
                <p className="text-xs text-gray-600 mt-1">99.9% uptime</p>
              </div>
            </div>
            <div className="sm:col-span-2 bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 flex flex-col justify-between">
              <Badge variant="secondary" size="sm" className="w-fit">Widget</Badge>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Interactive Workspace</h4>
                  <p className="text-xs text-gray-600">Quick actions and shortcuts</p>
                </div>
                <Button size="sm">Launch</Button>
              </div>
            </div>
          </div>
        );

      case 'holy-grail':
        return (
          <div className="grid grid-cols-[200px_1fr_220px] gap-3 min-h-[350px]">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-500 uppercase">Navigation</p>
              <div className="h-2 bg-gray-300 rounded w-full" />
              <div className="h-2 bg-gray-300 rounded w-4/5" />
              <div className="h-2 bg-gray-300 rounded w-3/5" />
            </div>
            <div className="bg-white border-2 border-blue-500/30 rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <Badge variant="primary" size="sm" className="mb-2">Main Content Area</Badge>
                <h4 className="font-bold text-lg text-gray-900">Primary Application Shell</h4>
                <p className="text-xs text-gray-600 mt-2">The classic web app layout featuring sticky header, dual sidebars, and fluid workspace.</p>
              </div>
              <div className="h-16 bg-blue-50 rounded-lg flex items-center justify-center text-xs text-blue-600 font-medium">
                Workspace Canvas
              </div>
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-500 uppercase">Widgets / Aside</p>
              <div className="h-12 bg-gray-200 rounded-lg" />
              <div className="h-12 bg-gray-200 rounded-lg" />
            </div>
          </div>
        );

      case 'dashboard-shell':
        return (
          <div className="grid grid-cols-[220px_1fr] gap-3 min-h-[350px]">
            <div className="bg-gray-900 text-white rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-blue-500 rounded-md" />
                  <span className="font-bold text-sm">SaaS Admin</span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-400">
                  <div className="p-2 bg-white/10 rounded text-white font-medium">Dashboard</div>
                  <div className="p-2 hover:bg-white/5 rounded">Analytics</div>
                  <div className="p-2 hover:bg-white/5 rounded">Customers</div>
                  <div className="p-2 hover:bg-white/5 rounded">Settings</div>
                </div>
              </div>
              <div className="text-[10px] text-gray-500">v2.4.0 Pro</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-12 bg-white border border-gray-200 rounded-xl px-4 flex items-center justify-between shadow-sm">
                <span className="text-xs text-gray-400">Search commands (⌘K)...</span>
                <Avatar size="xs" fallback="AD" />
              </div>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                <h4 className="font-bold text-gray-900">Command Center Canvas</h4>
                <p className="text-xs text-gray-500 mt-1">Enterprise SaaS workspace layout structure</p>
              </div>
            </div>
          </div>
        );

      case 'split-screen':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[350px]">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-8 text-white flex flex-col justify-center">
              <Badge className="w-fit bg-white/20 text-white border-0 mb-3">Immersive Visuals</Badge>
              <h3 className="text-2xl font-bold">50/50 Split View</h3>
              <p className="text-xs opacity-80 mt-2">Perfect for conversion landing pages, authentication screens, and dual-action workflows.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col justify-center shadow-sm space-y-4">
              <h4 className="font-bold text-gray-900">Sign in to your account</h4>
              <Input label="Email" placeholder="you@example.com" />
              <Input label="Password" type="password" placeholder="••••••••" />
              <Button fullWidth>Continue</Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[350px]">
            <Layout size={40} className="text-blue-500 mb-3" />
            <h4 className="font-bold text-lg text-gray-900">{selectedLayout.name}</h4>
            <p className="text-sm text-gray-600 max-w-md mt-1">{selectedLayout.description}</p>
            <div className="mt-4 flex gap-2">
              <Badge variant="secondary">{selectedLayout.category}</Badge>
              <Badge variant="outline">{selectedLayout.origin}</Badge>
            </div>
          </div>
        );
    }
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
                  <Layout className="text-blue-500" size={24} />
                  Global Layout Architectures (360°)
                </h1>
                <p className="text-xs text-gray-500">From Golden Ratio to Bento Box & Holy Grail</p>
              </div>
            </div>
            <Badge variant="primary" size="lg">
              {allLayouts.length} Layouts
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            เลเอาท์ระดับโลก 360 องศา (Classic to Futuristic) 🏛️📐
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            สำรวจโครงสร้างเลเอาท์และกริด (Layout & Grid Systems) ตั้งแต่ยุคโบราณ (Golden Ratio)
            ถึงยุคดิจิทัลสมัยใหม่ (Bento Grid, Holy Grail, Dashboard Shell) พร้อมตัวอย่างและ CSS Template
          </p>
        </div>

        {/* Categories & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2">
            {[
              { key: 'all', label: 'All Layouts' },
              { key: 'classical', label: '🏛️ Classical' },
              { key: 'modern', label: '✨ Modern & Swiss' },
              { key: 'editorial', label: '📰 Editorial' },
              { key: 'digital', label: '💻 Digital & SaaS' },
              { key: 'experimental', label: '🚀 Experimental' },
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
              placeholder="Search layouts..."
              leftIcon={<Search size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Layout Grid & Interactive Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Layout List Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-3 max-h-[700px] overflow-y-auto pr-2">
            {filteredLayouts.map((layout) => {
              const isSelected = selectedLayout.id === layout.id;
              return (
                <div
                  key={layout.id}
                  onClick={() => setSelectedLayout(layout)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                      <Grid size={16} className={isSelected ? 'text-blue-500' : 'text-gray-400'} />
                      {layout.name}
                    </h4>
                    <Badge
                      variant={
                        layout.category === 'classical' ? 'secondary' :
                        layout.category === 'modern' ? 'primary' :
                        layout.category === 'editorial' ? 'warning' :
                        layout.category === 'digital' ? 'success' : 'danger'
                      }
                      size="sm"
                    >
                      {layout.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    {layout.origin} • {layout.era}
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {layout.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Preview & CSS Code (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Card className="shadow-lg">
              <CardHeader
                title={selectedLayout.name}
                subtitle={`${selectedLayout.origin} • ${selectedLayout.era}`}
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
                      CSS / Tailwind
                    </button>
                  </div>
                }
              />
              <CardContent>
                <p className="text-sm text-gray-600 mb-6">
                  {selectedLayout.description}
                </p>

                {/* Characteristics */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selectedLayout.characteristics.map((char) => (
                    <span
                      key={char}
                      className="px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-100 font-medium"
                    >
                      ✓ {char}
                    </span>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* View Mode Content */}
                {viewMode === 'code' ? (
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
                      <pre>{selectedLayout.cssTemplate}</pre>
                    </div>
                    <Button
                      onClick={handleCopy}
                      variant="primary"
                      fullWidth
                      leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
                    >
                      {copied ? 'COPIED TO CLIPBOARD!' : 'COPY CSS TEMPLATE'}
                    </Button>
                  </div>
                ) : (
                  <div className="bg-gray-50/80 border border-gray-200 rounded-xl p-6">
                    {renderLayoutPreview()}
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
            📐 Global Layout Architectures • {allLayouts.length} Layout Systems
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Golden Ratio • Swiss Grid • Bento Box • Holy Grail • Dashboard Shell
          </p>
        </div>
      </footer>
    </div>
  );
}

LayoutGallery.displayName = 'LayoutGallery';
export default LayoutGallery;
