'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getAllStudies, getFilterOptions } from '@/studies/registry';
import { StudyMetadata } from '@/studies/types';

/**
 * Study catalog homepage
 * Lists all available studies with filtering
 */
export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProcess, setSelectedProcess] = useState<string>('');
  const [selectedModality, setSelectedModality] = useState<string>('');
  const [selectedLength, setSelectedLength] = useState<string>('');

  // Get all studies and filter options
  const allStudies = getAllStudies();
  const filterOptions = getFilterOptions();

  // Filter studies based on selections
  const filteredStudies = useMemo(() => {
    return allStudies.filter((study) => {
      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const matchesSearch =
          study.title.toLowerCase().includes(search) ||
          study.description.toLowerCase().includes(search);
        if (!matchesSearch) return false;
      }

      // Cognitive process filter
      if (selectedProcess) {
        if (!study.tags.cognitiveProcess?.includes(selectedProcess)) return false;
      }

      // Modality filter
      if (selectedModality) {
        if (!study.tags.modality?.includes(selectedModality)) return false;
      }

      // Length filter
      if (selectedLength) {
        if (study.tags.studyLength !== selectedLength) return false;
      }

      // Only show active studies
      return study.status === 'ACTIVE';
    });
  }, [allStudies, searchTerm, selectedProcess, selectedModality, selectedLength]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Research Study Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Participate in cognitive science research studies
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-4">
              <input
                type="text"
                placeholder="Search studies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Cognitive Process Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cognitive Process
              </label>
              <select
                value={selectedProcess}
                onChange={(e) => setSelectedProcess(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All</option>
                {filterOptions.cognitiveProcesses.map((process) => (
                  <option key={process} value={process}>
                    {process}
                  </option>
                ))}
              </select>
            </div>

            {/* Modality Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Modality
              </label>
              <select
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All</option>
                {filterOptions.modalities.map((modality) => (
                  <option key={modality} value={modality}>
                    {modality}
                  </option>
                ))}
              </select>
            </div>

            {/* Study Length Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration
              </label>
              <select
                value={selectedLength}
                onChange={(e) => setSelectedLength(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All</option>
                {filterOptions.studyLengths.map((length) => (
                  <option key={length} value={length}>
                    {length === 'quick' ? '< 15 min' : length === 'medium' ? '15-30 min' : '> 30 min'}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedProcess || selectedModality || selectedLength) && (
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedProcess('');
                    setSelectedModality('');
                    setSelectedLength('');
                  }}
                  className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Study Count */}
        <div className="mb-4 text-gray-600 dark:text-gray-400">
          Showing {filteredStudies.length} of {allStudies.filter(s => s.status === 'ACTIVE').length} active{' '}
          {filteredStudies.length === 1 ? 'study' : 'studies'}
        </div>

        {/* Studies Grid */}
        {filteredStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study) => (
              <StudyCard key={study.slug} study={study} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No studies match your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Study card component
 */
function StudyCard({ study }: { study: StudyMetadata }) {
  return (
    <Link href={`/studies/${study.slug}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {study.title}
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
          {study.shortDescription || study.description.slice(0, 150) + '...'}
        </p>

        {/* Meta Info */}
        <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
          {study.settings.timeLimit && (
            <div className="flex items-center">
              <span className="mr-2">⏱️</span>
              <span>~{study.settings.timeLimit} minutes</span>
            </div>
          )}

          {study.settings.questionsPerParticipant && (
            <div className="flex items-center">
              <span className="mr-2">📝</span>
              <span>{study.settings.questionsPerParticipant} scenarios</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {study.tags.cognitiveProcess && study.tags.cognitiveProcess.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {study.tags.cognitiveProcess.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {study.tags.cognitiveProcess.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                +{study.tags.cognitiveProcess.length - 2}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
