'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Plugin, InputPluginProps } from '@/components/plugins/types';

interface MultipleChoiceConfig {
  randomize_order?: boolean;
  require_response?: boolean;
}

/**
 * MultipleChoice Component
 * Radio button group for single selection from multiple options
 */
function MultipleChoice({
  value,
  onChange,
  options = [],
  config = {},
  context,
  disabled = false,
}: InputPluginProps) {
  const choiceConfig = config as MultipleChoiceConfig;
  const { randomize_order = false, require_response = true } = choiceConfig;

  const scenarioId = context?.scenarioId;
  const studySlug = context?.studySlug;

  // Memoize the display order
  const displayOrder = useMemo(() => {
    const indices = Array.from({ length: options.length }, (_, i) => i);
    if (randomize_order) {
      // Deterministic shuffle based on scenarioId
      const seed = scenarioId ?? 12345;
      let currentIndex = indices.length;
      let randomIndex: number;
      const random = () => {
        const x = Math.sin(seed + currentIndex) * 10000;
        return x - Math.floor(x);
      };

      while (currentIndex !== 0) {
        randomIndex = Math.floor(random() * currentIndex);
        currentIndex--;
        [indices[currentIndex], indices[randomIndex]] = [
          indices[randomIndex],
          indices[currentIndex],
        ];
      }
    }
    return indices;
  }, [options.length, randomize_order, scenarioId]);

  // State: selected option index (in original order)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(() => {
    if (value !== undefined && value !== null) {
      return typeof value === 'number' ? value : null;
    }
    return null;
  });

  // Load saved value from localStorage
  useEffect(() => {
    if (scenarioId && studySlug) {
      const savedValue = localStorage.getItem(
        `${studySlug}_multipleChoice_${scenarioId}`
      );
      if (savedValue !== null) {
        const parsed = parseInt(savedValue, 10);
        if (!isNaN(parsed)) {
          setSelectedIndex(parsed);
        }
      }
    }
  }, [scenarioId, studySlug]);

  const handleSelect = (originalIndex: number) => {
    if (disabled) return;

    setSelectedIndex(originalIndex);

    // Save to localStorage
    if (scenarioId && studySlug) {
      localStorage.setItem(
        `${studySlug}_multipleChoice_${scenarioId}`,
        originalIndex.toString()
      );
    }

    // Notify parent
    onChange(originalIndex);
  };

  return (
    <div className="space-y-3">
      {displayOrder.map((originalIndex) => {
        const option = options[originalIndex];
        const isSelected = selectedIndex === originalIndex;

        return (
          <label
            key={originalIndex}
            className={`
              flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
              ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input
              type="radio"
              name={`choice-${scenarioId}`}
              checked={isSelected}
              onChange={() => handleSelect(originalIndex)}
              disabled={disabled}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 focus:ring-2 disabled:cursor-not-allowed"
            />
            <span className="ml-3 text-base text-gray-800 dark:text-gray-200">
              {option}
            </span>
          </label>
        );
      })}

      {require_response && selectedIndex === null && (
        <div className="text-sm text-center text-yellow-600 dark:text-yellow-400">
          Please select an option before submitting
        </div>
      )}
    </div>
  );
}

/**
 * Plugin definition
 */
export const MultipleChoicePlugin: Plugin<InputPluginProps, MultipleChoiceConfig> = {
  name: 'multiple-choice',
  version: '1.0.0',
  type: 'input',
  component: MultipleChoice,
  description: 'Radio button group for single selection from multiple options',
  author: 'Prob-Gym Research Team',
  configSchema: {
    randomize_order: { type: 'boolean', default: false },
    require_response: { type: 'boolean', default: true },
  },
};

export default MultipleChoicePlugin;
