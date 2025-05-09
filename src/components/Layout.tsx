'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StudyConfig, TextSection } from '@/types/study';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeProvider';
import ReplayableGif from './ReplayableGif';

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
  const isDark = theme === 'dark';
  const isGif = config.source_link?.toLowerCase().endsWith('.gif');

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ThemeToggle />
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
              {config.input_type === 'img' ? (
                <div className="relative h-[45vh] min-h-[300px] max-h-[500px]">
                  {isGif ? (
                    <ReplayableGif 
                      src={config.source_link!}
                      alt={`Scenario ${config.scenario_id}`}
                      className="absolute inset-0"
                    />
                  ) : (
                    <Image
                      src={config.source_link!}
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

            <div className={`border-t border-gray-200 dark:border-gray-700 pt-4`}>
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
          </div>
          
          {/* Right Column - Response Area */}
          <div className={`rounded-lg shadow-md p-4 ${isDark ? 'bg-gray-800' : 'bg-white'} overflow-y-auto`}>
              {children}
          </div>
        </div>
      </div>
    </div>
  );
} 