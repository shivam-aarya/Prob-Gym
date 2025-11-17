/**
 * Converter: CogGym instructions → Prob-Gym config.json
 */

import { CogGymConfig, InstructionContent } from '../types';

/**
 * Convert CogGym config and instructions to Prob-Gym config.json
 */
export function convertToConfig(
  cogGymConfig: CogGymConfig,
  instructions: InstructionContent[],
  studySlug: string
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
    consent: generateConsentConfig(cogGymConfig),
    tutorial: generateTutorialConfig(instructions, cogGymConfig, studySlug),
    demographic: generateDemographicConfig(),
  };
}

/**
 * Generate consent configuration
 */
function generateConsentConfig(config: CogGymConfig): any {
  return {
    title: `Welcome to ${config.experimentName}`,
    content: [
      config.description,
      `This experiment should take about ${estimateDuration(config.stimuli_count, config.judgment_count)} minutes.`,
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
  studySlug: string
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
        const content: any[] = [];

        // Add stimuli images if present
        if (instruction.stimuli && instruction.stimuli.length > 0) {
          instruction.stimuli.forEach((stimulus) => {
            if (stimulus.input_type === 'img' && stimulus.media_url.length > 0) {
              stimulus.media_url.forEach((url) => {
                const relativePath = url.replace(/^assets\//, '');
                const absoluteUrl = `/studies/${studySlug}/assets/${relativePath}`;
                content.push({
                  type: 'image',
                  src: absoluteUrl,
                  alt: 'Practice stimulus',
                });
              });
            } else if (stimulus.input_type === 'text' && stimulus.media_url.length > 0) {
              // For text stimuli, media_url might contain text content paths
              // For now, we'll skip text stimuli in tutorial images
              // TODO: Handle text stimulus rendering if needed
            }
          });
        }

        // Add practice questions
        instruction.queries.forEach((query) => {
          if (query.type === 'text-instruction') {
            // Text instruction - show as plain text without answer required
            content.push({
              type: 'text',
              value: query.prompt,
            });
          } else {
            // Regular practice question with answer
            quizCounter++;
            content.push({
              type: 'quiz',
              id: `quiz_${quizCounter}`,
              question: query.prompt,
              options: query.option || [],
              answer: query.answer || 0,
            });
          }
        });

        return {
          title: 'Practice Trial',
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
function estimateDuration(stimuliCount: number, judgmentCount: number): number {
  // Rough estimate: 30 seconds per judgment
  const minutes = Math.ceil((judgmentCount * 0.5) / 5) * 5; // Round to nearest 5
  return Math.max(5, Math.min(60, minutes)); // Clamp between 5-60 minutes
}
