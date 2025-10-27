'use client';

import Link from 'next/link';
import { StudyMetadata } from '@/studies/types';

interface StudyCardEnhancedProps {
  study: StudyMetadata;
}

export function StudyCardEnhanced({ study }: StudyCardEnhancedProps) {
  const duration = study.settings.timeLimit;
  const questionCount = study.settings.questionsPerParticipant;

  // Determine badge based on study properties
  const getBadgeInfo = () => {
    if (duration && duration <= 10) {
      return { text: 'Quick', variant: 'blue' };
    }
    if (study.status === 'ACTIVE' && study.version === '1.0.0') {
      return { text: 'New', variant: 'green' };
    }
    return null;
  };

  const badgeInfo = getBadgeInfo();

  return (
    <Link href={`/studies/${study.slug}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 h-full flex flex-col border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700">
        {/* Header with title and badge */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1">
            {study.title}
          </h3>
          {badgeInfo && (
            <span
              className={`ml-2 px-2 py-1 text-xs font-medium rounded-full shrink-0 ${
                badgeInfo.variant === 'blue'
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200'
                  : 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
              }`}
            >
              {badgeInfo.text}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3 leading-relaxed">
          {study.shortDescription || study.description}
        </p>

        {/* Metadata */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              {duration
                ? `~${duration} minutes`
                : questionCount
                ? `~${questionCount * 1.5} minutes`
                : '~20 minutes'}
            </span>
          </div>

          {questionCount && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span>{questionCount} scenarios</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {study.tags.cognitiveProcess && study.tags.cognitiveProcess.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {study.tags.cognitiveProcess.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium capitalize"
              >
                {tag}
              </span>
            ))}
            {study.tags.cognitiveProcess.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs font-medium">
                +{study.tags.cognitiveProcess.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline inline-flex items-center">
            View Details
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
