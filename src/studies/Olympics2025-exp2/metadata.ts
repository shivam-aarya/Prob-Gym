/**
 * Study metadata
 * Auto-generated from CogGym format
 */

import { StudyMetadata } from '@/studies/types';

export const metadata: StudyMetadata = {
  "id": "4308d8ec-eedd-4448-ba23-4f830a9e39bd",
  "slug": "Olympics2025-exp2",
  "version": "1.0.0",
  "title": "Olympics Four Legged Race",
  "description": "Four Legged Race scenarios with ability and prediction questions.",
  "shortDescription": "Four Legged Race scenarios with ability and prediction questions.",
  "authors": [
    "Katie Collins",
    "Lio Wong",
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
      "paperDOI": "",
      "sourceFormat": "coggym-v1",
      "experimentalConditions": []
    }
  },
  "status": "ACTIVE",
  "settings": {
    "questionsPerParticipant": 17,
    "randomizeQuestions": true,
    "allowBack": true,
    "showProgress": true,
    "autoSave": true,
    "completionMessage": "Thank you for participating in \"Olympics Four Legged Race\"!"
  },
  "flow": {
    "consent": true,
    "tutorial": true,
    "scenarios": true,
    "demographic": true
  },
  "assetPath": "/studies/Olympics2025-exp2/assets",
  "plugins": [
    "TextboxPlugin",
    "NumberLinePlugin"
  ]
};
