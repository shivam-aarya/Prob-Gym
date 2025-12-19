/**
 * Study metadata
 * Auto-generated from CogGym format
 */

import { StudyMetadata } from '@/studies/types';

export const metadata: StudyMetadata = {
  "id": "703253be-2c82-4149-9593-910f7cab1f29",
  "slug": "Wong2025Modeling-exp2",
  "version": "1.0.0",
  "title": "Olympics Four Legged Race",
  "description": "Four-legged race tournament judgments with ability/effort/prediction and commentary inputs embedded per trial.",
  "shortDescription": "Four-legged race tournament judgments with ability/effort/prediction and commentary inputs embedded per trial.",
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
    "allowBack": false,
    "showProgress": true,
    "autoSave": true,
    "completionMessage": "Thank you for participating in \"Olympics Four Legged Race\"!"
  },
  "flow": {
    "consent": true,
    "tutorial": false,
    "scenarios": true,
    "demographic": true
  },
  "assetPath": "/studies/Wong2025Modeling-exp2/assets",
  "plugins": [
    "MultipleChoicePlugin",
    "TextboxPlugin"
  ],
  "experimentFlow": {
    "conditions": [
      {
        "name": "default",
        "blocks": [
          {
            "id": "default_block_0_instructions",
            "items": [
              {
                "type": "instruction",
                "id": "exp2_inst_01",
                "text": "In this experiment, you will see four-legged race tournaments and make judgments about these games. <br><br> In each race, players either compete as part of a team or individually. For example, in the tournament shown below, Peter and Matthew competed against Jacob and Anthony in Race 1. <b>The crown indicates which team won the race.</b> Here, Peter and Matthew won against Jacob and Anthony. <br><br> In Race 2, Jacob won the race against Peter. <br><br> Note that <b>a player's speed remains constant</b> throughout a tournament. For example, Peter was equally skilled in Race 1 and in Race 2. A player neither gets better nor worse between races. <br><br> However, <b>each player can decide how much effort to put into each race.</b> A player may put in low effort, high effort, or a normal amount of effort in a race. For example, it's possible that Peter put in high effort in Race 1 but low effort in Race 2. <br><br>The outcome of a race depends on the players' underlying speed and how much effort each player puts into the race. The team with the greater overall performance wins the race. <br><br>Note that we will show you a new set of players in each tournament.",
                "media": [
                  {
                    "type": "image",
                    "url": "exp_tournament.png"
                  }
                ]
              },
              {
                "type": "instruction",
                "id": "exp2_inst_02",
                "text": "On each trial, you will answer five questions on the right side of the screen:<ul><li>Two questions about players' speed.</li><li>Two questions about how much effort players put into specific races.</li><li>One question about who would win in a new hypothetical race.</li></ul> <br><br>You can click on any point along the slider. Your task is to provide your best guess based on the available information."
              },
              {
                "type": "instruction",
                "id": "exp2_inst_03",
                "text": "We will next ask you a few questions to check that you understood the instructions."
              },
              {
                "type": "test_trial",
                "id": "exp2_quiz_01",
                "scenarioId": 0,
                "feedback": "Correct answer: Andy."
              },
              {
                "type": "comprehension_quiz",
                "id": "exp2_quiz_02",
                "text": "Comprehension Quiz",
                "questions": [
                  {
                    "question": "Which of the following statements is true based on the instructions given?",
                    "options": [
                      "A player's speed and effort both remain constant between races.",
                      "A player's speed remains constant, and effort can change between races.",
                      "A player's speed can change, and effort remains constant between races.",
                      "A player's speed and effort both can change between races."
                    ],
                    "correctAnswer": 1
                  }
                ]
              },
              {
                "type": "instruction",
                "id": "exp2_inst_bg",
                "text": "The <b>four-legged race championships</b> are a tournament consisting of several races between teams of athletes.<br>A four-legged-race is a sport in which <b>two teams of athletes</b> compete.<br>The championships are <b>open to anyone</b>. Athletes vary widely in how <b>fast they are in general</b>. As with the general public, most athletes are average speed, but some might be much faster and some might be much slower.<br>Each team is made up of two athletes. The athletes' legs are <b>tied together</b>. This means that the team usually can only move as fast as the <b><i>slowest</i></b> athlete on the team in each race.<br>In each race, the team who runs the fastest usually wins.<br>But remember, <b>many other factors</b> might come up in any particular race."
              }
            ],
            "randomizeItems": false
          },
          {
            "id": "default_block_0_trials",
            "items": [
              {
                "type": "trial",
                "id": "trial_exp2_trial_001",
                "scenarioId": 1,
                "originalTrialId": "exp2_trial_001"
              },
              {
                "type": "trial",
                "id": "trial_exp2_trial_002",
                "scenarioId": 2,
                "originalTrialId": "exp2_trial_002"
              },
              {
                "type": "trial",
                "id": "trial_exp2_trial_003",
                "scenarioId": 3,
                "originalTrialId": "exp2_trial_003"
              },
              {
                "type": "trial",
                "id": "trial_exp2_trial_004",
                "scenarioId": 4,
                "originalTrialId": "exp2_trial_004"
              },
              {
                "type": "trial",
                "id": "trial_exp2_trial_005",
                "scenarioId": 5,
                "originalTrialId": "exp2_trial_005"
              },
              {
                "type": "trial",
                "id": "trial_exp2_trial_006",
                "scenarioId": 6,
                "originalTrialId": "exp2_trial_006"
              },
              {
                "type": "trial",
                "id": "trial_exp2_trial_007",
                "scenarioId": 7,
                "originalTrialId": "exp2_trial_007"
              },
              {
                "type": "trial",
                "id": "trial_exp2_trial_008",
                "scenarioId": 8,
                "originalTrialId": "exp2_trial_008"
              },
              {
                "type": "trial",
                "id": "trial_exp2_trial_009",
                "scenarioId": 9,
                "originalTrialId": "exp2_trial_009"
              },
              {
                "type": "trial",
                "id": "trial_exp2_trial_010",
                "scenarioId": 10,
                "originalTrialId": "exp2_trial_010"
              },
              {
                "type": "trial",
                "id": "trial_exp2_trial_011",
                "scenarioId": 11,
                "originalTrialId": "exp2_trial_011"
              },
              {
                "type": "trial",
                "id": "trial_exp2_trial_012",
                "scenarioId": 12,
                "originalTrialId": "exp2_trial_012"
              },
              {
                "type": "trial",
                "id": "trial_exp2_trial_013",
                "scenarioId": 13,
                "originalTrialId": "exp2_trial_013"
              },
              {
                "type": "trial",
                "id": "trial_exp2_trial_014",
                "scenarioId": 14,
                "originalTrialId": "exp2_trial_014"
              }
            ],
            "randomizeItems": true
          },
          {
            "id": "default_block_1_instructions",
            "items": [
              {
                "type": "instruction",
                "id": "exp2_inst_commentary_1",
                "text": "In the second part of the task, you will act as a <strong>sports commentator</strong>. You will see two tournaments again and add one sentence of new information about each tournament."
              },
              {
                "type": "instruction",
                "id": "exp2_inst_commentary_2",
                "text": "Your goal is to write a sentence that would change another participant's beliefs about what happened in the tournament. If you refer to a specific race, be sure to specify which one (e.g., first race or second race). You will also briefly explain why you think your sentence should have the intended effect."
              }
            ],
            "randomizeItems": false
          },
          {
            "id": "default_block_1_trials",
            "items": [
              {
                "type": "trial",
                "id": "trial_exp2_trial_013_commentary",
                "scenarioId": 15,
                "originalTrialId": "exp2_trial_013_commentary"
              },
              {
                "type": "trial",
                "id": "trial_exp2_trial_014_commentary",
                "scenarioId": 16,
                "originalTrialId": "exp2_trial_014_commentary"
              }
            ],
            "randomizeItems": true
          }
        ],
        "randomizeBlocks": false
      }
    ]
  },
  "inlineItems": [
    {
      "type": "instruction",
      "id": "exp2_inst_01",
      "text": "In this experiment, you will see four-legged race tournaments and make judgments about these games. <br><br> In each race, players either compete as part of a team or individually. For example, in the tournament shown below, Peter and Matthew competed against Jacob and Anthony in Race 1. <b>The crown indicates which team won the race.</b> Here, Peter and Matthew won against Jacob and Anthony. <br><br> In Race 2, Jacob won the race against Peter. <br><br> Note that <b>a player's speed remains constant</b> throughout a tournament. For example, Peter was equally skilled in Race 1 and in Race 2. A player neither gets better nor worse between races. <br><br> However, <b>each player can decide how much effort to put into each race.</b> A player may put in low effort, high effort, or a normal amount of effort in a race. For example, it's possible that Peter put in high effort in Race 1 but low effort in Race 2. <br><br>The outcome of a race depends on the players' underlying speed and how much effort each player puts into the race. The team with the greater overall performance wins the race. <br><br>Note that we will show you a new set of players in each tournament.",
      "media": [
        {
          "type": "image",
          "url": "exp_tournament.png"
        }
      ]
    },
    {
      "type": "instruction",
      "id": "exp2_inst_02",
      "text": "On each trial, you will answer five questions on the right side of the screen:<ul><li>Two questions about players' speed.</li><li>Two questions about how much effort players put into specific races.</li><li>One question about who would win in a new hypothetical race.</li></ul> <br><br>You can click on any point along the slider. Your task is to provide your best guess based on the available information."
    },
    {
      "type": "instruction",
      "id": "exp2_inst_03",
      "text": "We will next ask you a few questions to check that you understood the instructions."
    },
    {
      "type": "test_trial",
      "id": "exp2_quiz_01",
      "scenarioId": 0,
      "feedback": "Correct answer: Andy."
    },
    {
      "type": "comprehension_quiz",
      "id": "exp2_quiz_02",
      "text": "Comprehension Quiz",
      "questions": [
        {
          "question": "Which of the following statements is true based on the instructions given?",
          "options": [
            "A player's speed and effort both remain constant between races.",
            "A player's speed remains constant, and effort can change between races.",
            "A player's speed can change, and effort remains constant between races.",
            "A player's speed and effort both can change between races."
          ],
          "correctAnswer": 1
        }
      ]
    },
    {
      "type": "instruction",
      "id": "exp2_inst_bg",
      "text": "The <b>four-legged race championships</b> are a tournament consisting of several races between teams of athletes.<br>A four-legged-race is a sport in which <b>two teams of athletes</b> compete.<br>The championships are <b>open to anyone</b>. Athletes vary widely in how <b>fast they are in general</b>. As with the general public, most athletes are average speed, but some might be much faster and some might be much slower.<br>Each team is made up of two athletes. The athletes' legs are <b>tied together</b>. This means that the team usually can only move as fast as the <b><i>slowest</i></b> athlete on the team in each race.<br>In each race, the team who runs the fastest usually wins.<br>But remember, <b>many other factors</b> might come up in any particular race."
    },
    {
      "type": "instruction",
      "id": "exp2_inst_commentary_1",
      "text": "In the second part of the task, you will act as a <strong>sports commentator</strong>. You will see two tournaments again and add one sentence of new information about each tournament."
    },
    {
      "type": "instruction",
      "id": "exp2_inst_commentary_2",
      "text": "Your goal is to write a sentence that would change another participant's beliefs about what happened in the tournament. If you refer to a specific race, be sure to specify which one (e.g., first race or second race). You will also briefly explain why you think your sentence should have the intended effect."
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_001",
      "scenarioId": 1,
      "originalTrialId": "exp2_trial_001"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_002",
      "scenarioId": 2,
      "originalTrialId": "exp2_trial_002"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_003",
      "scenarioId": 3,
      "originalTrialId": "exp2_trial_003"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_004",
      "scenarioId": 4,
      "originalTrialId": "exp2_trial_004"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_005",
      "scenarioId": 5,
      "originalTrialId": "exp2_trial_005"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_006",
      "scenarioId": 6,
      "originalTrialId": "exp2_trial_006"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_007",
      "scenarioId": 7,
      "originalTrialId": "exp2_trial_007"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_008",
      "scenarioId": 8,
      "originalTrialId": "exp2_trial_008"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_009",
      "scenarioId": 9,
      "originalTrialId": "exp2_trial_009"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_010",
      "scenarioId": 10,
      "originalTrialId": "exp2_trial_010"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_011",
      "scenarioId": 11,
      "originalTrialId": "exp2_trial_011"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_012",
      "scenarioId": 12,
      "originalTrialId": "exp2_trial_012"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_013",
      "scenarioId": 13,
      "originalTrialId": "exp2_trial_013"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_014",
      "scenarioId": 14,
      "originalTrialId": "exp2_trial_014"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_013_commentary",
      "scenarioId": 15,
      "originalTrialId": "exp2_trial_013_commentary"
    },
    {
      "type": "trial",
      "id": "trial_exp2_trial_014_commentary",
      "scenarioId": 16,
      "originalTrialId": "exp2_trial_014_commentary"
    }
  ]
};
