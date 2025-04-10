'use client';

import React, { useEffect } from 'react';
import ConsentPage from '@/components/ConsentPage';
import config from '@/data/config.json';
import { useRouter } from 'next/navigation';
import { generateParticipantId } from '@/utils/api';
import { db } from '@/services/database';

export default function Consent() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('studyConsent');
    if (hasConsent) {
      // Check if they've completed the tutorial
      const hasTutorial = localStorage.getItem('tutorialComplete');
      if (hasTutorial) {
        router.push('/scenarios');
      } else {
        router.push('/tutorial');
      }
    }
  }, [router]);

  const handleConsent = async () => {
    // Generate a unique participant ID
    const participantId = generateParticipantId();
    
    // Store consent and participant ID in localStorage
    localStorage.setItem('studyConsent', 'true');
    localStorage.setItem('participantId', participantId);
    
    try {
      // Initialize participant in the database
      await db.createOrUpdateParticipant(participantId);
    } catch (error) {
      console.error('Error initializing participant:', error);
      // Continue even if database initialization fails
    }
    
    router.push('/tutorial');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <ConsentPage
        config={config.consent}
        onConsent={handleConsent}
      />
    </main>
  );
} 