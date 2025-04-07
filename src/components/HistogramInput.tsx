'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

interface HistogramInputProps {
  options: string[];
  onSubmit: (value: number[]) => void;
  total_allocation?: number;
  initialValues?: number[] | null;
}

export default function HistogramInput({ 
  options, 
  onSubmit, 
  total_allocation,
  initialValues = null
}: HistogramInputProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [values, setValues] = useState<number[]>(Array(options.length).fill(0));
  const maxValue = total_allocation || 10; // Use total_allocation as max height if provided

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

  const handleIncrement = (index: number) => {
    if (values[index] < maxValue && remainingAllocations > 0) {
      const newValues = [...values];
      newValues[index] = newValues[index] + 1;
      setValues(newValues);
    }
  };

  const handleDecrement = (index: number) => {
    if (values[index] > 0) {
      const newValues = [...values];
      newValues[index] = newValues[index] - 1;
      setValues(newValues);
    }
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  // Generate y-axis labels
  // const yAxisLabels = Array.from({ length: 6 }, (_, i) => maxValue - (i * 2));

  return (
    <div className="space-y-8">
      {total_allocation && (
        <div className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Remaining allocations: {remainingAllocations} / {total_allocation}
        </div>
      )}

      {/* Main histogram container */}
      <div className="relative">
        {/* Y-axis line */}
        <div className={`absolute left-0 top-0 bottom-0 w-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
        {/* X-axis line */}
        <div className={`absolute right-0 top-0 bottom-0 w-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />

        {/* Grid lines */}
        <div className={`absolute inset-0 flex flex-col justify-between`}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`border-t w-full ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              style={{ height: '1px' }}
            />
          ))}
        </div>

        {/* Histogram Bars */}
        <div className="relative h-60 flex items-end justify-between gap-1 px-4">
          {values.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full h-full flex items-end">
                <div
                  className={`w-full rounded-t transition-all duration-200 ease-in-out ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}
                  style={{
                    height: value > 0 ? `${(value / maxValue) * 240}px` : '0',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid gap-1 px-4" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((option, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {option}
            </span>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleIncrement(index)}
                disabled={remainingAllocations <= 0}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                  ${isDark 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 active:bg-gray-500 disabled:bg-gray-800 disabled:border-gray-700' 
                    : 'bg-white border-gray-300 hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-100 disabled:border-gray-200'
                  } border`}
                aria-label={`Increase value for ${option}`}
              >
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} ${remainingAllocations <= 0 ? 'opacity-50' : ''}`}>+</span>
              </button>
              <button
                onClick={() => handleDecrement(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                  ${isDark 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 active:bg-gray-500' 
                    : 'bg-white border-gray-300 hover:bg-gray-50 active:bg-gray-100'
                  } border`}
                aria-label={`Decrease value for ${option}`}
              >
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>−</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={total_allocation ? remainingAllocations > 0 : false}
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
    </div>
  );
} 