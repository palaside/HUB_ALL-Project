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
  Separator,
  Progress,
  Avatar,
  AvatarGroup,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui';
import { allDashboards, type DashboardPattern, dashboardsByCategory } from '@/lib/dashboards';
import {
  ArrowLeft,
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Users,
  Activity,
  Globe,
  Cpu,
  Briefcase,
  Truck,
  GraduationCap,
  Copy,
  Check,
  Search,
  Eye,
  Code,
  TrendingUp,
  DollarSign,
  PieChart,
  Calendar,
  Bell,
  Settings,
  Menu,
} from 'lucide-react';

export function DashboardGallery() {
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardPattern>(allDashboards[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  const filteredDashboards = allDashboards.filter((dashboard) => {
    const matchesSearch =
      dashboard.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dashboard.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dashboard.useCases.some((uc) => uc.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || dashboard.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedDashboard.cssTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'classic': return <LayoutDashboard size={16} />;
      case 'business': return <BarChart3 size={16} />;
      case 'analytics': return <TrendingUp size={16} />;
      case 'specialized': return <Activity size={16} />;
      case 'modern': return <Cpu size={16} />;
      case 'realtime': return <Bell size={16} />;
      case 'industry': return <Briefcase size={16} />;
      default: return <LayoutDashboard size={16} />;
    }
  };

  const colors = selectedDashboard.colorScheme || {
    background: '#f3f4f6',
    surface: '#ffffff',
    primary: '#3b82f6',
    accent: '#10b981',
    text: '#111827',
    textMuted: '#6b7280',
  };

  const renderDashboardPreview = () => {
    const isDark = [colors.background].some((c) => {
      if (!c) return false;
      const hex = c.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness < 128;
    });

    const textColor = isDark ? '#ffffff' : colors.text;
    const mutedColor = isDark ? 'rgba(255,255,255,0.7)' : colors.textMuted;

    return (
      <div
        className="rounded-2xl overflow-hidden transition-all duration-500 shadow-2xl"
        style={{
          background: colors.background,
          minHeight: '420px',
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{
            background: colors.surface,
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb'}`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: colors.primary }}
            >
              <LayoutDashboard size={18} color="#ffffff" />
            </div>
            <span className="font-bold" style={{ color: textColor }}>
              {selectedDashboard.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#f3f4f6' }}>
              <Bell size={14} style={{ color: mutedColor }} />
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#f3f4f6' }}>
              <Settings size={14} style={{ color: mutedColor }} />
            </div>
            <Avatar size="sm" fallback="AD" />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Revenue', value: '$48,290', change: '+12.5%', icon: DollarSign },
              { label: 'Active Users', value: '12,845', change: '+8.2%', icon: Users },
              { label: 'Conversion', value: '3.24%', change: '+2.1%', icon: PieChart },
              { label: 'Sessions', value: '24.5K', change: '+18.4%', icon: Activity },
            ].map((metric, i) => (
              <div
                key={i}
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: colors.surface,
                  boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs" style={{ color: mutedColor }}>{metric.label}</span>
                  <metric.icon size={14} style={{ color: colors.primary }} />
                </div>
                <div className="text-xl font-bold" style={{ color: textColor }}>{metric.value}</div>
                <span className="text-xs font-medium" style={{ color: colors.accent }}>{metric.change}</span>
              </div>
            ))}
          </div>

          {/* Main Chart Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div
              className="lg:col-span-2 p-4 rounded-xl"
              style={{
                backgroundColor: colors.surface,
                boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-sm" style={{ color: textColor }}>Performance Overview</span>
                <Badge variant="outline" size="sm">Last 30 days</Badge>
              </div>
              {/* Simple Chart Bars */}
              <div className="flex items-end gap-2 h-32">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t transition-all hover:opacity-80"
                    style={{
                      height: `${height}%`,
                      backgroundColor: i === 11 ? colors.accent : colors.primary,
                      opacity: i === 11 ? 1 : 0.7,
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: colors.surface,
                boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <span className="font-semibold text-sm" style={{ color: textColor }}>Top Channels</span>
              <div className="mt-4 space-y-3">
                {[
                  { name: 'Organic Search', value: 45 },
                  { name: 'Direct', value: 30 },
                  { name: 'Social Media', value: 15 },
                  { name: 'Referral', value: 10 },
                ].map((channel, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1" style={{ color: mutedColor }}>
                      <span>{channel.name}</span>
                      <span>{channel.value}%</span>
                    </div>
                    <Progress value={channel.value} variant={i === 0 ? 'default' : 'success'} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div
            className="p-4 rounded-xl overflow-hidden"
            style={{
              backgroundColor: colors.surface,
              boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <span className="font-semibold text-sm" style={{ color: textColor }}>Recent Activity</span>
            <div className="mt-3 space-y-2">
              {[
                { name: 'Enterprise License', status: 'Completed', amount: '$1,200.00', statusColor: '#22c55e' },
                { name: 'Cloud Server Setup', status: 'Pending', amount: '$450.00', statusColor: '#f59e0b' },
                { name: 'Premium Support', status: 'Active', amount: '$899.00', statusColor: '#3b82f6' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2"
                  style={{ borderBottom: i < 2 ? `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#f3f4f6'}` : 'none' }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar size="xs" fallback={item.name.slice(0, 2)} />
                    <span className="text-sm font-medium" style={{ color: textColor }}>{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${item.statusColor}20`, color: item.statusColor }}>
                      {item.status}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: textColor }}>{item.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const categoryStats = {
    all: allDashboards.length,
    classic: dashboardsByCategory.classic.length,
    business: dashboardsByCategory.business.length,
    specialized: dashboardsByCategory.specialized.length,
    modern: dashboardsByCategory.modern.length,
    realtime: dashboardsByCategory.realtime.length,
    industry: dashboardsByCategory.industry.length,
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
                  <LayoutDashboard className="text-blue-500" size={24} />
                  Dashboard Pattern Gallery
                </h1>
                <p className="text-xs text-gray-500">360° Dashboard Architectures (Classic to Futuristic)</p>
              </div>
            </div>
            <Badge variant="primary" size="lg">
              {allDashboards.length} Patterns
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Dashboard Patterns 360° 📊
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            สำรวจแบบแผนแดชบอร์ดจากทั่วโลก ตั้งแต่ Classic Admin Dashboard, E-Commerce, CRM, Analytics
            ไปจนถึง Command Center, Glassmorphism, IoT Manufacturing และ Fleet Tracking พร้อมตัวอย่างจริงและ CSS Template
          </p>
        </div>

        {/* Categories & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'classic', label: '📁 Classic' },
              { key: 'business', label: '💼 Business' },
              { key: 'specialized', label: '🎯 Specialized' },
              { key: 'modern', label: '✨ Modern' },
              { key: 'realtime', label: '🔴 Real-time' },
              { key: 'industry', label: '🏭 Industry' },
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
              placeholder="Search dashboards..."
              leftIcon={<Search size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Dashboard List Sidebar */}
          <div className="lg:col-span-4 space-y-3 max-h-[700px] overflow-y-auto pr-2">
            {filteredDashboards.map((dashboard) => {
              const isSelected = selectedDashboard.id === dashboard.id;
              return (
                <div
                  key={dashboard.id}
                  onClick={() => setSelectedDashboard(dashboard)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                      <span className={isSelected ? 'text-blue-500' : 'text-gray-400'}>
                        {getCategoryIcon(dashboard.category)}
                      </span>
                      {dashboard.name}
                    </h4>
                    <Badge
                      variant={
                        dashboard.category === 'classic' ? 'secondary' :
                        dashboard.category === 'business' ? 'primary' :
                        dashboard.category === 'specialized' ? 'warning' :
                        dashboard.category === 'modern' ? 'success' :
                        dashboard.category === 'realtime' ? 'danger' : 'default'
                      }
                      size="sm"
                    >
                      {dashboard.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    {dashboard.origin} • {dashboard.era}
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {dashboard.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Preview & Code Panel */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="shadow-lg">
              <CardHeader
                title={selectedDashboard.name}
                subtitle={`${selectedDashboard.origin} • ${selectedDashboard.era}`}
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
                      CSS / Grid
                    </button>
                  </div>
                }
              />
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedDashboard.description}
                </p>

                {/* Characteristics */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selectedDashboard.characteristics.map((char) => (
                    <span
                      key={char}
                      className="px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-100 font-medium"
                    >
                      ✓ {char}
                    </span>
                  ))}
                </div>

                {/* Use Cases */}
                <div className="mb-6">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Common Use Cases</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedDashboard.useCases.map((useCase) => (
                      <span
                        key={useCase}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {viewMode === 'code' ? (
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
                      <pre>{selectedDashboard.cssTemplate}</pre>
                    </div>
                    <Button
                      onClick={handleCopy}
                      variant="primary"
                      fullWidth
                      leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
                    >
                      {copied ? 'COPIED TO CLIPBOARD!' : 'COPY DASHBOARD CSS'}
                    </Button>
                  </div>
                ) : (
                  renderDashboardPreview()
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Era Showcase Tabs */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Explore by Category
          </h3>

          <Tabs defaultValue="classic">
            <TabsList variant="pills" className="justify-center mb-8">
              <TabsTrigger value="classic" variant="pills">📁 Classic</TabsTrigger>
              <TabsTrigger value="business" variant="pills">💼 Business</TabsTrigger>
              <TabsTrigger value="specialized" variant="pills">🎯 Specialized</TabsTrigger>
              <TabsTrigger value="modern" variant="pills">✨ Modern</TabsTrigger>
            </TabsList>

            <TabsContent value="classic">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardsByCategory.classic.map((dashboard) => (
                  <MiniDashboardCard
                    key={dashboard.id}
                    dashboard={dashboard}
                    onClick={() => {
                      setSelectedDashboard(dashboard);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="business">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardsByCategory.business.map((dashboard) => (
                  <MiniDashboardCard
                    key={dashboard.id}
                    dashboard={dashboard}
                    onClick={() => {
                      setSelectedDashboard(dashboard);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specialized">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardsByCategory.specialized.map((dashboard) => (
                  <MiniDashboardCard
                    key={dashboard.id}
                    dashboard={dashboard}
                    onClick={() => {
                      setSelectedDashboard(dashboard);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="modern">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardsByCategory.modern.map((dashboard) => (
                  <MiniDashboardCard
                    key={dashboard.id}
                    dashboard={dashboard}
                    onClick={() => {
                      setSelectedDashboard(dashboard);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
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
            📊 Dashboard Pattern Gallery • {allDashboards.length} Global Dashboard Architectures
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Admin • Analytics • E-Commerce • CRM • IoT • Command Center • Glassmorphism
          </p>
        </div>
      </footer>
    </div>
  );
}

// Mini Dashboard Card for Category Tabs
function MiniDashboardCard({
  dashboard,
  onClick,
}: {
  dashboard: DashboardPattern;
  onClick: () => void;
}) {
  const colors = dashboard.colorScheme || {
    background: '#f3f4f6',
    surface: '#ffffff',
    primary: '#3b82f6',
    accent: '#10b981',
    text: '#111827',
    textMuted: '#6b7280',
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
      onClick={onClick}
    >
      <div
        className="h-32 p-4 flex flex-col justify-between"
        style={{ background: colors.background }}
      >
        <div className="flex items-center justify-between">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: colors.primary }}
          >
            <LayoutDashboard size={20} color="#ffffff" />
          </div>
          <Badge
            variant={
              dashboard.category === 'classic' ? 'secondary' :
              dashboard.category === 'business' ? 'primary' :
              dashboard.category === 'specialized' ? 'warning' : 'success'
            }
            size="sm"
          >
            {dashboard.category}
          </Badge>
        </div>
        <div>
          <h4 className="font-bold" style={{ color: colors.text }}>
            {dashboard.name}
          </h4>
          <p className="text-xs" style={{ color: colors.textMuted }}>
            {dashboard.origin}
          </p>
        </div>
      </div>
      <CardContent className="pt-3">
        <p className="text-xs text-gray-600 line-clamp-2 mb-3">
          {dashboard.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {dashboard.useCases.slice(0, 2).map((useCase) => (
            <span
              key={useCase}
              className="px-1.5 py-0.5 text-[10px] bg-gray-100 text-gray-600 rounded"
            >
              {useCase}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

DashboardGallery.displayName = 'DashboardGallery';
export default DashboardGallery;
