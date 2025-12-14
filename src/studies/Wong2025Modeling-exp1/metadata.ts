/**
 * Study metadata
 * Auto-generated from CogGym format
 */

import { StudyMetadata } from '@/studies/types';

export const metadata: StudyMetadata = {
  "id": "dffa7f87-5c07-4353-b539-7480491d1687",
  "slug": "Wong2025Modeling-exp1",
  "version": "1.0.0",
  "title": "Olympics Pilot Tug-of-War",
  "description": "Tug-of-war tournament judgments with strength/effort/prediction and commentary inputs embedded per trial.",
  "shortDescription": "Tug-of-war tournament judgments with strength/effort/prediction and commentary inputs embedded per trial.",
  "authors": [
    "Katie Collins",
    "Lio Wong"
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
    "studyLength": "quick",
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
    "questionsPerParticipant": 8,
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
  "assetPath": "/studies/Wong2025Modeling-exp1/assets",
  "plugins": [
    "TextboxPlugin"
  ]
};
