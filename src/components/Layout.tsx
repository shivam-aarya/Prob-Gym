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
          <div className="space-y-4">
            <div className={`rounded-lg shadow-md p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Scenario {config.scenario_id}
              </h2>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                {config.commentary}
              </p>
            </div>
            <div className={`relative h-[500px] rounded-lg shadow-md overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <Image
                src={config.source_link}
                alt={`Scenario ${config.scenario_id}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Right Column - Question */}
          <div className={`rounded-lg shadow-md p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 