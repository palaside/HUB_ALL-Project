/**
 * Design Styles Collection - 360° Global Design Aesthetics
 * From Classic to Futuristic, East to West
 */

export interface ThemeStyle {
  id: string;
  name: string;
  nameLocal?: string;
  era: 'classic' | 'modern' | 'futuristic' | 'cultural';
  origin: string;
  year?: string;
  description: string;
  characteristics: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
  typography: {
    fontFamily: string;
    fontFamilyHeading?: string;
    fontWeight: string;
    letterSpacing: string;
    lineHeight: string;
  };
  borderRadius: string;
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  effects?: {
    blur?: string;
    gradient?: string;
    texture?: string;
  };
}

// ============================================
// CLASSIC STYLES (Pre-2000)
// ============================================

export const victorianStyle: ThemeStyle = {
  id: 'victorian',
  name: 'Victorian',
  era: 'classic',
  origin: 'England',
  year: '1837-1901',
  description: 'Ornate, decorative style from the British Victorian era. Rich colors, intricate patterns, and elegant typography.',
  characteristics: ['Ornate details', 'Rich colors', 'Serif typography', 'Decorative borders', 'Gold accents'],
  colors: {
    primary: '#8B0000',
    secondary: '#2F4F4F',
    accent: '#DAA520',
    background: '#FDF5E6',
    surface: '#FFFAF0',
    text: '#2C1810',
    textMuted: '#5C4033',
    border: '#C9A86C',
  },
  typography: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontFamilyHeading: '"Cinzel", serif',
    fontWeight: '400',
    letterSpacing: '0.02em',
    lineHeight: '1.7',
  },
  borderRadius: '4px',
  shadows: {
    sm: '2px 2px 4px rgba(44, 24, 16, 0.1)',
    md: '4px 4px 8px rgba(44, 24, 16, 0.15)',
    lg: '8px 8px 16px rgba(44, 24, 16, 0.2)',
  },
};

export const artDecoStyle: ThemeStyle = {
  id: 'art-deco',
  name: 'Art Deco',
  era: 'classic',
  origin: 'France',
  year: '1920-1940',
  description: 'Luxurious, glamorous style with geometric shapes, bold colors, and metallic finishes.',
  characteristics: ['Geometric patterns', 'Gold/brass accents', 'Symmetry', 'Sunburst motifs', 'Bold typography'],
  colors: {
    primary: '#1C1C1C',
    secondary: '#D4AF37',
    accent: '#C41E3A',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    text: '#F5F5DC',
    textMuted: '#B8860B',
    border: '#D4AF37',
  },
  typography: {
    fontFamily: '"Josefin Sans", sans-serif',
    fontFamilyHeading: '"Poiret One", cursive',
    fontWeight: '300',
    letterSpacing: '0.15em',
    lineHeight: '1.5',
  },
  borderRadius: '0px',
  shadows: {
    sm: '0 2px 4px rgba(212, 175, 55, 0.1)',
    md: '0 4px 8px rgba(212, 175, 55, 0.2)',
    lg: '0 8px 24px rgba(212, 175, 55, 0.3)',
  },
  effects: {
    gradient: 'linear-gradient(135deg, #D4AF37 0%, #F5F5DC 50%, #D4AF37 100%)',
  },
};

export const artNouveauStyle: ThemeStyle = {
  id: 'art-nouveau',
  name: 'Art Nouveau',
  era: 'classic',
  origin: 'Europe',
  year: '1890-1910',
  description: 'Organic, flowing style inspired by natural forms. Curved lines, floral motifs, and elegant aesthetics.',
  characteristics: ['Organic curves', 'Floral motifs', 'Natural colors', 'Flowing lines', 'Ornamental'],
  colors: {
    primary: '#5F7161',
    secondary: '#6D9886',
    accent: '#D4A373',
    background: '#FEFAE0',
    surface: '#FAEDCD',
    text: '#3D405B',
    textMuted: '#6B705C',
    border: '#CCD5AE',
  },
  typography: {
    fontFamily: '"EB Garamond", Georgia, serif',
    fontFamilyHeading: '"Tangerine", cursive',
    fontWeight: '400',
    letterSpacing: '0.01em',
    lineHeight: '1.8',
  },
  borderRadius: '20px',
  shadows: {
    sm: '0 2px 8px rgba(95, 113, 97, 0.1)',
    md: '0 4px 16px rgba(95, 113, 97, 0.15)',
    lg: '0 8px 32px rgba(95, 113, 97, 0.2)',
  },
};

export const bauhausStyle: ThemeStyle = {
  id: 'bauhaus',
  name: 'Bauhaus',
  era: 'classic',
  origin: 'Germany',
  year: '1919-1933',
  description: 'Form follows function. Primary colors, geometric shapes, and clean sans-serif typography.',
  characteristics: ['Primary colors', 'Geometric shapes', 'Functional design', 'Grid-based', 'Sans-serif type'],
  colors: {
    primary: '#E53935',
    secondary: '#1E88E5',
    accent: '#FDD835',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#212121',
    textMuted: '#757575',
    border: '#212121',
  },
  typography: {
    fontFamily: '"DM Sans", Helvetica, Arial, sans-serif',
    fontWeight: '500',
    letterSpacing: '0',
    lineHeight: '1.5',
  },
  borderRadius: '0px',
  shadows: {
    sm: 'none',
    md: '4px 4px 0px #212121',
    lg: '8px 8px 0px #212121',
  },
};

export const midCenturyStyle: ThemeStyle = {
  id: 'mid-century',
  name: 'Mid-Century Modern',
  era: 'classic',
  origin: 'USA/Scandinavia',
  year: '1945-1969',
  description: 'Clean lines, organic curves, and a mix of traditional and non-traditional materials.',
  characteristics: ['Clean lines', 'Organic curves', 'Warm wood tones', 'Bold accent colors', 'Functional'],
  colors: {
    primary: '#E07A5F',
    secondary: '#3D405B',
    accent: '#F2CC8F',
    background: '#F4F1DE',
    surface: '#FFFFFF',
    text: '#3D405B',
    textMuted: '#81B29A',
    border: '#E07A5F',
  },
  typography: {
    fontFamily: '"Outfit", "Futura", sans-serif',
    fontWeight: '400',
    letterSpacing: '0.02em',
    lineHeight: '1.6',
  },
  borderRadius: '8px',
  shadows: {
    sm: '0 1px 3px rgba(61, 64, 91, 0.1)',
    md: '0 4px 12px rgba(61, 64, 91, 0.15)',
    lg: '0 12px 24px rgba(61, 64, 91, 0.2)',
  },
};

export const swissStyle: ThemeStyle = {
  id: 'swiss',
  name: 'Swiss / International',
  era: 'classic',
  origin: 'Switzerland',
  year: '1950s',
  description: 'Clean, objective design with strong grid systems, sans-serif typography, and asymmetric layouts.',
  characteristics: ['Grid system', 'Helvetica', 'Asymmetry', 'White space', 'Objective photography'],
  colors: {
    primary: '#FF0000',
    secondary: '#000000',
    accent: '#FF0000',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#000000',
    textMuted: '#666666',
    border: '#000000',
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: '400',
    letterSpacing: '0',
    lineHeight: '1.4',
  },
  borderRadius: '0px',
  shadows: {
    sm: 'none',
    md: 'none',
    lg: '0 0 0 2px #000000',
  },
};

// ============================================
// MODERN STYLES (2000-2020)
// ============================================

export const minimalistStyle: ThemeStyle = {
  id: 'minimalist',
  name: 'Minimalist',
  era: 'modern',
  origin: 'Global',
  year: '2000s+',
  description: 'Less is more. Clean, simple design with ample white space and essential elements only.',
  characteristics: ['White space', 'Simple colors', 'Clean typography', 'Essential elements', 'No decoration'],
  colors: {
    primary: '#111111',
    secondary: '#555555',
    accent: '#111111',
    background: '#FFFFFF',
    surface: '#FAFAFA',
    text: '#111111',
    textMuted: '#888888',
    border: '#EEEEEE',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, sans-serif',
    fontWeight: '400',
    letterSpacing: '-0.01em',
    lineHeight: '1.6',
  },
  borderRadius: '4px',
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
    md: '0 2px 8px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
};

export const flatDesignStyle: ThemeStyle = {
  id: 'flat-design',
  name: 'Flat Design',
  era: 'modern',
  origin: 'Microsoft/Apple',
  year: '2012+',
  description: 'Two-dimensional design without shadows, gradients, or textures. Bold colors and simple icons.',
  characteristics: ['No shadows', 'Bold colors', 'Simple icons', '2D elements', 'High contrast'],
  colors: {
    primary: '#3498DB',
    secondary: '#2ECC71',
    accent: '#E74C3C',
    background: '#ECF0F1',
    surface: '#FFFFFF',
    text: '#2C3E50',
    textMuted: '#7F8C8D',
    border: '#BDC3C7',
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", sans-serif',
    fontWeight: '400',
    letterSpacing: '0',
    lineHeight: '1.5',
  },
  borderRadius: '4px',
  shadows: {
    sm: 'none',
    md: 'none',
    lg: 'none',
  },
};

export const materialDesignStyle: ThemeStyle = {
  id: 'material-design',
  name: 'Material Design',
  era: 'modern',
  origin: 'Google',
  year: '2014+',
  description: 'Design language with depth, motion, and bold colors. Based on paper and ink metaphor.',
  characteristics: ['Depth & shadows', 'Bold colors', 'Responsive animations', 'Grid-based', 'Paper metaphor'],
  colors: {
    primary: '#6200EE',
    secondary: '#03DAC6',
    accent: '#FF0266',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#121212',
    textMuted: '#666666',
    border: '#E0E0E0',
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: '400',
    letterSpacing: '0.01em',
    lineHeight: '1.5',
  },
  borderRadius: '4px',
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    lg: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
  },
};

export const neumorphismStyle: ThemeStyle = {
  id: 'neumorphism',
  name: 'Neumorphism',
  nameLocal: 'Soft UI',
  era: 'modern',
  origin: 'Global',
  year: '2020+',
  description: 'Soft, extruded plastic look with subtle shadows creating a 3D effect on flat surfaces.',
  characteristics: ['Soft shadows', 'Monochromatic', 'Extruded elements', 'Subtle depth', 'Minimal color'],
  colors: {
    primary: '#6C63FF',
    secondary: '#A29BFE',
    accent: '#6C63FF',
    background: '#E0E5EC',
    surface: '#E0E5EC',
    text: '#2D3436',
    textMuted: '#636E72',
    border: 'transparent',
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: '500',
    letterSpacing: '0',
    lineHeight: '1.5',
  },
  borderRadius: '16px',
  shadows: {
    sm: '3px 3px 6px #b8b9be, -3px -3px 6px #ffffff',
    md: '6px 6px 12px #b8b9be, -6px -6px 12px #ffffff',
    lg: '12px 12px 24px #b8b9be, -12px -12px 24px #ffffff',
  },
};

export const glassmorphismStyle: ThemeStyle = {
  id: 'glassmorphism',
  name: 'Glassmorphism',
  era: 'modern',
  origin: 'Apple/Global',
  year: '2020+',
  description: 'Frosted glass effect with transparency, blur, and vibrant colors showing through.',
  characteristics: ['Frosted glass', 'Background blur', 'Transparency', 'Subtle borders', 'Vibrant backgrounds'],
  colors: {
    primary: '#667EEA',
    secondary: '#764BA2',
    accent: '#F093FB',
    background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    surface: 'rgba(255, 255, 255, 0.25)',
    text: '#FFFFFF',
    textMuted: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.18)',
  },
  typography: {
    fontFamily: '"SF Pro Display", -apple-system, sans-serif',
    fontWeight: '500',
    letterSpacing: '-0.01em',
    lineHeight: '1.5',
  },
  borderRadius: '16px',
  shadows: {
    sm: '0 4px 6px rgba(0, 0, 0, 0.1)',
    md: '0 8px 32px rgba(31, 38, 135, 0.15)',
    lg: '0 16px 64px rgba(31, 38, 135, 0.25)',
  },
  effects: {
    blur: 'blur(10px)',
    gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
  },
};

export const brutalismStyle: ThemeStyle = {
  id: 'brutalism',
  name: 'Brutalism',
  era: 'modern',
  origin: 'Web Design',
  year: '2014+',
  description: 'Raw, unpolished aesthetic with bold typography, harsh colors, and intentionally rough design.',
  characteristics: ['Raw aesthetic', 'Bold typography', 'High contrast', 'No polish', 'Unconventional'],
  colors: {
    primary: '#000000',
    secondary: '#FFFF00',
    accent: '#FF0000',
    background: '#FFFFFF',
    surface: '#FFFF00',
    text: '#000000',
    textMuted: '#333333',
    border: '#000000',
  },
  typography: {
    fontFamily: '"Courier New", Courier, monospace',
    fontFamilyHeading: '"Arial Black", Impact, sans-serif',
    fontWeight: '700',
    letterSpacing: '0',
    lineHeight: '1.3',
  },
  borderRadius: '0px',
  shadows: {
    sm: '4px 4px 0px #000000',
    md: '8px 8px 0px #000000',
    lg: '12px 12px 0px #000000',
  },
};

// ============================================
// CULTURAL STYLES
// ============================================

export const japaneseZenStyle: ThemeStyle = {
  id: 'japanese-zen',
  name: 'Japanese Zen',
  nameLocal: '禅 (Zen)',
  era: 'cultural',
  origin: 'Japan',
  description: 'Wabi-sabi aesthetics with natural materials, asymmetry, and the beauty of imperfection.',
  characteristics: ['Wabi-sabi', 'Natural materials', 'Asymmetry', 'Negative space', 'Tranquility'],
  colors: {
    primary: '#2D4739',
    secondary: '#8B7355',
    accent: '#C4A77D',
    background: '#F5F0E8',
    surface: '#FFFFFF',
    text: '#2D2D2D',
    textMuted: '#6B6B6B',
    border: '#D4C5B5',
  },
  typography: {
    fontFamily: '"Noto Sans JP", "Hiragino Sans", sans-serif',
    fontWeight: '300',
    letterSpacing: '0.05em',
    lineHeight: '1.8',
  },
  borderRadius: '2px',
  shadows: {
    sm: '0 1px 2px rgba(45, 71, 57, 0.05)',
    md: '0 4px 8px rgba(45, 71, 57, 0.08)',
    lg: '0 8px 16px rgba(45, 71, 57, 0.1)',
  },
};

export const scandinavianStyle: ThemeStyle = {
  id: 'scandinavian',
  name: 'Scandinavian',
  nameLocal: 'Nordic',
  era: 'cultural',
  origin: 'Denmark/Sweden/Norway',
  description: 'Hygge-inspired design with light colors, natural materials, and cozy minimalism.',
  characteristics: ['Light colors', 'Natural wood', 'Cozy minimalism', 'Functional', 'Hygge'],
  colors: {
    primary: '#5C6B73',
    secondary: '#9DB4C0',
    accent: '#C2DFE3',
    background: '#FCFCFC',
    surface: '#FFFFFF',
    text: '#253237',
    textMuted: '#5C6B73',
    border: '#E8E8E8',
  },
  typography: {
    fontFamily: '"Nunito Sans", "Avenir", sans-serif',
    fontWeight: '400',
    letterSpacing: '0',
    lineHeight: '1.6',
  },
  borderRadius: '8px',
  shadows: {
    sm: '0 1px 3px rgba(37, 50, 55, 0.06)',
    md: '0 4px 12px rgba(37, 50, 55, 0.08)',
    lg: '0 12px 36px rgba(37, 50, 55, 0.12)',
  },
};

export const moroccanStyle: ThemeStyle = {
  id: 'moroccan',
  name: 'Moroccan',
  nameLocal: 'المغربي',
  era: 'cultural',
  origin: 'Morocco',
  description: 'Rich, vibrant colors with intricate geometric patterns inspired by Islamic art.',
  characteristics: ['Geometric patterns', 'Rich colors', 'Gold accents', 'Intricate details', 'Zellige tiles'],
  colors: {
    primary: '#1E3A5F',
    secondary: '#C1666B',
    accent: '#D4AF37',
    background: '#FBF7F4',
    surface: '#FFFFFF',
    text: '#1E3A5F',
    textMuted: '#6B7B8C',
    border: '#E8D5C4',
  },
  typography: {
    fontFamily: '"Amiri", "Times New Roman", serif',
    fontWeight: '400',
    letterSpacing: '0.02em',
    lineHeight: '1.7',
  },
  borderRadius: '8px',
  shadows: {
    sm: '0 2px 4px rgba(30, 58, 95, 0.1)',
    md: '0 4px 12px rgba(30, 58, 95, 0.15)',
    lg: '0 8px 24px rgba(30, 58, 95, 0.2)',
  },
};

export const indianStyle: ThemeStyle = {
  id: 'indian',
  name: 'Indian Traditional',
  nameLocal: 'भारतीय',
  era: 'cultural',
  origin: 'India',
  description: 'Vibrant, colorful design with intricate patterns, rich textures, and warm tones.',
  characteristics: ['Vibrant colors', 'Mandala patterns', 'Gold details', 'Rich textures', 'Ornate'],
  colors: {
    primary: '#D4145A',
    secondary: '#FBB03B',
    accent: '#7AC943',
    background: '#FFF8F0',
    surface: '#FFFFFF',
    text: '#2D132C',
    textMuted: '#6B4E71',
    border: '#E8D4C4',
  },
  typography: {
    fontFamily: '"Mukta", "Poppins", sans-serif',
    fontWeight: '500',
    letterSpacing: '0.01em',
    lineHeight: '1.6',
  },
  borderRadius: '12px',
  shadows: {
    sm: '0 2px 8px rgba(212, 20, 90, 0.1)',
    md: '0 4px 16px rgba(212, 20, 90, 0.15)',
    lg: '0 8px 32px rgba(212, 20, 90, 0.2)',
  },
};

export const chineseStyle: ThemeStyle = {
  id: 'chinese',
  name: 'Chinese Traditional',
  nameLocal: '中国风',
  era: 'cultural',
  origin: 'China',
  description: 'Elegant design with red and gold colors, calligraphy-inspired typography, and symbolic motifs.',
  characteristics: ['Red & gold', 'Calligraphy', 'Symbolic motifs', 'Balance', 'Auspicious elements'],
  colors: {
    primary: '#C41E3A',
    secondary: '#DAA520',
    accent: '#228B22',
    background: '#FDF5E6',
    surface: '#FFFAF0',
    text: '#2F1810',
    textMuted: '#6B4423',
    border: '#DAA520',
  },
  typography: {
    fontFamily: '"Noto Serif SC", "SimSun", serif',
    fontWeight: '400',
    letterSpacing: '0.1em',
    lineHeight: '1.8',
  },
  borderRadius: '4px',
  shadows: {
    sm: '0 2px 4px rgba(196, 30, 58, 0.1)',
    md: '0 4px 12px rgba(196, 30, 58, 0.15)',
    lg: '0 8px 24px rgba(196, 30, 58, 0.2)',
  },
};

// ============================================
// FUTURISTIC STYLES
// ============================================

export const cyberpunkStyle: ThemeStyle = {
  id: 'cyberpunk',
  name: 'Cyberpunk',
  era: 'futuristic',
  origin: 'Sci-Fi',
  year: '1980s+',
  description: 'High-tech, low-life aesthetic with neon colors, dark backgrounds, and glitch effects.',
  characteristics: ['Neon colors', 'Dark theme', 'Glitch effects', 'Tech elements', 'Urban grit'],
  colors: {
    primary: '#00F5FF',
    secondary: '#FF00FF',
    accent: '#FFFF00',
    background: '#0A0A0F',
    surface: '#12121A',
    text: '#E0E0FF',
    textMuted: '#8888AA',
    border: '#00F5FF',
  },
  typography: {
    fontFamily: '"Orbitron", "Share Tech Mono", monospace',
    fontWeight: '500',
    letterSpacing: '0.05em',
    lineHeight: '1.4',
  },
  borderRadius: '4px',
  shadows: {
    sm: '0 0 10px rgba(0, 245, 255, 0.3)',
    md: '0 0 20px rgba(0, 245, 255, 0.4), 0 0 40px rgba(255, 0, 255, 0.2)',
    lg: '0 0 40px rgba(0, 245, 255, 0.5), 0 0 80px rgba(255, 0, 255, 0.3)',
  },
  effects: {
    gradient: 'linear-gradient(135deg, #00F5FF 0%, #FF00FF 100%)',
  },
};

export const vaporwaveStyle: ThemeStyle = {
  id: 'vaporwave',
  name: 'Vaporwave',
  nameLocal: 'ヴェイパーウェイヴ',
  era: 'futuristic',
  origin: 'Internet',
  year: '2010s',
  description: 'Nostalgic, surreal aesthetic with pastel colors, Greek statues, and 80s/90s imagery.',
  characteristics: ['Pastel colors', 'Retro tech', 'Greek statues', 'Surreal', 'Nostalgic'],
  colors: {
    primary: '#FF71CE',
    secondary: '#01CDFE',
    accent: '#05FFA1',
    background: '#1A1A2E',
    surface: '#16213E',
    text: '#FFFFFF',
    textMuted: '#B967FF',
    border: '#FF71CE',
  },
  typography: {
    fontFamily: '"VT323", "Press Start 2P", monospace',
    fontWeight: '400',
    letterSpacing: '0.02em',
    lineHeight: '1.5',
  },
  borderRadius: '0px',
  shadows: {
    sm: '4px 4px 0px #FF71CE',
    md: '0 0 20px rgba(255, 113, 206, 0.5)',
    lg: '0 0 40px rgba(255, 113, 206, 0.3), 0 0 80px rgba(1, 205, 254, 0.3)',
  },
  effects: {
    gradient: 'linear-gradient(180deg, #FF71CE 0%, #01CDFE 50%, #05FFA1 100%)',
  },
};

export const y2kStyle: ThemeStyle = {
  id: 'y2k',
  name: 'Y2K',
  era: 'futuristic',
  origin: 'Global',
  year: '1997-2004',
  description: 'Turn of the millennium aesthetic with metallic colors, bubble shapes, and tech optimism.',
  characteristics: ['Metallic colors', 'Bubble shapes', 'Glossy', 'Tech optimism', 'Futuristic'],
  colors: {
    primary: '#C0C0C0',
    secondary: '#87CEEB',
    accent: '#FF69B4',
    background: '#E8E8E8',
    surface: '#FFFFFF',
    text: '#333333',
    textMuted: '#666666',
    border: '#C0C0C0',
  },
  typography: {
    fontFamily: '"Trebuchet MS", "Century Gothic", sans-serif',
    fontWeight: '400',
    letterSpacing: '0',
    lineHeight: '1.5',
  },
  borderRadius: '24px',
  shadows: {
    sm: '2px 2px 4px rgba(0,0,0,0.1), inset 1px 1px 2px rgba(255,255,255,0.8)',
    md: '4px 4px 8px rgba(0,0,0,0.15), inset 2px 2px 4px rgba(255,255,255,0.9)',
    lg: '8px 8px 16px rgba(0,0,0,0.2), inset 4px 4px 8px rgba(255,255,255,1)',
  },
  effects: {
    gradient: 'linear-gradient(135deg, #C0C0C0 0%, #FFFFFF 50%, #87CEEB 100%)',
  },
};

export const neofuturismStyle: ThemeStyle = {
  id: 'neofuturism',
  name: 'Neo-Futurism',
  era: 'futuristic',
  origin: 'Architecture/Design',
  year: '2010s+',
  description: 'Clean, flowing forms with sustainable technology integration and organic curves.',
  characteristics: ['Flowing forms', 'Clean lines', 'Sustainable', 'Organic curves', 'Tech integration'],
  colors: {
    primary: '#00D4AA',
    secondary: '#7B61FF',
    accent: '#FF6B6B',
    background: '#FAFBFC',
    surface: '#FFFFFF',
    text: '#1A1A2E',
    textMuted: '#6B7280',
    border: '#E5E7EB',
  },
  typography: {
    fontFamily: '"Space Grotesk", "Sora", sans-serif',
    fontWeight: '500',
    letterSpacing: '-0.02em',
    lineHeight: '1.5',
  },
  borderRadius: '20px',
  shadows: {
    sm: '0 2px 8px rgba(0, 212, 170, 0.1)',
    md: '0 8px 24px rgba(0, 212, 170, 0.15)',
    lg: '0 16px 48px rgba(0, 212, 170, 0.2)',
  },
};

// ============================================
// NATURE-INSPIRED STYLES
// ============================================

export const organicStyle: ThemeStyle = {
  id: 'organic',
  name: 'Organic',
  era: 'modern',
  origin: 'Nature',
  description: 'Inspired by natural forms with earthy colors, flowing shapes, and sustainable aesthetics.',
  characteristics: ['Earthy tones', 'Flowing shapes', 'Natural textures', 'Sustainable', 'Warm'],
  colors: {
    primary: '#5D4E37',
    secondary: '#8B9556',
    accent: '#C1946A',
    background: '#F7F3EE',
    surface: '#FFFFFF',
    text: '#3D352E',
    textMuted: '#7D7469',
    border: '#E5DED5',
  },
  typography: {
    fontFamily: '"Lora", Georgia, serif',
    fontWeight: '400',
    letterSpacing: '0',
    lineHeight: '1.7',
  },
  borderRadius: '12px',
  shadows: {
    sm: '0 2px 4px rgba(93, 78, 55, 0.08)',
    md: '0 4px 12px rgba(93, 78, 55, 0.12)',
    lg: '0 8px 24px rgba(93, 78, 55, 0.16)',
  },
};

export const oceanStyle: ThemeStyle = {
  id: 'ocean',
  name: 'Ocean',
  era: 'modern',
  origin: 'Nature',
  description: 'Calming blue palette inspired by the sea with wave-like gradients and fluid design.',
  characteristics: ['Blue palette', 'Wave gradients', 'Fluid forms', 'Calming', 'Depth'],
  colors: {
    primary: '#0077B6',
    secondary: '#00B4D8',
    accent: '#90E0EF',
    background: '#CAF0F8',
    surface: '#FFFFFF',
    text: '#03045E',
    textMuted: '#0077B6',
    border: '#90E0EF',
  },
  typography: {
    fontFamily: '"Source Sans Pro", "Open Sans", sans-serif',
    fontWeight: '400',
    letterSpacing: '0',
    lineHeight: '1.6',
  },
  borderRadius: '16px',
  shadows: {
    sm: '0 2px 8px rgba(0, 119, 182, 0.1)',
    md: '0 4px 16px rgba(0, 119, 182, 0.15)',
    lg: '0 8px 32px rgba(0, 119, 182, 0.2)',
  },
  effects: {
    gradient: 'linear-gradient(180deg, #00B4D8 0%, #0077B6 100%)',
  },
};

export const forestStyle: ThemeStyle = {
  id: 'forest',
  name: 'Forest',
  era: 'modern',
  origin: 'Nature',
  description: 'Deep greens and earth tones inspired by woodland environments.',
  characteristics: ['Deep greens', 'Earth tones', 'Natural', 'Grounding', 'Refreshing'],
  colors: {
    primary: '#2D5A27',
    secondary: '#5C8A4D',
    accent: '#8FBC8F',
    background: '#F0F4F0',
    surface: '#FFFFFF',
    text: '#1B3A17',
    textMuted: '#4A6741',
    border: '#C8D9C4',
  },
  typography: {
    fontFamily: '"Merriweather Sans", sans-serif',
    fontWeight: '400',
    letterSpacing: '0',
    lineHeight: '1.6',
  },
  borderRadius: '8px',
  shadows: {
    sm: '0 2px 4px rgba(45, 90, 39, 0.08)',
    md: '0 4px 12px rgba(45, 90, 39, 0.12)',
    lg: '0 8px 24px rgba(45, 90, 39, 0.16)',
  },
};

// ============================================
// EXPORT ALL STYLES
// ============================================

export const allStyles: ThemeStyle[] = [
  // Classic
  victorianStyle,
  artDecoStyle,
  artNouveauStyle,
  bauhausStyle,
  midCenturyStyle,
  swissStyle,
  // Modern
  minimalistStyle,
  flatDesignStyle,
  materialDesignStyle,
  neumorphismStyle,
  glassmorphismStyle,
  brutalismStyle,
  // Cultural
  japaneseZenStyle,
  scandinavianStyle,
  moroccanStyle,
  indianStyle,
  chineseStyle,
  // Futuristic
  cyberpunkStyle,
  vaporwaveStyle,
  y2kStyle,
  neofuturismStyle,
  // Nature
  organicStyle,
  oceanStyle,
  forestStyle,
];

export const stylesByEra = {
  classic: allStyles.filter((s) => s.era === 'classic'),
  modern: allStyles.filter((s) => s.era === 'modern'),
  cultural: allStyles.filter((s) => s.era === 'cultural'),
  futuristic: allStyles.filter((s) => s.era === 'futuristic'),
};

export const getStyleById = (id: string): ThemeStyle | undefined => {
  return allStyles.find((s) => s.id === id);
};

export default allStyles;
