'use client';

import React, { useEffect } from 'react';
import DemographicSurvey from '@/components/DemographicSurvey';
import { useRouter } from 'next/navigation';
import { useStudy } from '@/contexts/StudyContext';

export default function Demographic() {
  const { config, studySlug } = useStudy();
  const router = useRouter();

  useEffect(() => {
    // Check if user has completed all previous steps
    const hasConsent = localStorage.getItem(`${studySlug}_consented`);
    const hasTutorial = localStorage.getItem(`${studySlug}_tutorialComplete`);
    const hasCompletedScenarios = localStorage.getItem(`${studySlug}_scenariosComplete`);

    if (!hasConsent) {
      router.push(`/studies/${studySlug}/consent`);
    } else if (!hasTutorial) {
      router.push(`/studies/${studySlug}/tutorial`);
    } else if (!hasCompletedScenarios) {
      router.push(`/studies/${studySlug}/scenarios`);
    }
  }, [studySlug, router]);

  const handleSubmit = async (demographicResponses: Record<string, string>) => {
    try {
      // Calculate total completion time
      const startTime = localStorage.getItem(`${studySlug}_studyStartTime`);
      const endTime = new Date();
      const totalDurationMs = startTime
        ? endTime.getTime() - new Date(startTime).getTime()
        : 0;

      // Get participant ID
      const participantId = localStorage.getItem('participantId');

      if (!participantId) {
        console.error('No participant ID found');
        // Still proceed to complete page
        localStorage.setItem(`${studySlug}_studyComplete`, 'true');
        router.push(`/studies/${studySlug}/complete`);
        return;
      }

      console.log('Submitting demographic data:', {
        participantId,
        demographicData: demographicResponses,
        totalCompletionTime: totalDurationMs,
      });

      // Submit demographic data and completion time via study-scoped API
      const response = await fetch(`/api/studies/${studySlug}/demographic`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantId,
          demographicData: demographicResponses,
          totalCompletionTime: totalDurationMs,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        console.error('Error submitting demographic data:', result.message);
      } else {
        console.log('Demographic data submitted successfully');
      }

      // Mark study as complete and proceed regardless of API result
      localStorage.setItem(`${studySlug}_studyComplete`, 'true');
      router.push(`/studies/${studySlug}/complete`);
    } catch (error) {
      console.error('Error submitting demographic data:', error);
      // Still proceed to complete page even if there's an error
      localStorage.setItem(`${studySlug}_studyComplete`, 'true');
      router.push(`/studies/${studySlug}/complete`);
    }
  };

  if (!config.demographic) {
    // If no demographic configured, skip to complete
    router.push(`/studies/${studySlug}/complete`);
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <DemographicSurvey config={config.demographic} onSubmit={handleSubmit} studySlug={studySlug} />
    </main>
  );
}
