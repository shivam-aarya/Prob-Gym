'use client';

import { useState } from 'react';

interface ExistingStudyInfo {
  experimentName: string;
  versionCount: number;
  latestVersion: {
    versionNumber: number;
    slug: string;
    uploadedAt: Date;
    note?: string;
  } | null;
}

interface NewStudyInfo {
  studySlug: string;
  scenarioCount: number;
}

interface VersionConfirmationModalProps {
  isOpen: boolean;
  experimentName: string;
  existingStudy: ExistingStudyInfo;
  newStudy: NewStudyInfo;
  onConfirm: (action: 'new-version' | 'replace', versionNote?: string) => void;
  onCancel: () => void;
}

export function VersionConfirmationModal({
  isOpen,
  experimentName,
  existingStudy,
  newStudy,
  onConfirm,
  onCancel,
}: VersionConfirmationModalProps) {
  const [action, setAction] = useState<'new-version' | 'replace'>('new-version');
  const [versionNote, setVersionNote] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(action, versionNote.trim() || undefined);
  };

  const latestVersion = existingStudy.latestVersion;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Duplicate Study Detected
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              A study named &quot;{experimentName}&quot; already exists
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Existing Study Info */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
          <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Existing Study
          </h3>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Total versions:</span> {existingStudy.versionCount}
            </p>
            {latestVersion && (
              <>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Latest version:</span> v{latestVersion.versionNumber}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Uploaded:</span>{' '}
                  {new Date(latestVersion.uploadedAt).toLocaleString()}
                </p>
                {latestVersion.note && (
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Note:</span> {latestVersion.note}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* New Study Info */}
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
          <h3 className="mb-2 text-sm font-semibold text-blue-900 dark:text-blue-300">
            New Upload
          </h3>
          <div className="space-y-1 text-sm">
            <p className="text-blue-800 dark:text-blue-400">
              <span className="font-medium">Scenarios:</span> {newStudy.scenarioCount}
            </p>
          </div>
        </div>

        {/* Action Selection */}
        <div className="mb-6 space-y-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            What would you like to do?
          </label>

          {/* Option 1: Create New Version */}
          <div
            onClick={() => setAction('new-version')}
            className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
              action === 'new-version'
                ? 'border-blue-500 bg-blue-50 dark:border-blue-600 dark:bg-blue-950'
                : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-start">
              <input
                type="radio"
                checked={action === 'new-version'}
                onChange={() => setAction('new-version')}
                className="mt-1 h-4 w-4 text-blue-600"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900 dark:text-white">
                  Create new version
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Keep the existing version and add this as v{existingStudy.versionCount + 1}
                </div>
              </div>
            </div>
          </div>

          {/* Option 2: Replace Latest Version */}
          <div
            onClick={() => setAction('replace')}
            className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
              action === 'replace'
                ? 'border-orange-500 bg-orange-50 dark:border-orange-600 dark:bg-orange-950'
                : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-start">
              <input
                type="radio"
                checked={action === 'replace'}
                onChange={() => setAction('replace')}
                className="mt-1 h-4 w-4 text-orange-600"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900 dark:text-white">
                  Replace latest version
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Overwrite v{latestVersion?.versionNumber || existingStudy.versionCount} with this upload
                  <span className="ml-1 text-orange-600 dark:text-orange-400">(destructive)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Version Note */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Version note (optional)
          </label>
          <input
            type="text"
            value={versionNote}
            onChange={(e) => setVersionNote(e.target.value)}
            placeholder="e.g., Fixed bug in trial 3, Updated instructions, etc."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
            maxLength={200}
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Add a note to help you remember what changed in this version
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${
              action === 'new-version'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-orange-600 hover:bg-orange-700'
            }`}
          >
            {action === 'new-version' ? 'Create Version' : 'Replace Latest'}
          </button>
        </div>
      </div>
    </div>
  );
}
