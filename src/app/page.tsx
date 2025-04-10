'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import QuestionFrame from '@/components/QuestionFrame';
import ScenarioNavigation from '@/components/ScenarioNavigation';
import ConsentPage from '@/components/ConsentPage';
import TutorialPage from '@/components/TutorialPage';
import { UserResponse } from '@/types/study';
import { scenarios } from '@/data/scenarios';
import config from '@/data/config.json';
import { useRouter } from 'next/navigation';

type StudyStage = 'consent' | 'tutorial' | 'questions';

export default function Home() {
  const router = useRouter();
  const [studyStage, setStudyStage] = useState<StudyStage>('consent');
  const [currentScenario, setCurrentScenario] = useState(1);
  const [responses, setResponses] = useState<Record<number, number[]>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [completedScenarios, setCompletedScenarios] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('studyConsent');
    if (hasConsent) {
      // Check if they've completed the tutorial
      const hasTutorial = localStorage.getItem('tutorialComplete');
      if (hasTutorial) {
        router.push('/scenarios');
      } else {
        router.push('/tutorial');
      }
    } else {
      router.push('/consent');
    }
  }, [router]);

  // Load saved responses from localStorage
  useEffect(() => {
    const savedResponses = localStorage.getItem('userResponses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
    
    const savedCompletedScenarios = localStorage.getItem('completedScenarios');
    if (savedCompletedScenarios) {
      setCompletedScenarios(
        new Set(JSON.parse(savedCompletedScenarios))
      );
    }
  }, []);

  const handleSubmit = async (response: UserResponse) => {
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
      let updatedResponses = { ...responses };
      if ('values' in response.response_data && response.response_data.values) {
        updatedResponses = {
          ...updatedResponses,
          [currentScenario]: response.response_data.values 
        };
        setResponses(updatedResponses);
      }
      
      // Save to localStorage
      localStorage.setItem('userResponses', JSON.stringify(updatedResponses));
      
      // Mark scenario as completed
      const updatedCompletedScenarios = new Set(completedScenarios);
      updatedCompletedScenarios.add(currentScenario);
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

  const renderContent = () => {
    switch (studyStage) {
      case 'consent':
        return (
          <ConsentPage
            config={config.consent}
            onConsent={() => setStudyStage('tutorial')}
          />
        );
      case 'tutorial':
        return (
          <TutorialPage
            config={config.tutorial}
            onComplete={() => setStudyStage('questions')}
          />
        );
      case 'questions':
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <main className="min-h-screen pb-20">
      <Layout config={currentScenarioData}>
        {renderContent()}
      </Layout>

      {studyStage === 'questions' && (
        <ScenarioNavigation
          currentScenario={currentScenario}
          totalScenarios={scenarios.length}
          onNavigate={handleNavigate}
          completedScenarios={completedScenarios}
        />
      )}
    </main>
  );
}
