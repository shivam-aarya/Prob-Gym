/**
 * Admin API: Serve Test Study Assets
 *
 * Serves assets (images, videos) for test studies from in-memory storage
 */

import { NextRequest, NextResponse } from 'next/server';
import { testStudyRegistry } from '@/services/testStudyRegistry';

interface RouteParams {
  params: Promise<{
    slug: string;
    path: string[];
  }>;
}

/**
 * GET /api/admin/assets/[slug]/[...path]
 *
 * Serves an asset file from the test study registry
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug, path } = await params;
    const assetPath = `assets/${path.join('/')}`;

    // Get asset from registry
    const asset = testStudyRegistry.getAsset(slug, assetPath);

    if (!asset) {
      return NextResponse.json(
        { error: 'Asset not found' },
        { status: 404 }
      );
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(asset.data, 'base64');

    // Return the asset with appropriate content type
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': asset.mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('[Admin Asset API] Error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
