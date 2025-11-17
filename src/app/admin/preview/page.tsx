'use client';

/**
 * Admin Preview Page
 *
 * Allows RAs to upload CogGym experiment folders, convert them, and preview studies
 * without affecting the main database or study registry.
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { VersionConfirmationModal } from '@/components/admin/VersionConfirmationModal';
import { VersionAccordion } from '@/components/admin/VersionAccordion';

interface Version {
  id: string;
  slug: string;
  versionNumber: number;
  versionNote?: string;
  scenarioCount: number;
  createdAt: Date;
  lastAccessedAt: Date;
  sessionId: string;
  hasOriginalFiles: boolean;
}

interface VersionGroup {
  experimentName: string;
  latestVersionId: string;
  versionCount: number;
  versions: Version[];
  createdAt: Date;
  lastAccessedAt: Date;
}

interface ConversionLogs {
  info: string[];
  warnings: string[];
  errors: string[];
}

interface DuplicateInfo {
  tempId: string;
  experimentName: string;
  existingStudy: {
    experimentName: string;
    versionCount: number;
    latestVersion: {
      versionNumber: number;
      slug: string;
      uploadedAt: Date;
      note?: string;
    } | null;
  };
  newStudy: {
    studySlug: string;
    scenarioCount: number;
  };
}

export default function AdminPreviewPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [sessionId] = useState(() => {
    // Generate or retrieve session ID
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('admin_session_id');
      if (stored) return stored;
      const newId = crypto.randomUUID();
      sessionStorage.setItem('admin_session_id', newId);
      return newId;
    }
    return '';
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [conversionLogs, setConversionLogs] = useState<ConversionLogs | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<{ slug: string; previewUrl: string } | null>(null);

  const [versionGroups, setVersionGroups] = useState<VersionGroup[]>([]);
  const [loadingStudies, setLoadingStudies] = useState(false);

  // Duplicate detection state
  const [duplicateInfo, setDuplicateInfo] = useState<DuplicateInfo | null>(null);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

  // Fetch version groups
  const fetchTestStudies = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoadingStudies(true);
      const res = await fetch(`/api/admin/test-studies?sessionId=${sessionId}`);
      const data = await res.json();

      if (data.success) {
        // Fetch version groups
        if (data.versionGroups) {
          setVersionGroups(data.versionGroups);
        }
      }
    } catch (error) {
      console.error('Failed to fetch version groups:', error);
    } finally {
      setLoadingStudies(false);
    }
  }, [isAuthenticated, sessionId]);

  // Auto-refresh test studies and run cleanup
  useEffect(() => {
    if (!isAuthenticated) return;

    // Initial fetch
    fetchTestStudies();

    // Refresh every 30 seconds
    const refreshInterval = setInterval(fetchTestStudies, 30000);

    // Run cleanup every 5 minutes
    const cleanupInterval = setInterval(async () => {
      try {
        await fetch('/api/admin/cleanup', { method: 'POST' });
        fetchTestStudies(); // Refresh list after cleanup
      } catch (error) {
        console.error('Cleanup failed:', error);
      }
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(cleanupInterval);
    };
  }, [isAuthenticated, fetchTestStudies]);

  // Handle password submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    // We'll validate the password when uploading files
    // For now, just check it's not empty
    if (!password.trim()) {
      setAuthError('Please enter a password');
      return;
    }

    setIsAuthenticated(true);
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress('Preparing files...');
    setConversionLogs(null);
    setUploadSuccess(null);

    try {
      const formData = new FormData();
      formData.append('password', password);
      formData.append('sessionId', sessionId);

      // Add all files with their relative paths
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Use webkitRelativePath if available (from directory upload)
        const path = (file as any).webkitRelativePath || file.name;
        formData.append(path, file);
      }

      setUploadProgress('Uploading and converting...');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setAuthError('Invalid password');
          setIsAuthenticated(false);
          setConversionLogs(data.logs || null);
        } else {
          setConversionLogs(data.logs || {
            info: [],
            warnings: [],
            errors: [data.error || 'Upload failed'],
          });
        }
        return;
      }

      if (data.success) {
        setConversionLogs(data.logs);

        // Check if duplicate detected
        if (data.isDuplicate) {
          // Show confirmation modal
          setDuplicateInfo({
            tempId: data.tempId,
            experimentName: data.experimentName,
            existingStudy: data.existingStudy,
            newStudy: data.newStudy,
          });
          setShowDuplicateModal(true);
        } else {
          // No duplicate - show success
          setUploadSuccess({
            slug: data.studySlug,
            previewUrl: data.previewUrl,
          });
          // Refresh test studies list
          fetchTestStudies();
        }
      } else {
        setConversionLogs(data.logs);
      }
    } catch (error) {
      setConversionLogs({
        info: [],
        warnings: [],
        errors: [error instanceof Error ? error.message : 'Upload failed'],
      });
    } finally {
      setUploading(false);
      setUploadProgress('');
      // Reset file input
      e.target.value = '';
    }
  };

  // Handle duplicate confirmation
  const handleDuplicateConfirm = async (action: 'new-version' | 'replace', versionNote?: string) => {
    if (!duplicateInfo) return;

    setShowDuplicateModal(false);
    setUploadProgress('Creating version...');
    setUploading(true);

    try {
      const res = await fetch('/api/admin/upload/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tempId: duplicateInfo.tempId,
          action,
          versionNote,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setUploadSuccess({
          slug: data.studySlug,
          previewUrl: data.previewUrl,
        });
        fetchTestStudies();
      } else {
        alert(data.error || 'Failed to create version');
      }
    } catch (error) {
      console.error('Version confirmation failed:', error);
      alert('Failed to create version');
    } finally {
      setUploading(false);
      setUploadProgress('');
      setDuplicateInfo(null);
    }
  };

  const handleDuplicateCancel = () => {
    setShowDuplicateModal(false);
    setDuplicateInfo(null);
  };

  // Version management handlers
  const handleDeleteVersion = async (experimentName: string, versionId: string) => {
    try {
      const res = await fetch(
        `/api/admin/test-studies/versions/${encodeURIComponent(experimentName)}/${versionId}`,
        { method: 'DELETE' }
      );

      if (res.ok) {
        fetchTestStudies();
      } else {
        alert('Failed to delete version');
      }
    } catch (error) {
      console.error('Delete version failed:', error);
      alert('Failed to delete version');
    }
  };

  const handleDownloadVersion = async (experimentName: string, versionId: string) => {
    try {
      const res = await fetch(
        `/api/admin/test-studies/versions/${encodeURIComponent(experimentName)}/${versionId}/download`
      );

      if (!res.ok) {
        alert('Failed to download files');
        return;
      }

      // Download the ZIP file
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${experimentName}_${versionId.slice(0, 8)}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download files');
    }
  };

  const handleUpdateVersionNote = async (experimentName: string, versionId: string, note: string) => {
    try {
      const res = await fetch(
        `/api/admin/test-studies/versions/${encodeURIComponent(experimentName)}/${versionId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ versionNote: note }),
        }
      );

      if (res.ok) {
        fetchTestStudies();
      } else {
        alert('Failed to update version note');
      }
    } catch (error) {
      console.error('Update note failed:', error);
      alert('Failed to update version note');
    }
  };

  const handlePreviewVersion = (slug: string) => {
    window.open(`/studies/${slug}/consent`, '_blank');
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Admin Preview Access
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
              {authError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Main admin interface
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Study Preview Admin
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Upload CogGym experiment folders to preview studies
              </p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Upload Experiment Folder
          </h2>

          <div className="mb-4">
            <label className="block">
              <span className="sr-only">Choose experiment folder</span>
              <input
                type="file"
                /* @ts-expect-error - webkitdirectory is not in TypeScript types */
                webkitdirectory=""
                directory=""
                multiple
                onChange={handleFileUpload}
                disabled={uploading}
                className="block w-full text-sm text-gray-500 dark:text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  dark:file:bg-blue-900 dark:file:text-blue-200
                  hover:file:bg-blue-100 dark:hover:file:bg-blue-800
                  disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </label>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Select a folder containing config.json, stimuli.jsonl, and optional instruction.jsonl with assets
            </p>
          </div>

          {uploading && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p className="text-blue-700 dark:text-blue-300">{uploadProgress}</p>
            </div>
          )}

          {uploadSuccess && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md mb-4">
              <p className="text-green-700 dark:text-green-300 font-medium mb-2">
                ✅ Conversion successful!
              </p>
              <Link
                href={uploadSuccess.previewUrl}
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Preview Study
              </Link>
            </div>
          )}

          {conversionLogs && (
            <div className="mt-4 space-y-2">
              {conversionLogs.info.length > 0 && (
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Conversion Log:</h3>
                  <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
                    {conversionLogs.info.join('\n')}
                  </pre>
                </div>
              )}

              {conversionLogs.warnings.length > 0 && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                  <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Warnings:</h3>
                  <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300">
                    {conversionLogs.warnings.map((warning, i) => (
                      <li key={i}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {conversionLogs.errors.length > 0 && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
                  <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">❌ Errors:</h3>
                  <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300">
                    {conversionLogs.errors.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Active Test Studies */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Active Test Studies
            </h2>
            <button
              onClick={fetchTestStudies}
              disabled={loadingStudies}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50"
            >
              {loadingStudies ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {versionGroups.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No active test studies. Upload an experiment folder to get started.
            </p>
          ) : (
            <div className="space-y-6">
              {/* Version Groups */}
              {versionGroups.map((group) => (
                <div
                  key={group.experimentName}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {group.experimentName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {group.versionCount} version{group.versionCount !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <VersionAccordion
                    experimentName={group.experimentName}
                    versions={group.versions}
                    latestVersionId={group.latestVersionId}
                    onDelete={(versionId) => handleDeleteVersion(group.experimentName, versionId)}
                    onDownload={(versionId) => handleDownloadVersion(group.experimentName, versionId)}
                    onPreview={handlePreviewVersion}
                    onUpdateNote={(versionId, note) =>
                      handleUpdateVersionNote(group.experimentName, versionId, note)
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Duplicate Confirmation Modal */}
      {duplicateInfo && (
        <VersionConfirmationModal
          isOpen={showDuplicateModal}
          experimentName={duplicateInfo.experimentName}
          existingStudy={duplicateInfo.existingStudy}
          newStudy={duplicateInfo.newStudy}
          onConfirm={handleDuplicateConfirm}
          onCancel={handleDuplicateCancel}
        />
      )}
    </div>
  );
}
