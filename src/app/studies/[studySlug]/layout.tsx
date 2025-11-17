import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { loadStudyMetadata, loadStudyConfig } from '@/studies/loader';
import { StudyProvider } from '@/contexts/StudyContext';

// Enable dynamic rendering for test studies in production
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

/**
 * Study layout
 * Loads study metadata and configuration, provides StudyContext
 * Supports both regular studies and in-memory test studies
 */
export default async function StudyLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ studySlug: string }>;
}) {
  const { studySlug } = await params;

  // Get study metadata using dynamic loader (supports test studies)
  const metadata = await loadStudyMetadata(studySlug);

  if (!metadata) {
    notFound();
  }

  // Load study configuration (test studies don't have config files)
  let config;
  try {
    config = await loadStudyConfig(studySlug);
  } catch (error) {
    console.error(`Failed to load config for study ${studySlug}:`, error);
  }

  // Use fallback config if not found (normal for test studies)
  if (!config) {
    // For test studies, build config from metadata
    config = {
      study: {
        title: metadata.title,
        randomizeQuestions: metadata.settings.randomizeQuestions ?? false,
        questionsPerParticipant: metadata.settings.questionsPerParticipant ?? 10,
      },
      // Include consent if present in metadata
      consent: (metadata as any).consent || undefined,
      // Include tutorial if present in metadata
      tutorial: (metadata as any).tutorial || undefined,
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
