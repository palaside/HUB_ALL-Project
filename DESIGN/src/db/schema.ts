import {
  pgTable,
  serial,
  varchar,
  text,
  jsonb,
  timestamp,
  boolean,
  integer,
  uuid,
  pgEnum,
} from 'drizzle-orm/pg-core';

// ============================================
// Enums
// ============================================
export const tokenTypeEnum = pgEnum('token_type', [
  'color',
  'dimension',
  'fontFamily',
  'fontWeight',
  'duration',
  'cubicBezier',
  'shadow',
  'borderRadius',
]);

export const componentStatusEnum = pgEnum('component_status', [
  'draft',
  'review',
  'published',
  'deprecated',
]);

export const themeEnum = pgEnum('theme', ['light', 'dark', 'system']);

// ============================================
// Design Tokens Table
// ============================================
export const designTokens = pgTable('design_tokens', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  path: varchar('path', { length: 500 }).notNull().unique(), // e.g., "color.primary.500"
  type: tokenTypeEnum('type').notNull(),
  value: text('value').notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }), // color, spacing, typography
  theme: themeEnum('theme').default('light'),
  extensions: jsonb('extensions'), // Additional metadata (Figma IDs, etc.)
  isAlias: boolean('is_alias').default(false),
  aliasPath: varchar('alias_path', { length: 500 }), // Reference path if alias
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================
// Token Groups/Collections Table
// ============================================
export const tokenCollections = pgTable('token_collections', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  version: varchar('version', { length: 50 }).default('1.0.0'),
  isDefault: boolean('is_default').default(false),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================
// Components Registry Table
// ============================================
export const components = pgTable('components', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  displayName: varchar('display_name', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }), // atom, molecule, organism
  status: componentStatusEnum('status').default('draft'),
  version: varchar('version', { length: 50 }).default('1.0.0'),
  propsSchema: jsonb('props_schema'), // JSON Schema for component props
  variants: jsonb('variants'), // Available variants
  defaultProps: jsonb('default_props'),
  accessibility: jsonb('accessibility'), // ARIA requirements
  documentation: text('documentation'),
  examples: jsonb('examples'), // Code examples
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================
// Component Usage Analytics Table
// ============================================
export const componentAnalytics = pgTable('component_analytics', {
  id: serial('id').primaryKey(),
  eventId: uuid('event_id').defaultRandom().notNull(),
  componentName: varchar('component_name', { length: 255 }).notNull(),
  eventType: varchar('event_type', { length: 100 }).notNull(), // render, click, error
  variant: varchar('variant', { length: 100 }),
  size: varchar('size', { length: 50 }),
  pageUrl: text('page_url'),
  sessionId: varchar('session_id', { length: 255 }),
  metadata: jsonb('metadata'), // Additional event data
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// ============================================
// Theme Configurations Table
// ============================================
export const themeConfigs = pgTable('theme_configs', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  mode: themeEnum('mode').default('light'),
  tokens: jsonb('tokens').notNull(), // Overridden tokens for this theme
  isActive: boolean('is_active').default(true),
  priority: integer('priority').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================
// Audit Log Table
// ============================================
export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  entityType: varchar('entity_type', { length: 100 }).notNull(), // token, component, theme
  entityId: integer('entity_id').notNull(),
  action: varchar('action', { length: 50 }).notNull(), // create, update, delete
  changes: jsonb('changes'), // What changed (before/after)
  userId: varchar('user_id', { length: 255 }),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// ============================================
// Type Exports
// ============================================
export type DesignToken = typeof designTokens.$inferSelect;
export type NewDesignToken = typeof designTokens.$inferInsert;
export type Component = typeof components.$inferSelect;
export type NewComponent = typeof components.$inferInsert;
export type ComponentAnalytic = typeof componentAnalytics.$inferSelect;
export type NewComponentAnalytic = typeof componentAnalytics.$inferInsert;
export type ThemeConfig = typeof themeConfigs.$inferSelect;
export type NewThemeConfig = typeof themeConfigs.$inferInsert;
