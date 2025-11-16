/**
 * Study metadata
 * Auto-generated from CogGym format
 */

import { StudyMetadata } from '@/studies/types';

export const metadata: StudyMetadata = {
  "id": "17bcd86b-7fdb-4dde-ad30-0e8dfdb6ceb0",
  "slug": "gerstenberg2012ping-exp1",
  "version": "1.0.0",
  "title": "Ping Pong Strength Inference (Experiment 1)",
  "description": "Participants viewed simulated tug-of-war tournaments and judged the latent strength of a highlighted player based on the outcomes.",
  "shortDescription": "Participants viewed simulated tug-of-war tournaments and judged the latent strength of a highlighted player based on the outcomes.",
  "authors": [
    "Tobias Gerstenberg",
    "Noah D. Goodman",
    "CogGym conversion"
  ],
  "tags": {
    "cognitiveProcess": [
      "Reasoning",
      "Causal Inference"
    ],
    "modality": [
      "visual",
      "interactive"
    ],
    "studyLength": "medium",
    "domain": [
      "cognitive-science"
    ],
    "custom": {
      "paperDOI": "https://web.stanford.edu/~ngoodman/papers/GerstenbergGoodman2012.pdf",
      "sourceFormat": "coggym-v1",
      "experimentalConditions": []
    }
  },
  "status": "ACTIVE",
  "settings": {
    "questionsPerParticipant": 30,
    "randomizeQuestions": true,
    "allowBack": true,
    "showProgress": true,
    "autoSave": true,
    "completionMessage": "Thank you for participating in \"Ping Pong Strength Inference (Experiment 1)\"!"
  },
  "flow": {
    "consent": true,
    "tutorial": true,
    "scenarios": true,
    "demographic": true
  },
  "assetPath": "/studies/gerstenberg2012ping-exp1/assets",
  "plugins": []
};
