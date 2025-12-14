/**
 * Converter: CogGym stimuli → Prob-Gym scenarios
 * Keeps multi-query trials together as multi-question scenarios
 */

import { CogGymStimulus, Query, IdMapping } from '../types';
import { createIdMappings } from '../utils/id-mapper';

/**
 * Convert CogGym stimuli to Prob-Gym scenarios
 * Multi-query trials become multi-question scenarios
 */
export function convertToScenarios(stimuli: CogGymStimulus[]): {
  scenarios: any[];
  mappings: IdMapping[];
} {
  const mappings = createIdMappings(stimuli);
  const scenarios: any[] = [];
  let scenarioId = 0;

  for (const stimulus of stimuli) {
    if (stimulus.queries.length === 1) {
      // Single question - use legacy format
      const mapping = mappings.find(
        m => m.stimuliId === stimulus.id && m.queryIndex === 0
      );
      scenarios.push(convertQueryToScenario(stimulus, stimulus.queries[0], mapping?.scenarioId || scenarioId));
    } else {
      // Multiple questions - use multi-question format
      scenarios.push(convertToMultiQuestionScenario(stimulus, scenarioId));
    }
    scenarioId++;
  }

  return { scenarios, mappings };
}

/**
 * Convert a stimulus with multiple queries to a multi-question scenario
 */
function convertToMultiQuestionScenario(
  stimulus: CogGymStimulus,
  scenarioId: number
): any {
  const primaryStimulus = stimulus.stimuli[0];

  const scenario: any = {
    task_name: stimulus.id,
    scenario_id: scenarioId,
    input_type: primaryStimulus.input_type,
    commentary: stimulus.commentary || '',
  };

  // Convert stimuli array to platform format
  scenario.stimuli = stimulus.stimuli.map(s => {
    if (s.input_type === 'text') {
      const textStimulus: any = {
        input_type: s.input_type,
        text: s.text,
      };
      if (s.title) textStimulus.title = s.title;
      if (s.fontsize) textStimulus.fontsize = s.fontsize;
      return textStimulus;
    } else {
      const mediaStimulus: any = {
        input_type: s.input_type,
        media_url: s.media_url.map(url => url.replace(/^assets\//, '')),
      };
      if (s.title) mediaStimulus.title = s.title;
      if (s.width) mediaStimulus.width = s.width;
      if (s.height) mediaStimulus.height = s.height;
      if (s.dimension) mediaStimulus.dimension = s.dimension;
      return mediaStimulus;
    }
  });

  // Set source_link for backward compatibility
  if (primaryStimulus.input_type !== 'text' && primaryStimulus.media_url && primaryStimulus.media_url.length > 0) {
    scenario.source_link = primaryStimulus.media_url[0].replace(/^assets\//, '');
  }

  // Convert all queries to questions array
  scenario.questions = stimulus.queries.map(query => {
    const { input_method, slider_config, total_allocation, discrete } = convertQueryTypeToInputMethod(query);

    let options = query.option || [];

    // For number_line, use labels as options (the timeline points)
    if (input_method === 'number_line' && query.slider_config?.labels) {
      options = query.slider_config.labels.map(label => label.label);
    } else if ((query.type === 'single-slider' || query.type === 'multi-slider') && options.length === 0) {
      options = ['Response'];
    }

    const question: any = {
      question: query.prompt,
      options: options,
      input_method: input_method,
      randomize_order: query.randomize_order || false,
    };

    if (query.tag) {
      question.tag = query.tag;
    }

    if (slider_config) {
      question.slider_config = slider_config;
    }

    if (input_method === 'histogram') {
      question.total_allocation = 100;
      question.discrete = true;
    }

    if (input_method === 'number_line') {
      question.total_allocation = total_allocation;
      question.discrete = discrete;
    }

    return question;
  });

  return scenario;
}

/**
 * Convert a single query to a Prob-Gym scenario (legacy single-question format)
 */
function convertQueryToScenario(
  stimulus: CogGymStimulus,
  query: Query,
  scenarioId: number
): any {
  // Convert query type to input method first (needed for options logic)
  const { input_method, slider_config, total_allocation, discrete } = convertQueryTypeToInputMethod(query);

  // Handle options based on input method
  let options = query.option || [];

  // For number_line, use labels as options (the timeline points)
  if (input_method === 'number_line' && query.slider_config?.labels) {
    options = query.slider_config.labels.map(label => label.label);
  } else if ((query.type === 'single-slider' || query.type === 'multi-slider') && options.length === 0) {
    options = ['Response']; // Placeholder option for single slider
  }

  // Extract input_type from first stimulus (CogGym v2 schema)
  const primaryStimulus = stimulus.stimuli[0];

  const scenario: any = {
    task_name: stimulus.id,
    scenario_id: scenarioId,
    // Don't set original_scenario_id - it's for numeric IDs, we use task_name for the original trial ID
    input_type: primaryStimulus.input_type,
    commentary: stimulus.commentary || '',
    question: query.prompt,
    options: options,
    randomize_order: query.randomize_order || false,
  };

  // Convert stimuli array to platform format
  // Strip "assets/" prefix from media URLs since platform prepends asset path
  scenario.stimuli = stimulus.stimuli.map(s => {
    if (s.input_type === 'text') {
      // Text stimulus - include text content and optional fields
      const textStimulus: any = {
        input_type: s.input_type,
        text: s.text,
      };
      if (s.title) textStimulus.title = s.title;
      if (s.fontsize) textStimulus.fontsize = s.fontsize;
      return textStimulus;
    } else {
      // Media stimulus (img/video) - include media_url and optional fields
      const mediaStimulus: any = {
        input_type: s.input_type,
        media_url: s.media_url.map(url => url.replace(/^assets\//, '')),
      };
      if (s.title) mediaStimulus.title = s.title;
      if (s.width) mediaStimulus.width = s.width;
      if (s.height) mediaStimulus.height = s.height;
      if (s.dimension) mediaStimulus.dimension = s.dimension;
      return mediaStimulus;
    }
  });

  // Handle media URLs - use first media from first stimulus as primary source_link for backward compatibility
  // Strip "assets/" prefix since it will be prepended by platform
  if (primaryStimulus.input_type !== 'text' && primaryStimulus.media_url && primaryStimulus.media_url.length > 0) {
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

  if (input_method === 'number_line') {
    scenario.total_allocation = total_allocation;
    scenario.discrete = discrete;
  }

  return scenario;
}

/**
 * Convert CogGym query type to Prob-Gym input method
 */
function convertQueryTypeToInputMethod(query: Query): {
  input_method: string;
  slider_config?: any;
  total_allocation?: number;
  discrete?: boolean;
} {
  switch (query.type) {
    case 'multi-choice':
      return { input_method: 'multi-choice' };

    case 'multi-select':
      return { input_method: 'multi-select' };

    case 'textbox':
      return { input_method: 'textbox' };

    case 'single-slider':
      // Check if this should use number_line instead (when num_clicks > 1)
      if (query.slider_config?.num_clicks && query.slider_config.num_clicks > 1) {
        return {
          input_method: 'number_line',
          total_allocation: query.slider_config.num_clicks,
          discrete: false, // Default to continuous values
        };
      }
      return {
        input_method: 'slider',
        slider_config: convertSliderConfig(query, false),
      };

    case 'multi-slider':
      // Check if this should use number_line instead (when num_clicks > 1)
      if (query.slider_config?.num_clicks && query.slider_config.num_clicks > 1) {
        return {
          input_method: 'number_line',
          total_allocation: query.slider_config.num_clicks,
          discrete: false, // Default to continuous values
        };
      }
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
