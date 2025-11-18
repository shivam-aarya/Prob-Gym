'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Plugin, InputPluginProps } from '@/components/plugins/types';

interface MultipleSelectConfig {
  randomize_order?: boolean;
  require_response?: boolean;
  min_selections?: number;
  max_selections?: number;
}

/**
 * MultipleSelect Component
 * Checkbox group for multiple selections from options
 */
function MultipleSelect({
  value,
  onChange,
  options = [],
  config = {},
  context,
  disabled = false,
}: InputPluginProps) {
  const selectConfig = config as MultipleSelectConfig;
  const {
    randomize_order = false,
    require_response = true,
    min_selections = 1,
    max_selections,
  } = selectConfig;

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

  // State: array of selected indices (in original order)
  const [selectedIndices, setSelectedIndices] = useState<number[]>(() => {
    if (value && Array.isArray(value)) {
      return value;
    }
    return [];
  });

  // Load saved value from localStorage
  useEffect(() => {
    if (scenarioId && studySlug) {
      const savedValue = localStorage.getItem(
        `${studySlug}_multipleSelect_${scenarioId}`
      );
      if (savedValue) {
        try {
          const parsed = JSON.parse(savedValue);
          if (Array.isArray(parsed)) {
            setSelectedIndices(parsed);
          }
        } catch (err) {
          console.error('Error parsing saved multi-select values:', err);
        }
      } else {
        // Reset to empty array if no saved value for this scenario
        setSelectedIndices([]);
      }
    }
  }, [scenarioId, studySlug]);

  const handleToggle = (originalIndex: number) => {
    if (disabled) return;

    setSelectedIndices((prev) => {
      let updated: number[];

      if (prev.includes(originalIndex)) {
        // Uncheck
        updated = prev.filter((idx) => idx !== originalIndex);
      } else {
        // Check - but respect max_selections
        if (max_selections !== undefined && prev.length >= max_selections) {
          // Don't add if at max
          return prev;
        }
        updated = [...prev, originalIndex];
      }

      // Save to localStorage
      if (scenarioId && studySlug) {
        localStorage.setItem(
          `${studySlug}_multipleSelect_${scenarioId}`,
          JSON.stringify(updated)
        );
      }

      // Notify parent
      onChange(updated);

      return updated;
    });
  };

  const selectionCount = selectedIndices.length;
  const isValid =
    selectionCount >= min_selections &&
    (max_selections === undefined || selectionCount <= max_selections);

  return (
    <div className="space-y-3">
      {/* Selection counter */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {selectionCount} selected
        {max_selections !== undefined && ` (max: ${max_selections})`}
        {min_selections > 0 && ` (min: ${min_selections})`}
      </div>

      {displayOrder.map((originalIndex) => {
        const option = options[originalIndex];
        const isSelected = selectedIndices.includes(originalIndex);
        const isDisabledByMax =
          max_selections !== undefined &&
          !isSelected &&
          selectionCount >= max_selections;

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
              ${disabled || isDisabledByMax ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleToggle(originalIndex)}
              disabled={disabled || isDisabledByMax}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 disabled:cursor-not-allowed"
            />
            <span className="ml-3 text-base text-gray-800 dark:text-gray-200">
              {option}
            </span>
          </label>
        );
      })}

      {/* Validation messages */}
      {require_response && !isValid && (
        <div className="text-sm text-center text-yellow-600 dark:text-yellow-400">
          {selectionCount < min_selections
            ? `Please select at least ${min_selections} option${min_selections > 1 ? 's' : ''}`
            : `Please select no more than ${max_selections} options`}
        </div>
      )}
    </div>
  );
}

/**
 * Plugin definition
 */
export const MultipleSelectPlugin: Plugin<InputPluginProps, MultipleSelectConfig> = {
  name: 'multiple-select',
  version: '1.0.0',
  type: 'input',
  component: MultipleSelect,
  description: 'Checkbox group for multiple selections from options',
  author: 'Prob-Gym Research Team',
  configSchema: {
    randomize_order: { type: 'boolean', default: false },
    require_response: { type: 'boolean', default: true },
    min_selections: { type: 'number', default: 1 },
    max_selections: { type: 'number', optional: true },
  },
};

export default MultipleSelectPlugin;
