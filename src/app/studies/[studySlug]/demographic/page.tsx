'use client';

import React, { useEffect, useRef } from 'react';
import DemographicSurvey from '@/components/DemographicSurvey';
import { useRouter } from 'next/navigation';
import { useStudy } from '@/contexts/StudyContext';
import { getStudyItem, setStudyItem, getParticipantId } from '@/utils/studyStorage';

export default function Demographic() {
  const { config, studySlug } = useStudy();
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Prevent multiple redirects
    if (hasRedirected.current) return;

    // Only check for consent if consent is configured
    if (config.consent) {
      const hasConsent = getStudyItem(studySlug, 'consented');
      if (!hasConsent) {
        console.log('[Demographic] Missing consent, redirecting to consent');
        hasRedirected.current = true;
        router.push(`/studies/${studySlug}/consent`);
        return;
      }
    }

    // Only check for tutorial if tutorial is configured
    if (config.tutorial) {
      const hasTutorial = getStudyItem(studySlug, 'tutorialComplete');
      if (!hasTutorial) {
        console.log('[Demographic] Missing tutorial, redirecting to tutorial');
        hasRedirected.current = true;
        router.push(`/studies/${studySlug}/tutorial`);
        return;
      }
    }

    // Only check for scenarios if scenarios are configured
    if (config.scenarios) {
      const hasCompletedScenarios = getStudyItem(studySlug, 'scenariosComplete');
      if (!hasCompletedScenarios) {
        console.log('[Demographic] Missing scenarios completion, redirecting to scenarios');
        hasRedirected.current = true;
        router.push(`/studies/${studySlug}/scenarios`);
        return;
      }
    }

    console.log('[Demographic] All required steps completed, staying on demographic page');
  }, [studySlug, config.consent, config.tutorial, config.scenarios]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (demographicResponses: Record<string, string>) => {
    try {
      // Calculate total completion time
      const startTime = getStudyItem(studySlug, 'studyStartTime');
      const endTime = new Date();
      const totalDurationMs = startTime
        ? endTime.getTime() - new Date(startTime).getTime()
        : 0;

      // Get participant ID
      const participantId = getParticipantId(studySlug);

      if (!participantId) {
        console.error('No participant ID found');
        // Still proceed to complete page
        setStudyItem(studySlug, 'studyComplete', 'true');
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
      setStudyItem(studySlug, 'studyComplete', 'true');
      router.push(`/studies/${studySlug}/complete`);
    } catch (error) {
      console.error('Error submitting demographic data:', error);
      // Still proceed to complete page even if there's an error
      setStudyItem(studySlug, 'studyComplete', 'true');
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
