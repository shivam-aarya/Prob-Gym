'use client';

import React, { useEffect } from 'react';
import DemographicSurvey from '@/components/DemographicSurvey';
import config from '@/data/config.json';
import { useRouter } from 'next/navigation';

export default function Demographic() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has completed all previous steps
    const hasConsent = localStorage.getItem('studyConsent');
    const hasTutorial = localStorage.getItem('tutorialComplete');
    const hasCompletedScenarios = localStorage.getItem('scenariosComplete');
    
    if (!hasConsent) {
      router.push('/consent');
    } else if (!hasTutorial) {
      router.push('/tutorial');
    } else if (!hasCompletedScenarios) {
      router.push('/scenarios');
    }
  }, [router]);

  const handleSubmit = async (responses: Record<string, string>) => {
    try {
      if (config.study.backend.enabled) {
        const result = await fetch('/api/submit-demographic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(responses),
        });

        if (!result.ok) {
          throw new Error('Failed to submit demographic data');
        }
      }

      // Mark study as complete
      localStorage.setItem('studyComplete', 'true');
      router.push('/complete');
    } catch (error) {
      console.error('Error submitting demographic data:', error);
      // Handle error (you might want to show an error message to the user)
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <DemographicSurvey
        config={config.demographic}
        onSubmit={handleSubmit}
      />
    </main>
  );
} 