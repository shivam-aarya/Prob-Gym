/**
 * Admin API: Manage Individual Version
 *
 * PUT - Update version metadata (note/tag)
 * DELETE - Delete specific version
 */

import { NextRequest, NextResponse } from 'next/server';
import { testStudyRegistry } from '@/services/testStudyRegistry';

/**
 * PUT /api/admin/test-studies/versions/[experimentName]/[versionId]
 *
 * Update version metadata (note/tag)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ experimentName: string; versionId: string }> }
) {
  try {
    const { experimentName, versionId } = await params;
    const decodedName = decodeURIComponent(experimentName);
    const body = await request.json();

    const { versionNote } = body;

    if (typeof versionNote !== 'string') {
      return NextResponse.json(
        { success: false, error: 'versionNote must be a string' },
        { status: 400 }
      );
    }

    const success = testStudyRegistry.updateVersionMetadata(
      decodedName,
      versionId,
      versionNote
    );

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Version not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      experimentName: decodedName,
      versionId,
      versionNote,
    });
  } catch (error) {
    console.error('[Admin Version Update API] Error:', error);

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
 * DELETE /api/admin/test-studies/versions/[experimentName]/[versionId]
 *
 * Delete a specific version
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ experimentName: string; versionId: string }> }
) {
  try {
    const { experimentName, versionId } = await params;
    const decodedName = decodeURIComponent(experimentName);

    const success = testStudyRegistry.deleteVersion(decodedName, versionId);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Version not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      experimentName: decodedName,
      versionId,
      deleted: true,
    });
  } catch (error) {
    console.error('[Admin Version Delete API] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
