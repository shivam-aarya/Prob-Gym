'use client';

import React from 'react';
import ConsentPage from '@/components/ConsentPage';
import config from '@/data/config.json';
import { useRouter } from 'next/navigation';

export default function Consent() {
  const router = useRouter();

  const handleConsent = () => {
    // Store consent in localStorage to prevent bypassing
    localStorage.setItem('studyConsent', 'true');
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