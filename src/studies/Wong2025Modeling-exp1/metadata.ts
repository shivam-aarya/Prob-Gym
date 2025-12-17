/**
 * Study metadata
 * Auto-generated from CogGym format
 */

import { StudyMetadata } from '@/studies/types';

export const metadata: StudyMetadata = {
  "id": "9bff047e-d6ed-4649-8f99-42f0266698b1",
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
    "questionsPerParticipant": 9,
    "randomizeQuestions": true,
    "allowBack": false,
    "showProgress": true,
    "autoSave": true,
    "completionMessage": "Thank you for participating in \"Olympics Pilot Tug-of-War\"!"
  },
  "flow": {
    "consent": true,
    "tutorial": false,
    "scenarios": true,
    "demographic": true
  },
  "assetPath": "/studies/Wong2025Modeling-exp1/assets",
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
                "id": "exp1_inst_01",
                "text": "In this experiment, you will see tug-of-war tournaments and make judgments about these games. <br><br> In each game, players either compete as part of a team or individually. For example, in the tournament shown below, Peter and Matthew competed against Jacob and Anthony in Game 1. <b>The crown indicates which team won the game.</b> Here, Peter and Matthew won against Jacob and Anthony. <br><br> In Game 2, Jacob won the game against Peter. <br><br> Note that <b>a player's strength remains constant</b> throughout a tournament. For example, Peter was equally strong in Game 1 and in Game 2. A player neither gets stronger nor weaker between games. <br><br> However, <b>each player can decide how much effort to put into each game.</b> A player may put in low effort, high effort, or a normal amount of effort in a game. For example, it's possible that Peter put in high effort in Game 1 but low effort in Game 2. <br><br>The pulling power of a team depends on the strength of its players, and how much effort each player puts into the game. The team with the greater pulling power wins the game. <br><br>Note that we will show you a new set of players in each tournament.",
                "media": [
                  {
                    "type": "image",
                    "url": "exp_tournament.png"
                  }
                ]
              },
              {
                "type": "instruction",
                "id": "exp1_inst_02",
                "text": "On each trial, you will answer five questions on the right side of the screen:<ul><li>Two questions about players' strength.</li><li>Two questions about how much effort players put into specific matches.</li><li>One question about who would win in a new hypothetical match.</li></ul> <br><br>You can click on any point along the slider. Your task is to provide your best guess based on the available information."
              },
              {
                "type": "instruction",
                "id": "exp1_inst_03",
                "text": "We will next ask you a few questions to check that you understood the instructions."
              },
              {
                "type": "test_trial",
                "id": "exp1_quiz_01",
                "scenarioId": 0,
                "feedback": "Correct answer: Andy."
              },
              {
                "type": "comprehension_quiz",
                "id": "exp1_quiz_02",
                "text": "Comprehension Quiz",
                "questions": [
                  {
                    "question": "Which of the following statements is true based on the instructions given?",
                    "options": [
                      "A player's strength and effort both remain constant between games.",
                      "A player's strength remains constant, and effort can change between games.",
                      "A player's strength can change, and effort remains constant between games.",
                      "A player's strength and effort both can change between games."
                    ],
                    "correctAnswer": 1
                  }
                ]
              },
              {
                "type": "instruction",
                "id": "exp1_inst_bg",
                "text": "The <b>tug-of-war championships</b> are a tournament consisting of several tug-of-war matches between teams of athletes.<br>Tug-of-war is a sport in which <b>two teams of athletes</b> compete by pulling on <b>opposite ends of a rope.</b><br>The championships are <b>open to anyone</b>. Athletes vary widely in how <b>strong they are in general</b>. As with the general public, most athletes are average strength, though some can be much stronger and some can be much weaker.<br>How hard each athlete can <b>pull the rope in each round</b> usually depends on their <b>general physical strength</b>. Athletes with more strength can pull harder.<br>How hard each <b><i>team</i> pulls the rope</b> in any given match depends largely on how hard all of the individual athletes pull on that team.<br>The team that <b>pulls the hardest in a given match</b> usually wins.<br>But remember, <b>many other factors</b> might come up in any particular match."
              }
            ],
            "randomizeItems": false
          },
          {
            "id": "default_block_0_trials",
            "items": [
              {
                "type": "trial",
                "id": "trial_trials_9_10_tug-of-war",
                "scenarioId": 1,
                "originalTrialId": "trials_9_10_tug-of-war"
              },
              {
                "type": "trial",
                "id": "trial_trials_11_12_tug-of-war",
                "scenarioId": 2,
                "originalTrialId": "trials_11_12_tug-of-war"
              },
              {
                "type": "trial",
                "id": "trial_trials_13_14_tug-of-war",
                "scenarioId": 3,
                "originalTrialId": "trials_13_14_tug-of-war"
              },
              {
                "type": "trial",
                "id": "trial_trials_15_16_tug-of-war",
                "scenarioId": 4,
                "originalTrialId": "trials_15_16_tug-of-war"
              },
              {
                "type": "trial",
                "id": "trial_trials_17_18_tug-of-war",
                "scenarioId": 5,
                "originalTrialId": "trials_17_18_tug-of-war"
              },
              {
                "type": "trial",
                "id": "trial_trials_19_20_tug-of-war",
                "scenarioId": 6,
                "originalTrialId": "trials_19_20_tug-of-war"
              }
            ],
            "randomizeItems": true
          },
          {
            "id": "default_block_1_instructions",
            "items": [
              {
                "type": "instruction",
                "id": "exp1_inst_commentary_1",
                "text": "In the second part of the task, you will act as a <strong>sports commentator</strong>. You will see two tournaments again and add one sentence of new information about each tournament."
              },
              {
                "type": "instruction",
                "id": "exp1_inst_commentary_2",
                "text": "Your goal is to write a sentence that would change another participant's beliefs about what happened in the tournament. If you refer to a specific match, be sure to specify which one (e.g., first match or second match). You will also briefly explain why you think your sentence should have the intended effect."
              }
            ],
            "randomizeItems": false
          },
          {
            "id": "default_block_1_trials",
            "items": [
              {
                "type": "trial",
                "id": "trial_trials_17_18_tug-of-war_commentary",
                "scenarioId": 7,
                "originalTrialId": "trials_17_18_tug-of-war_commentary"
              },
              {
                "type": "trial",
                "id": "trial_trials_19_20_tug-of-war_commentary",
                "scenarioId": 8,
                "originalTrialId": "trials_19_20_tug-of-war_commentary"
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
      "id": "exp1_inst_01",
      "text": "In this experiment, you will see tug-of-war tournaments and make judgments about these games. <br><br> In each game, players either compete as part of a team or individually. For example, in the tournament shown below, Peter and Matthew competed against Jacob and Anthony in Game 1. <b>The crown indicates which team won the game.</b> Here, Peter and Matthew won against Jacob and Anthony. <br><br> In Game 2, Jacob won the game against Peter. <br><br> Note that <b>a player's strength remains constant</b> throughout a tournament. For example, Peter was equally strong in Game 1 and in Game 2. A player neither gets stronger nor weaker between games. <br><br> However, <b>each player can decide how much effort to put into each game.</b> A player may put in low effort, high effort, or a normal amount of effort in a game. For example, it's possible that Peter put in high effort in Game 1 but low effort in Game 2. <br><br>The pulling power of a team depends on the strength of its players, and how much effort each player puts into the game. The team with the greater pulling power wins the game. <br><br>Note that we will show you a new set of players in each tournament.",
      "media": [
        {
          "type": "image",
          "url": "exp_tournament.png"
        }
      ]
    },
    {
      "type": "instruction",
      "id": "exp1_inst_02",
      "text": "On each trial, you will answer five questions on the right side of the screen:<ul><li>Two questions about players' strength.</li><li>Two questions about how much effort players put into specific matches.</li><li>One question about who would win in a new hypothetical match.</li></ul> <br><br>You can click on any point along the slider. Your task is to provide your best guess based on the available information."
    },
    {
      "type": "instruction",
      "id": "exp1_inst_03",
      "text": "We will next ask you a few questions to check that you understood the instructions."
    },
    {
      "type": "test_trial",
      "id": "exp1_quiz_01",
      "scenarioId": 0,
      "feedback": "Correct answer: Andy."
    },
    {
      "type": "comprehension_quiz",
      "id": "exp1_quiz_02",
      "text": "Comprehension Quiz",
      "questions": [
        {
          "question": "Which of the following statements is true based on the instructions given?",
          "options": [
            "A player's strength and effort both remain constant between games.",
            "A player's strength remains constant, and effort can change between games.",
            "A player's strength can change, and effort remains constant between games.",
            "A player's strength and effort both can change between games."
          ],
          "correctAnswer": 1
        }
      ]
    },
    {
      "type": "instruction",
      "id": "exp1_inst_bg",
      "text": "The <b>tug-of-war championships</b> are a tournament consisting of several tug-of-war matches between teams of athletes.<br>Tug-of-war is a sport in which <b>two teams of athletes</b> compete by pulling on <b>opposite ends of a rope.</b><br>The championships are <b>open to anyone</b>. Athletes vary widely in how <b>strong they are in general</b>. As with the general public, most athletes are average strength, though some can be much stronger and some can be much weaker.<br>How hard each athlete can <b>pull the rope in each round</b> usually depends on their <b>general physical strength</b>. Athletes with more strength can pull harder.<br>How hard each <b><i>team</i> pulls the rope</b> in any given match depends largely on how hard all of the individual athletes pull on that team.<br>The team that <b>pulls the hardest in a given match</b> usually wins.<br>But remember, <b>many other factors</b> might come up in any particular match."
    },
    {
      "type": "instruction",
      "id": "exp1_inst_commentary_1",
      "text": "In the second part of the task, you will act as a <strong>sports commentator</strong>. You will see two tournaments again and add one sentence of new information about each tournament."
    },
    {
      "type": "instruction",
      "id": "exp1_inst_commentary_2",
      "text": "Your goal is to write a sentence that would change another participant's beliefs about what happened in the tournament. If you refer to a specific match, be sure to specify which one (e.g., first match or second match). You will also briefly explain why you think your sentence should have the intended effect."
    },
    {
      "type": "trial",
      "id": "trial_trials_9_10_tug-of-war",
      "scenarioId": 1,
      "originalTrialId": "trials_9_10_tug-of-war"
    },
    {
      "type": "trial",
      "id": "trial_trials_11_12_tug-of-war",
      "scenarioId": 2,
      "originalTrialId": "trials_11_12_tug-of-war"
    },
    {
      "type": "trial",
      "id": "trial_trials_13_14_tug-of-war",
      "scenarioId": 3,
      "originalTrialId": "trials_13_14_tug-of-war"
    },
    {
      "type": "trial",
      "id": "trial_trials_15_16_tug-of-war",
      "scenarioId": 4,
      "originalTrialId": "trials_15_16_tug-of-war"
    },
    {
      "type": "trial",
      "id": "trial_trials_17_18_tug-of-war",
      "scenarioId": 5,
      "originalTrialId": "trials_17_18_tug-of-war"
    },
    {
      "type": "trial",
      "id": "trial_trials_19_20_tug-of-war",
      "scenarioId": 6,
      "originalTrialId": "trials_19_20_tug-of-war"
    },
    {
      "type": "trial",
      "id": "trial_trials_17_18_tug-of-war_commentary",
      "scenarioId": 7,
      "originalTrialId": "trials_17_18_tug-of-war_commentary"
    },
    {
      "type": "trial",
      "id": "trial_trials_19_20_tug-of-war_commentary",
      "scenarioId": 8,
      "originalTrialId": "trials_19_20_tug-of-war_commentary"
    }
  ]
};
