export type InputMethod = 'number_line' | 'histogram';

export interface TextSection {
  title: string;
  content: string;
  isCollapsible?: boolean;
  isInitiallyExpanded?: boolean;
}

export interface StudyConfig {
  task_name: string;
  scenario_id: number;
  original_scenario_id?: number; // Added for reference to original ID during random selection
  input_type: 'img' | 'text' | 'video';
  source_link?: string;
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
}

export interface UserResponse {
  task_name: string;
  scenario_id: number;
  response_data: {
    values?: number[];  // Optional array for histogram values
    points?: number[];  // Array of selected points for timeline
    options?: string[]; // The options associated with the values/points
    additional_info?: string;  // Additional information provided by the user
  };
  time_data?: {
    start_time: string;  // ISO string of when user started the scenario
    end_time: string;    // ISO string of when user completed the scenario
    duration_ms: number; // Total time spent in milliseconds
  };
} 