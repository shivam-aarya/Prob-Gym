export type InputMethod = 'number_line' | 'histogram' | 'slider' | 'textbox';

export interface TextSection {
  title: string;
  content: string;
  isCollapsible?: boolean;
  isInitiallyExpanded?: boolean;
}

/**
 * Individual stimulus item for multi-stimuli support
 * Discriminated union based on input_type
 */
export interface BaseStimulusItem {
  input_type: 'img' | 'text' | 'video';
  // Optional fields (Appendix A.3)
  title?: string;
  fontsize?: number;
  width?: number;
  height?: number;
  dimension?: Array<{ width: number; height: number }>;
}

export interface MediaStimulusItem extends BaseStimulusItem {
  input_type: 'img' | 'video';
  media_url: string[];
}

export interface TextStimulusItem extends BaseStimulusItem {
  input_type: 'text';
  text: string;
}

export type StimulusItem = MediaStimulusItem | TextStimulusItem;

/**
 * Individual question within a scenario
 * Used for multi-question scenarios (one stimulus, multiple questions)
 */
export interface Question {
  question: string;
  options: string[];
  input_method: InputMethod;
  randomize_order?: boolean;
  tag?: string; // Optional tag for identifying the question in responses
  // Question-specific configurations
  num_points?: number;
  total_allocation?: number;
  discrete?: boolean;
  slider_config?: {
    min?: number;
    max?: number;
    step?: number;
    default_value?: number;
    show_value?: boolean;
    require_all?: boolean;
    constrain_sum?: number;
    labels?: Array<{ value: number; label: string }>;
    show_label_values?: boolean;
    label_padding?: number;
  };
}

export interface StudyConfig {
  task_name: string;
  scenario_id: number;
  original_scenario_id?: number; // Added for reference to original ID during random selection
  input_type: 'img' | 'text' | 'video';
  source_link?: string;
  stimuli?: StimulusItem[]; // Multi-stimuli support (CogGym v2 schema)
  text_content?: string;
  text_sections?: TextSection[];
  commentary: string;

  // Single-question format (legacy, backward compatible)
  question?: string;
  options?: string[];
  input_method?: InputMethod;
  num_points?: number;
  total_allocation?: number;
  discrete?: boolean;
  randomize_order?: boolean;
  slider_config?: {
    min?: number;
    max?: number;
    step?: number;
    default_value?: number;
    show_value?: boolean;
    require_all?: boolean;
    constrain_sum?: number;
    labels?: Array<{ value: number; label: string }>;
    show_label_values?: boolean;
    label_padding?: number;
  };

  // Multi-question format (for trials with multiple queries)
  questions?: Question[];
}

/**
 * Response data for a single question
 */
export interface QuestionResponse {
  question_tag?: string; // Optional tag identifying which question this answers
  values?: number[];  // Optional array for histogram values or slider values
  points?: number[];  // Array of selected points for timeline
  options?: string[]; // The options associated with the values/points
  text?: string; // Text response for textbox inputs
}

export interface UserResponse {
  task_name: string;
  scenario_id: number;

  // Single-question response (legacy format)
  response_data?: {
    values?: number[];  // Optional array for histogram values
    points?: number[];  // Array of selected points for timeline
    options?: string[]; // The options associated with the values/points
    text?: string; // Text response for textbox inputs
  };

  // Multi-question response (for scenarios with multiple questions)
  responses?: QuestionResponse[];

  time_data?: {
    start_time: string;  // ISO string of when user started the scenario
    end_time: string;    // ISO string of when user completed the scenario
    duration_ms: number; // Total time spent in milliseconds
  };
} 