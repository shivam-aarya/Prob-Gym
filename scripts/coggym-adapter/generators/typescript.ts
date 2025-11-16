/**
 * Generator: Create TypeScript files for Prob-Gym studies
 */

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

/**
 * Generate metadata.ts file
 */
export async function generateMetadataFile(
  outputPath: string,
  metadata: any
): Promise<void> {
  const content = `/**
 * Study metadata
 * Auto-generated from CogGym format
 */

import { StudyMetadata } from '@/studies/types';

export const metadata: StudyMetadata = ${JSON.stringify(metadata, null, 2)};
`;

  const filePath = join(outputPath, 'metadata.ts');
  await writeFile(filePath, content, 'utf-8');
}

/**
 * Generate scenarios.ts file
 */
export async function generateScenariosFile(
  outputPath: string,
  scenarios: any[]
): Promise<void> {
  const content = `/**
 * Study scenarios
 * Auto-generated from CogGym format
 */

import { StudyConfig } from '@/types/study';

export const scenarios: StudyConfig[] = ${JSON.stringify(scenarios, null, 2)};
`;

  const filePath = join(outputPath, 'scenarios.ts');
  await writeFile(filePath, content, 'utf-8');
}

/**
 * Generate index.ts file (re-exports)
 */
export async function generateIndexFile(outputPath: string): Promise<void> {
  const content = `/**
 * Study entry point
 * Auto-generated from CogGym format
 */

export { metadata } from './metadata';
export { scenarios } from './scenarios';
`;

  const filePath = join(outputPath, 'index.ts');
  await writeFile(filePath, content, 'utf-8');
}

/**
 * Generate README.md file with import metadata
 */
export async function generateReadme(
  outputPath: string,
  importInfo: {
    experimentName: string;
    sourcePath: string;
    importDate: string;
    scenarioCount: number;
    paperDOI?: string;
  }
): Promise<void> {
  const content = `# ${importInfo.experimentName}

Auto-generated study from CogGym format.

## Import Information

- **Source**: ${importInfo.sourcePath}
- **Import Date**: ${importInfo.importDate}
- **Scenario Count**: ${importInfo.scenarioCount}
${importInfo.paperDOI ? `- **Paper**: ${importInfo.paperDOI}` : ''}

## Notes

This study was automatically converted from CogGym format to Prob-Gym format.
Multi-query trials were split into separate scenarios.

To re-import with updated source data:
\`\`\`bash
npm run coggym:import ${importInfo.sourcePath} --overwrite
\`\`\`
`;

  const filePath = join(outputPath, 'README.md');
  await writeFile(filePath, content, 'utf-8');
}

/**
 * Create study directory structure
 */
export async function createStudyDirectory(
  studiesPath: string,
  studySlug: string
): Promise<string> {
  const studyPath = join(studiesPath, studySlug);

  // Create main directory
  await mkdir(studyPath, { recursive: true });

  // Create assets subdirectory
  const assetsPath = join(studyPath, 'assets');
  await mkdir(assetsPath, { recursive: true });

  return studyPath;
}

/**
 * Generate config.json file
 */
export async function generateConfigFile(
  outputPath: string,
  config: any
): Promise<void> {
  const content = JSON.stringify(config, null, 2);
  const filePath = join(outputPath, 'config.json');
  await writeFile(filePath, content, 'utf-8');
}

/**
 * Generate all TypeScript files for a study
 */
export async function generateStudyFiles(
  outputPath: string,
  metadata: any,
  scenarios: any[],
  config: any,
  importInfo: {
    experimentName: string;
    sourcePath: string;
    scenarioCount: number;
    paperDOI?: string;
  }
): Promise<void> {
  // Generate TypeScript files
  await generateMetadataFile(outputPath, metadata);
  await generateScenariosFile(outputPath, scenarios);
  await generateIndexFile(outputPath);
  await generateConfigFile(outputPath, config);

  // Generate README
  await generateReadme(outputPath, {
    ...importInfo,
    importDate: new Date().toISOString(),
  });
}
