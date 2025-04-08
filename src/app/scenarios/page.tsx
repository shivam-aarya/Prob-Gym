'use client';

import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import QuestionFrame from '@/components/QuestionFrame';
import ScenarioNavigation from '@/components/ScenarioNavigation';
import { UserResponse } from '@/types/study';
import { scenarios } from '@/data/scenarios';
import config from '@/data/config.json';
import { useRouter } from 'next/navigation';
import { submitResponse } from '@/utils/api';

export default function Scenarios() {
  const router = useRouter();
  const [currentScenario, setCurrentScenario] = React.useState(1);
  const [responses, setResponses] = React.useState<Record<number, number[]>>({});
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [completedScenarios, setCompletedScenarios] = React.useState<Set<number>>(new Set());

  useEffect(() => {
    // Check if user has completed consent and tutorial
    const hasConsent = localStorage.getItem('studyConsent');
    const hasTutorial = localStorage.getItem('tutorialComplete');
    
    if (!hasConsent) {
      router.push('/consent');
    } else if (!hasTutorial) {
      router.push('/tutorial');
    }
    
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
      if (config.study.backend.enabled) {
        const result = await submitResponse(response);
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
      } else if ('distribution' in response.response_data) {
        updatedResponses = {
          ...updatedResponses,
          [currentScenario]: response.response_data.distribution || []
        };
        setResponses(updatedResponses);
        
        // Store the points positions if available (for continuous values)
        if ('points' in response.response_data && response.response_data.points) {
          localStorage.setItem(`pointPositions_${currentScenario}`, 
            JSON.stringify(response.response_data.points));
        }
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
      if (currentScenario < scenarios.length) {
        setTimeout(() => {
          setCurrentScenario(currentScenario + 1);
          setSubmitStatus('idle');
        }, 1000);
      } else {
        // Check if all scenarios are completed
        const allCompleted = scenarios.every(scenario => 
          updatedCompletedScenarios.has(scenario.scenario_id)
        );

        if (allCompleted) {
          localStorage.setItem('scenariosComplete', 'true');
          setTimeout(() => {
            router.push('/demographic');
          }, 1000);
        } else {
          // Find the first incomplete scenario
          const firstIncomplete = scenarios.find(
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
    if (scenarioId >= 1 && scenarioId <= scenarios.length) {
      setCurrentScenario(scenarioId);
      setSubmitStatus('idle');
    }
  };

  const currentScenarioData = scenarios.find(s => s.scenario_id === currentScenario);

  if (!currentScenarioData) {
    return <div>Error: Scenario not found</div>;
  }

  return (
    <main className="min-h-screen pb-20">
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
        totalScenarios={scenarios.length}
        onNavigate={handleNavigate}
        completedScenarios={completedScenarios}
      />
    </main>
  );
} 