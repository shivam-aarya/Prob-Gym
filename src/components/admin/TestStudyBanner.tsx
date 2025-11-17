'use client';

import Link from 'next/link';

export function TestStudyBanner() {
  return (
    <div className="bg-yellow-50 border-b border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <svg
              className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Test Study Preview Mode
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-0.5">
                This is a temporary preview. Data will expire in 24 hours.
              </p>
            </div>
          </div>

          <Link
            href="/admin/preview"
            className="flex items-center gap-2 rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 transition-colors whitespace-nowrap"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
