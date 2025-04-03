'use client';

import React from 'react';
import Image from 'next/image';
import { StudyConfig } from '@/types/study';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeProvider';

interface LayoutProps {
  children: React.ReactNode;
  config: StudyConfig;
}

export default function Layout({ children, config }: LayoutProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Scenario Info and Image */}
          <div className={`rounded-lg shadow-md p-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {config.scenario_id}
                </span>
              </div>
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Scenario Overview
              </h2>
            </div>
            
            <div className="relative h-[500px] mb-6">
              <Image
                src={config.source_link}
                alt={`Scenario ${config.scenario_id}`}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-base leading-relaxed text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {config.commentary}
              </p>
            </div>
          </div>
          
          {/* Right Column - Question */}
          <div className={`rounded-lg shadow-md p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
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