import React, { useState } from 'react';

interface DemographicSurveyProps {
  config: {
    title: string;
    description: string;
    questions: Array<{
      id: string;
      type: string;
      label: string;
      required: boolean;
      options: string[];
    }>;
    buttonText: string;
  };
  onSubmit: (responses: Record<string, string>) => void;
}

export default function DemographicSurvey({ config, onSubmit }: DemographicSurveyProps) {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const newErrors: Record<string, string> = {};
    config.questions.forEach(question => {
      if (question.required && !responses[question.id]) {
        newErrors[question.id] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(responses);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{config.title}</h1>
      <p className="text-lg mb-8">{config.description}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {config.questions.map(question => (
          <div key={question.id} className="space-y-2">
            <label className="block text-lg font-medium">
              {question.label}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            <select
              value={responses[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              className={`w-full p-3 border rounded-lg ${
                errors[question.id] ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select an option</option>
              {question.options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            
            {errors[question.id] && (
              <p className="text-red-500 text-sm">{errors[question.id]}</p>
            )}
          </div>
        ))}
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {config.buttonText}
        </button>
      </form>
    </div>
  );
} 