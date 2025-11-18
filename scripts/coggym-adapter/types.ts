/**
 * TypeScript type definitions for CogGym experiment format
 * Based on CogGym documentation schemas
 */

// ============================================================================
// Config Schema Types (config.json)
// ============================================================================

export interface CogGymConfig {
  experimentName: string;
  description: string;
  paperDOI: string;
  taskType: string[];
  responseType: string[];
  contributors: string[];
  stimuli_count: number;
  experimentFlow: ExperimentFlow[];
}

export interface ExperimentFlow {
  experimental_condition?: string;
  blocks: string[][];
  block_randomization: boolean;
  stimuli_randomization: boolean;
}

// ============================================================================
// Stimuli/Trial Schema Types (stimuli.jsonl)
// ============================================================================

export type InputType = 'img' | 'video' | 'text';

export type QueryType =
  | 'multi-choice'
  | 'multi-select'
  | 'single-slider'
  | 'multi-slider'
  | 'textbox'
  | 'text-instruction';

/**
 * Individual stimulus item (CogGym v2 schema)
 * Discriminated union based on input_type
 */
export interface BaseStimulusItem {
  input_type: InputType;
  // Optional fields (see Appendix A.3)
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

export interface CogGymStimulus {
  stimuli_id: string;
  stimuli: StimulusItem[];
  commentary?: string;
  queries: Query[];
  delay?: number;
}

export interface Query {
  prompt: string;
  type: QueryType;
  tag: string;
  option?: string[];
  randomize_order?: boolean;
  required?: boolean;
  answer?: number;
  slider_config?: SliderConfig;
  sampling_size?: number;
}

export interface SliderConfig {
  min: number;
  max: number;
  default_value: number;
  labels?: SliderLabel[];
  show_label_values?: boolean;
}

export interface SliderLabel {
  value: number;
  label: string;
}

// ============================================================================
// Instruction Schema Types (instruction.jsonl)
// ============================================================================

export type InstructionModuleType = 'instruction' | 'test_trial';

export interface InstructionModule {
  type: InstructionModuleType;
}

export interface InstructionPage extends InstructionModule {
  type: 'instruction';
  text: string;
  media_url?: string[];
}

export interface TestTrial extends InstructionModule {
  type: 'test_trial';
  text?: string;
  stimuli?: StimulusItem[];
  queries: Query[];
}

export type InstructionContent = InstructionPage | TestTrial;

// ============================================================================
// Human Data Schema Types
// ============================================================================

export interface HumanDataIndividual {
  [stimuliId: string]: {
    [queryTag: string]: any[];
  };
}

export interface HumanDataMean {
  [stimuliId: string]: {
    [queryTag: string]: any;
  };
}

// ============================================================================
// Adapter Internal Types
// ============================================================================

/**
 * Complete experiment data loaded from CogGym format
 */
export interface CogGymExperiment {
  config: CogGymConfig;
  stimuli: CogGymStimulus[];
  instructions?: InstructionContent[];
  humanDataIndividual?: HumanDataIndividual;
  humanDataMean?: HumanDataMean;
  sourcePath: string;
}

/**
 * Mapping between CogGym stimuli_id and Prob-Gym scenario_id
 */
export interface IdMapping {
  stimuliId: string;
  queryTag: string;
  scenarioId: number;
  queryIndex: number;
}

/**
 * Flattened trial from nested block structure
 */
export interface FlattenedTrial {
  stimuliId: string;
  condition?: string;
  order: number;
}

/**
 * Conversion options for the adapter
 */
export interface ConversionOptions {
  datasetsPath: string;
  outputPath: string;
  dryRun?: boolean;
  overwrite?: boolean;
  verbose?: boolean;
}

/**
 * Conversion result
 */
export interface ConversionResult {
  success: boolean;
  studySlug: string;
  outputPath?: string;
  scenarioCount?: number;
  errors?: string[];
  warnings?: string[];
}
