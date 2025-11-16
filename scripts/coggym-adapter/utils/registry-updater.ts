/**
 * Utility to automatically update study registry files
 */

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

/**
 * Update the study loader with a new study
 */
export async function updateStudyLoader(
  projectRoot: string,
  studySlug: string
): Promise<void> {
  const loaderPath = join(projectRoot, 'src/studies/loader.ts');

  try {
    let content = await readFile(loaderPath, 'utf-8');

    // Find the AVAILABLE_STUDIES array
    const studiesMatch = content.match(
      /export const AVAILABLE_STUDIES = \[([\s\S]*?)\] as const;/
    );

    if (!studiesMatch) {
      throw new Error('Could not find AVAILABLE_STUDIES array in loader.ts');
    }

    // Parse existing studies
    const existingStudiesStr = studiesMatch[1];
    const existingStudies = existingStudiesStr
      .split(',')
      .map(s => s.trim().replace(/['"]/g, ''))
      .filter(s => s.length > 0);

    // Check if study already exists
    if (existingStudies.includes(studySlug)) {
      console.log(`   ⚠️  Study "${studySlug}" already in loader, skipping update`);
      return;
    }

    // Add new study
    existingStudies.push(studySlug);

    // Generate new array content
    const newStudiesStr = existingStudies.map(s => `  '${s}'`).join(',\n');
    const newArrayContent = `export const AVAILABLE_STUDIES = [\n${newStudiesStr},\n] as const;`;

    // Replace in content
    content = content.replace(
      /export const AVAILABLE_STUDIES = \[[\s\S]*?\] as const;/,
      newArrayContent
    );

    // Write back
    await writeFile(loaderPath, content, 'utf-8');
    console.log(`   ✓ Updated study loader`);
  } catch (error) {
    console.error(`   ⚠️  Failed to update study loader: ${(error as Error).message}`);
  }
}

/**
 * Update the legacy registry.ts file
 */
export async function updateRegistry(
  projectRoot: string,
  studySlug: string
): Promise<void> {
  const registryPath = join(projectRoot, 'src/studies/registry.ts');

  try {
    let content = await readFile(registryPath, 'utf-8');

    // Check if already imported
    const importPattern = new RegExp(`import.*from.*${studySlug}`);
    if (importPattern.test(content)) {
      console.log(`   ⚠️  Study "${studySlug}" already in registry, skipping update`);
      return;
    }

    // Add import statement
    const metadataVarName = studySlug.replace(/-/g, '') + 'Metadata';
    const importStatement = `import { metadata as ${metadataVarName} } from './${studySlug}/metadata';`;

    // Insert after existing imports
    const lastImportIndex = content.lastIndexOf('import');
    const nextLineIndex = content.indexOf('\n', lastImportIndex);
    content =
      content.slice(0, nextLineIndex + 1) +
      importStatement +
      '\n' +
      content.slice(nextLineIndex + 1);

    // Add to STUDY_REGISTRY object
    const registryMatch = content.match(
      /const STUDY_REGISTRY: Record<string, StudyMetadata> = \{([\s\S]*?)\};/
    );

    if (!registryMatch) {
      throw new Error('Could not find STUDY_REGISTRY object');
    }

    const registryContent = registryMatch[1];
    const newEntry = `  '${studySlug}': ${metadataVarName},`;

    // Insert before the comment
    const commentIndex = registryContent.indexOf('// Future studies');
    if (commentIndex !== -1) {
      const beforeComment = registryContent.slice(0, commentIndex);
      const afterComment = registryContent.slice(commentIndex);
      const updatedRegistry = beforeComment + newEntry + '\n  ' + afterComment;

      content = content.replace(
        /const STUDY_REGISTRY: Record<string, StudyMetadata> = \{[\s\S]*?\};/,
        `const STUDY_REGISTRY: Record<string, StudyMetadata> = {${updatedRegistry}};`
      );
    } else {
      // Just append before closing brace
      const updatedRegistry = registryContent.trimEnd() + '\n' + newEntry + '\n';
      content = content.replace(
        /const STUDY_REGISTRY: Record<string, StudyMetadata> = \{[\s\S]*?\};/,
        `const STUDY_REGISTRY: Record<string, StudyMetadata> = {${updatedRegistry}};`
      );
    }

    await writeFile(registryPath, content, 'utf-8');
    console.log(`   ✓ Updated registry.ts`);
  } catch (error) {
    console.error(`   ⚠️  Failed to update registry: ${(error as Error).message}`);
  }
}

/**
 * Update scenario selection utility
 */
export async function updateScenarioSelection(
  projectRoot: string,
  studySlug: string
): Promise<void> {
  const selectionPath = join(projectRoot, 'src/utils/scenarioSelection.ts');

  try {
    let content = await readFile(selectionPath, 'utf-8');

    // Check if already imported
    const importPattern = new RegExp(`import.*from.*${studySlug}`);
    if (importPattern.test(content)) {
      console.log(
        `   ⚠️  Study "${studySlug}" already in scenario selection, skipping update`
      );
      return;
    }

    // Add import statement
    const scenariosVarName = studySlug.replace(/-/g, '') + 'Scenarios';
    const importStatement = `import { scenarios as ${scenariosVarName} } from '@/studies/${studySlug}/scenarios';`;

    // Insert after existing scenario imports
    const lastScenarioImport = content.lastIndexOf("from '@/studies/");
    if (lastScenarioImport !== -1) {
      const nextLineIndex = content.indexOf('\n', lastScenarioImport);
      content =
        content.slice(0, nextLineIndex + 1) +
        importStatement +
        '\n' +
        content.slice(nextLineIndex + 1);
    } else {
      // Insert after other imports
      const lastImportIndex = content.lastIndexOf('import');
      const nextLineIndex = content.indexOf('\n', lastImportIndex);
      content =
        content.slice(0, nextLineIndex + 1) +
        importStatement +
        '\n' +
        content.slice(nextLineIndex + 1);
    }

    // Add to if-else chain
    const elsePattern = /} else \{[\s\S]*?\/\/ Fallback to legacy/;
    const newCondition = `} else if (studySlug === '${studySlug}') {
    scenarios = ${scenariosVarName};
  } else {
    // Fallback to legacy`;

    content = content.replace(elsePattern, newCondition);

    await writeFile(selectionPath, content, 'utf-8');
    console.log(`   ✓ Updated scenario selection`);
  } catch (error) {
    console.error(
      `   ⚠️  Failed to update scenario selection: ${(error as Error).message}`
    );
  }
}

/**
 * Update all registry files for a new study
 */
export async function registerStudy(
  projectRoot: string,
  studySlug: string
): Promise<void> {
  console.log('\n📝 Registering study in codebase...');

  await Promise.all([
    updateStudyLoader(projectRoot, studySlug),
    updateRegistry(projectRoot, studySlug),
    updateScenarioSelection(projectRoot, studySlug),
  ]);
}
