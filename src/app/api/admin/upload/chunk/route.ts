/**
 * Admin API: Chunked File Upload
 *
 * Handles large file uploads by accepting chunks and reassembling them.
 * Required for Vercel deployment which has 4.5MB request limit.
 */

import { NextRequest, NextResponse } from 'next/server';
import { uploadChunks } from '../chunkStorage';

/**
 * POST /api/admin/upload/chunk
 *
 * Accepts a single chunk of a file upload
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract metadata
    const uploadId = formData.get('uploadId') as string;
    const chunkIndex = parseInt(formData.get('chunkIndex') as string);
    const totalChunks = parseInt(formData.get('totalChunks') as string);
    const password = formData.get('password') as string;
    const sessionId = formData.get('sessionId') as string;
    const fileName = formData.get('fileName') as string;
    const filePath = formData.get('filePath') as string;
    const chunk = formData.get('chunk') as Blob;

    if (!uploadId || chunkIndex === undefined || !totalChunks || !chunk) {
      return NextResponse.json(
        { success: false, error: 'Missing required chunk metadata' },
        { status: 400 }
      );
    }

    // Initialize upload tracking if this is the first chunk
    if (!uploadChunks.has(uploadId)) {
      uploadChunks.set(uploadId, {
        files: new Map(),
        metadata: {
          totalChunks,
          password,
          sessionId,
          timestamp: Date.now(),
        },
      });
    }

    const uploadData = uploadChunks.get(uploadId)!;

    // Initialize file tracking if this is the first chunk for this file
    if (!uploadData.files.has(filePath)) {
      uploadData.files.set(filePath, {
        name: fileName,
        path: filePath,
        chunks: new Map(),
        totalChunks: 0, // Will be updated as we receive chunks
      });
    }

    const fileData = uploadData.files.get(filePath)!;

    // Store this chunk
    const buffer = Buffer.from(await chunk.arrayBuffer());
    fileData.chunks.set(chunkIndex, buffer);

    // Update total chunks for this file if needed
    fileData.totalChunks = Math.max(fileData.totalChunks, chunkIndex + 1);

    // Count total received chunks across all files
    let receivedChunks = 0;
    for (const file of uploadData.files.values()) {
      receivedChunks += file.chunks.size;
    }

    const isComplete = receivedChunks === totalChunks;

    console.log(`[Chunk Upload] Received chunk ${chunkIndex + 1}/${totalChunks} for ${uploadId}`);

    if (isComplete) {
      console.log(`[Chunk Upload] All chunks received for ${uploadId}, ready for processing`);
    }

    return NextResponse.json({
      success: true,
      uploadId,
      chunkIndex,
      receivedChunks,
      totalChunks,
      isComplete,
    });
  } catch (error) {
    console.error('[Chunk Upload API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
