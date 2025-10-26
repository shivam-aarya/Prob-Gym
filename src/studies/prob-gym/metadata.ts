import { StudyMetadata } from '../types';

/**
 * Metadata for the Prob-Gym (Treasure Game) study
 */
export const probGymMetadata: StudyMetadata = {
  // === Identification ===
  id: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', // UUID for prob-gym study
  slug: 'prob-gym',
  version: '1.0.0',

  // === Display Information ===
  title: 'Interpreting Agent Behavior in a Treasure Game',
  description:
    'An experiment about how people interpret agent behavior in a game environment. Participants watch short animations of a player navigating a treasure game and infer the player\'s goals from their actions.',
  shortDescription: 'Interpret agent behavior in a treasure collection game',
  authors: ['Research Team'],

  // === Classification ===
  tags: {
    cognitiveProcess: ['decision-making', 'goal inference', 'theory of mind'],
    modality: ['visual', 'interactive'],
    studyLength: 'medium',
    domain: ['cognitive science', 'artificial intelligence', 'game AI'],
  },

  status: 'ACTIVE',

  // === Configuration ===
  settings: {
    questionsPerParticipant: 16,
    randomizeQuestions: true,
    allowBack: false,
    showProgress: true,
    timeLimit: undefined, // No time limit
    autoSave: true,
    completionMessage: 'Thank you for participating in our study!',
  },

  flow: {
    consent: true,
    tutorial: true,
    scenarios: true,
    demographic: true,
  },

  // === Resources ===
  assetPath: '/studies/prob-gym/assets',

  // Required plugins for this study
  plugins: ['constrained-slider', 'number-line', 'histogram'],

  // === Study Content Paths ===
  scenariosPath: './scenarios.ts',
  configPath: './config.json',
};

export default probGymMetadata;
