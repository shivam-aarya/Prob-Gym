export type InputMethod = 'number_line' | 'histogram' | 'slider';

export interface TextSection {
  title: string;
  content: string;
  isCollapsible?: boolean;
  isInitiallyExpanded?: boolean;
}

/**
 * Individual stimulus item for multi-stimuli support
 */
export interface StimulusItem {
  input_type: 'img' | 'text' | 'video';
  media_url: string[];
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
  question: string;
  options: string[];
  input_method: InputMethod;
  num_points?: number; // Number of points to create probability distribution
  total_allocation?: number; // Total number of allocations allowed for histogram
  discrete?: boolean; // Whether the input should be discrete (snap to option values)
  randomize_order?: boolean; // Whether to randomize the display order of options
  // Slider-specific configuration
  slider_config?: {
    min?: number; // Minimum slider value (default: 0)
    max?: number; // Maximum slider value (default: 100)
    step?: number; // Step size for slider (default: 1)
    default_value?: number; // Default starting value (default: 50)
    show_value?: boolean; // Whether to show numeric value (default: true)
    require_all?: boolean; // Whether all sliders must be moved from default (default: false)
    constrain_sum?: number; // Optional: constrain sum of all sliders to this value
    labels?: Array<{ value: number; label: string }>; // Custom labels at specific values
    show_label_values?: boolean; // Whether to show numeric values in labels (default: false)
    label_padding?: number; // Horizontal padding percentage for label area (default: 5)
  };
}

export interface UserResponse {
  task_name: string;
  scenario_id: number;
  response_data: {
    values?: number[];  // Optional array for histogram values
    points?: number[];  // Array of selected points for timeline
    options?: string[]; // The options associated with the values/points
  };
  time_data?: {
    start_time: string;  // ISO string of when user started the scenario
    end_time: string;    // ISO string of when user completed the scenario
    duration_ms: number; // Total time spent in milliseconds
  };
} 