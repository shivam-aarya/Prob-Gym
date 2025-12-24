import React, { useEffect, useState } from 'react';
import { StudyConfig, UserResponse } from '@/types/study';
import { PluginLoader } from '@/components/plugins/PluginLoader';
import { useStudy } from '@/contexts/StudyContext';

interface QuestionFrameProps {
  config: StudyConfig;
  onSubmit: (response: UserResponse) => void;
  previousResponses?: Record<number, number[]>;
  isSubmitting?: boolean;
}

// Map input_method values to plugin names
const INPUT_METHOD_TO_PLUGIN: Record<string, string> = {
  'number_line': 'number-line',
  'histogram': 'histogram',
  'slider': 'constrained-slider',
  'multi-choice': 'multiple-choice',
  'multi-select': 'multiple-select',
  'textbox': 'textbox',
};

export default function QuestionFrame({ config, onSubmit, previousResponses = {}, isSubmitting = false }: QuestionFrameProps) {
  const { studySlug } = useStudy();
  const [previousResponse, setPreviousResponse] = useState<number[] | null>(null);
  const [currentValues, setCurrentValues] = useState<number[] | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set start time when component mounts or scenario changes
    setStartTime(new Date());

    // Reset current values when scenario changes
    setCurrentValues(null);

    // Check if there's a previous response for this scenario
    if (previousResponses && previousResponses[config.scenario_id]) {
      setPreviousResponse(previousResponses[config.scenario_id]);

      // If it's a number line input, also check if we have saved point positions
      if (config.input_method === 'number_line') {
        // Try to load exact point positions from localStorage for this scenario
        // Use study-scoped key
        const savedPositions = localStorage.getItem(`${studySlug}_pointPositions_${config.scenario_id}`);
        if (savedPositions) {
          try {
            JSON.parse(savedPositions);
            // The NumberLineInput component will handle the point positions data
          } catch (err) {
            console.error('Error parsing saved point positions:', err);
          }
        }
      }
    } else {
      setPreviousResponse(null);
    }
  }, [config.scenario_id, previousResponses, config.input_method, studySlug]);

  // Handler for when plugin values change (controlled component pattern)
  const handleValuesChange = (values: number[]) => {
    setCurrentValues(values);
  };

  // Handler for actual form submission
  const handleSubmit = async () => {
    if (!currentValues || isSubmitting) return;

    const endTime = new Date();
    const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;

    const response: UserResponse = {
      task_name: config.task_name,
      scenario_id: config.scenario_id,
      response_data: {
        values: currentValues,
        options: config.options,
      },
      time_data: {
        start_time: startTime?.toISOString() || new Date().toISOString(),
        end_time: endTime.toISOString(),
        duration_ms: duration
      }
    };

    // Call parent onSubmit, parent will handle API submission and state management
    onSubmit(response);
  };

  // Check if this is a single-question scenario
  if (!config.input_method) {
    console.error('QuestionFrame requires input_method. Use MultiQuestionFrame for multi-question scenarios.');
    return (
      <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
        Error: This component is for single-question scenarios only.
      </div>
    );
  }

  // Determine plugin name from input method
  const pluginName = INPUT_METHOD_TO_PLUGIN[config.input_method];

  if (!pluginName) {
    console.error(`Unknown input method: ${config.input_method}`);
    return (
      <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
        Error: Unknown input method &quot;{config.input_method}&quot;
      </div>
    );
  }

  // Build plugin configuration object based on input method
  let pluginConfig = {};
  if (config.input_method === 'number_line') {
    pluginConfig = {
      total_allocation: config.total_allocation,
      discrete: config.discrete,
    };
  } else if (config.input_method === 'histogram') {
    pluginConfig = {
      total_allocation: config.total_allocation,
      randomize_order: config.randomize_order,
    };
  } else if (config.input_method === 'slider') {
    pluginConfig = {
      randomize_order: config.randomize_order,
      min: config.slider_config?.min,
      max: config.slider_config?.max,
      step: config.slider_config?.step,
      default_value: config.slider_config?.default_value,
      show_value: config.slider_config?.show_value,
      require_all: config.slider_config?.require_all,
      constrain_sum: config.slider_config?.constrain_sum,
      labels: config.slider_config?.labels,
      show_label_values: config.slider_config?.show_label_values,
      label_padding: config.slider_config?.label_padding,
    };
  }

  // Build plugin props to match InputPluginProps interface
  const pluginProps = {
    value: previousResponse || currentValues,
    onChange: handleValuesChange,
    options: config.options,
    config: pluginConfig,
    disabled: isSubmitting,
  };

  // Build plugin context
  const pluginContext = {
    studySlug,
    scenarioId: config.scenario_id,
    taskName: config.task_name,
  };

  // Determine if we can submit
  const canSubmit = currentValues !== null && currentValues.length > 0;

  // Validation messages
  let validationMessage = null;
  if (config.input_method === 'histogram' && config.total_allocation) {
    const sum = currentValues?.reduce((a, b) => a + b, 0) || 0;
    if (sum < config.total_allocation) {
      validationMessage = `Please allocate all ${config.total_allocation} points (${config.total_allocation - sum} remaining)`;
    }
  } else if (config.input_method === 'number_line' && config.total_allocation) {
    const count = currentValues?.length || 0;
    if (count < config.total_allocation) {
      validationMessage = `Please place all ${config.total_allocation} points (${config.total_allocation - count} remaining)`;
    }
  } else if (config.input_method === 'slider' && config.slider_config?.constrain_sum) {
    const sum = currentValues?.reduce((a, b) => a + b, 0) || 0;
    if (sum !== config.slider_config.constrain_sum) {
      validationMessage = `Total must equal ${config.slider_config.constrain_sum} (current: ${sum})`;
    }
  }

  return (
    <div className="space-y-4">
      <PluginLoader
        pluginName={pluginName}
        pluginProps={pluginProps}
        context={pluginContext}
      />

      {validationMessage && (
        <div className="text-sm text-center text-yellow-600 dark:text-yellow-400">
          {validationMessage}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!canSubmit || !!validationMessage || isSubmitting}
        className="w-full py-3 px-4 rounded-md transition-colors text-white font-medium
          bg-blue-600 hover:bg-blue-700 active:bg-blue-800
          disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Response'}
      </button>
    </div>
  );
} 