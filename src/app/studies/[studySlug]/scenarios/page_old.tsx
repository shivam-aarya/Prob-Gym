'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import QuestionFrame from '@/components/QuestionFrame';
import MultiQuestionFrame from '@/components/MultiQuestionFrame';
import ScenarioNavigation from '@/components/ScenarioNavigation';
import { UserResponse, StudyConfig, QuestionResponse } from '@/types/study';
import { useRouter } from 'next/navigation';
import { useStudy } from '@/contexts/StudyContext';
import { getSelectedScenarios } from '@/utils/scenarioSelection';
import { getStudyItem } from '@/utils/studyStorage';

export default function Scenarios() {
  const { config, studySlug } = useStudy();
  const router = useRouter();
  const [currentScenario, setCurrentScenario] = React.useState(1);
  const [responses, setResponses] = React.useState<Record<number, number[]>>({});
  const [multiQuestionResponses, setMultiQuestionResponses] = React.useState<Record<number, QuestionResponse[]>>({});
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [completedScenarios, setCompletedScenarios] = React.useState<Set<number>>(new Set());
  const [selectedScenarios, setSelectedScenarios] = useState<StudyConfig[]>([]);

  useEffect(() => {
    // Only check for consent if consent is required
    if (config.consent) {
      const hasConsent = getStudyItem(studySlug, 'consented');
      if (!hasConsent) {
        router.push(`/studies/${studySlug}/consent`);
        return;
      }
    }

    // Only check for tutorial if tutorial is required
    if (config.tutorial) {
      const hasTutorial = getStudyItem(studySlug, 'tutorialComplete');
      if (!hasTutorial) {
        router.push(`/studies/${studySlug}/tutorial`);
        return;
      }
    }

    // Get the selected scenarios for this participant
    const loadScenarios = async () => {
      const scenarios = await getSelectedScenarios(studySlug);
      setSelectedScenarios(scenarios);
    };
    loadScenarios();

    // Load saved responses from localStorage
    const savedResponses = getStudyItem(studySlug, 'userResponses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }

    // Load completed scenarios from localStorage
    const savedCompletedScenarios = getStudyItem(studySlug, 'completedScenarios');
    if (savedCompletedScenarios) {
      setCompletedScenarios(new Set(JSON.parse(savedCompletedScenarios)));
    }
  }, [studySlug, router, config.consent, config.tutorial]);

  const handleSubmit = async (response: UserResponse) => {
    setSubmitStatus('idle');

    try {
      // Get the current scenario data
      const currentScenarioData = selectedScenarios.find((s) => s.scenario_id === currentScenario);
      if (!currentScenarioData) {
        throw new Error('Current scenario not found');
      }

      // Use the original scenario ID for API submission if available
      const submissionScenarioId =
        currentScenarioData.original_scenario_id || currentScenarioData.scenario_id;
      const apiResponse = { ...response, scenario_id: submissionScenarioId };

      if (config.study.backend?.enabled) {
        // Get participant ID (study-scoped)
        const participantId = localStorage.getItem(`${studySlug}_participantId`) || `participant_${Date.now()}`;
        if (!localStorage.getItem(`${studySlug}_participantId`)) {
          localStorage.setItem(`${studySlug}_participantId`, participantId);
        }

        // Submit to study-scoped API
        const result = await fetch(`/api/studies/${studySlug}/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ participantId, response: apiResponse }),
        });

        const data = await result.json();
        if (!data.success) {
          throw new Error('Failed to submit response');
        }
      }

      // Store the response locally using the actual scenario_id
      // Handle both single-question and multi-question responses
      if (response.responses) {
        // Multi-question response
        const updatedMultiResponses = {
          ...multiQuestionResponses,
          [currentScenarioData.scenario_id]: response.responses,
        };
        setMultiQuestionResponses(updatedMultiResponses);
        localStorage.setItem(`${studySlug}_multiQuestionResponses`, JSON.stringify(updatedMultiResponses));
      } else if (response.response_data && 'values' in response.response_data) {
        // Single-question response (legacy)
        const updatedResponses = {
          ...responses,
          [currentScenarioData.scenario_id]: response.response_data.values || [],
        };
        setResponses(updatedResponses);
        localStorage.setItem(`${studySlug}_userResponses`, JSON.stringify(updatedResponses));

        // Store the points positions if available (for continuous values)
        if ('points' in response.response_data && response.response_data.points) {
          localStorage.setItem(
            `${studySlug}_pointPositions_${currentScenarioData.scenario_id}`,
            JSON.stringify(response.response_data.points)
          );
        }
      }

      // Mark this scenario as completed using the actual scenario_id
      const updatedCompletedScenarios = new Set([...completedScenarios, currentScenarioData.scenario_id]);
      setCompletedScenarios(updatedCompletedScenarios);

      // Save completed scenarios to localStorage
      localStorage.setItem(
        `${studySlug}_completedScenarios`,
        JSON.stringify(Array.from(updatedCompletedScenarios))
      );

      setSubmitStatus('success');

      // Auto-advance to next scenario after a successful submission
      if (currentScenario < selectedScenarios.length) {
        setTimeout(() => {
          setCurrentScenario(currentScenario + 1);
          setSubmitStatus('idle');
        }, 1000);
      } else {
        // Check if all scenarios are completed
        const allCompleted = selectedScenarios.every((scenario) =>
          updatedCompletedScenarios.has(scenario.scenario_id)
        );

        if (allCompleted) {
          localStorage.setItem(`${studySlug}_scenariosComplete`, 'true');
          setTimeout(() => {
            router.push(`/studies/${studySlug}/demographic`);
          }, 1000);
        } else {
          // Find the first incomplete scenario
          const firstIncomplete = selectedScenarios.find(
            (scenario) => !updatedCompletedScenarios.has(scenario.scenario_id)
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
      localStorage.removeItem(`${studySlug}_selectedScenarios`);
      localStorage.removeItem(`${studySlug}_userResponses`);
      localStorage.removeItem(`${studySlug}_completedScenarios`);
      localStorage.removeItem(`${studySlug}_scenariosComplete`);

      // Reload the page to reset state
      window.location.reload();
    }
  };

  // If scenarios aren't loaded yet, show a loading indicator
  if (selectedScenarios.length === 0) {
    return <div className="flex items-center justify-center min-h-screen">Loading scenarios...</div>;
  }

  const currentScenarioData = selectedScenarios.find((s) => s.scenario_id === currentScenario);

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
        {currentScenarioData.questions && currentScenarioData.questions.length > 0 ? (
          <MultiQuestionFrame
            config={currentScenarioData}
            onSubmit={handleSubmit}
            previousResponses={multiQuestionResponses}
          />
        ) : (
          <QuestionFrame
            config={currentScenarioData}
            onSubmit={handleSubmit}
            previousResponses={responses}
          />
        )}

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
