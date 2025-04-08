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
    // Mark study as complete
    localStorage.setItem('studyComplete', 'true');
    router.push('/complete');
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