/**
 * Debug endpoint to check test study registry
 */

import { NextResponse } from 'next/server';
import { testStudyRegistry } from '@/services/testStudyRegistry';

export async function GET() {
  const studies = testStudyRegistry.getAllStudies();

  return NextResponse.json({
    count: studies.length,
    studies: studies.map(s => ({
      id: s.id,
      slug: s.slug,
      title: s.metadata.title,
      scenarioCount: s.scenarios.length,
      createdAt: s.createdAt,
    })),
  });
}
