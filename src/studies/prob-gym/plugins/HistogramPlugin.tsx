'use client';

import React, { useState, useEffect } from 'react';
import { Plugin, InputPluginProps } from '@/components/plugins/types';

interface HistogramConfig {
  total_allocation?: number;
  randomize_order?: boolean;
}

/**
 * Histogram Component
 * Visual histogram input for allocating points across options
 */
function Histogram({
  value,
  onChange,
  options = [],
  config = {},
  context,
  disabled = false,
}: InputPluginProps) {
  const { total_allocation, randomize_order = false } = config as HistogramConfig;
  const scenarioId = context?.scenarioId;
  const studySlug = context?.studySlug;

  // Create a mapping between original and displayed indices
  const [displayOrder, setDisplayOrder] = useState<number[]>([]);
  const [optionLabels, setOptionLabels] = useState<string[]>([]);

  // Initialize display order and option labels
  useEffect(() => {
    // Helper function to generate and save display order
    const generateAndSaveOrder = () => {
      const order = [...Array(options.length).keys()];
      // Fisher-Yates shuffle
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      setDisplayOrder(order);
      if (scenarioId && studySlug) {
        localStorage.setItem(`${studySlug}_histogramOrder_${scenarioId}`, JSON.stringify(order));
      }
    };

    if (randomize_order && scenarioId && studySlug) {
      // Try to load existing display order from localStorage
      const savedOrder = localStorage.getItem(`${studySlug}_histogramOrder_${scenarioId}`);
      if (savedOrder) {
        try {
          const parsedOrder = JSON.parse(savedOrder);
          if (Array.isArray(parsedOrder) && parsedOrder.length === options.length) {
            setDisplayOrder(parsedOrder);
          } else {
            // If saved order is invalid, generate new one
            generateAndSaveOrder();
          }
        } catch (err) {
          console.error('Error parsing saved display order:', err);
          generateAndSaveOrder();
        }
      } else {
        // No saved order, generate new one
        generateAndSaveOrder();
      }
    } else {
      setDisplayOrder([...Array(options.length).keys()]);
    }

    // Generate alphabetical labels (A, B, C, D, etc.)
    const labels = options.map((_, index) => String.fromCharCode(65 + index));
    setOptionLabels(labels);
  }, [options.length, randomize_order, options, scenarioId, studySlug]);

  const [values, setValues] = useState<number[]>(Array(options.length).fill(0));
  const maxValue = total_allocation || 10;

  // Initialize from saved values if present
  useEffect(() => {
    if (value && Array.isArray(value) && value.length === options.length) {
      setValues(value);
    } else {
      setValues(Array(options.length).fill(0));
    }
  }, [value, options.length]);

  const totalAllocated = values.reduce((sum, val) => sum + val, 0);
  const remainingAllocations = total_allocation ? total_allocation - totalAllocated : Infinity;

  const handleIncrement = (displayIndex: number) => {
    if (disabled) return;
    const originalIndex = displayOrder[displayIndex];
    if (values[originalIndex] < maxValue && remainingAllocations > 0) {
      const newValues = [...values];
      newValues[originalIndex] = newValues[originalIndex] + 1;
      setValues(newValues);
      onChange(newValues);
    }
  };

  const handleDecrement = (displayIndex: number) => {
    if (disabled) return;
    const originalIndex = displayOrder[displayIndex];
    if (values[originalIndex] > 0) {
      const newValues = [...values];
      newValues[originalIndex] = newValues[originalIndex] - 1;
      setValues(newValues);
      onChange(newValues);
    }
  };

  return (
    <div className="space-y-8">
      {/* Answer Options Heading */}
      <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mb-2">
        Answer Options
      </h3>

      {/* Option labels mapping */}
      <div className="text-center text-gray-700 dark:text-gray-300 mb-4">
        <div className="flex flex-wrap justify-center gap-2">
          {displayOrder.map((originalIndex, displayIndex) => (
            <div
              key={displayIndex}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm bg-gray-100 dark:bg-gray-800"
            >
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {optionLabels[displayIndex]}
              </span>
              <span className="text-sm font-medium">{options[originalIndex]}</span>
            </div>
          ))}
        </div>
      </div>

      {total_allocation && (
        <div className="text-center text-gray-700 dark:text-gray-300">
          Remaining allocations: {remainingAllocations} / {total_allocation}
        </div>
      )}

      {/* Main histogram container */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-24 flex flex-col justify-between items-end pr-2">
          {[10, 8, 6, 4, 2, 0].map((labelValue) => (
            <span key={labelValue} className="text-xs text-gray-600 dark:text-gray-400">
              {labelValue === 10
                ? 'Definitely - 10'
                : labelValue === 0
                ? 'Impossible - 0'
                : labelValue}
            </span>
          ))}
        </div>

        {/* "Probably" label between 4 and 6 */}
        <div
          className="absolute -left-7 w-24 flex items-center justify-end pr-2"
          style={{ top: 'calc(50% - 0.5rem)' }}
        >
          <span className="text-xs text-gray-600 dark:text-gray-400">Probably</span>
        </div>

        {/* Y-axis line */}
        <div className="absolute left-24 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
        {/* X-axis line */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />

        {/* Grid lines */}
        <div className="absolute inset-0 left-24 flex flex-col justify-between">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border-t w-full border-gray-200 dark:border-gray-700"
              style={{ height: '1px' }}
            />
          ))}
        </div>

        {/* Histogram Bars */}
        <div className="relative h-60 flex items-end justify-between gap-1 pl-28 pr-4">
          {displayOrder.map((originalIndex, displayIndex) => (
            <div key={displayIndex} className="flex-1 flex flex-col items-center">
              <div className="w-full h-full flex items-end">
                <div
                  className="w-full rounded-t transition-all duration-200 ease-in-out bg-blue-500 dark:bg-blue-400"
                  style={{
                    height:
                      values[originalIndex] > 0
                        ? `${(values[originalIndex] / maxValue) * 240}px`
                        : '0',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div
        className="grid gap-1 px-4 pl-28"
        style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      >
        {displayOrder.map((originalIndex, displayIndex) => (
          <div key={displayIndex} className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {optionLabels[displayIndex]}
            </span>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleIncrement(displayIndex)}
                disabled={remainingAllocations <= 0 || disabled}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:border-gray-200 dark:disabled:border-gray-700"
                aria-label={`Increase value for ${optionLabels[displayIndex]}`}
              >
                <span
                  className={`text-gray-600 dark:text-gray-300 ${
                    remainingAllocations <= 0 ? 'opacity-50' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <button
                onClick={() => handleDecrement(displayIndex)}
                disabled={disabled}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500"
                aria-label={`Decrease value for ${optionLabels[displayIndex]}`}
              >
                <span className="text-gray-600 dark:text-gray-300">−</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Plugin definition
 */
export const HistogramPlugin: Plugin<InputPluginProps, HistogramConfig> = {
  name: 'histogram',
  version: '1.0.0',
  type: 'input',
  component: Histogram,
  description: 'Visual histogram input for allocating points across multiple options',
  author: 'Prob-Gym Research Team',
  configSchema: {
    total_allocation: { type: 'number', optional: true },
    randomize_order: { type: 'boolean', default: false },
  },
};

export default HistogramPlugin;
