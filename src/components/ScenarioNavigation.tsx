'use client';

import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useRouter } from 'next/navigation';
import { scenarios } from '@/data/scenarios';
import { UserResponse } from '@/types/study';
import { submitResponse } from '@/utils/api';

interface ScenarioNavigationProps {
  currentScenario: number;
  totalScenarios: number;
  onNavigate: (scenarioId: number) => void;
  responses: Record<number, number[]>;
  completedScenarios: Set<number>;
}

export default function ScenarioNavigation({
  currentScenario,
  totalScenarios,
  onNavigate,
  completedScenarios
}: Omit<ScenarioNavigationProps, 'responses'>) {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allScenariosCompleted = completedScenarios.size === totalScenarios;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // First, get all saved responses from localStorage
      const savedResponsesJson = localStorage.getItem('userResponses');
      
      if (savedResponsesJson) {
        const savedResponses: Record<number, number[]> = JSON.parse(savedResponsesJson);
        
        // Submit each saved response to the API
        for (const scenarioId of Object.keys(savedResponses).map(Number)) {
          const scenarioData = scenarios.find(s => s.scenario_id === scenarioId);
          
          if (scenarioData) {
            let response: UserResponse;
            
            if (scenarioData.input_method === 'histogram') {
              response = {
                task_name: scenarioData.task_name,
                scenario_id: scenarioData.scenario_id,
                response_data: {
                  values: savedResponses[scenarioId],
                  options: scenarioData.options
                }
              };
            } else {
              // Handle number_line input type
              const pointPositionsJson = localStorage.getItem(`pointPositions_${scenarioId}`);
              const points = pointPositionsJson ? JSON.parse(pointPositionsJson) : null;
              
              response = {
                task_name: scenarioData.task_name,
                scenario_id: scenarioData.scenario_id,
                response_data: {
                  values: savedResponses[scenarioId],
                  options: scenarioData.options
                }
              };
              
              // Add points data if available
              if (points && points.length > 0) {
                response.response_data.points = points;
              }
            }
            
            // Submit to the API - this will automatically use the participant ID from localStorage
            await submitResponse(response);
          }
        }
      }
      
      // Mark study as complete and redirect to demographic page
      localStorage.setItem('scenariosComplete', 'true');
      router.push('/demographic');
    } catch (error) {
      console.error('Error submitting responses:', error);
      // Even if there's an error, we still want to proceed to the next step
      localStorage.setItem('scenariosComplete', 'true');
      router.push('/demographic');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* Progress indicators and submit button */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {Array.from({ length: totalScenarios }, (_, i) => i + 1).map((scenarioId) => {
              const isActive = scenarioId === currentScenario;
              const isCompleted = completedScenarios.has(scenarioId);
              
              return (
                <button
                  key={scenarioId}
                  onClick={() => onNavigate(scenarioId)}
                  className={`w-4 h-4 rounded-full transition-colors relative ${
                    isActive
                      ? isDark ? 'bg-blue-400' : 'bg-blue-500'
                      : isCompleted
                        ? isDark ? 'bg-green-500' : 'bg-green-400'
                        : isDark ? 'bg-gray-800' : 'bg-gray-200'
                  }`}
                  aria-label={`Go to scenario ${scenarioId}`}
                >
                  {isCompleted && (
                    <svg
                      className="absolute -top-[0.0rem] -right-[0.0rem] w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {allScenariosCompleted && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md transition-colors ${
                isDark
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit All Responses"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 