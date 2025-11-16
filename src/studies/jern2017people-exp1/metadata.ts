/**
 * Study metadata
 * Auto-generated from CogGym format
 */

import { StudyMetadata } from '@/studies/types';

export const metadata: StudyMetadata = {
  "id": "b5af3c0e-b664-4e1d-b72a-a18765a72225",
  "slug": "jern2017people-exp1",
  "version": "1.0.0",
  "title": "Experiment 1 – Ordering choices by evidence strength",
  "description": "Participants inspected 47 cards showing another person's choice between bags (candies) or sets of shocks and ranked how strongly each choice implied a preference for attribute X.",
  "shortDescription": "Participants inspected 47 cards showing another person's choice between bags (candies) or sets of shocks and ranked how strongly each choice implied a...",
  "authors": [
    "OpenAI Codex (conversion)"
  ],
  "tags": {
    "cognitiveProcess": [
      "Social Cognition",
      "Preference Learning"
    ],
    "modality": [
      "visual",
      "interactive"
    ],
    "studyLength": "long",
    "domain": [
      "cognitive-science"
    ],
    "custom": {
      "paperDOI": "https://doi.org/10.1016/j.cognition.2017.06.017",
      "sourceFormat": "coggym-v1",
      "experimentalConditions": [
        "positive_attributes",
        "negative_attributes"
      ]
    }
  },
  "status": "ACTIVE",
  "settings": {
    "questionsPerParticipant": 47,
    "randomizeQuestions": false,
    "allowBack": true,
    "showProgress": true,
    "autoSave": true,
    "completionMessage": "Thank you for participating in \"Experiment 1 – Ordering choices by evidence strength\"!"
  },
  "flow": {
    "consent": true,
    "tutorial": true,
    "scenarios": true,
    "demographic": true
  },
  "assetPath": "/studies/jern2017people-exp1/assets",
  "plugins": []
};
