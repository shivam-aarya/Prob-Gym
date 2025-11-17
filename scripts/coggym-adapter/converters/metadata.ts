/**
 * Converter: CogGym config → Prob-Gym StudyMetadata
 */

import { randomUUID } from 'crypto';
import { CogGymConfig, CogGymStimulus, InstructionContent } from '../types';
import { flattenBlocks } from '../utils/block-flattener';
import { countTotalScenarios } from '../utils/id-mapper';

/**
 * Convert CogGym config to Prob-Gym StudyMetadata
 */
export function convertToMetadata(
  config: CogGymConfig,
  stimuli: CogGymStimulus[],
  instructions: InstructionContent[],
  studySlug: string
): any {
  const { shouldRandomize } = flattenBlocks(config.experimentFlow);
  const totalScenarios = countTotalScenarios(stimuli);

  // Infer modality from response types and input types
  const modality = inferModality(config.responseType, stimuli);

  // Infer study length from scenario count
  const studyLength = inferStudyLength(totalScenarios);

  // Determine required plugins based on response types
  const plugins = determinePlugins(config.responseType, stimuli);

  return {
    id: randomUUID(),
    slug: studySlug,
    version: '1.0.0',
    title: config.experimentName,
    description: config.description,
    shortDescription: config.description.slice(0, 150) + (config.description.length > 150 ? '...' : ''),
    authors: config.contributors || [],
    tags: {
      cognitiveProcess: config.taskType || [],
      modality,
      studyLength,
      domain: inferDomain(config.taskType),
      custom: {
        paperDOI: config.paperDOI,
        sourceFormat: 'coggym-v1',
        experimentalConditions: config.experimentFlow
          .map(f => f.experimental_condition)
          .filter(Boolean),
      },
    },
    status: 'ACTIVE' as const,
    settings: {
      questionsPerParticipant: totalScenarios,
      randomizeQuestions: shouldRandomize,
      allowBack: true,
      showProgress: true,
      autoSave: true,
      completionMessage: `Thank you for participating in "${config.experimentName}"!`,
    },
    flow: {
      consent: true,
      tutorial: instructions.length > 0,
      scenarios: true,
      demographic: true,
    },
    assetPath: `/studies/${studySlug}/assets`,
    plugins,
  };
}

/**
 * Infer modality tags from response types and input types
 */
function inferModality(responseTypes: string[], stimuli: CogGymStimulus[]): string[] {
  const modalities = new Set<string>();

  // Check input types (media)
  const hasImages = stimuli.some(s => s.stimuli.some(item => item.input_type === 'img'));
  const hasVideos = stimuli.some(s => s.stimuli.some(item => item.input_type === 'video'));
  const hasText = stimuli.some(s => s.stimuli.some(item => item.input_type === 'text'));

  if (hasImages) modalities.add('visual');
  if (hasVideos) modalities.add('video');
  if (hasText) modalities.add('text');

  // Check response types (interactions)
  if (responseTypes.some(t => t.includes('slider'))) {
    modalities.add('interactive');
  }
  if (responseTypes.includes('textbox')) {
    modalities.add('text-input');
  }

  return Array.from(modalities);
}

/**
 * Infer study length from scenario count
 */
function inferStudyLength(scenarioCount: number): 'quick' | 'medium' | 'long' {
  if (scenarioCount <= 10) return 'quick';
  if (scenarioCount <= 30) return 'medium';
  return 'long';
}

/**
 * Determine required plugins based on query types
 */
function determinePlugins(responseTypes: string[], stimuli: CogGymStimulus[]): string[] {
  const plugins = new Set<string>();

  // Check all query types in stimuli
  for (const stimulus of stimuli) {
    for (const query of stimulus.queries) {
      switch (query.type) {
        case 'multi-choice':
          plugins.add('MultipleChoicePlugin');
          break;
        case 'multi-select':
          plugins.add('MultipleSelectPlugin');
          break;
        case 'textbox':
          plugins.add('TextboxPlugin');
          break;
        case 'single-slider':
        case 'multi-slider':
          // These use built-in slider, no plugin needed
          break;
      }
    }
  }

  return Array.from(plugins);
}

/**
 * Infer domain from task types
 */
function inferDomain(taskTypes: string[]): string[] {
  const domainMap: Record<string, string> = {
    'causal-reasoning': 'cognitive-science',
    'probability': 'cognitive-science',
    'decision-making': 'cognitive-science',
    'social-cognition': 'psychology',
    'moral-judgment': 'psychology',
    'physical-reasoning': 'cognitive-science',
  };

  const domains = new Set<string>();
  for (const taskType of taskTypes) {
    const domain = domainMap[taskType.toLowerCase()];
    if (domain) {
      domains.add(domain);
    }
  }

  // Default if no match
  if (domains.size === 0) {
    domains.add('cognitive-science');
  }

  return Array.from(domains);
}
