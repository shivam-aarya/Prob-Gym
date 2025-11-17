import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { loadStudyConfig } from '@/studies/loader';
import { StudyProvider } from '@/contexts/StudyContext';
import { TestStudyBanner } from '@/components/admin/TestStudyBanner';

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

  // Get study metadata via API route (ensures we access the same registry instance)
  // This is critical for test studies in production serverless environments
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  console.log(`[StudyLayout] Fetching metadata for ${studySlug} from ${baseUrl}`);

  const metadataResponse = await fetch(`${baseUrl}/api/studies/${studySlug}/metadata`, {
    cache: 'no-store', // Don't cache test studies
  });

  if (!metadataResponse.ok) {
    console.error(`[StudyLayout] Failed to fetch metadata: ${metadataResponse.status}`);
    notFound();
  }

  const metadataResult = await metadataResponse.json();

  if (!metadataResult.success || !metadataResult.metadata) {
    console.error(`[StudyLayout] No metadata in response`);
    notFound();
  }

  const metadata = metadataResult.metadata;
  console.log(`[StudyLayout] Successfully loaded metadata for: ${metadata.title}`);

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

  // Check if this is a test study
  const isTestStudy = studySlug.startsWith('TEST_');

  return (
    <StudyProvider metadata={metadata} config={config}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Test Study Preview Banner */}
        {isTestStudy && <TestStudyBanner />}
        {children}
      </div>
    </StudyProvider>
  );
}
