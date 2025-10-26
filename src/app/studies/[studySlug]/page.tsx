'use client';

import { useStudy } from '@/contexts/StudyContext';
import Link from 'next/link';

/**
 * Study landing page
 * Shows study information and start button
 * Plugins are registered automatically by StudyProvider
 */
export default function StudyPage() {
  const { metadata, studySlug } = useStudy();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Study Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {metadata.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {metadata.description}
        </p>
      </div>

      {/* Study Information */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Study Information
        </h2>

        <div className="space-y-4">
          {/* Duration */}
          {metadata.settings.timeLimit && (
            <div className="flex items-start">
              <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
                Duration:
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                Approximately {metadata.settings.timeLimit} minutes
              </span>
            </div>
          )}

          {/* Questions */}
          {metadata.settings.questionsPerParticipant && (
            <div className="flex items-start">
              <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
                Questions:
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {metadata.settings.questionsPerParticipant} scenarios
              </span>
            </div>
          )}

          {/* Tags */}
          {metadata.tags.cognitiveProcess && metadata.tags.cognitiveProcess.length > 0 && (
            <div className="flex items-start">
              <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
                Focus Areas:
              </span>
              <div className="flex flex-wrap gap-2">
                {metadata.tags.cognitiveProcess.map((process) => (
                  <span
                    key={process}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {process}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Study Status */}
          <div className="flex items-start">
            <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
              Status:
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                metadata.status === 'ACTIVE'
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              {metadata.status}
            </span>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="flex justify-center">
        <Link
          href={`/studies/${studySlug}/consent`}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-lg transition-colors"
        >
          Begin Study
        </Link>
      </div>

      {/* Back to Catalog */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Study Catalog
        </Link>
      </div>
    </div>
  );
}
