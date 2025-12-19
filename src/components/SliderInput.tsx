'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from './ThemeProvider';

interface SliderInputProps {
  options: string[];
  onSubmit: (values: number[]) => void;
  initialValues?: number[] | null;
  scenarioId?: number;
  disabled?: boolean;
  randomize_order?: boolean;
  // Slider configuration
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
}

interface SliderState {
  value: number | null; // null when no default value is set and slider hasn't been touched
  touched: boolean;
}

export default function SliderInput({
  options,
  onSubmit,
  initialValues = null,
  scenarioId,
  disabled = false,
  randomize_order = false,
  min = 0,
  max = 100,
  step = 1,
  default_value,
  show_value = true,
  require_all = false,
  constrain_sum,
  labels,
  show_label_values = false,
  label_padding = 5
}: SliderInputProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
    if (initialValues && initialValues.length === options.length) {
      return initialValues.map(value => ({ value, touched: true }));
    }
    // If no default_value is specified, start with null (no value)
    // Otherwise use the provided default value
    const initialValue = default_value !== undefined ? default_value : null;
    const initialTouched = default_value !== undefined; // Only touched if explicitly set
    return options.map(() => ({ value: initialValue, touched: initialTouched }));
  });

  // Load saved values from localStorage
  useEffect(() => {
    if (scenarioId) {
      const savedValues = localStorage.getItem(`sliderValues_${scenarioId}`);
      if (savedValues) {
        try {
          const parsed: number[] = JSON.parse(savedValues);
          if (parsed && parsed.length === options.length) {
            setSliders(parsed.map(value => ({ value, touched: true })));
          }
        } catch (err) {
          console.error('Error parsing saved slider values:', err);
        }
      }
    }
  }, [scenarioId, options.length]);

  // Reset when options change
  useEffect(() => {
    if (!initialValues) {
      const initialValue = default_value !== undefined ? default_value : null;
      const initialTouched = default_value !== undefined;
      setSliders(options.map(() => ({ value: initialValue, touched: initialTouched })));
    }
  }, [options, default_value, initialValues]);

  const handleSliderChange = (index: number, newValue: number) => {
    if (disabled) return;

    setSliders(prev => {
      const updated = [...prev];
      updated[index] = { value: newValue, touched: true };

      // If constrain_sum is enabled, adjust other sliders proportionally
      if (constrain_sum !== undefined) {
        const sum = updated.reduce((acc, s) => acc + (s.value ?? 0), 0);
        if (sum > constrain_sum) {
          // Need to reduce other sliders
          const excess = sum - constrain_sum;
          const otherSum = sum - newValue;

          if (otherSum > 0) {
            for (let i = 0; i < updated.length; i++) {
              if (i !== index && updated[i].value !== null) {
                const currentValue = updated[i].value as number;
                const reduction = (currentValue / otherSum) * excess;
                updated[i] = {
                  ...updated[i],
                  value: Math.max(min, Math.round(currentValue - reduction))
                };
              }
            }
          }
        }
      }

      return updated;
    });
  };

  const handleSubmit = () => {
    if (disabled) return;

    // Create values array in the original order (before randomization)
    const values = new Array(options.length);
    displayOrder.forEach((originalIndex, displayIndex) => {
      const slider = sliders[displayIndex];
      if (slider) {
        values[originalIndex] = slider.value;
      }
    });

    // Save to localStorage
    if (scenarioId) {
      localStorage.setItem(`sliderValues_${scenarioId}`, JSON.stringify(values));
    }

    onSubmit(values);
  };

  const allTouched = sliders.every(s => s.touched);
  const canSubmit = !require_all || allTouched;
  const currentSum = sliders.reduce((acc, s) => acc + (s.value ?? 0), 0);
  const isSumValid = constrain_sum === undefined || currentSum === constrain_sum;

  return (
    <div className="space-y-6">
      {/* Sum constraint feedback */}
      {constrain_sum !== undefined && (
        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <p className={`text-sm ${currentSum === constrain_sum ? (isDark ? 'text-green-400' : 'text-green-600') : (isDark ? 'text-yellow-400' : 'text-yellow-600')}`}>
            Total: {currentSum} / {constrain_sum}
            {currentSum !== constrain_sum && ' (values will auto-adjust)'}
          </p>
        </div>
      )}

      {/* Sliders */}
      <div className="space-y-4">
        {displayOrder.map((originalIndex, displayIndex) => {
          const option = options[originalIndex];
          const slider = sliders[displayIndex];

          // Guard against undefined slider during state updates
          if (!slider) return null;

          // Calculate percentage only if value is not null
          const hasValue = slider.value !== null;
          const percentage = hasValue ? ((slider.value! - min) / (max - min)) * 100 : 0;

          return (
            <div key={originalIndex} className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor={`slider-${originalIndex}`}
                  className={`text-base font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
                >
                  {option}
                </label>
                {show_value && (
                  <span className={`text-sm font-mono px-2 py-1 rounded ${
                    isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {hasValue ? slider.value : '-'}
                  </span>
                )}
              </div>

              <div className="relative">
                {/* Track background */}
                <div className={`h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  {/* Filled portion - only show if value is set */}
                  {hasValue && (
                    <div
                      className="h-2 rounded-full transition-all duration-150"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: slider.touched
                          ? (isDark ? '#60a5fa' : '#3b82f6')
                          : (isDark ? '#4b5563' : '#9ca3af')
                      }}
                    />
                  )}
                </div>

                {/* Slider input */}
                <input
                  id={`slider-${originalIndex}`}
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={hasValue ? slider.value! : Math.round((min + max) / 2)}
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
                    paddingRight: `${label_padding}%`
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
                      textAlign: 'center'
                    };

                    if (isLeftEdge) {
                      alignment = {
                        left: '0%',
                        transform: 'none',
                        textAlign: 'left'
                      };
                    } else if (isRightEdge) {
                      alignment = {
                        right: '0%',
                        left: 'auto',
                        transform: 'none',
                        textAlign: 'right'
                      };
                    }

                    return (
                      <div
                        key={idx}
                        className={`absolute text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                        style={{
                          ...alignment,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {displayText}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={`flex justify-between text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  <span>{min}</span>
                  <span>{max}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit button */}
      <div className="space-y-2 pt-4">
        {require_all && !allTouched && (
          <div className={`text-sm text-center ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
            Please adjust all sliders before submitting
          </div>
        )}
        {constrain_sum !== undefined && !isSumValid && (
          <div className={`text-sm text-center ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
            Total must equal {constrain_sum} (current: {currentSum})
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={disabled || !canSubmit || !isSumValid}
          className={`w-full py-3 px-4 rounded-md transition-colors text-white font-medium
            ${isDark
              ? 'bg-blue-400 hover:bg-blue-500 active:bg-blue-600 disabled:bg-gray-600'
              : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300'
            } disabled:cursor-not-allowed`}
        >
          Submit Response
        </button>
      </div>
    </div>
  );
}
