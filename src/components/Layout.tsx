'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StudyConfig, TextSection } from '@/types/study';
import { useTheme } from './ThemeProvider';
import ReplayableGif from './ReplayableGif';
import { useStudy } from '@/contexts/StudyContext';

interface LayoutProps {
  children: React.ReactNode;
  config: StudyConfig;
}

function TextSectionComponent({ section, isDark }: { section: TextSection; isDark: boolean }) {
  const [isExpanded, setIsExpanded] = useState(section.isInitiallyExpanded ?? true);

  if (!section.isCollapsible) {
    return (
      <div className={`mb-3 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}>
        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {section.title}
        </h3>
        <pre className={`whitespace-pre-wrap font-sans text-base leading-relaxed select-none ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
             onCopy={(e) => e.preventDefault()}
             onCut={(e) => e.preventDefault()}
             onContextMenu={(e) => e.preventDefault()}>
          {section.content}
        </pre>
      </div>
    );
  }

  return (
    <div className={`mb-3 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg overflow-hidden`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full p-4 flex justify-between items-center ${isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
      >
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {section.title}
        </h3>
        <svg
          className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''} ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="p-4 pt-0">
          <pre className={`whitespace-pre-wrap font-sans text-base leading-relaxed select-none ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
               onCopy={(e) => e.preventDefault()}
               onCut={(e) => e.preventDefault()}
               onContextMenu={(e) => e.preventDefault()}>
            {section.content}
          </pre>
        </div>
      )}
    </div>
  );
}

export default function Layout({ children, config }: LayoutProps) {
  const { theme } = useTheme();
  const { getAssetUrl } = useStudy();
  const isDark = theme === 'dark';
  const isGif = config.source_link?.toLowerCase().endsWith('.gif');

  // Convert source_link to use study asset path
  const assetUrl = config.source_link ? getAssetUrl(config.source_link) : '';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-8rem)]">
          {/* Left Column - Scenario Info and Content */}
          <div className={`rounded-lg shadow-md p-4 ${isDark ? 'bg-gray-800' : 'bg-white'} overflow-y-auto select-none`} 
               style={{ WebkitUserSelect: 'none', msUserSelect: 'none' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {config.scenario_id}
                </span>
              </div>
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Scenario Overview
              </h2>
            </div>
            
            <div className="mb-4">
              {config.stimuli && config.stimuli.length > 0 ? (
                // New multi-stimuli format (CogGym v2)
                <div className="space-y-4">
                  {config.stimuli.map((stimulus, index) => {
                    // Render title if present
                    const renderTitle = () => {
                      if (!stimulus.title) return null;
                      const titleStyle = stimulus.fontsize ? { fontSize: `${stimulus.fontsize}px` } : {};
                      return (
                        <h3
                          className={`font-semibold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
                          style={titleStyle}
                        >
                          {stimulus.title}
                        </h3>
                      );
                    };

                    if (stimulus.input_type === 'img') {
                      const stimulusAssetUrl = stimulus.media_url.length > 0
                        ? getAssetUrl(stimulus.media_url[0])
                        : '';
                      const stimulusIsGif = stimulusAssetUrl.toLowerCase().endsWith('.gif');

                      // Handle dimension/width/height
                      const hasExplicitDimensions = stimulus.width || stimulus.height;
                      const containerStyle: React.CSSProperties = {};

                      if (stimulus.width) {
                        // Support both pixel values and percentages
                        containerStyle.width = typeof stimulus.width === 'string' && stimulus.width.includes('%')
                          ? stimulus.width
                          : `${stimulus.width}px`;
                      } else if (!hasExplicitDimensions) {
                        // Default to 100% width if no dimensions specified
                        containerStyle.width = '100%';
                      }

                      if (stimulus.height) {
                        // Support both pixel values and percentages
                        containerStyle.height = typeof stimulus.height === 'string' && stimulus.height.includes('%')
                          ? stimulus.height
                          : `${stimulus.height}px`;
                      }

                      return (
                        <div key={index}>
                          {renderTitle()}
                          {hasExplicitDimensions ? (
                            // When explicit dimensions are provided, use fill mode
                            <div
                              className="relative min-h-[300px]"
                              style={containerStyle}
                            >
                              {stimulusIsGif ? (
                                <ReplayableGif
                                  src={stimulusAssetUrl}
                                  alt={stimulus.title || `Scenario ${config.scenario_id} - Stimulus ${index + 1}`}
                                  className="absolute inset-0"
                                />
                              ) : (
                                <Image
                                  src={stimulusAssetUrl}
                                  alt={stimulus.title || `Scenario ${config.scenario_id} - Stimulus ${index + 1}`}
                                  fill
                                  className="object-contain"
                                  priority={index === 0}
                                />
                              )}
                            </div>
                          ) : (
                            // When no dimensions specified, use responsive mode with aspect ratio
                            // Constrain both width and height so image fits on screen without scrolling
                            <div
                              style={containerStyle}
                              className="relative w-full h-[calc(100vh-16rem)]"
                            >
                              {stimulusIsGif ? (
                                <img
                                  src={stimulusAssetUrl}
                                  alt={stimulus.title || `Scenario ${config.scenario_id} - Stimulus ${index + 1}`}
                                  className="absolute inset-0 w-full h-full"
                                  style={{ objectFit: 'contain' }}
                                />
                              ) : (
                                <Image
                                  src={stimulusAssetUrl}
                                  alt={stimulus.title || `Scenario ${config.scenario_id} - Stimulus ${index + 1}`}
                                  fill
                                  className="object-contain"
                                  priority={index === 0}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      );
                    } else if (stimulus.input_type === 'video') {
                      const stimulusAssetUrl = stimulus.media_url.length > 0
                        ? getAssetUrl(stimulus.media_url[0])
                        : '';

                      const hasExplicitDimensions = stimulus.width || stimulus.height;
                      const containerStyle: React.CSSProperties = {};

                      if (stimulus.width) {
                        // Support both pixel values and percentages
                        containerStyle.width = typeof stimulus.width === 'string' && stimulus.width.includes('%')
                          ? stimulus.width
                          : `${stimulus.width}px`;
                      } else if (!hasExplicitDimensions) {
                        // Default to 100% width if no dimensions specified
                        containerStyle.width = '100%';
                      }

                      if (stimulus.height) {
                        // Support both pixel values and percentages
                        containerStyle.height = typeof stimulus.height === 'string' && stimulus.height.includes('%')
                          ? stimulus.height
                          : `${stimulus.height}px`;
                      } else if (hasExplicitDimensions && stimulus.width && !stimulus.height) {
                        // If only width is specified, set a reasonable default height
                        containerStyle.height = '60vh';
                        containerStyle.maxHeight = '600px';
                      }

                      return (
                        <div key={index}>
                          {renderTitle()}
                          <div style={containerStyle}>
                            <video
                              src={stimulusAssetUrl}
                              controls
                              className="w-full h-auto"
                              playsInline
                            >
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </div>
                      );
                    } else if (stimulus.input_type === 'text') {
                      const textStyle: React.CSSProperties = {};
                      if (stimulus.fontsize) textStyle.fontSize = `${stimulus.fontsize}px`;

                      return (
                        <div key={index} className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          {renderTitle()}
                          <div
                            className={`text-base leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
                            style={textStyle}
                            dangerouslySetInnerHTML={{ __html: stimulus.text }}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ) : config.input_type === 'img' ? (
                // Legacy single-stimulus format (backward compatibility)
                <div className="relative h-[45vh] min-h-[300px] max-h-[500px]">
                  {isGif ? (
                    <ReplayableGif
                      src={assetUrl}
                      alt={`Scenario ${config.scenario_id}`}
                      className="absolute inset-0"
                    />
                  ) : (
                    <Image
                      src={assetUrl}
                      alt={`Scenario ${config.scenario_id}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  )}
                </div>
              ) : config.input_type === 'video' ? (
                <div className="relative h-[40vh] min-h-[300px] max-h-[500px]">
                  <video
                    src={assetUrl}
                    controls
                    className="w-full h-full object-contain"
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="space-y-2">
                  {config.text_sections?.map((section, index) => (
                    <TextSectionComponent
                      key={index}
                      section={section}
                      isDark={isDark}
                    />
                  ))}
                </div>
              )}
            </div>

            {config.commentary && config.commentary.trim() !== '' && (
              <div className={`border-t border-gray-200 dark:border-gray-700 pt-4`}>
                <div className={`flex items-center gap-2 mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span className="text-sm font-medium uppercase tracking-wider">Commentary</span>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-lg leading-relaxed select-none ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
                     onCopy={(e) => e.preventDefault()}
                     onCut={(e) => e.preventDefault()}
                     onContextMenu={(e) => e.preventDefault()}
                     dangerouslySetInnerHTML={{ __html: config.commentary }}>
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Response Area */}
          <div className={`rounded-lg shadow-md p-4 ${isDark ? 'bg-gray-800' : 'bg-white'} overflow-y-auto`}>
            {/* Only show single question section if this is a single-question scenario */}
            {config.question && (
              <div className={`pb-4 border-b border-gray-200 dark:border-gray-700 mb-6`}>
                <div className={`flex items-center gap-2 mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium uppercase tracking-wider">Question</span>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-lg leading-relaxed select-none ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
                     onCopy={(e) => e.preventDefault()}
                     onCut={(e) => e.preventDefault()}
                     onContextMenu={(e) => e.preventDefault()}
                     dangerouslySetInnerHTML={{ __html: config.question }}>
                  </p>
                </div>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 