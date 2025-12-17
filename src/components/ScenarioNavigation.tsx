'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { getProgress } from '@/utils/itemSequence';

interface ScenarioNavigationProps {
  studySlug: string;
}

/**
 * Simplified navigation for experimentFlow
 * Shows only progress indicator (no prev/next buttons)
 * ExperimentFlow is strictly sequential
 */
export default function ScenarioNavigation({ studySlug }: ScenarioNavigationProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const progress = getProgress(studySlug);

  // Don't show navigation if no progress info
  if (progress.total === 0) {
    return null;
  }

  const progressPercent = (progress.current / progress.total) * 100;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t transition-colors ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-col gap-2">
          {/* Progress text */}
          <div
            className={`text-sm font-medium text-center ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Item {progress.current} of {progress.total}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
