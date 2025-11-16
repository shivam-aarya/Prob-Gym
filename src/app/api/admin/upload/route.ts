/**
 * Admin API: Upload and Convert CogGym Experiment
 *
 * Handles file uploads from admin preview page, runs conversion,
 * and stores the result in the test study registry.
 */

import { NextRequest, NextResponse } from 'next/server';
import { testStudyRegistry, TestStudy } from '@/services/testStudyRegistry';
import {
  convertUploadedStudy,
  type UploadedFile,
} from '@/lib/conversion/converter';

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
    let totalSize = 0;
    const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50MB limit

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
        if (ext === '.json' || ext === '.jsonl') {
          // Text files
          content = await file.text();
        } else {
          // Binary files (images/videos)
          content = await file.arrayBuffer();
        }

        files.push({
          name: file.name,
          content,
          path: key, // FormData key contains the relative path
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

    testStudyRegistry.addStudy(testStudy);

    return NextResponse.json({
      success: true,
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
