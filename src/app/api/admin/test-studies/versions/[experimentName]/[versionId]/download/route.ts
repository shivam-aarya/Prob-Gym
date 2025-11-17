/**
 * Admin API: Download Original Files
 *
 * Downloads the original uploaded files for a specific version as a ZIP.
 */

import { NextRequest, NextResponse } from 'next/server';
import { testStudyRegistry } from '@/services/testStudyRegistry';
import JSZip from 'jszip';

/**
 * GET /api/admin/test-studies/versions/[experimentName]/[versionId]/download
 *
 * Returns a ZIP file containing all original uploaded files for this version
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ experimentName: string; versionId: string }> }
) {
  try {
    const { experimentName, versionId } = await params;
    const decodedName = decodeURIComponent(experimentName);

    // Get original files for this version
    const originalFiles = testStudyRegistry.getOriginalFiles(decodedName, versionId);

    if (!originalFiles || originalFiles.size === 0) {
      return NextResponse.json(
        { success: false, error: 'Original files not found for this version' },
        { status: 404 }
      );
    }

    // Create ZIP archive
    const zip = new JSZip();

    // Add all files to the ZIP
    for (const [fileName, fileData] of originalFiles.entries()) {
      // Convert base64 back to binary
      const buffer = Buffer.from(fileData.data, 'base64');
      zip.file(fileName, buffer);
    }

    // Generate ZIP file
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    // Create safe filename
    const safeExperimentName = decodedName.replace(/[^a-z0-9_-]/gi, '_');
    const filename = `${safeExperimentName}_v${versionId.slice(0, 8)}.zip`;

    // Return ZIP as download
    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('[Admin Download API] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
