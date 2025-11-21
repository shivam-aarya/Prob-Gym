import React, { useEffect, useState } from 'react';
import { StudyConfig, QuestionResponse, UserResponse } from '@/types/study';
import { PluginLoader } from '@/components/plugins/PluginLoader';
import { useStudy } from '@/contexts/StudyContext';

interface MultiQuestionFrameProps {
  config: StudyConfig;
  onSubmit: (response: UserResponse) => void;
  previousResponses?: Record<number, QuestionResponse[]>;
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

export default function MultiQuestionFrame({ config, onSubmit, previousResponses = {} }: MultiQuestionFrameProps) {
  const { studySlug } = useStudy();
  const [currentValues, setCurrentValues] = useState<Record<number, number[] | string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const questions = config.questions || [];

  useEffect(() => {
    // Set start time when component mounts or scenario changes
    setStartTime(new Date());

    // Reset current values when scenario changes
    setCurrentValues({});

    // Check if there are previous responses for this scenario
    if (previousResponses && previousResponses[config.scenario_id]) {
      const prevResponses = previousResponses[config.scenario_id];
      const initialValues: Record<number, number[] | string> = {};

      prevResponses.forEach((resp, index) => {
        if (resp.values) {
          initialValues[index] = resp.values;
        } else if (resp.text) {
          initialValues[index] = resp.text;
        }
      });

      setCurrentValues(initialValues);
    }
  }, [config.scenario_id, previousResponses]);

  // Handler for when a question's value changes
  const handleQuestionChange = (questionIndex: number, value: number[] | string) => {
    setCurrentValues(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  // Handler for form submission
  const handleSubmit = async () => {
    const endTime = new Date();
    const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;

    // Build responses array
    const responses: QuestionResponse[] = questions.map((question, index) => {
      const value = currentValues[index];
      const questionResp: QuestionResponse = {
        question_tag: question.tag,
        options: question.options,
      };

      if (question.input_method === 'textbox') {
        questionResp.text = typeof value === 'string' ? value : '';
      } else {
        questionResp.values = Array.isArray(value) ? value : [];
      }

      return questionResp;
    });

    const response: UserResponse = {
      task_name: config.task_name,
      scenario_id: config.scenario_id,
      responses: responses,
      time_data: {
        start_time: startTime?.toISOString() || new Date().toISOString(),
        end_time: endTime.toISOString(),
        duration_ms: duration
      }
    };

    setIsSubmitting(true);
    try {
      onSubmit(response);
    } catch (error) {
      console.error('Error handling submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine if we can submit (all questions answered)
  const canSubmit = questions.every((_, index) => {
    const value = currentValues[index];
    return value !== undefined && value !== null && (
      (typeof value === 'string' && value.length > 0) ||
      (Array.isArray(value) && value.length > 0)
    );
  });

  return (
    <div className="space-y-6">
      {questions.map((question, questionIndex) => {
        const pluginName = INPUT_METHOD_TO_PLUGIN[question.input_method];

        if (!pluginName) {
          return (
            <div key={questionIndex} className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
              Error: Unknown input method &quot;{question.input_method}&quot;
            </div>
          );
        }

        // Build plugin configuration object based on input method
        let pluginConfig = {};
        if (question.input_method === 'number_line') {
          pluginConfig = {
            total_allocation: question.total_allocation,
            discrete: question.discrete,
          };
        } else if (question.input_method === 'histogram') {
          pluginConfig = {
            total_allocation: question.total_allocation,
            randomize_order: question.randomize_order,
          };
        } else if (question.input_method === 'slider') {
          pluginConfig = {
            randomize_order: question.randomize_order,
            min: question.slider_config?.min,
            max: question.slider_config?.max,
            step: question.slider_config?.step,
            default_value: question.slider_config?.default_value,
            show_value: question.slider_config?.show_value,
            require_all: question.slider_config?.require_all,
            constrain_sum: question.slider_config?.constrain_sum,
            labels: question.slider_config?.labels,
            show_label_values: question.slider_config?.show_label_values,
            label_padding: question.slider_config?.label_padding,
          };
        }

        const currentValue = currentValues[questionIndex];

        // Build plugin props
        const pluginProps = {
          value: currentValue,
          onChange: (value: number[] | string) => handleQuestionChange(questionIndex, value),
          options: question.options,
          config: pluginConfig,
          disabled: isSubmitting,
        };

        // Build plugin context
        const pluginContext = {
          studySlug,
          scenarioId: config.scenario_id,
          taskName: config.task_name,
          questionIndex,
        };

        return (
          <div key={questionIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium uppercase tracking-wider">Question {questionIndex + 1}</span>
              </div>
              <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200"
                 dangerouslySetInnerHTML={{ __html: question.question }}>
              </p>
            </div>

            <PluginLoader
              pluginName={pluginName}
              pluginProps={pluginProps}
              context={pluginContext}
            />
          </div>
        );
      })}

      <button
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
        className="w-full py-3 px-4 rounded-md transition-colors text-white font-medium
          bg-blue-600 hover:bg-blue-700 active:bg-blue-800
          disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit All Responses'}
      </button>
    </div>
  );
}
