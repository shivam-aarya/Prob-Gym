/**
 * Study scenarios
 * Auto-generated from CogGym format
 */

import { StudyConfig } from '@/types/study';

export const scenarios: StudyConfig[] = [
  {
    "task_name": "exp2_practice_1",
    "scenario_id": 0,
    "input_type": "img",
    "commentary": "",
    "question": "Who won the above game?",
    "options": [
      "Rick",
      "Andy"
    ],
    "randomize_order": false,
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "test1.png"
        ]
      }
    ],
    "source_link": "test1.png",
    "input_method": "multi-choice"
  },
  {
    "task_name": "exp2_trial_001",
    "scenario_id": 1,
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
        "question": "How fast is Jack based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_jack",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How fast is Dan based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_dan",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Jack put into Race 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_jack_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Jack put into Race 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_jack_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "Who would win another race between Jack & Greg and Fred & Ian?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Jack & Greg"
            },
            {
              "value": 100,
              "label": "Fred & Ian"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "exp2_trial_002",
    "scenario_id": 2,
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
        "question": "How fast is Carl based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_carl",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How fast is Bob based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_bob",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Carl put into Race 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_carl_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Carl put into Race 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_carl_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "Who would win another race between Carl & Greg and Hank & Evan?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Carl & Greg"
            },
            {
              "value": 100,
              "label": "Hank & Evan"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "exp2_trial_003",
    "scenario_id": 3,
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
        "question": "How fast is Bob based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_bob",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How fast is Hank based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Bob put into Race 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_bob_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Bob put into Race 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_bob_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "Who would win another race between Fred & Ian and Hank & Evan?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Fred & Ian"
            },
            {
              "value": 100,
              "label": "Hank & Evan"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "exp2_trial_004",
    "scenario_id": 4,
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
        "question": "How fast is Hank based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How fast is Dan based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_dan",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Hank put into Race 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_hank_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Hank put into Race 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_hank_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "Who would win another race between Ian & Jack and Dan & Evan?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Ian & Jack"
            },
            {
              "value": 100,
              "label": "Dan & Evan"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "exp2_trial_005",
    "scenario_id": 5,
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
        "question": "How fast is Hank based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How fast is Carl based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_carl",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Hank put into Race 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_hank_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Hank put into Race 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_hank_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "Who would win another race between Hank & Adam and Greg & Dan?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Hank & Adam"
            },
            {
              "value": 100,
              "label": "Greg & Dan"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "exp2_trial_006",
    "scenario_id": 6,
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
        "question": "How fast is Greg based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_greg",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How fast is Evan based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_evan",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Greg put into Race 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_greg_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Greg put into Race 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_greg_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "Who would win another race between Greg & Ian and Hank & Evan?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Greg & Ian"
            },
            {
              "value": 100,
              "label": "Hank & Evan"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "exp2_trial_007",
    "scenario_id": 7,
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
        "question": "How fast is Hank based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How fast is Carl based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_carl",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Hank put into Race 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_hank_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Hank put into Race 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_hank_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "Who would win another race between Hank & Adam and Greg & Dan?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Hank & Adam"
            },
            {
              "value": 100,
              "label": "Greg & Dan"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "exp2_trial_008",
    "scenario_id": 8,
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
        "question": "How fast is Greg based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_greg",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How fast is Evan based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_evan",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Greg put into Race 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_greg_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Greg put into Race 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_greg_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "Who would win another race between Greg & Ian and Hank & Evan?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Greg & Ian"
            },
            {
              "value": 100,
              "label": "Hank & Evan"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "exp2_trial_009",
    "scenario_id": 9,
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
        "question": "How fast is Jack based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_jack",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How fast is Dan based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_dan",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Jack put into Race 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_jack_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Jack put into Race 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_jack_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "Who would win another race between Jack & Greg and Fred & Ian?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Jack & Greg"
            },
            {
              "value": 100,
              "label": "Fred & Ian"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "exp2_trial_010",
    "scenario_id": 10,
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
        "question": "How fast is Carl based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_carl",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How fast is Bob based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_bob",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Carl put into Race 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_carl_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Carl put into Race 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_carl_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "Who would win another race between Carl & Greg and Hank & Evan?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Carl & Greg"
            },
            {
              "value": 100,
              "label": "Hank & Evan"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "exp2_trial_011",
    "scenario_id": 11,
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
        "question": "How fast is Bob based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_bob",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How fast is Hank based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Bob put into Race 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_bob_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Bob put into Race 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_bob_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "Who would win another race between Fred & Ian and Hank & Evan?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Fred & Ian"
            },
            {
              "value": 100,
              "label": "Hank & Evan"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "exp2_trial_012",
    "scenario_id": 12,
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
        "question": "How fast is Hank based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How fast is Dan based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_dan",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Hank put into Race 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_hank_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Hank put into Race 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_hank_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "Who would win another race between Ian & Jack and Dan & Evan?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Ian & Jack"
            },
            {
              "value": 100,
              "label": "Dan & Evan"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "exp2_trial_013",
    "scenario_id": 13,
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
        "question": "How fast is Hank based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_hank",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How fast is Carl based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_carl",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Hank put into Race 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_hank_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Hank put into Race 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_hank_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "Who would win another race between Hank & Adam and Greg & Dan?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Hank & Adam"
            },
            {
              "value": 100,
              "label": "Greg & Dan"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "exp2_trial_014",
    "scenario_id": 14,
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
        "question": "How fast is Greg based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_greg",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How fast is Evan based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_evan",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Greg put into Race 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_greg_g1",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "How much effort did Greg put into Race 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_greg_g2",
        "slider_config": {
          "min": 0,
          "max": 100,
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
        "question": "Who would win another race between Greg & Ian and Hank & Evan?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "match_prediction",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "Greg & Ian"
            },
            {
              "value": 100,
              "label": "Hank & Evan"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "exp2_trial_013_commentary",
    "scenario_id": 15,
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
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't perform as well. If we learn someone did not try hard in the second race, it might mean they are actually faster than they appear.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "exp2_trial_014_commentary",
    "scenario_id": 16,
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
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't perform as well. If we learn someone did not try hard in the second race, it might mean they are actually faster than they appear.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  }
];
