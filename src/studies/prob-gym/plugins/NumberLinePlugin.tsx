'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Plugin, InputPluginProps } from '@/components/plugins/types';

interface Point {
  id: number;
  value: number;
}

type InteractionMode = 'add' | 'remove' | 'move';

interface NumberLineConfig {
  total_allocation?: number;
  discrete?: boolean;
}

/**
 * NumberLine Component
 * Interactive number line for placing points to indicate likelihood
 */
function NumberLine({
  value,
  onChange,
  options = [],
  config = {},
  context,
  disabled = false,
}: InputPluginProps) {
  const { total_allocation = 5, discrete = false } = config as NumberLineConfig;
  const scenarioId = context?.scenarioId;
  const studySlug = context?.studySlug;

  const [points, setPoints] = useState<Point[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPointIndex, setDraggedPointIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<InteractionMode>('add');
  const [availableIds, setAvailableIds] = useState<number[]>(
    Array.from({ length: total_allocation }, (_, i) => i)
  );
  const lineRef = useRef<HTMLDivElement>(null);

  // Load saved point positions
  useEffect(() => {
    if (scenarioId && studySlug) {
      const savedPositions = localStorage.getItem(`${studySlug}_pointPositions_${scenarioId}`);
      if (savedPositions) {
        try {
          const pointValues: number[] = JSON.parse(savedPositions);
          if (pointValues && pointValues.length > 0) {
            const newPoints: Point[] = pointValues.map((v, index) => ({
              id: index,
              value: v,
            }));

            const pointsToUse = newPoints.slice(0, total_allocation);
            setPoints(pointsToUse);

            const usedIds = pointsToUse.map((p) => p.id);
            setAvailableIds(
              Array.from({ length: total_allocation }, (_, i) => i).filter(
                (id) => !usedIds.includes(id)
              )
            );
            return;
          }
        } catch (err) {
          console.error('Error parsing saved point positions:', err);
        }
      }
    }

    // Use initial value if provided
    if (value && Array.isArray(value) && value.length > 0) {
      const newPoints: Point[] = value.map((v: number, index: number) => ({
        id: index,
        value: v,
      }));
      setPoints(newPoints);
      const usedIds = newPoints.map((p) => p.id);
      setAvailableIds(
        Array.from({ length: total_allocation }, (_, i) => i).filter(
          (id) => !usedIds.includes(id)
        )
      );
    } else {
      setPoints([]);
      setAvailableIds(Array.from({ length: total_allocation }, (_, i) => i));
    }
  }, [value, total_allocation, scenarioId, studySlug]);

  // Reset points when options change
  useEffect(() => {
    if (!value) {
      setPoints([]);
      setAvailableIds(Array.from({ length: total_allocation }, (_, i) => i));
      setMode('add');
    }
    setIsDragging(false);
    setDraggedPointIndex(null);
  }, [options, total_allocation, value]);

  const calculateValue = useCallback(
    (clientX: number) => {
      if (!lineRef.current) return null;
      const rect = lineRef.current.getBoundingClientRect();
      const position = (clientX - rect.left) / rect.width;
      const clampedPosition = Math.max(0, Math.min(1, position));

      if (discrete) {
        const optionIndex = Math.round(clampedPosition * (options.length - 1));
        return optionIndex;
      }

      return Number((clampedPosition * (options.length - 1)).toFixed(2));
    },
    [options.length, discrete]
  );

  const getNextAvailableId = () => {
    return availableIds[0] ?? -1;
  };

  const updatePoints = (newPoints: Point[]) => {
    setPoints(newPoints);
    const pointValues = newPoints.map((p) => p.value);

    // Save to localStorage with study-scoped key
    if (scenarioId && studySlug) {
      localStorage.setItem(`${studySlug}_pointPositions_${scenarioId}`, JSON.stringify(pointValues));
    }

    // Notify parent
    onChange(pointValues);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;

    const clickedValue = calculateValue(e.clientX);
    if (clickedValue === null) return;

    // Check if clicking near an existing point
    const existingPointIndex = points.findIndex((p) => Math.abs(p.value - clickedValue) < 0.2);

    if (mode === 'move' && existingPointIndex !== -1) {
      setIsDragging(true);
      setDraggedPointIndex(existingPointIndex);
    } else if (mode === 'add' && points.length < total_allocation) {
      const newId = getNextAvailableId();
      if (newId !== -1) {
        const newPoints = [...points, { id: newId, value: clickedValue }].sort(
          (a, b) => a.value - b.value
        );
        updatePoints(newPoints);
        setAvailableIds((prev) => prev.filter((id) => id !== newId));
      }
    } else if (mode === 'remove' && existingPointIndex !== -1) {
      const removedId = points[existingPointIndex].id;
      const newPoints = points.filter((_, i) => i !== existingPointIndex);
      updatePoints(newPoints);
      setAvailableIds((prev) => [...prev, removedId].sort((a, b) => a - b));
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || draggedPointIndex === null || mode !== 'move') return;
      const newValue = calculateValue(e.clientX);
      if (newValue === null) return;

      setPoints((prev) => {
        const newPoints = [...prev];
        newPoints[draggedPointIndex] = { ...newPoints[draggedPointIndex], value: newValue };
        return newPoints;
      });
    },
    [isDragging, draggedPointIndex, mode, calculateValue]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging && draggedPointIndex !== null) {
      // Save final position with study-scoped key
      const pointValues = points.map((p) => p.value);
      if (scenarioId && studySlug) {
        localStorage.setItem(`${studySlug}_pointPositions_${scenarioId}`, JSON.stringify(pointValues));
      }
      onChange(pointValues);
    }
    setIsDragging(false);
    setDraggedPointIndex(null);
  }, [isDragging, draggedPointIndex, points, scenarioId, studySlug, onChange]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const getPointColor = (id: number) => {
    const hue = (id * 137.508) % 360;
    const saturation = 70;
    const lightness = 65;
    return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Click to add points ({points.length}/{total_allocation})
          {discrete && <span className="ml-2">(Discrete values only)</span>}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setMode('add')}
            disabled={disabled}
            className={`px-3 py-1 rounded-md text-sm ${
              mode === 'add'
                ? 'bg-blue-500 dark:bg-blue-400 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Add
          </button>
          <button
            onClick={() => setMode('remove')}
            disabled={disabled}
            className={`px-3 py-1 rounded-md text-sm ${
              mode === 'remove'
                ? 'bg-blue-500 dark:bg-blue-400 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Remove
          </button>
          <button
            onClick={() => setMode('move')}
            disabled={disabled}
            className={`px-3 py-1 rounded-md text-sm ${
              mode === 'move'
                ? 'bg-blue-500 dark:bg-blue-400 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Move
          </button>
        </div>
      </div>

      {/* Number line */}
      <div className="relative pt-6 pb-8 mx-auto max-w-[90%]">
        {/* Points tooltips */}
        {points.map((point) => (
          <div
            key={point.id}
            className="absolute -top-1 transform -translate-x-1/2 px-2 py-1 rounded text-sm bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-200"
            style={{ left: `${(point.value / (options.length - 1)) * 100}%` }}
          >
            {point.value.toFixed(2)}
          </div>
        ))}

        {/* Click area */}
        <div
          ref={lineRef}
          className="relative h-12 cursor-pointer select-none"
          onMouseDown={handleMouseDown}
        >
          {/* Background line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 rounded-full bg-gray-200 dark:bg-gray-700" />

          {/* Tick marks and labels */}
          {options.map((option, index) => {
            const position = (index / (options.length - 1)) * 100;
            return (
              <div
                key={index}
                className="absolute top-0 bottom-0"
                style={{ left: `${position}%` }}
              >
                <div className="w-px h-3 mb-1 bg-gray-300 dark:bg-gray-600" />
                <div className="text-xs text-center transform -translate-x-1/2 text-gray-600 dark:text-gray-400">
                  {option}
                </div>
              </div>
            );
          })}

          {/* Points markers */}
          {points.map((point) => (
            <div
              key={point.id}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 transition-all duration-75"
              style={{
                left: `${(point.value / (options.length - 1)) * 100}%`,
                backgroundColor: getPointColor(point.id),
                cursor: mode === 'move' ? 'move' : 'default',
                boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Validation message */}
      {points.length < total_allocation && (
        <div className="text-sm text-center text-gray-600 dark:text-gray-400">
          Please place all {total_allocation} points before submitting
        </div>
      )}
    </div>
  );
}

/**
 * Plugin definition
 */
export const NumberLinePlugin: Plugin<InputPluginProps, NumberLineConfig> = {
  name: 'number-line',
  version: '1.0.0',
  type: 'input',
  component: NumberLine,
  description:
    'Interactive number line for placing points to indicate likelihood or preference distribution',
  author: 'Prob-Gym Research Team',
  configSchema: {
    total_allocation: { type: 'number', default: 5 },
    discrete: { type: 'boolean', default: false },
  },
};

export default NumberLinePlugin;
