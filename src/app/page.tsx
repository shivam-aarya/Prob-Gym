'use client';

import { useState, useMemo } from 'react';
import { getAllStudies, getFilterOptions } from '@/studies/registry';
import { StudyCardEnhanced } from '@/components/StudyCardEnhanced';

/**
 * Study catalog homepage
 * Lists all available studies with filtering
 */
export default function HomePage() {
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    cognitiveProcess: string[];
    modality: string[];
    studyLength: string[];
  }>({
    cognitiveProcess: [],
    modality: [],
    studyLength: [],
  });

  // Get all studies and filter options
  const allStudies = getAllStudies();
  const filterOptions = getFilterOptions();

  const toggleFilter = (
    category: 'cognitiveProcess' | 'modality' | 'studyLength',
    value: string
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      cognitiveProcess: [],
      modality: [],
      studyLength: [],
    });
  };

  // Filter studies based on selections
  const filteredStudies = useMemo(() => {
    return allStudies.filter((study) => {
      const hasActiveFilters =
        selectedFilters.cognitiveProcess.length > 0 ||
        selectedFilters.modality.length > 0 ||
        selectedFilters.studyLength.length > 0;

      if (!hasActiveFilters) return study.status === 'ACTIVE';

      const matchesCognitive =
        selectedFilters.cognitiveProcess.length === 0 ||
        selectedFilters.cognitiveProcess.some((filter) =>
          study.tags?.cognitiveProcess?.includes(filter)
        );

      const matchesModality =
        selectedFilters.modality.length === 0 ||
        selectedFilters.modality.some((filter) => study.tags?.modality?.includes(filter));

      const matchesLength =
        selectedFilters.studyLength.length === 0 ||
        selectedFilters.studyLength.includes(study.tags?.studyLength || '');

      return study.status === 'ACTIVE' && matchesCognitive && matchesModality && matchesLength;
    });
  }, [allStudies, selectedFilters]);

  const activeFilterCount =
    selectedFilters.cognitiveProcess.length +
    selectedFilters.modality.length +
    selectedFilters.studyLength.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-200">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-20" id="about">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              CogGym
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed">
            CogGym is a large-scale, collaborative platform where artificial intelligence meets cognitive science.
            Our mission is to provide a unified benchmark for comparing human and machine intelligence, built from
            the most robust and insightful experiments in the history of cognitive science. We partner with leading
            research labs to curate and standardize hundreds of their foundational studies into a living, interactive library.
          </p>
        </div>

        {/* Available Experiments Section */}
        <div className="space-y-8" id="experiments">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Available Experiments
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Choose an experiment to participate in
              </p>
            </div>
            <div className="flex items-center gap-3">
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filters
                </button>
              )}
              <button
                onClick={() => setFiltersExpanded(!filtersExpanded)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    {activeFilterCount}
                  </span>
                )}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${filtersExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Collapsible Filter Section */}
          {filtersExpanded && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-6">
                {/* Cognitive Process Filters */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Cognitive Process
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.cognitiveProcesses.map((process) => (
                      <button
                        key={process}
                        onClick={() => toggleFilter('cognitiveProcess', process)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 capitalize ${
                          selectedFilters.cognitiveProcess.includes(process)
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                            : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-sm'
                        }`}
                      >
                        {process}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Modality Filters */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Modality
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.modalities.map((modality) => (
                      <button
                        key={modality}
                        onClick={() => toggleFilter('modality', modality)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 capitalize ${
                          selectedFilters.modality.includes(modality)
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                            : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-sm'
                        }`}
                      >
                        {modality}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Study Length Filters */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Study Length
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.studyLengths.map((length) => (
                      <button
                        key={length}
                        onClick={() => toggleFilter('studyLength', length)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 capitalize ${
                          selectedFilters.studyLength.includes(length)
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                            : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-sm'
                        }`}
                      >
                        {length === 'quick'
                          ? '< 15 min'
                          : length === 'medium'
                          ? '15-30 min'
                          : '> 30 min'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study) => (
              <StudyCardEnhanced key={study.slug} study={study} />
            ))}
          </div>

          {/* Empty State */}
          {filteredStudies.length === 0 && (
            <div className="text-center py-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="relative inline-block">
                <svg
                  className="mx-auto h-20 w-20 text-gray-300 dark:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-xl rounded-full"></div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                No studies found
              </h3>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                No studies match your current filters. Try adjusting your selections to see more options.
              </p>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-6 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* API Documentation Section */}
        <div className="mt-24 mb-16" id="api-docs">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 border border-blue-100 dark:border-gray-700">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
                API Documentation
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Access our comprehensive API to integrate CogGym experiments into your research workflows.
                Programmatically retrieve experiment data, participant responses, and benchmark results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/api/docs"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  View Documentation
                </a>
                <a
                  href="/api/playground"
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
                >
                  API Playground
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 mb-12" id="contact">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Have questions about CogGym? Want to contribute your experiments or collaborate with us?
                We&apos;d love to hear from you!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center p-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                  <a href="mailto:contact@coggym.org" className="text-blue-600 dark:text-blue-400 hover:underline">
                    contact@coggym.org
                  </a>
                </div>
                <div className="flex flex-col items-center p-4">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">GitHub</h3>
                  <a href="https://github.com/coggym" className="text-purple-600 dark:text-purple-400 hover:underline">
                    github.com/coggym
                  </a>
                </div>
                <div className="flex flex-col items-center p-4">
                  <svg className="w-8 h-8 text-pink-600 dark:text-pink-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Documentation</h3>
                  <a href="/docs" className="text-pink-600 dark:text-pink-400 hover:underline">
                    View Docs
                  </a>
                </div>
              </div>
              <a
                href="mailto:contact@coggym.org"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send us a message
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
