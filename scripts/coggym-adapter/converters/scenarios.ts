/**
 * Converter: CogGym stimuli → Prob-Gym scenarios
 * Splits multi-query trials into separate scenarios
 */

import { CogGymStimulus, Query, IdMapping } from '../types';
import { createIdMappings } from '../utils/id-mapper';

/**
 * Convert CogGym stimuli to Prob-Gym scenarios
 * Each query becomes a separate scenario
 */
export function convertToScenarios(stimuli: CogGymStimulus[]): {
  scenarios: any[];
  mappings: IdMapping[];
} {
  const mappings = createIdMappings(stimuli);
  const scenarios: any[] = [];

  for (const stimulus of stimuli) {
    for (let queryIndex = 0; queryIndex < stimulus.queries.length; queryIndex++) {
      const query = stimulus.queries[queryIndex];
      const mapping = mappings.find(
        m => m.stimuliId === stimulus.stimuli_id && m.queryIndex === queryIndex
      );

      if (!mapping) {
        throw new Error(`Mapping not found for ${stimulus.stimuli_id} query ${queryIndex}`);
      }

      scenarios.push(convertQueryToScenario(stimulus, query, mapping.scenarioId));
    }
  }

  return { scenarios, mappings };
}

/**
 * Convert a single query to a Prob-Gym scenario
 */
function convertQueryToScenario(
  stimulus: CogGymStimulus,
  query: Query,
  scenarioId: number
): any {
  // Convert query type to input method first (needed for options logic)
  const { input_method, slider_config } = convertQueryTypeToInputMethod(query);

  // For single-slider queries, create a placeholder option since the slider doesn't need multiple options
  let options = query.option || [];
  if (query.type === 'single-slider' && options.length === 0) {
    options = ['Response']; // Placeholder option for single slider
  }

  // Extract input_type from first stimulus (CogGym v2 schema)
  const primaryStimulus = stimulus.stimuli[0];

  const scenario: any = {
    task_name: stimulus.stimuli_id,
    scenario_id: scenarioId,
    // Don't set original_scenario_id - it's for numeric IDs, we use task_name for the original stimuli_id
    input_type: primaryStimulus.input_type,
    commentary: stimulus.commentary || '',
    question: query.prompt,
    options: options,
    randomize_order: query.randomize_order || false,
  };

  // Convert stimuli array to platform format
  // Strip "assets/" prefix from media URLs since platform prepends asset path
  scenario.stimuli = stimulus.stimuli.map(s => ({
    input_type: s.input_type,
    media_url: s.media_url.map(url => url.replace(/^assets\//, '')),
  }));

  // Handle media URLs - use first media from first stimulus as primary source_link for backward compatibility
  // Strip "assets/" prefix since it will be prepended by platform
  if (primaryStimulus.media_url && primaryStimulus.media_url.length > 0) {
    scenario.source_link = primaryStimulus.media_url[0].replace(/^assets\//, '');
  }

  // Set input method (already converted above)
  scenario.input_method = input_method;

  if (slider_config) {
    scenario.slider_config = slider_config;
  }

  // Add special config for specific input methods
  if (input_method === 'histogram') {
    scenario.total_allocation = 100; // Default allocation
    scenario.discrete = true;
  }

  return scenario;
}

/**
 * Convert CogGym query type to Prob-Gym input method
 */
function convertQueryTypeToInputMethod(query: Query): {
  input_method: string;
  slider_config?: any;
} {
  switch (query.type) {
    case 'multi-choice':
      return { input_method: 'multi-choice' };

    case 'multi-select':
      return { input_method: 'multi-select' };

    case 'textbox':
      return { input_method: 'textbox' };

    case 'single-slider':
      return {
        input_method: 'slider',
        slider_config: convertSliderConfig(query, false),
      };

    case 'multi-slider':
      return {
        input_method: 'slider',
        slider_config: convertSliderConfig(query, true),
      };

    default:
      throw new Error(`Unknown query type: ${query.type}`);
  }
}

/**
 * Convert CogGym slider config to Prob-Gym slider config
 */
function convertSliderConfig(query: Query, isMultiSlider: boolean): any {
  const cogGymConfig = query.slider_config;

  if (!cogGymConfig) {
    // Default config
    return {
      min: 0,
      max: 100,
      default_value: 50,
      show_value: true,
      require_all: false,
    };
  }

  const probGymConfig: any = {
    min: cogGymConfig.min,
    max: cogGymConfig.max,
    default_value: cogGymConfig.default_value,
    show_value: true,
    require_all: isMultiSlider,
  };

  // Handle labels
  if (cogGymConfig.labels && cogGymConfig.labels.length > 0) {
    probGymConfig.labels = cogGymConfig.labels.map(label => ({
      value: label.value,
      label: label.label,
    }));
    probGymConfig.show_label_values = cogGymConfig.show_label_values || false;
  }

  // Handle multi-slider constraint (sampling)
  if (isMultiSlider && query.sampling_size) {
    // Note: sampling_size in CogGym means showing a random subset of options
    // This is different from constrain_sum, so we add it as custom metadata
    probGymConfig.sampling_size = query.sampling_size;
  }

  return probGymConfig;
}

/**
 * Generate task name from experiment name and scenario ID
 * Format: "experiment_scenarioId"
 */
export function generateTaskName(experimentName: string, scenarioId: number): string {
  // Sanitize experiment name for use in task name
  const sanitized = experimentName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  return `${sanitized}_${scenarioId}`;
}
