import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { designTokens, tokenCollections } from '@/db/schema';
import { tokens, generateCssFromTokens } from '@/lib/tokens';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

// ============================================
// GET: Retrieve All Tokens
// ============================================
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'json';
  const category = searchParams.get('category');

  try {
    // Return static tokens from file system
    if (format === 'css') {
      const css = generateCssFromTokens();
      return new NextResponse(css, {
        headers: {
          'Content-Type': 'text/css',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // Filter by category if provided
    let tokenData = tokens;
    if (category && category in tokens) {
      tokenData = { [category]: tokens[category as keyof typeof tokens] } as typeof tokens;
    }

    return NextResponse.json({
      success: true,
      data: tokenData,
      meta: {
        version: '1.0.0',
        generatedAt: new Date().toISOString(),
        categories: Object.keys(tokens),
      },
    });
  } catch (error) {
    console.error('Token fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: 500 }
    );
  }
}

// ============================================
// POST: Create/Update Token in Database
// ============================================
const tokenSchema = z.object({
  name: z.string().min(1),
  path: z.string().min(1),
  type: z.enum(['color', 'dimension', 'fontFamily', 'fontWeight', 'duration', 'cubicBezier']),
  value: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  theme: z.enum(['light', 'dark', 'system']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = tokenSchema.parse(body);

    // Check if token exists
    const existing = await db
      .select()
      .from(designTokens)
      .where(eq(designTokens.path, validated.path))
      .limit(1);

    if (existing.length > 0) {
      // Update existing token
      await db
        .update(designTokens)
        .set({
          ...validated,
          updatedAt: new Date(),
        })
        .where(eq(designTokens.path, validated.path));

      return NextResponse.json({
        success: true,
        message: 'Token updated',
        data: { ...existing[0], ...validated },
      });
    }

    // Create new token
    const [newToken] = await db
      .insert(designTokens)
      .values(validated)
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: 'Token created',
        data: newToken,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid token data', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Token creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create token' },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE: Remove Token from Database
// ============================================
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');

  if (!path) {
    return NextResponse.json(
      { error: 'Token path is required' },
      { status: 400 }
    );
  }

  try {
    const deleted = await db
      .delete(designTokens)
      .where(eq(designTokens.path, path))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        { error: 'Token not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Token deleted',
      data: deleted[0],
    });
  } catch (error) {
    console.error('Token deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete token' },
      { status: 500 }
    );
  }
}
