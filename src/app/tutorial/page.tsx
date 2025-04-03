'use client';

import React, { useEffect } from 'react';
import TutorialPage from '@/components/TutorialPage';
import config from '@/data/config.json';
import { useRouter } from 'next/navigation';

export default function Tutorial() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has given consent
    const hasConsent = localStorage.getItem('studyConsent');
    if (!hasConsent) {
      router.push('/consent');
    }
  }, [router]);

  const handleComplete = () => {
    // Store tutorial completion
    localStorage.setItem('tutorialComplete', 'true');
    router.push('/scenarios');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <TutorialPage
        config={config.tutorial}
        onComplete={handleComplete}
      />
    </main>
  );
} 