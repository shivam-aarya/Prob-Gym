'use client';

import { useState } from 'react';

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

interface VersionAccordionProps {
  experimentName: string;
  versions: Version[];
  latestVersionId: string;
  onDelete: (versionId: string) => void;
  onDownload: (versionId: string) => void;
  onPreview: (slug: string) => void;
  onUpdateNote: (versionId: string, note: string) => void;
}

export function VersionAccordion({
  versions,
  latestVersionId,
  onDelete,
  onDownload,
  onPreview,
  onUpdateNote,
}: VersionAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteValue, setEditingNoteValue] = useState('');

  const latestVersion = versions.find(v => v.id === latestVersionId);
  const olderVersions = versions.filter(v => v.id !== latestVersionId);

  const handleEditNote = (version: Version) => {
    setEditingNoteId(version.id);
    setEditingNoteValue(version.versionNote || '');
  };

  const handleSaveNote = (versionId: string) => {
    onUpdateNote(versionId, editingNoteValue);
    setEditingNoteId(null);
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditingNoteValue('');
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(date);
  };

  const renderVersionCard = (version: Version, isLatest: boolean) => {
    const isEditing = editingNoteId === version.id;

    return (
      <div
        key={version.id}
        className={`rounded-lg border p-4 ${
          isLatest
            ? 'border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-950'
            : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
        }`}
      >
        <div className="flex items-start justify-between">
          {/* Version Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                v{version.versionNumber}
              </span>
              {isLatest && (
                <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Latest
                </span>
              )}
            </div>

            <div className="mt-1 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <span className="font-medium">Uploaded:</span> {formatTimeAgo(version.createdAt)}
              </p>
              <p>
                <span className="font-medium">Scenarios:</span> {version.scenarioCount}
              </p>
              <p>
                <span className="font-medium">Slug:</span>{' '}
                <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-700">
                  {version.slug}
                </code>
              </p>
            </div>

            {/* Version Note */}
            <div className="mt-2">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editingNoteValue}
                    onChange={(e) => setEditingNoteValue(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    autoFocus
                    maxLength={200}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveNote(version.id)}
                      className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="rounded border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  {version.versionNote ? (
                    <p className="flex-1 text-sm italic text-gray-700 dark:text-gray-300">
                      &quot;{version.versionNote}&quot;
                    </p>
                  ) : (
                    <p className="flex-1 text-sm text-gray-400 dark:text-gray-500">
                      No note
                    </p>
                  )}
                  <button
                    onClick={() => handleEditNote(version)}
                    className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {version.versionNote ? 'Edit' : 'Add note'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="ml-4 flex flex-col gap-2">
            <button
              onClick={() => onPreview(version.slug)}
              className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
            >
              Preview
            </button>
            {version.hasOriginalFiles && (
              <button
                onClick={() => onDownload(version.id)}
                className="rounded border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Download
              </button>
            )}
            <button
              onClick={() => {
                if (confirm(`Delete version ${version.versionNumber}?${isLatest ? ' This will promote the previous version to latest.' : ''}`)) {
                  onDelete(version.id);
                }
              }}
              className="rounded border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {/* Latest Version - Always Visible */}
      {latestVersion && renderVersionCard(latestVersion, true)}

      {/* Older Versions - Collapsible */}
      {olderVersions.length > 0 && (
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <span>
              {olderVersions.length} older version{olderVersions.length !== 1 ? 's' : ''}
            </span>
            <svg
              className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExpanded && (
            <div className="mt-2 space-y-2">
              {olderVersions.map(version => renderVersionCard(version, false))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
