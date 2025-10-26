'use client';

import React, { useEffect, useState } from 'react';
import TutorialPage from '@/components/TutorialPage';
import { useRouter } from 'next/navigation';
import { useStudy } from '@/contexts/StudyContext';

export default function Tutorial() {
  const { config, studySlug } = useStudy();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Check if user has given consent
    const hasConsent = localStorage.getItem(`${studySlug}_consented`);
    if (!hasConsent) {
      router.push(`/studies/${studySlug}/consent`);
    }

    // Check if they've already completed the tutorial
    const hasTutorial = localStorage.getItem(`${studySlug}_tutorialComplete`);
    if (hasTutorial) {
      router.push(`/studies/${studySlug}/scenarios`);
    }
  }, [studySlug, router]);

  const handleComplete = () => {
    if (isNavigating) return; // Prevent multiple navigations

    setIsNavigating(true);
    try {
      // Store tutorial completion
      localStorage.setItem(`${studySlug}_tutorialComplete`, 'true');

      // Navigate to scenarios
      router.push(`/studies/${studySlug}/scenarios`);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback
      window.location.href = `/studies/${studySlug}/scenarios`;
    }
  };

  if (!config.tutorial) {
    // If no tutorial configured, skip to scenarios
    router.push(`/studies/${studySlug}/scenarios`);
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <TutorialPage
        config={config.tutorial as any}
        onComplete={handleComplete}
      />
    </main>
  );
}
