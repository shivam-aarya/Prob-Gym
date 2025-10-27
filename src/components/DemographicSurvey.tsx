import React, { useState } from 'react';

interface DemographicSurveyProps {
  config: {
    title: string;
    description?: string;
    questions: Array<{
      id: string;
      type: string;
      label: string;
      required?: boolean;
      options?: string[];
      placeholder?: string;
    }>;
    buttonText?: string;
  };
  onSubmit: (responses: Record<string, string>) => void;
  studySlug?: string;
}

export default function DemographicSurvey({ config, onSubmit }: DemographicSurveyProps) {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (questionId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
    // Clear error when user makes a selection
    if (errors[questionId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateProlificId = (id: string): boolean => {
    // Prolific IDs are alphanumeric and minimum 5 characters
    return /^[a-zA-Z0-9]{5,}$/.test(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const newErrors: Record<string, string> = {};
    config.questions.forEach(question => {
      if (question.required && !responses[question.id]) {
        newErrors[question.id] = 'This field is required';
      }
      // Special validation for Prolific ID
      if (question.id === 'prolific_id' && responses[question.id] && !validateProlificId(responses[question.id])) {
        newErrors[question.id] = 'Please enter a valid Prolific ID';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Pass demographic data to parent component for submission
      // Parent will handle API call with study-scoped endpoint
      await onSubmit(responses);
    } catch (error) {
      console.error('Error submitting demographic data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{config.title}</h1>
      {config.description && <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">{config.description}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {config.questions.map(question => (
          <div key={question.id} className="space-y-2">
            <label className="block text-lg font-medium text-gray-900 dark:text-white">
              {question.label}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {question.type === 'select' ? (
              <select
                value={responses[question.id] || ''}
                onChange={(e) => handleChange(question.id, e.target.value)}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
                  errors[question.id] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select an option</option>
                {question.options?.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={responses[question.id] || ''}
                onChange={(e) => handleChange(question.id, e.target.value)}
                placeholder={question.placeholder}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors ${
                  errors[question.id] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                disabled={isSubmitting}
              />
            )}

            {errors[question.id] && (
              <p className="text-red-500 dark:text-red-400 text-sm">{errors[question.id]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : (config.buttonText || "Submit")}
        </button>
      </form>
    </div>
  );
} 