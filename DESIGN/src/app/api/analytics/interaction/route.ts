import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { componentAnalytics } from '@/db/schema';
import { z } from 'zod';

// ============================================
// Validation Schema
// ============================================
const interactionSchema = z.object({
  type: z.string(),
  componentName: z.string().optional(),
  variant: z.string().optional(),
  size: z.string().optional(),
  hasIcon: z.boolean().optional(),
  timestamp: z.number().optional(),
  pageUrl: z.string().optional(),
  sessionId: z.string().optional(),
});

// ============================================
// POST: Track Component Interaction
// ============================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = interactionSchema.parse(body);

    // Insert analytics record
    await db.insert(componentAnalytics).values({
      componentName: validated.componentName || 'unknown',
      eventType: validated.type,
      variant: validated.variant,
      size: validated.size,
      pageUrl: validated.pageUrl || request.headers.get('referer') || undefined,
      sessionId: validated.sessionId,
      metadata: {
        hasIcon: validated.hasIcon,
        timestamp: validated.timestamp,
        userAgent: request.headers.get('user-agent'),
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request body', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Analytics tracking error:', error);
    
    // Don't fail the request for analytics errors
    return NextResponse.json({ success: true }, { status: 200 });
  }
}

// ============================================
// GET: Retrieve Analytics Summary
// ============================================
export async function GET() {
  try {
    const analytics = await db.select().from(componentAnalytics).limit(100);

    // Group by component name
    const summary = analytics.reduce(
      (acc, record) => {
        const name = record.componentName;
        if (!acc[name]) {
          acc[name] = { count: 0, variants: {} };
        }
        acc[name].count++;
        if (record.variant) {
          acc[name].variants[record.variant] = (acc[name].variants[record.variant] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, { count: number; variants: Record<string, number> }>
    );

    return NextResponse.json({
      success: true,
      data: {
        total: analytics.length,
        byComponent: summary,
        recent: analytics.slice(0, 10),
      },
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
