/**
 * Global Layout System - 360° Layout Architectures (Classic to Futuristic)
 */

export interface LayoutArchitecture {
  id: string;
  name: string;
  category: 'classical' | 'modern' | 'editorial' | 'experimental' | 'digital';
  era: string;
  origin: string;
  description: string;
  characteristics: string[];
  gridStructure: string;
  cssTemplate: string;
}

export const allLayouts: LayoutArchitecture[] = [
  // ============================================
  // CLASSICAL & TRADITIONAL LAYOUTS
  // ============================================
  {
    id: 'golden-ratio',
    name: 'Golden Ratio (Phi Grid)',
    category: 'classical',
    era: 'Ancient / Renaissance',
    origin: 'Ancient Greece & Italy',
    description: 'Based on the divine proportion (1.618:1). Creates naturally pleasing visual harmony used in art and architecture for millennia.',
    characteristics: ['1.618 ratio', 'Asymmetric balance', 'Natural focal points', 'Harmonious scaling'],
    gridStructure: 'grid-cols-[1.618fr_1fr]',
    cssTemplate: `/* Golden Ratio Grid */
display: grid;
grid-template-columns: 61.8% 38.2%;
gap: 2rem;`,
  },
  {
    id: 'vitruvian-man',
    name: 'Symmetric Central (Vitruvian)',
    category: 'classical',
    era: 'Classical Antiquity',
    origin: 'Rome / Da Vinci',
    description: 'Strict axial symmetry centered around a core focal point. Symbolizes order, divinity, and formal balance.',
    characteristics: ['Absolute symmetry', 'Centered focal point', 'Formal weight', 'Vertical axis'],
    gridStructure: 'grid-cols-1 max-w-xl mx-auto text-center',
    cssTemplate: `/* Centered Symmetric Layout */
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
max-width: 600px;
margin: 0 auto;`,
  },
  {
    id: 'rule-of-thirds',
    name: 'Rule of Thirds Grid',
    category: 'classical',
    era: 'Renaissance Photography & Painting',
    origin: 'Fine Arts',
    description: 'Dividing the canvas into a 3x3 grid. Placing elements along intersection lines creates engaging composition.',
    characteristics: ['3x3 invisible grid', 'Off-center focus', 'Visual tension', 'Dynamic breathing room'],
    gridStructure: 'grid-cols-3 grid-rows-3',
    cssTemplate: `/* Rule of Thirds Grid */
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(3, auto);
gap: 1.5rem;`,
  },

  // ============================================
  // MODERN & EDITORIAL LAYOUTS
  // ============================================
  {
    id: 'swiss-grid',
    name: 'Swiss International Grid',
    category: 'modern',
    era: '1950s-1960s',
    origin: 'Switzerland',
    description: 'Mathematical grid system emphasizing clarity, readability, and objectivity. Asymmetric whitespace and clean typography.',
    characteristics: ['Mathematical precision', 'Asymmetric whitespace', 'Sans-serif dominance', 'Modular blocks'],
    gridStructure: 'grid-cols-12',
    cssTemplate: `/* Swiss Grid 12-Column */
display: grid;
grid-template-columns: repeat(12, minmax(0, 1fr));
gap: 1.5rem;`,
  },
  {
    id: 'newspaper-broadsheet',
    name: 'Newspaper Broadsheet',
    category: 'editorial',
    era: '19th-20th Century',
    origin: 'Global Print Media',
    description: 'Multi-column vertical layout with strong headline banners, pull-quotes, and dense information hierarchy.',
    characteristics: ['Multi-column vertical', 'Headline banners', 'Dense hierarchy', 'Column rules'],
    gridStructure: 'grid-cols-4 divide-x divide-gray-300',
    cssTemplate: `/* Broadsheet Column Grid */
display: grid;
grid-template-columns: repeat(4, 1fr);
column-gap: 2rem;
border-top: 3px solid #000;`,
  },
  {
    id: 'magazine-asymmetric',
    name: 'Magazine Asymmetric Editorial',
    category: 'editorial',
    era: 'Modern Print / Vogue / Kinfolk',
    origin: 'Publishing',
    description: 'High-fashion editorial layout featuring overlapping elements, large typography, and staggered image placements.',
    characteristics: ['Overlapping boxes', 'Staggered imagery', 'Generous whitespace', 'High contrast scale'],
    gridStructure: 'grid-cols-12 gap-6',
    cssTemplate: `/* Asymmetric Magazine Grid */
display: grid;
grid-template-columns: repeat(12, 1fr);
grid-auto-rows: minmax(100px, auto);`,
  },
  {
    id: 'bauhaus-asymmetry',
    name: 'Bauhaus Diagonal & Asymmetry',
    category: 'modern',
    era: '1919-1933',
    origin: 'Germany',
    description: 'Rejection of classical symmetry in favor of dynamic diagonals, primary colors, and structural elementalism.',
    characteristics: ['Diagonal tension', 'Primary block colors', 'Structural asymmetry', 'Functional alignment'],
    gridStructure: 'grid-cols-5',
    cssTemplate: `/* Bauhaus Asymmetric Grid */
display: grid;
grid-template-columns: 2fr 1fr 2fr;
transform: skewY(-2deg);`,
  },

  // ============================================
  // DIGITAL & APP LAYOUTS
  // ============================================
  {
    id: 'bento-grid',
    name: 'Bento Grid (Apple Style)',
    category: 'digital',
    era: '2020s',
    origin: 'Apple & Modern Tech',
    description: 'Modular grid system inspired by Japanese bento boxes. Varied card sizes fitting neatly into a responsive rectangle.',
    characteristics: ['Modular cards', 'Mixed aspect ratios', 'Card-based UI', 'High information density'],
    gridStructure: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
    cssTemplate: `/* Bento Grid Layout */
display: grid;
grid-template-columns: repeat(4, minmax(0, 1fr));
grid-auto-rows: 180px;
gap: 1.25rem;`,
  },
  {
    id: 'holy-grail',
    name: 'The Holy Grail Web Layout',
    category: 'digital',
    era: 'Early Web 2.0',
    origin: 'Web Development',
    description: 'Header, footer, left sidebar (navigation), main content area, and right sidebar (widgets). The classic web app shell.',
    characteristics: ['Header & Footer', 'Dual sidebars', 'Flexible center content', 'App shell architecture'],
    gridStructure: 'grid-cols-[240px_1fr_280px]',
    cssTemplate: `/* Holy Grail Grid */
display: grid;
grid-template-areas:
  "header header header"
  "nav main aside"
  "footer footer footer";
grid-template-columns: 240px 1fr 280px;
grid-template-rows: auto 1fr auto;
min-height: 100vh;`,
  },
  {
    id: 'dashboard-shell',
    name: 'Command Center / Dashboard',
    category: 'digital',
    era: 'Modern SaaS',
    origin: 'Enterprise Software',
    description: 'Collapsible sidebar navigation, top header bar with search/notifications, and multi-widget workspace canvas.',
    characteristics: ['Sidebar nav', 'Command bar', 'Widget canvas', 'High efficiency UI'],
    gridStructure: 'grid-cols-[260px_1fr]',
    cssTemplate: `/* SaaS Dashboard Layout */
display: grid;
grid-template-columns: 260px 1fr;
grid-template-rows: 64px 1fr;
grid-template-areas:
  "sidebar header"
  "sidebar content";`,
  },
  {
    id: 'masonry-pinterest',
    name: 'Masonry / Waterfall Grid',
    category: 'digital',
    era: '2010s+',
    origin: 'Pinterest / Tumblr',
    description: 'Vertical staggered columns where items of varying heights pack tightly without vertical gaps.',
    characteristics: ['Variable height items', 'No vertical gaps', 'Infinite scroll feel', 'Visual discovery'],
    gridStructure: 'columns-1 sm:columns-2 lg:columns-3 gap-4',
    cssTemplate: `/* Masonry Waterfall Layout */
column-count: 3;
column-gap: 1.5rem;
break-inside: avoid;`,
  },

  // ============================================
  // EXPERIMENTAL & AVANT-GARDE LAYOUTS
  // ============================================
  {
    id: 'broken-grid',
    name: 'Broken Grid / Anti-Design',
    category: 'experimental',
    era: 'Late 2010s - Present',
    origin: 'Post-Digital Graphic Design',
    description: 'Intentional breaking of grid alignment. Elements overlap, float freely, and challenge traditional reading paths.',
    characteristics: ['Intentional misalignment', 'Overlapping layers', 'Floating elements', 'Raw avant-garde'],
    gridStructure: 'relative min-h-[500px]',
    cssTemplate: `/* Broken Grid / Freeform Layout */
position: relative;
display: block;
/* Elements use absolute positioning and transforms */`,
  },
  {
    id: 'split-screen',
    name: '50/50 Split Screen',
    category: 'experimental',
    era: 'Modern Web / SaaS Landings',
    origin: 'Digital Marketing',
    description: 'Equal division of the viewport into two distinct immersive panels (e.g., imagery vs. interactive form).',
    characteristics: ['Dual focal points', 'Immersive imagery', 'High conversion focus', 'Balanced tension'],
    gridStructure: 'grid-cols-1 lg:grid-cols-2',
    cssTemplate: `/* Split Screen Layout */
display: grid;
grid-template-columns: 1fr 1fr;
min-height: 100vh;`,
  },
  {
    id: 'radial-concentric',
    name: 'Radial & Concentric Layout',
    category: 'experimental',
    era: 'Futuristic / Sci-Fi HUDs',
    origin: 'Data Visualization & Sci-Fi',
    description: 'Circular and concentric ring structures radiating from a central core. Used in HUDs and radial menus.',
    characteristics: ['Circular hierarchy', 'Concentric rings', 'Radar/HUD aesthetic', 'Polar coordinates'],
    gridStructure: 'relative flex items-center justify-center',
    cssTemplate: `/* Radial Concentric Layout */
position: relative;
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;`,
  },
];

export const getLayoutById = (id: string): LayoutArchitecture | undefined => {
  return allLayouts.find((l) => l.id === id);
};
