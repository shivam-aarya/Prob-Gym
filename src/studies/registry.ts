import { StudyMetadata, StudyFilterOptions, StudySummary } from './types';
import { probGymMetadata } from './prob-gym/metadata';
import { metadata as gerstenberg2012pingexp1Metadata } from './gerstenberg2012ping-exp1/metadata';
import { metadata as jern2017peopleexp1Metadata } from './jern2017people-exp1/metadata';

/**
 * Central registry of all studies in the platform
 */
const STUDY_REGISTRY: Record<string, StudyMetadata> = {
  'prob-gym': probGymMetadata,
    'gerstenberg2012ping-exp1': gerstenberg2012pingexp1Metadata,
    'jern2017people-exp1': jern2017peopleexp1Metadata,
  // Future studies will be added here
};

/**
 * Get a study by its slug
 * @param slug The study slug
 * @returns Study metadata or undefined if not found
 */
export function getStudy(slug: string): StudyMetadata | undefined {
  return STUDY_REGISTRY[slug];
}

/**
 * Get all registered studies
 * @returns Array of all study metadata
 */
export function getAllStudies(): StudyMetadata[] {
  return Object.values(STUDY_REGISTRY);
}

/**
 * List studies with optional filtering
 * @param filters Filter options
 * @returns Filtered array of study metadata
 */
export function listStudies(filters?: StudyFilterOptions): StudyMetadata[] {
  let studies = getAllStudies();

  if (!filters) {
    return studies;
  }

  // Filter by status
  if (filters.status) {
    const statusArray = Array.isArray(filters.status) ? filters.status : [filters.status];
    studies = studies.filter((study) => statusArray.includes(study.status));
  }

  // Filter by cognitive process
  if (filters.cognitiveProcess) {
    const processes = Array.isArray(filters.cognitiveProcess)
      ? filters.cognitiveProcess
      : [filters.cognitiveProcess];

    studies = studies.filter((study) =>
      processes.some((process) =>
        study.tags.cognitiveProcess?.includes(process)
      )
    );
  }

  // Filter by modality
  if (filters.modality) {
    const modalities = Array.isArray(filters.modality)
      ? filters.modality
      : [filters.modality];

    studies = studies.filter((study) =>
      modalities.some((modality) => study.tags.modality?.includes(modality))
    );
  }

  // Filter by study length
  if (filters.studyLength) {
    const lengths = Array.isArray(filters.studyLength)
      ? filters.studyLength
      : [filters.studyLength];

    studies = studies.filter((study) =>
      study.tags.studyLength ? lengths.includes(study.tags.studyLength) : false
    );
  }

  // Filter by search term (title or description)
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    studies = studies.filter(
      (study) =>
        study.title.toLowerCase().includes(searchLower) ||
        study.description.toLowerCase().includes(searchLower)
    );
  }

  return studies;
}

/**
 * Get study summaries for list views
 * @param filters Optional filter options
 * @returns Array of study summaries
 */
export function getStudySummaries(
  filters?: StudyFilterOptions
): StudySummary[] {
  const studies = listStudies(filters);

  return studies.map((study) => ({
    id: study.id,
    slug: study.slug,
    title: study.title,
    shortDescription: study.shortDescription,
    status: study.status,
    tags: study.tags,
    assetPath: study.assetPath,
    // These would come from database in production
    participantCount: undefined,
    estimatedDuration: study.settings.timeLimit,
  }));
}

/**
 * Check if a study exists
 * @param slug The study slug
 * @returns True if study exists
 */
export function studyExists(slug: string): boolean {
  return slug in STUDY_REGISTRY;
}

/**
 * Get unique values for filter options
 */
export function getFilterOptions(): {
  cognitiveProcesses: string[];
  modalities: string[];
  studyLengths: string[];
} {
  const studies = getAllStudies();

  const cognitiveProcesses = new Set<string>();
  const modalities = new Set<string>();
  const studyLengths = new Set<string>();

  for (const study of studies) {
    study.tags.cognitiveProcess?.forEach((p) => cognitiveProcesses.add(p));
    study.tags.modality?.forEach((m) => modalities.add(m));
    if (study.tags.studyLength) {
      studyLengths.add(study.tags.studyLength);
    }
  }

  return {
    cognitiveProcesses: Array.from(cognitiveProcesses).sort(),
    modalities: Array.from(modalities).sort(),
    studyLengths: Array.from(studyLengths).sort(),
  };
}

/**
 * Register a new study (for dynamic study loading)
 * @param metadata Study metadata to register
 * @returns True if successful
 */
export function registerStudy(metadata: StudyMetadata): boolean {
  if (studyExists(metadata.slug)) {
    console.warn(`Study with slug "${metadata.slug}" already exists`);
    return false;
  }

  STUDY_REGISTRY[metadata.slug] = metadata;
  console.log(`Registered study: ${metadata.title} (${metadata.slug})`);
  return true;
}

// Export the registry for advanced use cases
export { STUDY_REGISTRY };
