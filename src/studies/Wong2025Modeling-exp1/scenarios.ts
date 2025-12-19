/**
 * Study scenarios
 * Auto-generated from CogGym format
 */

import { StudyConfig } from '@/types/study';

export const scenarios: StudyConfig[] = [
  {
    "task_name": "exp1_practice_1",
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
    "task_name": "trials_9_10_tug-of-war",
    "scenario_id": 1,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_9_10_tug-of-war.png"
        ]
      }
    ],
    "source_link": "trials_9_10_tug-of-war.png",
    "questions": [
      {
        "question": "How strong is Ian based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_ian",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very weak"
            },
            {
              "value": 100,
              "label": "very strong"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How strong is Bob based on the tournament above?",
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
              "label": "very weak"
            },
            {
              "value": 100,
              "label": "very strong"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Ian put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_ian_g1",
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
        "question": "How much effort did Ian put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_ian_g2",
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
        "question": "Who would win another match between Ian & Jack and Hank & Evan?",
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
              "label": "Hank & Evan"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "trials_11_12_tug-of-war",
    "scenario_id": 2,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_11_12_tug-of-war.png"
        ]
      }
    ],
    "source_link": "trials_11_12_tug-of-war.png",
    "questions": [
      {
        "question": "How strong is Greg based on the tournament above?",
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
              "label": "very weak"
            },
            {
              "value": 100,
              "label": "very strong"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How strong is Dan based on the tournament above?",
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
              "label": "very weak"
            },
            {
              "value": 100,
              "label": "very strong"
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
        "question": "Who would win another match between Greg & Jack and Hank & Evan?",
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
              "label": "Greg & Jack"
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
    "task_name": "trials_13_14_tug-of-war",
    "scenario_id": 3,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_13_14_tug-of-war.png"
        ]
      }
    ],
    "source_link": "trials_13_14_tug-of-war.png",
    "questions": [
      {
        "question": "How strong is Adam based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_adam",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very weak"
            },
            {
              "value": 100,
              "label": "very strong"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How strong is Carl based on the tournament above?",
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
              "label": "very weak"
            },
            {
              "value": 100,
              "label": "very strong"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Adam put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_adam_g1",
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
        "question": "How much effort did Adam put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_adam_g2",
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
        "question": "Who would win another match between Adam & Dan and Carl & Fred?",
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
              "label": "Adam & Dan"
            },
            {
              "value": 100,
              "label": "Carl & Fred"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "trials_15_16_tug-of-war",
    "scenario_id": 4,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_15_16_tug-of-war.png"
        ]
      }
    ],
    "source_link": "trials_15_16_tug-of-war.png",
    "questions": [
      {
        "question": "How strong is Jack based on the tournament above?",
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
              "label": "very weak"
            },
            {
              "value": 100,
              "label": "very strong"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How strong is Ian based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_ian",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very weak"
            },
            {
              "value": 100,
              "label": "very strong"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Jack put into Game 1?",
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
        "question": "How much effort did Jack put into Game 2?",
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
        "question": "Who would win another match between Jack & Carl and Ian & Hank?",
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
              "label": "Jack & Carl"
            },
            {
              "value": 100,
              "label": "Ian & Hank"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "trials_17_18_tug-of-war",
    "scenario_id": 5,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_17_18_tug-of-war.png"
        ]
      }
    ],
    "source_link": "trials_17_18_tug-of-war.png",
    "questions": [
      {
        "question": "How strong is Evan based on the tournament above?",
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
              "label": "very weak"
            },
            {
              "value": 100,
              "label": "very strong"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How strong is Bob based on the tournament above?",
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
              "label": "very weak"
            },
            {
              "value": 100,
              "label": "very strong"
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
        "question": "Who would win another match between Evan & Fred and Adam & Greg?",
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
              "label": "Evan & Fred"
            },
            {
              "value": 100,
              "label": "Adam & Greg"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "trials_19_20_tug-of-war",
    "scenario_id": 6,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_19_20_tug-of-war.png"
        ]
      }
    ],
    "source_link": "trials_19_20_tug-of-war.png",
    "questions": [
      {
        "question": "How strong is Fred based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_fred",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very weak"
            },
            {
              "value": 100,
              "label": "very strong"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How strong is Adam based on the tournament above?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "strength_adam",
        "slider_config": {
          "min": 0,
          "max": 100,
          "show_value": true,
          "require_all": false,
          "labels": [
            {
              "value": 0,
              "label": "very weak"
            },
            {
              "value": 100,
              "label": "very strong"
            }
          ],
          "show_label_values": false
        }
      },
      {
        "question": "How much effort did Fred put into Game 1?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_fred_g1",
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
        "question": "How much effort did Fred put into Game 2?",
        "options": [
          "Response"
        ],
        "input_method": "slider",
        "randomize_order": false,
        "tag": "effort_fred_g2",
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
        "question": "Who would win another match between Fred & Hank and Carl & Adam?",
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
              "label": "Fred & Hank"
            },
            {
              "value": 100,
              "label": "Carl & Adam"
            }
          ],
          "show_label_values": false
        }
      }
    ]
  },
  {
    "task_name": "trials_17_18_tug-of-war_commentary",
    "scenario_id": 7,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_17_18_tug-of-war.png"
        ]
      }
    ],
    "source_link": "trials_17_18_tug-of-war.png",
    "questions": [
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn someone did not try hard in the second match, it might mean they are actually stronger than they appear.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  },
  {
    "task_name": "trials_19_20_tug-of-war_commentary",
    "scenario_id": 8,
    "input_type": "img",
    "commentary": "",
    "stimuli": [
      {
        "input_type": "img",
        "media_url": [
          "trials_19_20_tug-of-war.png"
        ]
      }
    ],
    "source_link": "trials_19_20_tug-of-war.png",
    "questions": [
      {
        "question": "<strong>Write your commentary here!</strong> Example sentence: Just before the first match, Bob's glasses broke.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_sentence"
      },
      {
        "question": "<strong>Describe how your commentary should change someone's belief here (this will NOT be shown to future participants).</strong> Example explanation: Athletes vary in how much effort they put into any match; if athletes don't try hard, they don't pull as much. If we learn someone did not try hard in the second match, it might mean they are actually stronger than they appear.",
        "options": [],
        "input_method": "textbox",
        "randomize_order": false,
        "tag": "commentary_explanation"
      }
    ]
  }
];
