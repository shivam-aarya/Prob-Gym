/**
 * Study metadata
 * Auto-generated from CogGym format
 */

import { StudyMetadata } from '@/studies/types';

export const metadata: StudyMetadata = {
  "id": "63856faa-303b-4c32-a11a-2805bf6b9cf5",
  "slug": "Olympics2025-exp1",
  "version": "1.0.0",
  "title": "Olympics Pilot Tug-of-War",
  "description": "Tug-of-war tournament judgments (strength/effort/prediction) plus end-of-study commentary.",
  "shortDescription": "Tug-of-war tournament judgments (strength/effort/prediction) plus end-of-study commentary.",
  "authors": [
    "Professor sample",
    "CogGym conversion"
  ],
  "tags": {
    "cognitiveProcess": [
      "Reasoning",
      "Causal Inference"
    ],
    "modality": [
      "visual",
      "interactive",
      "text-input"
    ],
    "studyLength": "long",
    "domain": [
      "cognitive-science"
    ],
    "custom": {
      "paperDOI": "",
      "sourceFormat": "coggym-v1",
      "experimentalConditions": []
    }
  },
  "status": "ACTIVE",
  "settings": {
    "questionsPerParticipant": 31,
    "randomizeQuestions": true,
    "allowBack": true,
    "showProgress": true,
    "autoSave": true,
    "completionMessage": "Thank you for participating in \"Olympics Pilot Tug-of-War\"!"
  },
  "flow": {
    "consent": true,
    "tutorial": true,
    "scenarios": true,
    "demographic": true
  },
  "assetPath": "/studies/Olympics2025-exp1/assets",
  "plugins": [
    "TextboxPlugin"
  ]
};
