'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Plugin, InputPluginProps } from '@/components/plugins/types';

interface SliderState {
  value: number;
  touched: boolean;
}

interface SliderConfig {
  min?: number;
  max?: number;
  step?: number;
  default_value?: number;
  show_value?: boolean;
  require_all?: boolean;
  constrain_sum?: number;
  labels?: Array<{ value: number; label: string }>;
  show_label_values?: boolean;
  label_padding?: number;
  randomize_order?: boolean;
}

/**
 * ConstrainedSlider Component
 * Advanced slider input with constraint support, randomization, and sum constraints
 */
function ConstrainedSlider({
  value,
  onChange,
  options = [],
  config = {},
  context,
  disabled = false,
}: InputPluginProps) {
  // Extract configuration
  const sliderConfig = config as SliderConfig;
  const {
    min = 0,
    max = 100,
    step = 1,
    default_value = 50,
    show_value = true,
    require_all = false,
    constrain_sum,
    labels,
    show_label_values = false,
    label_padding = 5,
    randomize_order = false,
  } = sliderConfig;

  const scenarioId = context?.scenarioId;
  const studySlug = context?.studySlug;

  // Memoize the display order
  const displayOrder = useMemo(() => {
    const indices = Array.from({ length: options.length }, (_, i) => i);
    if (randomize_order) {
      // Use a deterministic shuffle based on scenarioId if provided
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

  // Initialize slider states
  const [sliders, setSliders] = useState<SliderState[]>(() => {
    if (value && Array.isArray(value) && value.length === options.length) {
      return value.map((v: number) => ({ value: v, touched: true }));
    }
    return options.map(() => ({ value: default_value, touched: false }));
  });

  // Load saved values from localStorage
  useEffect(() => {
    if (scenarioId && studySlug) {
      const savedValues = localStorage.getItem(`${studySlug}_sliderValues_${scenarioId}`);
      if (savedValues) {
        try {
          const parsed: number[] = JSON.parse(savedValues);
          if (parsed && parsed.length === options.length) {
            setSliders(parsed.map((v) => ({ value: v, touched: true })));
          }
        } catch (err) {
          console.error('Error parsing saved slider values:', err);
        }
      }
    }
  }, [scenarioId, studySlug, options.length]);

  // Reset when options change
  useEffect(() => {
    if (!value) {
      setSliders(options.map(() => ({ value: default_value, touched: false })));
    }
  }, [options, default_value, value]);

  const handleSliderChange = (index: number, newValue: number) => {
    if (disabled) return;

    setSliders((prev) => {
      const updated = [...prev];
      updated[index] = { value: newValue, touched: true };

      // If constrain_sum is enabled, adjust other sliders proportionally
      if (constrain_sum !== undefined) {
        const sum = updated.reduce((acc, s) => acc + s.value, 0);
        if (sum > constrain_sum) {
          // Need to reduce other sliders
          const excess = sum - constrain_sum;
          const otherSum = sum - newValue;

          if (otherSum > 0) {
            for (let i = 0; i < updated.length; i++) {
              if (i !== index) {
                const reduction = (updated[i].value / otherSum) * excess;
                updated[i] = {
                  ...updated[i],
                  value: Math.max(min, Math.round(updated[i].value - reduction)),
                };
              }
            }
          }
        }
      }

      // Create values array in the original order
      const values = new Array(options.length);
      displayOrder.forEach((originalIndex, displayIndex) => {
        values[originalIndex] = updated[displayIndex]?.value ?? default_value;
      });

      // Save to localStorage with study-scoped key
      if (scenarioId && studySlug) {
        localStorage.setItem(`${studySlug}_sliderValues_${scenarioId}`, JSON.stringify(values));
      }

      // Notify parent of change
      onChange(values);

      return updated;
    });
  };

  const allTouched = sliders.every((s) => s.touched);
  const currentSum = sliders.reduce((acc, s) => acc + s.value, 0);

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="text-sm text-gray-700 dark:text-gray-300">
        <p className="mb-2">
          Use the sliders below to rate each option from {min} to {max}.
        </p>
        {constrain_sum !== undefined && (
          <p
            className={`text-sm ${
              currentSum === constrain_sum
                ? 'text-green-600 dark:text-green-400'
                : 'text-yellow-600 dark:text-yellow-400'
            }`}
          >
            Total: {currentSum} / {constrain_sum}
            {currentSum !== constrain_sum && ' (values will auto-adjust)'}
          </p>
        )}
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        {displayOrder.map((originalIndex, displayIndex) => {
          const option = options[originalIndex];
          const slider = sliders[displayIndex];

          // Guard against undefined slider during state updates
          if (!slider) return null;

          const percentage = ((slider.value - min) / (max - min)) * 100;

          return (
            <div key={originalIndex} className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor={`slider-${originalIndex}`}
                  className="text-base font-medium text-gray-800 dark:text-gray-200"
                >
                  {option}
                </label>
                {show_value && (
                  <span className="text-sm font-mono px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    {slider.value}
                  </span>
                )}
              </div>

              <div className="relative">
                {/* Track background */}
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  {/* Filled portion */}
                  <div
                    className="h-2 rounded-full transition-all duration-150"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: slider.touched ? '#3b82f6' : '#9ca3af',
                    }}
                  />
                </div>

                {/* Slider input */}
                <input
                  id={`slider-${originalIndex}`}
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={slider.value}
                  onChange={(e) => handleSliderChange(displayIndex, Number(e.target.value))}
                  disabled={disabled}
                  className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
              </div>

              {/* Custom labels or default min/max */}
              {labels && labels.length > 0 ? (
                <div
                  className="relative h-8 mt-1"
                  style={{
                    paddingLeft: `${label_padding}%`,
                    paddingRight: `${label_padding}%`,
                  }}
                >
                  {labels.map((labelItem, idx) => {
                    const position = ((labelItem.value - min) / (max - min)) * 100;
                    const displayText = show_label_values
                      ? `${labelItem.value} (${labelItem.label})`
                      : labelItem.label;

                    // Determine if this is an edge label
                    const isLeftEdge = position <= 5;
                    const isRightEdge = position >= 95;

                    let alignment: React.CSSProperties = {
                      left: `${position}%`,
                      transform: 'translateX(-50%)',
                      textAlign: 'center',
                    };

                    if (isLeftEdge) {
                      alignment = {
                        left: '0%',
                        transform: 'none',
                        textAlign: 'left',
                      };
                    } else if (isRightEdge) {
                      alignment = {
                        right: '0%',
                        left: 'auto',
                        transform: 'none',
                        textAlign: 'right',
                      };
                    }

                    return (
                      <div
                        key={idx}
                        className="absolute text-xs text-gray-500 dark:text-gray-400"
                        style={{
                          ...alignment,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {displayText}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500">
                  <span>{min}</span>
                  <span>{max}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Validation messages */}
      {require_all && !allTouched && (
        <div className="text-sm text-center text-yellow-600 dark:text-yellow-400">
          Please adjust all sliders before submitting
        </div>
      )}
      {constrain_sum !== undefined && currentSum !== constrain_sum && (
        <div className="text-sm text-center text-yellow-600 dark:text-yellow-400">
          Total must equal {constrain_sum} (current: {currentSum})
        </div>
      )}
    </div>
  );
}

/**
 * Plugin definition
 */
export const ConstrainedSliderPlugin: Plugin<InputPluginProps, SliderConfig> = {
  name: 'constrained-slider',
  version: '1.0.0',
  type: 'input',
  component: ConstrainedSlider,
  description:
    'Advanced slider input with support for constraints, randomization, and sum constraints',
  author: 'Prob-Gym Research Team',
  configSchema: {
    min: { type: 'number', default: 0 },
    max: { type: 'number', default: 100 },
    step: { type: 'number', default: 1 },
    default_value: { type: 'number', default: 50 },
    show_value: { type: 'boolean', default: true },
    require_all: { type: 'boolean', default: false },
    constrain_sum: { type: 'number', optional: true },
    labels: { type: 'array', optional: true },
    show_label_values: { type: 'boolean', default: false },
    label_padding: { type: 'number', default: 5 },
    randomize_order: { type: 'boolean', default: false },
  },
};

export default ConstrainedSliderPlugin;
