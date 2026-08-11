/**
 * Motion & Animation System - 360° Global Motion Languages
 * From classical animation principles to modern UI micro-interactions and futuristic effects.
 */

export interface MotionLanguage {
  id: string;
  name: string;
  nameLocal?: string;
  category: 'classical' | 'modern' | 'futuristic' | 'cultural' | 'ux' | 'experimental';
  era: string;
  origin: string;
  description: string;
  characteristics: string[];
  easing?: string;
  duration?: string;
  cssClass?: string;
  cssTemplate: string;
}

export const allMotions: MotionLanguage[] = [
  // ============================================
  // CLASSICAL ANIMATION PRINCIPLES
  // ============================================
  {
    id: 'disney-twelve',
    name: 'Disney 12 Principles',
    category: 'classical',
    era: '1981',
    origin: 'Disney Animation Studios',
    description: 'The foundational laws of character animation: squash & stretch, anticipation, staging, follow-through, overlapping action, slow in/out, arcs, secondary action, timing, exaggeration, solid drawing, and appeal.',
    characteristics: ['Squash & stretch', 'Anticipation', 'Follow-through', 'Overlapping action', 'Arcs'],
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    duration: '300ms - 800ms',
    cssClass: 'motion-disney',
    cssTemplate: `/* Disney-style bounce */
@keyframes bounceArc {
  0%, 100% { transform: translateY(0) scale(1, 1); }
  40% { transform: translateY(-40px) scale(0.95, 1.05); }
  60% { transform: translateY(0) scale(1.05, 0.95); }
}
.bounce-arc {
  animation: bounceArc 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}`,
  },
  {
    id: 'stop-motion',
    name: 'Stop Motion / Frame-by-Frame',
    category: 'classical',
    era: '1898 - Present',
    origin: 'Global Film',
    description: 'Physical objects are moved in small increments and photographed frame by frame, producing a tactile, jerky-yet-charming motion language.',
    characteristics: ['Tactile texture', 'Low frame rate feel', 'Handmade charm', 'Visible imperfections'],
    duration: '80ms - 150ms per frame',
    cssClass: 'motion-stop-motion',
    cssTemplate: `/* Stop-motion feel */
@keyframes stepShake {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(2px, -2px) rotate(-1deg); }
  50% { transform: translate(-2px, 2px) rotate(1deg); }
  75% { transform: translate(1px, 1px) rotate(0deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}
.stop-motion {
  animation: stepShake 400ms steps(4);
}`,
  },
  {
    id: 'rotoscope',
    name: 'Rotoscope / Traced Reality',
    category: 'classical',
    era: '1917 - Present',
    origin: 'Max Fleischer / Film',
    description: 'Animators trace over live-action footage to achieve realistic human movement and weight.',
    characteristics: ['Realistic weight', 'Fluid human movement', 'Subtle imperfections', 'Natural timing'],
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    duration: '500ms - 1200ms',
    cssClass: 'motion-rotoscope',
    cssTemplate: `/* Rotoscope-style walk */
@keyframes naturalWalk {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(20px); }
}
.natural-walk {
  animation: naturalWalk 1s ease-in-out infinite;
}`,
  },

  // ============================================
  // MODERN UI MOTION
  // ============================================
  {
    id: 'material-motion',
    name: 'Material Motion',
    category: 'modern',
    era: '2014+',
    origin: 'Google Material Design',
    description: 'Motion that feels physical and responsive, with containers transforming, shared axis transitions, and fade-through effects.',
    characteristics: ['Container transform', 'Shared axis', 'Fade through', 'Physical response'],
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    duration: '200ms - 300ms',
    cssClass: 'motion-material',
    cssTemplate: `/* Material container transform */
@keyframes materialRipple {
  0% { transform: scale(0); opacity: 0.4; }
  100% { transform: scale(4); opacity: 0; }
}
.material-ripple {
  position: relative;
  overflow: hidden;
}
.material-ripple::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  animation: materialRipple 600ms linear;
}`,
  },
  {
    id: 'ios-spring',
    name: 'iOS Spring Physics',
    category: 'modern',
    era: '2013+',
    origin: 'Apple iOS',
    description: 'Spring-based animations with natural bounce and settling, giving interfaces a tactile, physical feel.',
    characteristics: ['Spring bounce', 'Natural settling', 'Velocity-aware', 'Tactile feedback'],
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    duration: '300ms - 500ms',
    cssClass: 'motion-ios-spring',
    cssTemplate: `/* iOS spring pop */
@keyframes springPop {
  0% { transform: scale(0.8); }
  40% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
.spring-pop {
  animation: springPop 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}`,
  },
  {
    id: 'fluent-motion',
    name: 'Microsoft Fluent Motion',
    category: 'modern',
    era: '2017+',
    origin: 'Microsoft Fluent Design',
    description: 'Smooth, purposeful motion with directional awareness, gentle fades, and scale transitions.',
    characteristics: ['Directional awareness', 'Smooth fades', 'Scale transitions', 'Purposeful'],
    easing: 'cubic-bezier(0.08, 0.52, 0.52, 1)',
    duration: '150ms - 300ms',
    cssClass: 'motion-fluent',
    cssTemplate: `/* Fluent fade up */
@keyframes fluentFadeUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.fluent-fade-up {
  animation: fluentFadeUp 300ms cubic-bezier(0.08, 0.52, 0.52, 1);
}`,
  },
  {
    id: 'micro-interactions',
    name: 'Micro-Interactions',
    category: 'modern',
    era: '2010s+',
    origin: 'Product Design / UX',
    description: 'Tiny, feedback-driven animations for buttons, toggles, loading states, and hover effects that delight without distracting.',
    characteristics: ['Tiny scale', 'Instant feedback', 'Context-aware', 'Delightful'],
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    duration: '100ms - 250ms',
    cssClass: 'motion-micro',
    cssTemplate: `/* Button micro-interaction */
.micro-btn {
  transition: transform 150ms ease, box-shadow 150ms ease;
}
.micro-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.micro-btn:active {
  transform: translateY(0) scale(0.98);
}`,
  },

  // ============================================
  // CULTURAL MOTION LANGUAGES
  // ============================================
  {
    id: 'japanese-anime',
    name: 'Japanese Anime / Sakuga',
    nameLocal: 'アニメ作画',
    category: 'cultural',
    era: '1960s - Present',
    origin: 'Japan',
    description: 'Expressive animation with smear frames, dramatic impact frames, speed lines, and emotional exaggeration.',
    characteristics: ['Smear frames', 'Impact frames', 'Speed lines', 'Dramatic exaggeration'],
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    duration: '100ms - 400ms',
    cssClass: 'motion-anime',
    cssTemplate: `/* Anime impact */
@keyframes animeImpact {
  0% { transform: scale(1); filter: brightness(1); }
  10% { transform: scale(1.3); filter: brightness(2); }
  30% { transform: scale(0.95); filter: brightness(1); }
  100% { transform: scale(1); }
}
.anime-impact {
  animation: animeImpact 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}`,
  },
  {
    id: 'chinese-ink',
    name: 'Chinese Ink Wash Motion',
    nameLocal: '水墨动画',
    category: 'cultural',
    era: '1960s - Present',
    origin: 'China',
    description: 'Fluid, diffusing motion inspired by ink spreading in water. Ethereal and poetic transitions.',
    characteristics: ['Ink diffusion', 'Fluid edges', 'Poetic pacing', 'Breathing opacity'],
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    duration: '800ms - 2000ms',
    cssClass: 'motion-ink',
    cssTemplate: `/* Ink wash reveal */
@keyframes inkReveal {
  0% { clip-path: circle(0% at 50% 50%); opacity: 0; filter: blur(20px); }
  100% { clip-path: circle(150% at 50% 50%); opacity: 1; filter: blur(0); }
}
.ink-reveal {
  animation: inkReveal 1.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}`,
  },
  {
    id: 'indian-classical',
    name: 'Indian Classical Dance Motion',
    nameLocal: 'भरतनाट्यम्',
    category: 'cultural',
    era: 'Ancient - Present',
    origin: 'India',
    description: 'Rhythmic, gesture-based motion with mudras, eye movements, and precise angular poses synchronized to beats.',
    characteristics: ['Rhythmic poses', 'Hand mudras', 'Precise angles', 'Beat-synchronized'],
    easing: 'steps(8, end)',
    duration: '400ms - 800ms',
    cssClass: 'motion-mudra',
    cssTemplate: `/* Dance mudra steps */
@keyframes mudraPose {
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-15deg) scale(1.05); }
  50% { transform: rotate(0deg) scale(1); }
  75% { transform: rotate(15deg) scale(1.05); }
  100% { transform: rotate(0deg) scale(1); }
}
.mudra-motion {
  animation: mudraPose 800ms steps(8) infinite;
}`,
  },

  // ============================================
  // FUTURISTIC & EXPERIMENTAL MOTION
  // ============================================
  {
    id: 'glitch-motion',
    name: 'Glitch / Datamoshing',
    category: 'futuristic',
    era: '2010s+',
    origin: 'Internet / Cyberpunk',
    description: 'Intentional digital corruption, RGB split, scan lines, and jitter that signals technology, dystopia, or retro-futurism.',
    characteristics: ['RGB split', 'Scan lines', 'Jitter', 'Digital corruption'],
    duration: '100ms - 300ms',
    cssClass: 'motion-glitch',
    cssTemplate: `/* Glitch effect */
@keyframes glitch {
  0% { transform: translate(0); filter: hue-rotate(0deg); }
  20% { transform: translate(-3px, 3px); filter: hue-rotate(90deg); }
  40% { transform: translate(3px, -3px); filter: hue-rotate(180deg); }
  60% { transform: translate(-3px, -3px); filter: hue-rotate(270deg); }
  80% { transform: translate(3px, 3px); filter: hue-rotate(180deg); }
  100% { transform: translate(0); filter: hue-rotate(0deg); }
}
.glitch:hover {
  animation: glitch 250ms infinite;
}`,
  },
  {
    id: 'liquid-morph',
    name: 'Liquid Morphing',
    category: 'experimental',
    era: '2018+',
    origin: 'Motion Design',
    description: 'Organic shape-shifting between states using blob paths, border-radius morphing, and fluid transitions.',
    characteristics: ['Organic shapes', 'Seamless transitions', 'Blob paths', 'Smooth morphs'],
    easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    duration: '600ms - 1200ms',
    cssClass: 'motion-liquid',
    cssTemplate: `/* Liquid morphing blob */
@keyframes liquidMorph {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
}
.liquid-morph {
  animation: liquidMorph 4s ease-in-out infinite;
}`,
  },
  {
    id: 'parallax-depth',
    name: 'Parallax & Depth Motion',
    category: 'experimental',
    era: '2010s+',
    origin: 'Web Design / Games',
    description: 'Layers moving at different speeds to create depth, immersion, and spatial hierarchy.',
    characteristics: ['Layered depth', 'Scroll-driven', 'Z-axis motion', 'Immersive'],
    duration: 'Continuous on scroll',
    cssClass: 'motion-parallax',
    cssTemplate: `/* Parallax layers */
.parallax-layer-1 { transform: translateZ(-100px) scale(2); }
.parallax-layer-2 { transform: translateZ(-50px) scale(1.5); }
.parallax-layer-3 { transform: translateZ(0); }

.parallax-container {
  perspective: 1px;
  transform-style: preserve-3d;
  overflow-x: hidden;
}`,
  },
  {
    id: 'cyberpunk-hud',
    name: 'Cyberpunk HUD Motion',
    category: 'futuristic',
    era: '1980s - Present',
    origin: 'Sci-Fi Cinema / Games',
    description: 'Holographic UI with scanning lines, flickering text, radial progress, and terminal-style reveals.',
    characteristics: ['Scanning lines', 'Flicker text', 'Radial progress', 'Terminal reveals'],
    duration: '200ms - 1000ms',
    cssClass: 'motion-hud',
    cssTemplate: `/* HUD scan line */
@keyframes hudScan {
  0% { transform: translateY(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
}
.hud-scan::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, cyan, transparent);
  animation: hudScan 2s linear infinite;
}`,
  },

  // ============================================
  // UX & PRODUCT MOTION PATTERNS
  // ============================================
  {
    id: 'skeleton-shimmer',
    name: 'Skeleton & Shimmer Loading',
    category: 'ux',
    era: '2010s+',
    origin: 'Facebook / Product Design',
    description: 'Placeholder motion that indicates content is loading while maintaining perceived performance.',
    characteristics: ['Placeholder shapes', 'Shimmer sweep', 'Pulse opacity', 'Content preview'],
    duration: '1200ms - 2000ms',
    cssClass: 'motion-skeleton',
    cssTemplate: `/* Skeleton shimmer */
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
.skeleton-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
  transform: translateX(-100%);
  animation: shimmer 1.5s infinite;
}`,
  },
  {
    id: 'staggered-list',
    name: 'Staggered List Reveal',
    category: 'ux',
    era: '2010s+',
    origin: 'UI Animation',
    description: 'Sequential appearance of list items with calculated delays, creating elegant content reveals.',
    characteristics: ['Sequential delays', 'Cascading entrance', 'Calculated timing', 'Polished reveals'],
    duration: '50ms - 100ms per item',
    cssClass: 'motion-stagger',
    cssTemplate: `/* Staggered children */
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.stagger-list > * {
  opacity: 0;
  animation: fadeInUp 400ms ease forwards;
}
.stagger-list > *:nth-child(1) { animation-delay: 0ms; }
.stagger-list > *:nth-child(2) { animation-delay: 80ms; }
.stagger-list > *:nth-child(3) { animation-delay: 160ms; }
.stagger-list > *:nth-child(4) { animation-delay: 240ms; }`,
  },
  {
    id: 'page-transitions',
    name: 'Page Transitions / Shared Element',
    category: 'ux',
    era: '2018+',
    origin: 'Mobile & Web Apps',
    description: 'Seamless transitions between screens where elements morph and move to their new positions.',
    characteristics: ['Seamless routing', 'Shared elements', 'Context preservation', 'Fluid navigation'],
    duration: '300ms - 500ms',
    cssClass: 'motion-page-transition',
    cssTemplate: `/* Page slide transition */
@keyframes pageSlideIn {
  0% { opacity: 0; transform: translateX(30px); }
  100% { opacity: 1; transform: translateX(0); }
}
.page-enter {
  animation: pageSlideIn 400ms cubic-bezier(0.4, 0, 0.2, 1);
}`,
  },
  {
    id: 'gesture-driven',
    name: 'Gesture-Driven Motion',
    category: 'ux',
    era: '2007+',
    origin: 'Touch Interfaces',
    description: 'Motion directly tied to user input position, velocity, and direction. Common in swipe, drag, and pull-to-refresh.',
    characteristics: ['Direct manipulation', 'Velocity-aware', 'Predictable release', 'Spring back'],
    duration: 'Follows gesture',
    cssClass: 'motion-gesture',
    cssTemplate: `/* Swipeable card */
.swipe-card {
  transition: transform 0.1s linear;
  user-select: none;
}
.swipe-card.released {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}`,
  },
];

export const getMotionById = (id: string): MotionLanguage | undefined => {
  return allMotions.find((m) => m.id === id);
};

export const motionsByCategory = {
  classical: allMotions.filter((m) => m.category === 'classical'),
  modern: allMotions.filter((m) => m.category === 'modern'),
  cultural: allMotions.filter((m) => m.category === 'cultural'),
  futuristic: allMotions.filter((m) => m.category === 'futuristic'),
  ux: allMotions.filter((m) => m.category === 'ux'),
  experimental: allMotions.filter((m) => m.category === 'experimental'),
};
