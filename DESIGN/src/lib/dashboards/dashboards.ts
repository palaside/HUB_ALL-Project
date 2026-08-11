/**
 * Dashboard Pattern System - 360° Dashboard Architectures
 * Covers every major dashboard archetype from classic admin panels to futuristic command centers.
 */

export interface DashboardPattern {
  id: string;
  name: string;
  nameLocal?: string;
  category:
    | 'business'
    | 'analytics'
    | 'specialized'
    | 'modern'
    | 'classic'
    | 'industry'
    | 'realtime';
  era: string;
  origin: string;
  description: string;
  characteristics: string[];
  useCases: string[];
  layoutStructure: string;
  cssTemplate: string;
  colorScheme?: {
    background: string;
    surface: string;
    primary: string;
    accent: string;
    text: string;
    textMuted: string;
  };
}

export const allDashboards: DashboardPattern[] = [
  // ============================================
  // CLASSIC DASHBOARDS
  // ============================================
  {
    id: 'admin-classic',
    name: 'Classic Admin Dashboard',
    category: 'classic',
    era: '2000s-2010s',
    origin: 'Web Applications',
    description:
      'The foundational dashboard layout: sidebar navigation, top header, KPI stat cards, data tables, and simple charts. Used in CMS, ERP, and early SaaS.',
    characteristics: [
      'Sidebar navigation',
      'Top header bar',
      'KPI stat cards',
      'Data tables',
      'Simple charts',
    ],
    useCases: ['CMS Admin', 'ERP Systems', 'User Management', 'Early SaaS'],
    layoutStructure: 'grid-cols-[240px_1fr]',
    cssTemplate: `/* Classic Admin Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar content";
  min-height: 100vh;
}
.sidebar { grid-area: sidebar; }
.header { grid-area: header; }
.content { grid-area: content; padding: 24px; }`,
    colorScheme: {
      background: '#f3f4f6',
      surface: '#ffffff',
      primary: '#3b82f6',
      accent: '#10b981',
      text: '#111827',
      textMuted: '#6b7280',
    },
  },
  {
    id: 'two-column-dashboard',
    name: 'Two Column Dashboard',
    nameLocal: 'เลย์เอาต์สองคอลัมน์',
    category: 'classic',
    era: 'Classic Web',
    origin: 'Content Management / Blogs',
    description:
      'A balanced layout with main content on one side and a contextual sidebar for related info, search, filters, or ads.',
    characteristics: [
      'Main content area',
      'Right/Left sidebar',
      'Balanced proportions',
      'Content-focused',
    ],
    useCases: ['Blog Admin', 'News Dashboard', 'Knowledge Base', 'Documentation'],
    layoutStructure: 'grid-cols-1 lg:grid-cols-[1fr_320px]',
    cssTemplate: `/* Two Column Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  padding: 24px;
}
.main-content { grid-column: 1; }
.sidebar { grid-column: 2; }`,
    colorScheme: {
      background: '#f8fafc',
      surface: '#ffffff',
      primary: '#2563eb',
      accent: '#f59e0b',
      text: '#1e293b',
      textMuted: '#64748b',
    },
  },
  {
    id: 'three-column-dashboard',
    name: 'Three Column Dashboard',
    nameLocal: 'เลย์เอาต์สามคอลัมน์',
    category: 'classic',
    era: 'Portal Era',
    origin: 'Enterprise Portals',
    description:
      'Divides information into three vertical columns: navigation/content/widgets. Useful for portal-style dashboards with many modules.',
    characteristics: [
      'Three vertical columns',
      'Modular widgets',
      'High information density',
      'Portal-style',
    ],
    useCases: [
      'Enterprise Portal',
      'Intranet Dashboard',
      'Service Desk',
      'Multi-module Apps',
    ],
    layoutStructure: 'grid-cols-1 lg:grid-cols-[280px_1fr_280px]',
    cssTemplate: `/* Three Column Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: 280px 1fr 280px;
  gap: 24px;
  padding: 24px;
}`,
    colorScheme: {
      background: '#f1f5f9',
      surface: '#ffffff',
      primary: '#4f46e5',
      accent: '#06b6d4',
      text: '#0f172a',
      textMuted: '#64748b',
    },
  },

  // ============================================
  // BUSINESS DASHBOARDS
  // ============================================
  {
    id: 'analytics-dashboard',
    name: 'Analytics / Data Dashboard',
    category: 'analytics',
    era: '2010s-Present',
    origin: 'Business Intelligence Tools',
    description:
      'Focuses on data visualization with multiple charts, graphs, filters, date pickers, and detailed metrics for insights.',
    characteristics: [
      'Multiple charts',
      'Date range filters',
      'Drill-down metrics',
      'Data visualization',
    ],
    useCases: ['Google Analytics', 'Mixpanel', 'BI Tools', 'Marketing Analytics'],
    layoutStructure: 'grid-cols-1 lg:grid-cols-12',
    cssTemplate: `/* Analytics Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  padding: 24px;
}
.kpi-card { grid-column: span 3; }
.chart-large { grid-column: span 8; }
.chart-small { grid-column: span 4; }`,
    colorScheme: {
      background: '#f8fafc',
      surface: '#ffffff',
      primary: '#6366f1',
      accent: '#ec4899',
      text: '#0f172a',
      textMuted: '#64748b',
    },
  },
  {
    id: 'ecommerce-dashboard',
    name: 'E-Commerce Dashboard',
    category: 'business',
    era: '2010s-Present',
    origin: 'Online Retail Platforms',
    description:
      'Tracks sales, orders, revenue, inventory, customer behavior, and conversion funnels for online stores.',
    characteristics: [
      'Revenue metrics',
      'Order tables',
      'Inventory status',
      'Sales funnels',
    ],
    useCases: ['Shopify Admin', 'WooCommerce', 'Marketplace Admin', 'POS Systems'],
    layoutStructure: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    cssTemplate: `/* E-Commerce Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 24px;
}
.revenue-card { grid-column: span 4; }
.metric-card { grid-column: span 1; }
.orders-table { grid-column: span 3; }
.top-products { grid-column: span 1; }`,
    colorScheme: {
      background: '#fafafa',
      surface: '#ffffff',
      primary: '#16a34a',
      accent: '#ea580c',
      text: '#171717',
      textMuted: '#737373',
    },
  },
  {
    id: 'crm-dashboard',
    name: 'CRM / Sales Dashboard',
    category: 'business',
    era: '2010s-Present',
    origin: 'Customer Relationship Management',
    description:
      'Pipeline visualization, lead tracking, sales performance, customer communication history, and deal forecasting.',
    characteristics: [
      'Sales pipeline',
      'Lead tracking',
      'Deal forecasting',
      'Activity timeline',
    ],
    useCases: ['Salesforce', 'HubSpot', 'Pipedrive', 'Freshsales'],
    layoutStructure: 'grid-cols-1 lg:grid-cols-12',
    cssTemplate: `/* CRM Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  padding: 24px;
}
.pipeline { grid-column: span 12; }
.revenue-forecast { grid-column: span 4; }
.recent-deals { grid-column: span 8; }`,
    colorScheme: {
      background: '#f5f3ff',
      surface: '#ffffff',
      primary: '#7c3aed',
      accent: '#f59e0b',
      text: '#1e1b4b',
      textMuted: '#6b7280',
    },
  },
  {
    id: 'project-management',
    name: 'Project / Task Dashboard',
    category: 'business',
    era: '2010s-Present',
    origin: 'Productivity Tools',
    description:
      'Kanban boards, Gantt charts, task lists, progress tracking, and team workload visualization.',
    characteristics: [
      'Kanban boards',
      'Gantt charts',
      'Task lists',
      'Progress tracking',
    ],
    useCases: ['Trello', 'Asana', 'Jira', 'Monday.com'],
    layoutStructure: 'flex flex-col',
    cssTemplate: `/* Project Management Dashboard */
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.kanban-board {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  flex: 1;
  padding: 24px;
}
.kanban-column {
  min-width: 300px;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 16px;
}`,
    colorScheme: {
      background: '#f9fafb',
      surface: '#ffffff',
      primary: '#0ea5e9',
      accent: '#f97316',
      text: '#111827',
      textMuted: '#6b7280',
    },
  },

  // ============================================
  // SPECIALIZED DASHBOARDS
  // ============================================
  {
    id: 'financial-trading',
    name: 'Financial / Trading Dashboard',
    category: 'specialized',
    era: '1990s-Present',
    origin: 'Stock / Crypto Trading Platforms',
    description:
      'High-density data display with real-time price charts, order books, portfolio performance, and market depth.',
    characteristics: [
      'Real-time tickers',
      'Candlestick charts',
      'Order books',
      'Portfolio overview',
    ],
    useCases: ['Bloomberg Terminal', 'TradingView', 'Crypto Exchanges', 'Forex'],
    layoutStructure: 'grid-cols-[280px_1fr_320px]',
    cssTemplate: `/* Financial Trading Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  grid-template-rows: 48px 1fr;
  grid-template-areas:
    "ticker ticker ticker"
    "watchlist chart orderbook";
  height: 100vh;
  background: #0a0a0a;
  color: #e5e5e5;
}`,
    colorScheme: {
      background: '#0a0a0a',
      surface: '#171717',
      primary: '#22c55e',
      accent: '#ef4444',
      text: '#e5e5e5',
      textMuted: '#737373',
    },
  },
  {
    id: 'social-media',
    name: 'Social Media Dashboard',
    category: 'specialized',
    era: '2010s-Present',
    origin: 'Social Media Management Tools',
    description:
      'Aggregates metrics from multiple social platforms, content calendars, engagement stats, and follower growth.',
    characteristics: [
      'Platform cards',
      'Engagement metrics',
      'Content calendar',
      'Follower growth',
    ],
    useCases: ['Hootsuite', 'Buffer', 'Sprout Social', 'Creator Dashboards'],
    layoutStructure: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    cssTemplate: `/* Social Media Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 24px;
}
.platform-card { grid-column: span 1; }
.engagement-chart { grid-column: span 2; }
.content-calendar { grid-column: span 3; }`,
    colorScheme: {
      background: '#faf5ff',
      surface: '#ffffff',
      primary: '#9333ea',
      accent: '#db2777',
      text: '#1a1a1a',
      textMuted: '#6b7280',
    },
  },
  {
    id: 'health-fitness',
    name: 'Health / Fitness Dashboard',
    category: 'specialized',
    era: '2010s-Present',
    origin: 'Wearable Devices & Health Apps',
    description:
      'Tracks vital signs, workout history, sleep patterns, nutrition, and wellness goals with circular progress indicators.',
    characteristics: [
      'Circular progress rings',
      'Activity charts',
      'Vital signs',
      'Goal tracking',
    ],
    useCases: ['Apple Health', 'Fitbit', 'MyFitnessPal', 'Strava'],
    layoutStructure: 'grid-cols-2 md:grid-cols-4',
    cssTemplate: `/* Health Fitness Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 24px;
}
.activity-ring { grid-column: span 1; }
.heart-rate { grid-column: span 2; }
.sleep-analysis { grid-column: span 2; }`,
    colorScheme: {
      background: '#f0fdf4',
      surface: '#ffffff',
      primary: '#ef4444',
      accent: '#22c55e',
      text: '#1a2e05',
      textMuted: '#65a30d',
    },
  },
  {
    id: 'weather-dashboard',
    name: 'Weather / Environmental Dashboard',
    category: 'specialized',
    era: 'Modern',
    origin: 'Meteorology & IoT',
    description:
      'Displays current conditions, forecasts, maps, air quality, and environmental sensor data in an atmospheric layout.',
    characteristics: [
      'Large hero weather card',
      'Forecast strips',
      'Interactive maps',
      'Sensor readings',
    ],
    useCases: ['Weather Apps', 'IoT Monitoring', 'Agriculture', 'Smart Cities'],
    layoutStructure: 'grid-cols-1 lg:grid-cols-[1fr_360px]',
    cssTemplate: `/* Weather Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  padding: 24px;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: white;
}`,
    colorScheme: {
      background: '#1e3a8a',
      surface: 'rgba(255,255,255,0.15)',
      primary: '#fbbf24',
      accent: '#38bdf8',
      text: '#ffffff',
      textMuted: 'rgba(255,255,255,0.7)',
    },
  },

  // ============================================
  // MODERN / FUTURISTIC DASHBOARDS
  // ============================================
  {
    id: 'command-center',
    name: 'Command Center / NOC Dashboard',
    category: 'realtime',
    era: '2015s-Present',
    origin: 'Network Operations / Security',
    description:
      'Dark-themed, high-contrast dashboard for monitoring real-time systems, alerts, logs, and infrastructure health.',
    characteristics: [
      'Dark theme',
      'Real-time feeds',
      'Alert panels',
      'System maps',
    ],
    useCases: ['NOC', 'SOC', 'DevOps Monitoring', 'Server Status'],
    layoutStructure: 'grid-cols-1 lg:grid-cols-12 gap-4',
    cssTemplate: `/* Command Center Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
  padding: 20px;
  background: #020617;
  color: #e2e8f0;
}
.status-card { grid-column: span 3; }
.log-feed { grid-column: span 4; }
.network-map { grid-column: span 8; }`,
    colorScheme: {
      background: '#020617',
      surface: '#0f172a',
      primary: '#0ea5e9',
      accent: '#ef4444',
      text: '#e2e8f0',
      textMuted: '#64748b',
    },
  },
  {
    id: 'glassmorphism-dashboard',
    name: 'Glassmorphism Dashboard',
    category: 'modern',
    era: '2020s',
    origin: 'Apple / Modern Design Trends',
    description:
      'Semi-transparent frosted glass cards on vibrant gradients with backdrop blur effects and soft shadows.',
    characteristics: [
      'Frosted glass cards',
      'Backdrop blur',
      'Vibrant gradients',
      'Soft shadows',
    ],
    useCases: ['Music Apps', 'Fintech', 'Premium SaaS', 'Portfolio Dashboards'],
    layoutStructure: 'grid-cols-1 md:grid-cols-3',
    cssTemplate: `/* Glassmorphism Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}`,
    colorScheme: {
      background: '#667eea',
      surface: 'rgba(255,255,255,0.25)',
      primary: '#ffffff',
      accent: '#f472b6',
      text: '#ffffff',
      textMuted: 'rgba(255,255,255,0.7)',
    },
  },
  {
    id: 'neumorphism-dashboard',
    name: 'Neumorphism / Soft UI Dashboard',
    category: 'modern',
    era: '2020s',
    origin: 'UI Design Trends',
    description:
      'Soft, extruded plastic appearance using monochromatic colors and subtle shadows for buttons and cards.',
    characteristics: [
      'Soft shadows',
      'Extruded elements',
      'Monochromatic',
      'Tactile feel',
    ],
    useCases: ['IoT Control Panels', 'Music Players', 'Smart Home', 'Minimal Apps'],
    layoutStructure: 'grid-cols-2 md:grid-cols-4',
    cssTemplate: `/* Neumorphism Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 32px;
  background: #e0e5ec;
}
.neu-card {
  background: #e0e5ec;
  border-radius: 20px;
  box-shadow: 9px 9px 16px #b8b9be, -9px -9px 16px #ffffff;
}`,
    colorScheme: {
      background: '#e0e5ec',
      surface: '#e0e5ec',
      primary: '#6366f1',
      accent: '#8b5cf6',
      text: '#374151',
      textMuted: '#6b7280',
    },
  },
  {
    id: 'minimal-dashboard',
    name: 'Minimal / Clean Dashboard',
    category: 'modern',
    era: '2018s-Present',
    origin: 'Modern SaaS / Scandinavian Design',
    description:
      'Whitespace-heavy dashboard with simple typography, minimal color, and only essential information displayed.',
    characteristics: [
      'Heavy whitespace',
      'Simple typography',
      'Minimal color',
      'Essential only',
    ],
    useCases: ['Minimal SaaS', 'Personal Dashboards', 'Portfolio', 'Clean Apps'],
    layoutStructure: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    cssTemplate: `/* Minimal Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  padding: 48px;
  background: #ffffff;
}
.metric-card {
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}`,
    colorScheme: {
      background: '#ffffff',
      surface: '#ffffff',
      primary: '#171717',
      accent: '#737373',
      text: '#171717',
      textMuted: '#a3a3a3',
    },
  },

  // ============================================
  // INDUSTRY-SPECIFIC DASHBOARDS
  // ============================================
  {
    id: 'manufacturing-iot',
    name: 'Manufacturing / IoT Dashboard',
    category: 'industry',
    era: 'Industry 4.0',
    origin: 'Industrial IoT',
    description:
      'Machine status, production line efficiency, OEE metrics, sensor readings, and predictive maintenance alerts.',
    characteristics: [
      'Machine status',
      'OEE metrics',
      'Production lines',
      'Sensor readings',
    ],
    useCases: ['Factory Floor', 'Smart Manufacturing', 'Predictive Maintenance'],
    layoutStructure: 'grid-cols-1 lg:grid-cols-12',
    cssTemplate: `/* Manufacturing IoT Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  padding: 24px;
}
.machine-status { grid-column: span 3; }
.production-line { grid-column: span 9; }
.oee-metrics { grid-column: span 4; }`,
    colorScheme: {
      background: '#1c1917',
      surface: '#292524',
      primary: '#f59e0b',
      accent: '#22c55e',
      text: '#fafaf9',
      textMuted: '#a8a29e',
    },
  },
  {
    id: 'logistics-fleet',
    name: 'Logistics / Fleet Dashboard',
    category: 'industry',
    era: 'Modern',
    origin: 'Transportation & Supply Chain',
    description:
      'Map-based tracking, route optimization, delivery status, vehicle metrics, and warehouse inventory overview.',
    characteristics: [
      'Live map',
      'Route tracking',
      'Delivery status',
      'Fleet metrics',
    ],
    useCases: ['Delivery Apps', 'Fleet Management', 'Supply Chain', 'Ride Sharing'],
    layoutStructure: 'grid-cols-1 lg:grid-cols-[1fr_360px]',
    cssTemplate: `/* Logistics Fleet Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 0;
  height: 100vh;
}
.map-area { background: #e5e7eb; }
.sidebar { padding: 24px; }`,
    colorScheme: {
      background: '#f3f4f6',
      surface: '#ffffff',
      primary: '#2563eb',
      accent: '#16a34a',
      text: '#111827',
      textMuted: '#6b7280',
    },
  },
  {
    id: 'education-learning',
    name: 'Education / LMS Dashboard',
    category: 'industry',
    era: 'Modern EdTech',
    origin: 'Learning Management Systems',
    description:
      'Course progress, assignment status, student performance, grade distribution, and learning path visualization.',
    characteristics: [
      'Course cards',
      'Progress bars',
      'Grade charts',
      'Assignment lists',
    ],
    useCases: ['LMS', 'School Portals', 'Corporate Training', 'MOOCs'],
    layoutStructure: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    cssTemplate: `/* Education Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 24px;
}
.course-card { grid-column: span 1; }
.progress-overview { grid-column: span 2; }
.upcoming-tasks { grid-column: span 1; }`,
    colorScheme: {
      background: '#fff7ed',
      surface: '#ffffff',
      primary: '#f97316',
      accent: '#3b82f6',
      text: '#431407',
      textMuted: '#78716c',
    },
  },
];

export const getDashboardById = (id: string): DashboardPattern | undefined => {
  return allDashboards.find((d) => d.id === id);
};

export const dashboardsByCategory = {
  classic: allDashboards.filter((d) => d.category === 'classic'),
  business: allDashboards.filter((d) => d.category === 'business'),
  specialized: allDashboards.filter((d) => d.category === 'specialized'),
  modern: allDashboards.filter((d) => d.category === 'modern'),
  realtime: allDashboards.filter((d) => d.category === 'realtime'),
  industry: allDashboards.filter((d) => d.category === 'industry'),
};
