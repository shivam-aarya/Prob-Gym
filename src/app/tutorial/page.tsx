'use client';

import React, { useEffect, useState } from 'react';
import TutorialPage from '@/components/TutorialPage';
import config from '@/data/config.json';
import { useRouter } from 'next/navigation';

export default function Tutorial() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Check if user has given consent
    const hasConsent = localStorage.getItem('studyConsent');
    if (!hasConsent) {
      router.push('/consent');
    }

    // Check if they've already completed the tutorial
    const hasTutorial = localStorage.getItem('tutorialComplete');
    if (hasTutorial) {
      router.push('/scenarios');
    }
  }, [router]);

  const handleComplete = () => {
    if (isNavigating) return; // Prevent multiple navigations
    
    setIsNavigating(true);
    try {
      // Store tutorial completion
      localStorage.setItem('tutorialComplete', 'true');
      
      // Use direct URL navigation as fallback
      window.location.href = '/scenarios';
      
      // The router.push might not execute if the direct navigation works first
      setTimeout(() => {
        router.push('/scenarios');
      }, 50);
    } catch (error) {
      console.error('Navigation error:', error);
      // Last resort fallback
      window.location.replace('/scenarios');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <TutorialPage
        config={config.tutorial as any}
        onComplete={handleComplete}
      />
    </main>
  );
} 