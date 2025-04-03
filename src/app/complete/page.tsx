'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Complete() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has completed the study
    const isComplete = localStorage.getItem('studyComplete');
    if (!isComplete) {
      router.push('/');
    }
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg mb-6">
          You have successfully completed the study. Your responses have been recorded and will be used for research purposes.
        </p>
        <p className="text-lg">
          You may now close this window.
        </p>
      </div>
    </main>
  );
} 