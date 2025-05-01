'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

interface HistogramInputProps {
  options: string[];
  onSubmit: (value: number[]) => void;
  total_allocation?: number;
  initialValues?: number[] | null;
  disabled?: boolean;
  randomize_order?: boolean;
  scenarioId?: number;
}

export default function HistogramInput({ 
  options, 
  onSubmit, 
  total_allocation,
  initialValues = null,
  disabled = false,
  randomize_order = false,
  scenarioId
}: HistogramInputProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
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
      if (scenarioId) {
        localStorage.setItem(`histogramOrder_${scenarioId}`, JSON.stringify(order));
      }
    };

    if (randomize_order && scenarioId) {
      // Try to load existing display order from localStorage
      const savedOrder = localStorage.getItem(`histogramOrder_${scenarioId}`);
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
  }, [options.length, randomize_order, options, scenarioId]);

  const [values, setValues] = useState<number[]>(Array(options.length).fill(0));
  const maxValue = total_allocation || 10;

  // Initialize from saved values if present
  useEffect(() => {
    if (initialValues && initialValues.length === options.length) {
      setValues(initialValues);
    } else {
      setValues(Array(options.length).fill(0));
    }
  }, [initialValues, options.length]);
  
  const totalAllocated = values.reduce((sum, val) => sum + val, 0);
  const remainingAllocations = total_allocation ? total_allocation - totalAllocated : Infinity;

  const handleIncrement = (displayIndex: number) => {
    if (disabled) return;
    const originalIndex = displayOrder[displayIndex];
    if (values[originalIndex] < maxValue && remainingAllocations > 0) {
      const newValues = [...values];
      newValues[originalIndex] = newValues[originalIndex] + 1;
      setValues(newValues);
    }
  };

  const handleDecrement = (displayIndex: number) => {
    if (disabled) return;
    const originalIndex = displayOrder[displayIndex];
    if (values[originalIndex] > 0) {
      const newValues = [...values];
      newValues[originalIndex] = newValues[originalIndex] - 1;
      setValues(newValues);
    }
  };

  const handleSubmit = () => {
    if (disabled) return;
    onSubmit(values); // Submit original order values
  };

  return (
    <div className="space-y-8">

      {total_allocation && (
        <div className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Remaining allocations: {remainingAllocations} / {total_allocation}
        </div>
      )}

      {/* Main histogram container */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-24 flex flex-col justify-between items-end pr-2">
          {[10, 8, 6, 4, 2, 0].map((value) => (
            <span key={value} className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {value === 10 ? "Definitely - 10" : 
               value === 0 ? "Impossible - 0" : 
               value}
            </span>
          ))}
        </div>
        
        {/* "Probably" label between 4 and 6 */}
        <div className="absolute -left-7 w-24 flex items-center justify-end pr-2" 
             style={{ top: 'calc(50% - 0.5rem)' }}>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Probably
          </span>
        </div>

        {/* Y-axis line */}
        <div className={`absolute left-24 top-0 bottom-0 w-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
        {/* X-axis line */}
        <div className={`absolute right-0 top-0 bottom-0 w-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />

        {/* Grid lines */}
        <div className={`absolute inset-0 left-24 flex flex-col justify-between`}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`border-t w-full ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
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
                  className={`w-full rounded-t transition-all duration-200 ease-in-out ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}
                  style={{
                    height: values[originalIndex] > 0 ? `${(values[originalIndex] / maxValue) * 240}px` : '0',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid gap-1 px-4 pl-28" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {displayOrder.map((originalIndex, displayIndex) => (
          <div key={displayIndex} className="flex flex-col items-center gap-2">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {optionLabels[displayIndex]}
            </span>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleIncrement(displayIndex)}
                disabled={remainingAllocations <= 0 || disabled}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                  ${isDark 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 active:bg-gray-500 disabled:bg-gray-800 disabled:border-gray-700' 
                    : 'bg-white border-gray-300 hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-100 disabled:border-gray-200'
                  } border`}
                aria-label={`Increase value for ${optionLabels[displayIndex]}`}
              >
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} ${remainingAllocations <= 0 ? 'opacity-50' : ''}`}>+</span>
              </button>
              <button
                onClick={() => handleDecrement(displayIndex)}
                disabled={disabled}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                  ${isDark 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 active:bg-gray-500' 
                    : 'bg-white border-gray-300 hover:bg-gray-50 active:bg-gray-100'
                  } border`}
                aria-label={`Decrease value for ${optionLabels[displayIndex]}`}
              >
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>−</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={(total_allocation ? remainingAllocations > 0 : false) || disabled}
        className={`w-full py-2 px-4 rounded-md transition-colors text-white
          ${isDark 
            ? 'bg-blue-400 hover:bg-blue-500 active:bg-blue-600 disabled:bg-gray-600 disabled:hover:bg-gray-600' 
            : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:hover:bg-gray-300'
          } disabled:cursor-not-allowed`}
      >
        {total_allocation && remainingAllocations > 0 
          ? `Allocate ${remainingAllocations} more to submit` 
          : 'Submit Response'}
      </button>

      {/* Answer Options Heading */}
      <h3 className={`text-lg font-semibold text-center ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
        Answer Options
      </h3>

      {/* Option labels mapping */}
      <div className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
        <div className="flex flex-wrap justify-center gap-2">
          {displayOrder.map((originalIndex, displayIndex) => (
            <div key={displayIndex} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-opacity-10 shadow-sm"
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.03)'
              }}>
              <span className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{optionLabels[displayIndex]}</span>
              <span className="text-sm font-medium">{options[originalIndex]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}