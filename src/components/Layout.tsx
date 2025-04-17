'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StudyConfig, TextSection } from '@/types/study';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeProvider';
import { AdditionalInfoProvider, useAdditionalInfo } from './AdditionalInfoContext';

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
        <pre className={`whitespace-pre-wrap font-sans text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
          <pre className={`whitespace-pre-wrap font-sans text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {section.content}
          </pre>
        </div>
      )}
    </div>
  );
}

export default function Layout({ children, config }: LayoutProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ThemeToggle />
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-8rem)]">
          {/* Left Column - Scenario Info and Content */}
          <div className={`rounded-lg shadow-md p-4 ${isDark ? 'bg-gray-800' : 'bg-white'} overflow-y-auto`}>
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
              {config.input_type === 'img' ? (
                <div className="relative h-[60vh] min-h-[400px] max-h-[700px]">
                  <Image
                    src={config.source_link!}
                    alt={`Scenario ${config.scenario_id}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              ) : config.input_type === 'video' ? (
                <div className="relative h-[60vh] min-h-[400px] max-h-[700px]">
                  <video
                    src={config.source_link!}
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
            
            {(config.input_type === 'img' || config.input_type === 'video') && (
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="text-center mb-1">
                  <span className={`text-xs uppercase tracking-wider font-semibold px-2 py-1 rounded ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                    Commentary
                  </span>
                </div>
                <p className={`text-base leading-relaxed text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  &quot;{config.commentary}&quot;
                </p>
              </div>
            )}
          </div>
          
          {/* Right Column - Question */}
          <div className={`rounded-lg shadow-md p-4 ${isDark ? 'bg-gray-800' : 'bg-white'} overflow-y-auto`}>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h3 className={`text-xl font-semibold mb-2 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {config.question}
              </h3>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 