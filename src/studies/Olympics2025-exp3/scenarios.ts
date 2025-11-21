/**
 * Study scenarios
 * Auto-generated from CogGym format
 */

import { StudyConfig } from '@/types/study';

export const scenarios: StudyConfig[] = [
  {
    "task_name": "exp3_trial_001",
    "scenario_id": 0,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_9_10_math-team.png"
        ]
      }
    ],
    "source_link": "trials_9_10_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Evan is in general?",
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
        "question": "How good at math would you say that Carl is in general?",
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
        "question": "How much effort did Evan put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_evan_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Evan put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_evan_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Evan & Dan and Hank & Adam?",
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
              "label": "Evan & Dan"
            },
            {
              "value": 100,
              "label": "Hank & Adam"
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
    "task_name": "exp3_trial_002",
    "scenario_id": 1,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_11_12_math-team.png"
        ]
      }
    ],
    "source_link": "trials_11_12_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Hank is in general?",
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
        "question": "How good at math would you say that Greg is in general?",
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
        "question": "How much effort did Hank put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_hank_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Hank put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_hank_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Hank & Fred and Carl & Jack?",
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
              "label": "Hank & Fred"
            },
            {
              "value": 100,
              "label": "Carl & Jack"
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
    "task_name": "exp3_trial_003",
    "scenario_id": 2,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_13_14_math-team.png"
        ]
      }
    ],
    "source_link": "trials_13_14_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Greg is in general?",
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
        "question": "How good at math would you say that Adam is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_adam",
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
        "question": "How much effort did Greg put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_greg_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Greg put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_greg_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Greg & Evan and Adam & Fred?",
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
              "label": "Greg & Evan"
            },
            {
              "value": 100,
              "label": "Adam & Fred"
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
    "task_name": "exp3_trial_004",
    "scenario_id": 3,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_15_16_math-team.png"
        ]
      }
    ],
    "source_link": "trials_15_16_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Dan is in general?",
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
        "question": "How good at math would you say that Greg is in general?",
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
        "question": "How much effort did Dan put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_dan_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Dan put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_dan_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Dan & Carl and Greg & Ian?",
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
              "label": "Dan & Carl"
            },
            {
              "value": 100,
              "label": "Greg & Ian"
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
    "task_name": "exp3_trial_005",
    "scenario_id": 4,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_17_18_math-team.png"
        ]
      }
    ],
    "source_link": "trials_17_18_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Carl is in general?",
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
        "question": "How good at math would you say that Greg is in general?",
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
        "question": "How much effort did Carl put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_carl_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Carl put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_carl_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Carl & Dan and Ian & Adam?",
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
              "label": "Carl & Dan"
            },
            {
              "value": 100,
              "label": "Ian & Adam"
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
    "task_name": "exp3_trial_006",
    "scenario_id": 5,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_19_20_math-team.png"
        ]
      }
    ],
    "source_link": "trials_19_20_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Evan is in general?",
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
        "question": "How good at math would you say that Ian is in general?",
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
        "question": "How much effort did Evan put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_evan_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Evan put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_evan_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Evan & Adam and Dan & Ian?",
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
              "label": "Evan & Adam"
            },
            {
              "value": 100,
              "label": "Dan & Ian"
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
    "task_name": "exp3_trial_007",
    "scenario_id": 6,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_19_20_math-team.png"
        ]
      }
    ],
    "source_link": "trials_19_20_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Evan is in general?",
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
        "question": "How good at math would you say that Ian is in general?",
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
        "question": "How much effort did Evan put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_evan_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Evan put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_evan_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Evan & Adam and Dan & Ian?",
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
              "label": "Evan & Adam"
            },
            {
              "value": 100,
              "label": "Dan & Ian"
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
    "task_name": "exp3_trial_008",
    "scenario_id": 7,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_15_16_math-team.png"
        ]
      }
    ],
    "source_link": "trials_15_16_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Dan is in general?",
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
        "question": "How good at math would you say that Greg is in general?",
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
        "question": "How much effort did Dan put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_dan_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Dan put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_dan_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Dan & Carl and Greg & Ian?",
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
              "label": "Dan & Carl"
            },
            {
              "value": 100,
              "label": "Greg & Ian"
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
    "task_name": "exp3_trial_009",
    "scenario_id": 8,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_9_10_math-team.png"
        ]
      }
    ],
    "source_link": "trials_9_10_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Evan is in general?",
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
        "question": "How good at math would you say that Carl is in general?",
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
        "question": "How much effort did Evan put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_evan_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Evan put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_evan_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Evan & Dan and Hank & Adam?",
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
              "label": "Evan & Dan"
            },
            {
              "value": 100,
              "label": "Hank & Adam"
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
    "task_name": "exp3_trial_010",
    "scenario_id": 9,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_11_12_math-team.png"
        ]
      }
    ],
    "source_link": "trials_11_12_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Hank is in general?",
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
        "question": "How good at math would you say that Greg is in general?",
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
        "question": "How much effort did Hank put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_hank_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Hank put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_hank_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Hank & Fred and Carl & Jack?",
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
              "label": "Hank & Fred"
            },
            {
              "value": 100,
              "label": "Carl & Jack"
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
    "task_name": "exp3_trial_011",
    "scenario_id": 10,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_13_14_math-team.png"
        ]
      }
    ],
    "source_link": "trials_13_14_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Greg is in general?",
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
        "question": "How good at math would you say that Adam is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_adam",
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
        "question": "How much effort did Greg put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_greg_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Greg put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_greg_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Greg & Evan and Adam & Fred?",
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
              "label": "Greg & Evan"
            },
            {
              "value": 100,
              "label": "Adam & Fred"
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
    "task_name": "exp3_trial_012",
    "scenario_id": 11,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_15_16_math-team.png"
        ]
      }
    ],
    "source_link": "trials_15_16_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Dan is in general?",
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
        "question": "How good at math would you say that Greg is in general?",
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
        "question": "How much effort did Dan put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_dan_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Dan put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_dan_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Dan & Carl and Greg & Ian?",
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
              "label": "Dan & Carl"
            },
            {
              "value": 100,
              "label": "Greg & Ian"
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
    "task_name": "exp3_trial_013",
    "scenario_id": 12,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_17_18_math-team.png"
        ]
      }
    ],
    "source_link": "trials_17_18_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Carl is in general?",
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
        "question": "How good at math would you say that Greg is in general?",
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
        "question": "How much effort did Carl put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_carl_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Carl put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_carl_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Carl & Dan and Ian & Adam?",
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
              "label": "Carl & Dan"
            },
            {
              "value": 100,
              "label": "Ian & Adam"
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
    "task_name": "exp3_trial_014",
    "scenario_id": 13,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_19_20_math-team.png"
        ]
      }
    ],
    "source_link": "trials_19_20_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Evan is in general?",
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
        "question": "How good at math would you say that Ian is in general?",
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
        "question": "How much effort did Evan put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_evan_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Evan put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_evan_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Evan & Adam and Dan & Ian?",
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
              "label": "Evan & Adam"
            },
            {
              "value": 100,
              "label": "Dan & Ian"
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
    "task_name": "exp3_trial_015",
    "scenario_id": 14,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_17_18_math-team.png"
        ]
      }
    ],
    "source_link": "trials_17_18_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Carl is in general?",
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
        "question": "How good at math would you say that Greg is in general?",
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
        "question": "How much effort did Carl put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_carl_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Carl put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_carl_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Carl & Dan and Ian & Adam?",
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
              "label": "Carl & Dan"
            },
            {
              "value": 100,
              "label": "Ian & Adam"
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
    "task_name": "exp3_trial_016",
    "scenario_id": 15,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_13_14_math-team.png"
        ]
      }
    ],
    "source_link": "trials_13_14_math-team.png",
    "questions": [
      {
        "question": "How good at math would you say that Greg is in general?",
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
        "question": "How good at math would you say that Adam is in general?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_adam",
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
        "question": "How much effort did Greg put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_greg_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Greg put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_greg_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
          "default_value": 50,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "low effort"
            },
            {
              "value": 100,
              "label": "high effort"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "Who would win another round between Greg & Evan and Adam & Fred?",
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
              "label": "Greg & Evan"
            },
            {
              "value": 100,
              "label": "Adam & Fred"
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
    "task_name": "exp3_commentary_final",
    "scenario_id": 16,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_9_10_math-team.png"
        ]
      }
    ],
    "source_link": "trials_9_10_math-team.png",
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
