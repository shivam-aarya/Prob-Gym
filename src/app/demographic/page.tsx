'use client';

import React, { useEffect } from 'react';
import DemographicSurvey from '@/components/DemographicSurvey';
import config from '@/data/config.json';
import { useRouter } from 'next/navigation';
import { db } from '@/services/database';

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

  const handleSubmit = async () => {
    try {
      // Calculate total completion time
      const startTime = localStorage.getItem('studyStartTime');
      if (startTime) {
        const endTime = new Date();
        const totalDurationMs = endTime.getTime() - new Date(startTime).getTime();
        
        // Get participant ID
        const participantId = localStorage.getItem('participantId');
        if (participantId) {
          // Update total completion time in database
          await db.updateTotalCompletionTime(participantId, totalDurationMs);
        }
      }

      // Mark study as complete
      localStorage.setItem('studyComplete', 'true');
      router.push('/complete');
    } catch (error) {
      console.error('Error updating completion time:', error);
      // Still proceed to complete page even if there's an error
      localStorage.setItem('studyComplete', 'true');
      router.push('/complete');
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