import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getStudy } from '@/studies/registry';
import { StudyProvider } from '@/contexts/StudyContext';

/**
 * Study layout
 * Loads study metadata and configuration, provides StudyContext
 */
export default async function StudyLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ studySlug: string }>;
}) {
  const { studySlug } = await params;

  // Get study metadata from registry
  const metadata = getStudy(studySlug);

  if (!metadata) {
    notFound();
  }

  // Load study configuration
  // For Prob-Gym, we'll load the config from the JSON file
  let config;
  try {
    if (studySlug === 'prob-gym') {
      config = await import(`@/studies/prob-gym/config.json`).then((m) => m.default);

      // Register Prob-Gym plugins
      if (typeof window !== 'undefined') {
        // Client-side plugin registration happens in the client component
      } else {
        // Server-side: just log
        console.log('[StudyLayout] Loading study:', studySlug);
      }
    } else {
      // For other studies, load their config similarly
      config = await import(`@/studies/${studySlug}/config.json`).then((m) => m.default);
    }
  } catch (error) {
    console.error(`Failed to load config for study ${studySlug}:`, error);
    // Provide minimal config as fallback
    config = {
      study: {
        title: metadata.title,
        randomizeQuestions: false,
        questionsPerParticipant: 10,
      },
    };
  }

  return (
    <StudyProvider metadata={metadata} config={config}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {children}
      </div>
    </StudyProvider>
  );
}
