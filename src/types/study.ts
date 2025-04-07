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
}

export interface UserResponse {
  task_name: string;
  scenario_id: number;
  response_data: {
    selected_value: number;
    values?: number[];  // Optional array for histogram values
    points?: number[];  // Array of selected points for probability distribution
    distribution?: number[];  // Computed probability distribution
    timestamp: string;
  };
} 