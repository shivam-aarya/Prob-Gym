/**
 * Study metadata
 * Auto-generated from CogGym format
 */

import { StudyMetadata } from '@/studies/types';

export const metadata: StudyMetadata = {
  "id": "e051e810-cdd3-4088-948d-86e4b2bb3f5d",
  "slug": "Olympics2025-exp3",
  "version": "1.0.0",
  "title": "Olympics Math Team",
  "description": "Math Team scenarios with ability and prediction questions.",
  "shortDescription": "Math Team scenarios with ability and prediction questions.",
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
    "completionMessage": "Thank you for participating in \"Olympics Math Team\"!"
  },
  "flow": {
    "consent": true,
    "tutorial": true,
    "scenarios": true,
    "demographic": true
  },
  "assetPath": "/studies/Olympics2025-exp3/assets",
  "plugins": [
    "TextboxPlugin",
    "NumberLinePlugin"
  ]
};
