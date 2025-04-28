'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import QuestionFrame from '@/components/QuestionFrame';
import ScenarioNavigation from '@/components/ScenarioNavigation';
import { UserResponse, StudyConfig } from '@/types/study';
import config from '@/data/config.json';
import { useRouter } from 'next/navigation';
import { submitResponse } from '@/utils/api';
import { getSelectedScenarios } from '@/utils/scenarioSelection';

export default function Scenarios() {
  const router = useRouter();
  const [currentScenario, setCurrentScenario] = React.useState(1);
  const [responses, setResponses] = React.useState<Record<number, number[]>>({});
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [completedScenarios, setCompletedScenarios] = React.useState<Set<number>>(new Set());
  const [selectedScenarios, setSelectedScenarios] = useState<StudyConfig[]>([]);

  useEffect(() => {
    // Check if user has completed consent and tutorial
    const hasConsent = localStorage.getItem('studyConsent');
    const hasTutorial = localStorage.getItem('tutorialComplete');
    
    if (!hasConsent) {
      router.push('/consent');
    } else if (!hasTutorial) {
      router.push('/tutorial');
    }
    
    // Get the selected scenarios for this participant
    const scenarios = getSelectedScenarios();
    setSelectedScenarios(scenarios);
    
    // Load saved responses from localStorage
    const savedResponses = localStorage.getItem('userResponses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
    
    // Load completed scenarios from localStorage
    const savedCompletedScenarios = localStorage.getItem('completedScenarios');
    if (savedCompletedScenarios) {
      setCompletedScenarios(new Set(JSON.parse(savedCompletedScenarios)));
    }
  }, [router]);

  const handleSubmit = async (response: UserResponse) => {
    setSubmitStatus('idle');

    try {
      // Get the current scenario data
      const currentScenarioData = selectedScenarios.find(s => s.scenario_id === currentScenario);
      if (!currentScenarioData) {
        throw new Error('Current scenario not found');
      }

      // Use the original scenario ID for API submission if available
      const submissionScenarioId = currentScenarioData.original_scenario_id || currentScenarioData.scenario_id;
      const apiResponse = {...response, scenario_id: submissionScenarioId};

      if (config.study.backend.enabled) {
        const result = await submitResponse(apiResponse);
        if (!result.success) {
          throw new Error('Failed to submit response');
        }
      }

      // Store the response locally
      let updatedResponses = { ...responses };
      if ('values' in response.response_data) {
        updatedResponses = {
          ...updatedResponses,
          [currentScenario]: response.response_data.values || []
        };
        setResponses(updatedResponses);
      }
      
      // Store the points positions if available (for continuous values)
      if ('points' in response.response_data && response.response_data.points) {
        localStorage.setItem(`pointPositions_${currentScenario}`, 
          JSON.stringify(response.response_data.points));
      }
      
      // Save to localStorage
      localStorage.setItem('userResponses', JSON.stringify(updatedResponses));

      // Mark this scenario as completed
      const updatedCompletedScenarios = new Set([...completedScenarios, currentScenario]);
      setCompletedScenarios(updatedCompletedScenarios);
      
      // Save completed scenarios to localStorage
      localStorage.setItem('completedScenarios', 
        JSON.stringify(Array.from(updatedCompletedScenarios)));

      setSubmitStatus('success');

      // Auto-advance to next scenario after a successful submission
      if (currentScenario < selectedScenarios.length) {
        setTimeout(() => {
          setCurrentScenario(currentScenario + 1);
          setSubmitStatus('idle');
        }, 1000);
      } else {
        // Check if all scenarios are completed
        const allCompleted = selectedScenarios.every(scenario => 
          updatedCompletedScenarios.has(scenario.scenario_id)
        );

        if (allCompleted) {
          localStorage.setItem('scenariosComplete', 'true');
          setTimeout(() => {
            router.push('/demographic');
          }, 1000);
        } else {
          // Find the first incomplete scenario
          const firstIncomplete = selectedScenarios.find(
            scenario => !updatedCompletedScenarios.has(scenario.scenario_id)
          );
          if (firstIncomplete) {
            setTimeout(() => {
              setCurrentScenario(firstIncomplete.scenario_id);
              setSubmitStatus('idle');
            }, 1000);
          }
        }
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      setSubmitStatus('error');
    }
  };

  const handleNavigate = (scenarioId: number) => {
    if (scenarioId >= 1 && scenarioId <= selectedScenarios.length) {
      setCurrentScenario(scenarioId);
      setSubmitStatus('idle');
    }
  };

  const handleResetStudy = () => {
    if (confirm('This will reset your study progress. Continue?')) {
      // Clear localStorage items
      localStorage.removeItem('selectedScenarios');
      localStorage.removeItem('userResponses');
      localStorage.removeItem('completedScenarios');
      localStorage.removeItem('scenariosComplete');
      
      // Reload the page to reset state
      window.location.reload();
    }
  };

  // If scenarios aren't loaded yet, show a loading indicator
  if (selectedScenarios.length === 0) {
    return <div className="flex items-center justify-center min-h-screen">Loading scenarios...</div>;
  }

  const currentScenarioData = selectedScenarios.find(s => s.scenario_id === currentScenario);

  if (!currentScenarioData) {
    return <div>Error: Scenario not found</div>;
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Reset button - only in development mode */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={handleResetStudy}
          className="fixed top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-md text-xs"
          style={{ zIndex: 1000 }}
        >
          Reset Study
        </button>
      )}

      <Layout config={currentScenarioData}>
        <QuestionFrame
          config={currentScenarioData}
          onSubmit={handleSubmit}
          previousResponses={responses}
        />
        
        {submitStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md">
            Response submitted successfully!
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
            Error submitting response. Please try again.
          </div>
        )}
      </Layout>

      <ScenarioNavigation
        currentScenario={currentScenario}
        totalScenarios={selectedScenarios.length}
        onNavigate={handleNavigate}
        completedScenarios={completedScenarios}
      />
    </main>
  );
} 