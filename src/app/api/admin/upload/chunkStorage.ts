/**
 * Shared storage for chunked uploads
 * Used by both chunk and complete endpoints
 */

/**
 * Temporary storage for uploaded chunks
 * Maps uploadId -> { files: Map<filePath, FileChunks>, metadata: {...} }
 */
export interface FileChunks {
  name: string;
  path: string;
  chunks: Map<number, Buffer>;
  totalChunks: number;
}

export interface ChunkData {
  files: Map<string, FileChunks>;
  metadata: {
    totalChunks: number;
    password: string;
    sessionId: string;
    timestamp: number;
  };
}

// Global map for chunk storage
declare global {
  // eslint-disable-next-line no-var
  var uploadChunks: Map<string, ChunkData> | undefined;
}

export const uploadChunks = global.uploadChunks ?? new Map<string, ChunkData>();
global.uploadChunks = uploadChunks;

// Clean up old uploads (older than 30 minutes)
setInterval(() => {
  const now = Date.now();
  const THIRTY_MINUTES = 30 * 60 * 1000;
  for (const [uploadId, data] of uploadChunks.entries()) {
    if (now - data.metadata.timestamp > THIRTY_MINUTES) {
      uploadChunks.delete(uploadId);
      console.log(`[Chunk Storage] Cleaned up expired upload: ${uploadId}`);
    }
  }
}, 5 * 60 * 1000); // Run every 5 minutes
