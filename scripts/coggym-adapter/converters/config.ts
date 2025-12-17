/**
 * Converter: CogGym instructions → Prob-Gym config.json
 */

import { CogGymConfig, InstructionContent, CogGymStimulus } from '../types';
import { convertToScenarios } from './scenarios';

/**
 * Convert CogGym config and instructions to Prob-Gym config.json
 */
export function convertToConfig(
  cogGymConfig: CogGymConfig,
  instructions: InstructionContent[],
  studySlug: string,
  totalQueries: number,
  stimuli: CogGymStimulus[]
): any {
  return {
    study: {
      title: cogGymConfig.experimentName,
      randomizeQuestions: cogGymConfig.experimentFlow.some(
        f => f.stimuli_randomization || f.block_randomization
      ),
      questionsPerParticipant: cogGymConfig.stimuli_count,
      backend: {
        enabled: true,
        endpoint: '/api/submit',
      },
    },
    consent: generateConsentConfig(cogGymConfig, totalQueries),
    // No tutorial - all instructions are in experimentFlow now
    demographic: generateDemographicConfig(),
  };
}

/**
 * Generate consent configuration
 */
function generateConsentConfig(config: CogGymConfig, totalQueries: number): any {
  return {
    title: `Welcome to ${config.experimentName}`,
    content: [
      config.description,
      `This experiment should take about ${estimateDuration(totalQueries)} minutes.`,
      'Your participation is completely voluntary. You can agree to take part and later change your mind.',
    ],
    buttonText: 'I agree, begin the study',
  };
}

/**
 * NOTE: Tutorial generation removed - all instructions are now in experimentFlow
 * This function is preserved for backwards compatibility but is no longer used
 * since metadata.flow.tutorial is set to false
 */

/**
 * Generate standard demographic configuration
 */
function generateDemographicConfig(): any {
  return {
    title: 'Demographic Information',
    description: 'Please help us by providing some demographic information.',
    questions: [
      {
        id: 'age',
        type: 'select',
        label: 'What is your age?',
        required: true,
        options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
      },
      {
        id: 'gender',
        type: 'select',
        label: 'What is your gender?',
        required: true,
        options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
      },
      {
        id: 'education',
        type: 'select',
        label: 'What is your highest level of education?',
        required: false,
        options: [
          'High school or less',
          'Some college',
          "Bachelor's degree",
          "Master's degree",
          'Doctoral degree',
          'Prefer not to say',
        ],
      },
    ],
    buttonText: 'Complete Survey',
  };
}

/**
 * Estimate study duration in minutes
 */
function estimateDuration(totalQueries: number): number {
  // Rough estimate: 30 seconds per judgment
  const minutes = Math.ceil((totalQueries * 0.5) / 5) * 5; // Round to nearest 5
  return Math.max(5, Math.min(60, minutes)); // Clamp between 5-60 minutes
}
