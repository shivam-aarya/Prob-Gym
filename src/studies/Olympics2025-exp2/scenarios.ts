/**
 * Study scenarios
 * Auto-generated from CogGym format
 */

import { StudyConfig } from '@/types/study';

export const scenarios: StudyConfig[] = [
  {
    "task_name": "exp2_trial_001",
    "scenario_id": 0,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_9_10_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_9_10_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Jack is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_jack",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Greg is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_greg",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Jack and Dan (Team 1) vs. Greg and Hank (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_002",
    "scenario_id": 1,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_11_12_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_11_12_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Carl is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_carl",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Fred is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_fred",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Carl and Bob (Team 1) vs. Fred and Hank (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_003",
    "scenario_id": 2,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_13_14_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_13_14_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Bob is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_bob",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Fred is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_fred",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Bob and Greg (Team 1) vs. Fred and Hank (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_004",
    "scenario_id": 3,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_15_16_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_15_16_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Ian is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_ian",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Dan is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_dan",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Hank and Greg (Team 1) vs. Ian and Dan (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_005",
    "scenario_id": 4,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_17_18_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_17_18_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Fred is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_fred",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Carl is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_carl",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Hank and Bob (Team 1) vs. Fred and Carl (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_006",
    "scenario_id": 5,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_19_20_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_19_20_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Greg is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_greg",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Evan is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_evan",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Greg and Hank (Team 1) vs. Evan and Ian (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_007",
    "scenario_id": 6,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_17_18_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_17_18_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Fred is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_fred",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Carl is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_carl",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Hank and Bob (Team 1) vs. Fred and Carl (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_008",
    "scenario_id": 7,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_19_20_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_19_20_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Greg is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_greg",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Evan is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_evan",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Greg and Hank (Team 1) vs. Evan and Ian (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_009",
    "scenario_id": 8,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_9_10_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_9_10_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Jack is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_jack",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Greg is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_greg",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Jack and Dan (Team 1) vs. Greg and Hank (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_010",
    "scenario_id": 9,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_11_12_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_11_12_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Carl is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_carl",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Fred is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_fred",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Carl and Bob (Team 1) vs. Fred and Hank (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_011",
    "scenario_id": 10,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_13_14_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_13_14_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Bob is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_bob",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Fred is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_fred",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Bob and Greg (Team 1) vs. Fred and Hank (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_012",
    "scenario_id": 11,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_15_16_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_15_16_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Ian is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_ian",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Dan is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_dan",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Hank and Greg (Team 1) vs. Ian and Dan (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_013",
    "scenario_id": 12,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_17_18_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_17_18_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Fred is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_fred",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Carl is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_carl",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Hank and Bob (Team 1) vs. Fred and Carl (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_014",
    "scenario_id": 13,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_19_20_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_19_20_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Greg is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_greg",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Evan is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_evan",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Greg and Hank (Team 1) vs. Evan and Ian (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_015",
    "scenario_id": 14,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_15_16_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_15_16_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Ian is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_ian",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Dan is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_dan",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Hank and Greg (Team 1) vs. Ian and Dan (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_016",
    "scenario_id": 15,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_11_12_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_11_12_four-legged-race.png",
    "questions": [
      {
        "question": "How fast would you say that Carl is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_carl",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Fred is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_fred",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How fast would you say that Hank is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very low"
            },
            {
              "value": 100,
              "label": "very high"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "The very next race in this tournament is Carl and Bob (Team 1) vs. Fred and Hank (Team 2). Which team is more likely to win?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Team 1"
            },
            {
              "value": 100,
              "label": "Team 2"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_commentary_final",
    "scenario_id": 16,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_9_10_four-legged-race.png"
        ]
      }
    ],
    "source_link": "trials_9_10_four-legged-race.png",
    "questions": [
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn Lio did not try hard in the second match, it might mean they are actually stronger than they appear (because their team didn't pull as much as they could have).",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  }
];
