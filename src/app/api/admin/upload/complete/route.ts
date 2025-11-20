/**
 * Admin API: Complete Chunked Upload
 *
 * Called after all chunks are uploaded to reassemble and process the files.
 */

import { NextRequest, NextResponse } from 'next/server';
import { uploadChunks } from '../chunkStorage';
import { testStudyRegistry, TestStudy, OriginalFile } from '@/services/testStudyRegistry';
import { convertUploadedStudy, type UploadedFile } from '@/lib/conversion/converter';
import { pendingUploads } from '../route';

/**
 * Validate admin password
 */
function validatePassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.warn('[Admin API] ADMIN_PASSWORD not set in environment variables');
    return false;
  }

  return password === adminPassword;
}

/**
 * POST /api/admin/upload/complete
 *
 * Reassembles chunks and processes the upload
 */
export async function POST(request: NextRequest) {
  try {
    const { uploadId } = await request.json();

    if (!uploadId) {
      return NextResponse.json(
        { success: false, error: 'Missing uploadId' },
        { status: 400 }
      );
    }

    // Retrieve chunks
    const uploadData = uploadChunks.get(uploadId);
    if (!uploadData) {
      return NextResponse.json(
        { success: false, error: 'Upload not found or expired' },
        { status: 404 }
      );
    }

    // Validate password
    if (!validatePassword(uploadData.metadata.password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }

    const { files, metadata } = uploadData;

    // Count total received chunks
    let receivedChunks = 0;
    for (const file of files.values()) {
      receivedChunks += file.chunks.size;
    }

    // Verify all chunks received
    if (receivedChunks !== metadata.totalChunks) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing chunks: received ${receivedChunks}/${metadata.totalChunks}`,
        },
        { status: 400 }
      );
    }

    console.log(`[Complete Upload] Processing ${files.size} files (${receivedChunks} chunks) for upload ${uploadId}`);

    // Reassemble files
    const uploadedFiles: UploadedFile[] = [];
    const originalFiles: Map<string, OriginalFile> = new Map();
    let totalSize = 0;
    const MAX_TOTAL_SIZE = (process.env.MAX_UPLOAD_SIZE_MB
      ? parseInt(process.env.MAX_UPLOAD_SIZE_MB)
      : 200) * 1024 * 1024;

    for (const [, fileData] of files) {
      // Sort chunks by index and concatenate
      const sortedChunks = Array.from(fileData.chunks.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([, buffer]) => buffer);

      // Verify we have all chunks for this file
      if (sortedChunks.length !== fileData.totalChunks) {
        uploadChunks.delete(uploadId);
        return NextResponse.json(
          {
            success: false,
            error: `Missing chunks for file ${fileData.name}: received ${sortedChunks.length}/${fileData.totalChunks}`,
          },
          { status: 400 }
        );
      }

      const completeBuffer = Buffer.concat(sortedChunks);
      totalSize += completeBuffer.length;

      if (totalSize > MAX_TOTAL_SIZE) {
        uploadChunks.delete(uploadId);
        return NextResponse.json(
          {
            success: false,
            error: `Total upload size exceeds ${MAX_TOTAL_SIZE / 1024 / 1024}MB limit`,
          },
          { status: 413 }
        );
      }

      // Determine if file is text or binary based on extension
      const ext = '.' + fileData.name.split('.').pop()?.toLowerCase();
      const textExtensions = ['.json', '.jsonl', '.txt', '.md', '.csv'];

      let content: string | ArrayBuffer;
      if (textExtensions.includes(ext)) {
        content = completeBuffer.toString('utf-8');
      } else {
        content = completeBuffer.buffer.slice(
          completeBuffer.byteOffset,
          completeBuffer.byteOffset + completeBuffer.byteLength
        );
      }

      uploadedFiles.push({
        name: fileData.name,
        content,
        path: fileData.path,
      });

      // Store original file
      originalFiles.set(fileData.name, {
        name: fileData.name,
        data: completeBuffer.toString('base64'),
        type: getMimeType(ext),
        size: completeBuffer.length,
      });

      console.log(`[Complete Upload] Reassembled file: ${fileData.name} (${completeBuffer.length} bytes)`);
    }

    // Clean up chunks from memory
    uploadChunks.delete(uploadId);

    console.log(`[Complete Upload] Processing ${uploadedFiles.length} files`);

    // Run conversion
    const result = await convertUploadedStudy(uploadedFiles);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Conversion failed',
          logs: result.logs,
        },
        { status: 400 }
      );
    }

    // Create unique ID for this test study
    const testStudyId = crypto.randomUUID();

    // Store in test registry
    const testStudy: TestStudy = {
      id: testStudyId,
      slug: result.studySlug,
      sessionId: metadata.sessionId,
      metadata: result.metadata!,
      scenarios: result.scenarios!,
      assets: result.assets!,
      createdAt: new Date(),
      lastAccessedAt: new Date(),
      conversionLogs: [
        ...result.logs.info,
        ...result.logs.warnings.map(w => `⚠️  ${w}`),
      ],
    };

    // Extract experiment name from metadata for duplicate detection
    const experimentName = result.metadata!.title || result.metadata!.slug;

    // Check for duplicates
    const existingGroup = testStudyRegistry.detectDuplicate(experimentName);

    if (existingGroup) {
      // Duplicate detected - store in pending uploads
      const tempId = crypto.randomUUID();

      pendingUploads.set(tempId, {
        study: testStudy,
        originalFiles,
        experimentName,
        timestamp: Date.now(),
      });

      // Get the latest version info
      const latestVersion = existingGroup.versions.find(
        v => v.id === existingGroup.latestVersionId
      );

      return NextResponse.json({
        success: true,
        isDuplicate: true,
        tempId,
        experimentName,
        existingStudy: {
          experimentName: existingGroup.experimentName,
          versionCount: existingGroup.versions.length,
          latestVersion: latestVersion ? {
            versionNumber: latestVersion.versionNumber,
            slug: latestVersion.slug,
            uploadedAt: latestVersion.createdAt,
            note: latestVersion.versionNote,
          } : null,
        },
        newStudy: {
          studySlug: result.studySlug,
          scenarioCount: result.scenarios!.length,
        },
        logs: result.logs,
      });
    }

    // No duplicate - add directly to registry
    testStudyRegistry.addVersion(experimentName, testStudy, undefined, originalFiles);

    return NextResponse.json({
      success: true,
      isDuplicate: false,
      studyId: testStudyId,
      studySlug: result.studySlug,
      scenarioCount: result.scenarios!.length,
      logs: result.logs,
      previewUrl: `/studies/${result.studySlug}/consent`,
    });
  } catch (error) {
    console.error('[Complete Upload API] Error:', error);

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
 * Get MIME type from file extension
 */
function getMimeType(ext: string): string {
  const mimeTypes: Record<string, string> = {
    '.json': 'application/json',
    '.jsonl': 'application/jsonl',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.ogg': 'audio/ogg',
    '.m4a': 'audio/mp4',
    '.aac': 'audio/aac',
    '.md': 'text/markdown',
    '.txt': 'text/plain',
    '.csv': 'text/csv',
  };

  return mimeTypes[ext] || 'application/octet-stream';
}
