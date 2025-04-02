'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';

interface ScenarioNavigationProps {
  currentScenario: number;
  totalScenarios: number;
  onNavigate: (scenarioId: number) => void;
  responses: Record<number, number[]>;
}

export default function ScenarioNavigation({ 
  currentScenario, 
  totalScenarios, 
  onNavigate,
  responses
}: ScenarioNavigationProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`fixed bottom-0 left-0 right-0 border-t transition-colors ${
      isDark 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto flex items-center justify-between max-w-7xl px-4 py-4">
        {/* Navigation buttons and counter */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate(currentScenario - 1)}
            disabled={currentScenario === 1}
            className={`px-4 py-2 rounded-md transition-colors ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 disabled:bg-gray-900 disabled:text-gray-600'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 disabled:bg-gray-50 disabled:text-gray-400'
            }`}
          >
            Previous
          </button>

          <div className={`text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Scenario {currentScenario} of {totalScenarios}
          </div>

          <button
            onClick={() => onNavigate(currentScenario + 1)}
            disabled={currentScenario === totalScenarios}
            className={`px-4 py-2 rounded-md transition-colors ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 disabled:bg-gray-900 disabled:text-gray-600'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 disabled:bg-gray-50 disabled:text-gray-400'
            }`}
          >
            Next
          </button>
        </div>

        {/* Progress indicators */}
        <div className="flex gap-2">
          {Array.from({ length: totalScenarios }, (_, i) => i + 1).map((scenarioId) => {
            const isActive = scenarioId === currentScenario;
            const isCompleted = responses[scenarioId];
            
            return (
              <button
                key={scenarioId}
                onClick={() => onNavigate(scenarioId)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  isActive
                    ? isDark ? 'bg-blue-400' : 'bg-blue-500'
                    : isCompleted
                      ? isDark ? 'bg-gray-600' : 'bg-gray-300'
                      : isDark ? 'bg-gray-800' : 'bg-gray-200'
                }`}
                aria-label={`Go to scenario ${scenarioId}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
} 