export type InputMethod = 'number_line' | 'histogram' | 'slider' | 'textbox' | 'multi-choice' | 'multi-select';

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
  width?: number | string; // Support both pixel values (number) and percentages (string)
  height?: number | string; // Support both pixel values (number) and percentages (string)
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

/**
 * ExperimentFlow Types
 * These types support complex experimental designs with blocks, conditions,
 * and different item types (trials, instructions, quizzes)
 */

// Types of items that can appear in experimental flow
export type ExperimentItemType = 'trial' | 'instruction' | 'test_trial' | 'comprehension_quiz';

// Base interface for all experiment items
export interface BaseExperimentItem {
  type: ExperimentItemType;
  id: string; // Unique identifier for this item
}

// Trial item (references a scenario from scenarios.ts)
export interface TrialItem extends BaseExperimentItem {
  type: 'trial';
  scenarioId: number; // References scenario in scenarios.ts by scenario_id
  originalTrialId?: string; // Original CogGym trial ID for reference
}

// Instruction page (text content with optional media)
export interface InstructionItem extends BaseExperimentItem {
  type: 'instruction';
  text: string; // HTML content
  media?: Array<{
    type: 'image' | 'video';
    url: string; // Relative path to asset
  }>;
}

// Test trial (trial with feedback shown after submission)
export interface TestTrialItem extends BaseExperimentItem {
  type: 'test_trial';
  scenarioId: number; // References scenario in scenarios.ts
  feedback?: string; // Optional feedback HTML to show after submission
}

// Comprehension quiz (must answer correctly to proceed)
export interface ComprehensionQuizItem extends BaseExperimentItem {
  type: 'comprehension_quiz';
  text?: string; // Optional intro text (HTML)
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number; // Index of correct answer (0-based)
  }>;
}

// Union type for all experiment items
export type ExperimentItem = TrialItem | InstructionItem | TestTrialItem | ComprehensionQuizItem;

// Block structure - a group of items that can be randomized together
export interface ExperimentBlock {
  id: string; // Unique block identifier
  items: ExperimentItem[]; // Items in this block
  randomizeItems?: boolean; // Whether to randomize items within this block
}

// Experimental condition - different participants may be assigned different conditions
export interface ExperimentalCondition {
  name: string; // Condition name (e.g., "control", "treatment", "condition_1")
  blocks: ExperimentBlock[]; // Blocks for this condition
  randomizeBlocks?: boolean; // Whether to randomize block order
}

// Complete experiment flow configuration
export interface ExperimentFlow {
  conditions: ExperimentalCondition[]; // Array of possible conditions
  assignmentStrategy?: 'random' | 'sequential' | 'balanced'; // How to assign participants to conditions
}

// Participant assignment tracking (stored in study-scoped localStorage)
export interface ParticipantAssignment {
  participantId: string;
  studySlug: string;
  condition?: string; // Assigned experimental condition name
  itemSequence: string[]; // Ordered list of item IDs to present
  currentIndex: number; // Current position in sequence (0-based)
  completedItems: string[]; // Array of completed item IDs
  assignedAt: string; // ISO timestamp of when assignment was made
} 