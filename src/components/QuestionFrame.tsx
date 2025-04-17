import React, { useEffect, useState } from 'react';
import { StudyConfig, UserResponse } from '@/types/study';
import NumberLineInput from './NumberLineInput';
import HistogramInput from './HistogramInput';
import { useAdditionalInfo } from '@/components/AdditionalInfoContext';
import { useTheme } from './ThemeProvider';

interface QuestionFrameProps {
  config: StudyConfig;
  onSubmit: (response: UserResponse) => void;
  previousResponses?: Record<number, number[]>;
  scenarioId: number;
}

export default function QuestionFrame({ config, onSubmit, previousResponses = {}, scenarioId }: QuestionFrameProps) {
  const [previousResponse, setPreviousResponse] = useState<number[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const { additionalInfo, setAdditionalInfo } = useAdditionalInfo(scenarioId);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useEffect(() => {
    // Set start time when component mounts
    setStartTime(new Date());
    
    // Check if there's a previous response for this scenario
    if (previousResponses && previousResponses[scenarioId]) {
      setPreviousResponse(previousResponses[scenarioId]);
      
      // If it's a number line input, also check if we have saved point positions
      if (config.input_method === 'number_line') {
        // Try to load exact point positions from localStorage for this scenario
        const savedPositions = localStorage.getItem(`pointPositions_${scenarioId}`);
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
  }, [scenarioId, previousResponses, config.input_method]);

  const handleNumberLineSubmit = async (values: number[]) => {
    const endTime = new Date();
    const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;
    
    const response: UserResponse = {
      task_name: config.task_name,
      scenario_id: scenarioId,
      response_data: {
        values: values,
        additional_info: additionalInfo
      },
      time_data: {
        start_time: startTime?.toISOString() || new Date().toISOString(),
        end_time: endTime.toISOString(),
        duration_ms: duration
      }
    };
    
    // Call parent onSubmit, parent will handle API submission
    setIsSubmitting(true);
    try {
      onSubmit(response);
    } catch (error) {
      console.error('Error handling submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHistogramSubmit = async (values: number[]) => {
    const endTime = new Date();
    const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;
    
    const response: UserResponse = {
      task_name: config.task_name,
      scenario_id: scenarioId,
      response_data: {
        values: values,
        additional_info: additionalInfo
      },
      time_data: {
        start_time: startTime?.toISOString() || new Date().toISOString(),
        end_time: endTime.toISOString(),
        duration_ms: duration
      }
    };
    
    // Call parent onSubmit, parent will handle API submission
    setIsSubmitting(true);
    try {
      onSubmit(response);
    } catch (error) {
      console.error('Error handling submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!previousResponse) return;
    setIsSubmitting(true);
    try {
      const endTime = new Date();
      const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;
      
      const response: UserResponse = {
        task_name: config.task_name,
        scenario_id: scenarioId,
        response_data: {
          values: previousResponse,
          additional_info: additionalInfo
        },
        time_data: {
          start_time: startTime?.toISOString() || new Date().toISOString(),
          end_time: endTime.toISOString(),
          duration_ms: duration
        }
      };
      
      await onSubmit(response);
      setPreviousResponse(null);
      setAdditionalInfo('');
    } catch (error) {
      console.error('Error submitting response:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = () => {
    switch (config.input_method) {
      case 'number_line':
        return (
          <NumberLineInput
            options={config.options}
            onSubmit={handleNumberLineSubmit}
            total_allocation={config.total_allocation}
            discrete={config.discrete}
            initialValues={previousResponse}
            scenarioId={scenarioId}
            disabled={isSubmitting}
          />
        );
      case 'histogram':
        return (
          <HistogramInput
            options={config.options}
            onSubmit={handleHistogramSubmit}
            total_allocation={config.total_allocation}
            randomize_order={config.randomize_order}
            initialValues={previousResponse}
            scenarioId={scenarioId}
            disabled={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderInput()}
    </div>
  );
} 