/**
 * Admin API: Cleanup Expired Test Studies
 *
 * Runs cleanup job to remove expired test studies from registry
 */

import { NextRequest, NextResponse } from 'next/server';
import { testStudyRegistry } from '@/services/testStudyRegistry';

/**
 * POST /api/admin/cleanup
 *
 * Triggers cleanup of expired test studies
 * Can be called manually or via cron
 */
export async function POST(request: NextRequest) {
  try {
    const deletedCount = testStudyRegistry.cleanup();

    return NextResponse.json({
      success: true,
      deletedCount,
      message: `Cleaned up ${deletedCount} expired test studies`,
    });
  } catch (error) {
    console.error('[Admin Cleanup API] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/cleanup
 *
 * Get cleanup stats without running cleanup
 */
export async function GET(request: NextRequest) {
  try {
    const stats = testStudyRegistry.getStats();

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('[Admin Cleanup API] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
