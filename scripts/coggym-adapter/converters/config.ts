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
    tutorial: generateTutorialConfig(instructions, cogGymConfig, studySlug, stimuli),
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
 * Generate tutorial configuration from CogGym instructions
 */
function generateTutorialConfig(
  instructions: InstructionContent[],
  config: CogGymConfig,
  studySlug: string,
  stimuli: CogGymStimulus[]
): any {
  if (instructions.length === 0) {
    return {
      title: 'How to Participate',
      pages: [
        {
          title: 'Welcome',
          content: [
            {
              type: 'text',
              value: `Welcome to ${config.experimentName}. Click "Start Study" when you're ready to begin.`,
            },
          ],
        },
      ],
      buttonText: 'Start Study',
    };
  }

  // Track quiz count for unique IDs
  let quizCounter = 0;

  const pages = instructions.map((instruction, index) => {
    switch (instruction.type) {
      case 'instruction': {
        const content: any[] = [
          {
            type: 'text',
            value: instruction.text,
          },
        ];

        // Add media/images if present
        if (instruction.media_url && instruction.media_url.length > 0) {
          instruction.media_url.forEach((url) => {
            // Convert relative asset path to absolute public path
            const relativePath = url.replace(/^assets\//, '');
            const absoluteUrl = `/studies/${studySlug}/assets/${relativePath}`;
            content.push({
              type: 'image',
              src: absoluteUrl,
              alt: 'Tutorial image',
            });
          });
        }

        return {
          title: `Instructions ${index + 1}`,
          content,
        };
      }

      case 'test_trial': {
        // Look up the trial by trial_id
        const trial = stimuli.find(s => s.id === instruction.trial_id);

        if (!trial) {
          console.warn(`Warning: test_trial references unknown trial_id "${instruction.trial_id}". Skipping.`);
          return {
            title: 'Practice Trial',
            content: [{
              type: 'text',
              value: `<p class="text-red-600">Error: Could not find trial "${instruction.trial_id}". Please check your instruction.jsonl file.</p>`
            }]
          };
        }

        // Convert the trial to a scenario using the same converter that handles actual study trials
        const { scenarios } = convertToScenarios([trial]);
        const scenarioConfig = scenarios[0];

        // Use the 'scenario' content type which renders with Layout + QuestionFrame
        // This ensures the test trial looks exactly like it would in the actual study
        const content: any[] = [{
          type: 'scenario',
          config: scenarioConfig,
          feedback: instruction.feedback ? {
            content: instruction.feedback
          } : undefined
        }];

        return {
          title: 'Practice Trial',
          content,
        };
      }

      case 'comprehension_quiz': {
        const content: any[] = [];

        // Add optional introductory text if present
        if (instruction.text) {
          content.push({
            type: 'text',
            value: instruction.text,
          });
        }

        // Add quiz questions
        instruction.queries.forEach((query) => {
          quizCounter++;
          content.push({
            type: 'quiz',
            id: `quiz_${quizCounter}`,
            question: query.prompt,
            options: query.option || [],
            answer: query.answer || 0,
          });
        });

        return {
          title: 'Comprehension Check',
          content,
        };
      }

      default:
        return {
          title: `Step ${index + 1}`,
          content: [{ type: 'text', value: 'Continue to next step' }],
        };
    }
  });

  return {
    title: 'How to Participate',
    pages,
    buttonText: 'Start Study',
  };
}

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
