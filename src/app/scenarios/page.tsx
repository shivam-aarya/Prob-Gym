'use client';

import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import QuestionFrame from '@/components/QuestionFrame';
import ScenarioNavigation from '@/components/ScenarioNavigation';
import { UserResponse } from '@/types/study';
import { scenarios } from '@/data/scenarios';
import config from '@/data/config.json';
import { useRouter } from 'next/navigation';

export default function Scenarios() {
  const router = useRouter();
  const [currentScenario, setCurrentScenario] = React.useState(1);
  const [responses, setResponses] = React.useState<Record<number, number[]>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Check if user has completed consent and tutorial
    const hasConsent = localStorage.getItem('studyConsent');
    const hasTutorial = localStorage.getItem('tutorialComplete');
    
    if (!hasConsent) {
      router.push('/consent');
    } else if (!hasTutorial) {
      router.push('/tutorial');
    }
  }, [router]);

  const handleSubmit = async (response: UserResponse) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (config.study.backend.enabled) {
        const result = await fetch(config.study.backend.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(response),
        });

        if (!result.ok) {
          throw new Error('Failed to submit response');
        }
      }

      // Store the response locally
      if ('values' in response.response_data) {
        setResponses(prev => ({
          ...prev,
          [currentScenario]: response.response_data.values || []
        }));
      }

      setSubmitStatus('success');

      // Auto-advance to next scenario after a successful submission
      if (currentScenario < scenarios.length) {
        setTimeout(() => {
          setCurrentScenario(currentScenario + 1);
          setSubmitStatus('idle');
        }, 1000);
      } else {
        // All scenarios completed
        localStorage.setItem('scenariosComplete', 'true');
        setTimeout(() => {
          router.push('/demographic');
        }, 1000);
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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
        responses={responses}
      />
    </main>
  );
} 