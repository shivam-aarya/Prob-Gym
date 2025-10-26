'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStudy } from '@/contexts/StudyContext';

export default function Complete() {
  const { studySlug, metadata } = useStudy();
  const router = useRouter();

  useEffect(() => {
    // Check if user has completed the study
    const isComplete = localStorage.getItem(`${studySlug}_studyComplete`);
    if (!isComplete) {
      router.push(`/studies/${studySlug}`);
    }
  }, [studySlug, router]);

  const completionMessage =
    metadata.settings.completionMessage || 'Thank you for completing the study!';

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="mb-6 text-6xl">🎉</div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Study Complete!
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          {completionMessage}
        </p>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Your responses have been recorded and will be used for research purposes.
          Thank you for contributing to science!
        </p>

        {/* Completion Code */}
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Study Completion Code
          </h2>
          <p className="text-3xl font-mono bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-4 rounded">
            CEFZC2WE
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            Please save this code for your records
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-4">
          <div>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Browse More Studies
            </Link>
          </div>

          <div>
            <button
              onClick={() => window.close()}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline"
            >
              Close Window
            </button>
          </div>
        </div>

        {/* Study Info */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Study: <span className="font-medium">{metadata.title}</span>
          </p>
          {metadata.authors && metadata.authors.length > 0 && (
            <p className="mt-2">
              Researchers: <span className="font-medium">{metadata.authors.join(', ')}</span>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
