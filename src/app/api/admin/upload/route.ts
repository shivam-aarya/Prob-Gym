/**
 * Admin API: Upload and Convert CogGym Experiment
 *
 * Handles file uploads from admin preview page, runs conversion,
 * and stores the result in the test study registry.
 */

import { NextRequest, NextResponse } from 'next/server';
import { testStudyRegistry, TestStudy, OriginalFile } from '@/services/testStudyRegistry';
import {
  convertUploadedStudy,
  type UploadedFile,
} from '@/lib/conversion/converter';

/**
 * Temporary storage for pending uploads awaiting user confirmation
 * Maps tempId -> { study, originalFiles }
 */
interface PendingUpload {
  study: TestStudy;
  originalFiles: Map<string, OriginalFile>;
  experimentName: string;
  timestamp: number;
}

// Global map for pending uploads
declare global {
  // eslint-disable-next-line no-var
  var pendingUploads: Map<string, PendingUpload> | undefined;
}

const pendingUploads = global.pendingUploads ?? new Map<string, PendingUpload>();
global.pendingUploads = pendingUploads;

// Export for use in confirm endpoint
export { pendingUploads };
export type { PendingUpload };

// Clean up old pending uploads (older than 10 minutes)
setInterval(() => {
  const now = Date.now();
  const TEN_MINUTES = 10 * 60 * 1000;
  for (const [tempId, pending] of pendingUploads.entries()) {
    if (now - pending.timestamp > TEN_MINUTES) {
      pendingUploads.delete(tempId);
      console.log(`[Admin Upload] Cleaned up expired pending upload: ${tempId}`);
    }
  }
}, 60 * 1000); // Run every minute

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
 * POST /api/admin/upload
 *
 * Expects:
 * - FormData with files from uploaded folder
 * - password field for authentication
 * - sessionId field for tracking
 */
export async function POST(request: NextRequest) {
  try {
    // Parse FormData
    const formData = await request.formData();

    // Validate password
    const password = formData.get('password') as string;
    if (!validatePassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Get session ID
    const sessionId = formData.get('sessionId') as string;
    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Missing sessionId' },
        { status: 400 }
      );
    }

    // Extract uploaded files
    const files: UploadedFile[] = [];
    const originalFiles: Map<string, OriginalFile> = new Map();
    let totalSize = 0;
    // Configurable upload limit (default 200MB for experiments with audio/video)
    const MAX_TOTAL_SIZE = (process.env.MAX_UPLOAD_SIZE_MB
      ? parseInt(process.env.MAX_UPLOAD_SIZE_MB)
      : 200) * 1024 * 1024;

    for (const [key, value] of formData.entries()) {
      if (key === 'password' || key === 'sessionId') continue;

      if (value instanceof File) {
        const file = value as File;

        // Skip hidden files and system files (like .DS_Store on macOS)
        // Extract just the filename from the path
        const fileName = file.name;
        const basename = fileName.split('/').pop() || fileName;

        if (basename.startsWith('.') || basename === 'Thumbs.db' || basename === 'desktop.ini') {
          continue; // Skip this file
        }

        // Validate file type
        const allowedExtensions = [
          // Data files
          '.json',
          '.jsonl',
          // Images
          '.png',
          '.jpg',
          '.jpeg',
          '.gif',
          '.svg',
          '.webp',
          // Videos
          '.mp4',
          '.webm',
          '.mov',
          '.avi',
          // Audio
          '.wav',
          '.mp3',
          '.ogg',
          '.m4a',
          '.aac',
          // Documentation
          '.md',
          '.txt',
          '.csv',
        ];

        const ext = '.' + file.name.split('.').pop()?.toLowerCase();
        if (!allowedExtensions.includes(ext)) {
          return NextResponse.json(
            {
              success: false,
              error: `Invalid file type: ${file.name}. Allowed: ${allowedExtensions.join(', ')}`,
            },
            { status: 400 }
          );
        }

        // Check total size
        totalSize += file.size;
        if (totalSize > MAX_TOTAL_SIZE) {
          return NextResponse.json(
            {
              success: false,
              error: `Total upload size exceeds ${MAX_TOTAL_SIZE / 1024 / 1024}MB limit`,
            },
            { status: 413 }
          );
        }

        // Read file content
        let content: string | ArrayBuffer;
        if (ext === '.json' || ext === '.jsonl' || ext === '.txt' || ext === '.md' || ext === '.csv') {
          // Text files
          content = await file.text();
        } else {
          // Binary files (images/videos)
          content = await file.arrayBuffer();
        }

        // Store for conversion
        files.push({
          name: file.name,
          content,
          path: key, // FormData key contains the relative path
        });

        // Store original file for download feature
        const base64Data = content instanceof ArrayBuffer
          ? Buffer.from(content).toString('base64')
          : Buffer.from(content).toString('base64');

        originalFiles.set(file.name, {
          name: file.name,
          data: base64Data,
          type: file.type || 'application/octet-stream',
          size: file.size,
        });
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files uploaded' },
        { status: 400 }
      );
    }

    // Run conversion
    const result = await convertUploadedStudy(files);

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
      sessionId,
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
    console.error('[Admin Upload API] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
