'use client';

import React, { useState, useEffect } from 'react';
import { Plugin, InputPluginProps } from '@/components/plugins/types';

interface TextboxConfig {
  placeholder?: string;
  min_length?: number;
  max_length?: number;
  rows?: number;
  require_response?: boolean;
}

/**
 * Textbox Component
 * Free-text input with configurable validation
 */
function Textbox({
  value,
  onChange,
  config = {},
  context,
  disabled = false,
}: InputPluginProps) {
  const textboxConfig = config as TextboxConfig;
  const {
    placeholder = 'Enter your response...',
    min_length = 0,
    max_length,
    rows = 4,
    require_response = true,
  } = textboxConfig;

  const scenarioId = context?.scenarioId;
  const studySlug = context?.studySlug;

  // State: text content
  const [text, setText] = useState<string>(() => {
    if (value && typeof value === 'string') {
      return value;
    }
    return '';
  });

  // Load saved value from localStorage
  useEffect(() => {
    if (scenarioId && studySlug) {
      const savedValue = localStorage.getItem(`${studySlug}_textbox_${scenarioId}`);
      if (savedValue) {
        setText(savedValue);
      } else {
        // Reset to empty string if no saved value for this scenario
        setText('');
      }
    }
  }, [scenarioId, studySlug]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled) return;

    const newText = e.target.value;

    // Enforce max_length
    if (max_length !== undefined && newText.length > max_length) {
      return;
    }

    setText(newText);

    // Save to localStorage
    if (scenarioId && studySlug) {
      localStorage.setItem(`${studySlug}_textbox_${scenarioId}`, newText);
    }

    // Notify parent
    onChange(newText);
  };

  const charCount = text.length;
  const isValid =
    charCount >= min_length && (max_length === undefined || charCount <= max_length);
  const showValidation = require_response && !isValid && charCount > 0;

  return (
    <div className="space-y-2">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-lg border-2 transition-all resize-y
          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            showValidation
              ? 'border-yellow-400 dark:border-yellow-500'
              : 'border-gray-200 dark:border-gray-700'
          }
          bg-white dark:bg-gray-800
          text-gray-800 dark:text-gray-200
          placeholder-gray-400 dark:placeholder-gray-500
        `}
      />

      {/* Character counter and validation */}
      <div className="flex justify-between items-center text-sm">
        <div className="text-gray-500 dark:text-gray-400">
          {charCount}
          {max_length !== undefined && ` / ${max_length}`} characters
        </div>

        {showValidation && (
          <div className="text-yellow-600 dark:text-yellow-400">
            {charCount < min_length
              ? `Minimum ${min_length} characters required`
              : `Maximum ${max_length} characters exceeded`}
          </div>
        )}
      </div>

      {require_response && charCount === 0 && (
        <div className="text-sm text-center text-yellow-600 dark:text-yellow-400">
          Please provide a response before submitting
        </div>
      )}
    </div>
  );
}

/**
 * Plugin definition
 */
export const TextboxPlugin: Plugin<InputPluginProps, TextboxConfig> = {
  name: 'textbox',
  version: '1.0.0',
  type: 'input',
  component: Textbox,
  description: 'Free-text input with configurable validation',
  author: 'Prob-Gym Research Team',
  configSchema: {
    placeholder: { type: 'string', default: 'Enter your response...' },
    min_length: { type: 'number', default: 0 },
    max_length: { type: 'number', optional: true },
    rows: { type: 'number', default: 4 },
    require_response: { type: 'boolean', default: true },
  },
};

export default TextboxPlugin;
