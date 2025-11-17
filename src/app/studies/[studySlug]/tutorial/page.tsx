'use client';

import React, { useEffect, useState } from 'react';
import TutorialPage from '@/components/TutorialPage';
import { useRouter } from 'next/navigation';
import { useStudy } from '@/contexts/StudyContext';
import { getStudyItem, setStudyItem } from '@/utils/studyStorage';

export default function Tutorial() {
  const { config, studySlug } = useStudy();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Only check for consent if consent is actually required
    if (config.consent) {
      const hasConsent = getStudyItem(studySlug, 'consented');
      if (!hasConsent) {
        router.push(`/studies/${studySlug}/consent`);
        return;
      }
    }

    // Check if they've already completed the tutorial
    const hasTutorial = getStudyItem(studySlug, 'tutorialComplete');
    if (hasTutorial) {
      router.push(`/studies/${studySlug}/scenarios`);
      return;
    }

    // If no tutorial configured, skip to scenarios
    if (!config.tutorial) {
      router.push(`/studies/${studySlug}/scenarios`);
    }
  }, [studySlug, router, config.tutorial, config.consent]);

  const handleComplete = () => {
    if (isNavigating) return; // Prevent multiple navigations

    setIsNavigating(true);
    try {
      // Store tutorial completion
      setStudyItem(studySlug, 'tutorialComplete', 'true');

      // Navigate to scenarios
      router.push(`/studies/${studySlug}/scenarios`);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback
      window.location.href = `/studies/${studySlug}/scenarios`;
    }
  };

  // Show nothing while redirecting
  if (!config.tutorial) {
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
