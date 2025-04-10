'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from './ThemeProvider';

interface NumberLineInputProps {
  options: string[];
  onSubmit: (values: number[]) => void;
  total_allocation?: number;
  initialValues?: number[] | null;
  scenarioId?: number;
  discrete?: boolean;
  disabled?: boolean;
}

interface Point {
  id: number;
  value: number;
}

type InteractionMode = 'add' | 'remove' | 'move';

export default function NumberLineInput({ 
  options, 
  onSubmit, 
  total_allocation = 5,
  initialValues = null,
  scenarioId,
  discrete = false,
  disabled = false
}: NumberLineInputProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [points, setPoints] = useState<Point[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPointIndex, setDraggedPointIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<InteractionMode>('add');
  const [availableIds, setAvailableIds] = useState<number[]>(Array.from({ length: total_allocation }, (_, i) => i));
  const lineRef = useRef<HTMLDivElement>(null);

  // Check if there are saved point positions for this scenario
  useEffect(() => {
    // First try to load exact point positions from localStorage
    // Check for point positions using the scenarioId prop
    if (scenarioId) {
      const savedPositions = localStorage.getItem(`pointPositions_${scenarioId}`);
      if (savedPositions) {
        try {
          const pointValues: number[] = JSON.parse(savedPositions);
          if (pointValues && pointValues.length > 0) {
            // Create points from saved positions
            const newPoints: Point[] = pointValues.map((value, index) => ({
              id: index,
              value
            }));
            
            // Ensure we don't exceed total_allocation
            const pointsToUse = newPoints.slice(0, total_allocation);
            setPoints(pointsToUse);
            
            // Update available IDs
            const usedIds = pointsToUse.map(p => p.id);
            setAvailableIds(Array.from({ length: total_allocation }, (_, i) => i)
              .filter(id => !usedIds.includes(id)));
              
            return; // Skip the other initialization if we loaded points
          }
        } catch (err) {
          console.error('Error parsing saved point positions:', err);
        }
      }
    }

    // If no saved positions or error, use initialValues if provided
    if (initialValues && initialValues.length > 0) {
      const newPoints: Point[] = initialValues.map((value, index) => ({
        id: index,
        value
      }));
      setPoints(newPoints);
      const usedIds = newPoints.map(p => p.id);
      setAvailableIds(Array.from({ length: total_allocation }, (_, i) => i)
        .filter(id => !usedIds.includes(id)));
    } else {
      setPoints([]);
      setAvailableIds(Array.from({ length: total_allocation }, (_, i) => i));
    }
  }, [initialValues, total_allocation, scenarioId]);

  // Reset points and available IDs when options change (new question)
  useEffect(() => {
    if (!initialValues) {
      setPoints([]);
      setAvailableIds(Array.from({ length: total_allocation }, (_, i) => i));
      setMode('add');
    }
    setIsDragging(false);
    setDraggedPointIndex(null);
  }, [options, total_allocation, initialValues]);

  const calculateValue = useCallback((clientX: number) => {
    if (!lineRef.current) return null;
    const rect = lineRef.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    const clampedPosition = Math.max(0, Math.min(1, position));
    
    if (discrete) {
      // For discrete input, snap to the nearest option
      const optionIndex = Math.round(clampedPosition * (options.length - 1));
      return optionIndex;
    }
    
    return Number((clampedPosition * (options.length - 1)).toFixed(2));
  }, [options.length, discrete]);

  const getNextAvailableId = () => {
    return availableIds[0] ?? -1;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    
    const clickedValue = calculateValue(e.clientX);
    if (clickedValue === null) return;

    // Check if clicking near an existing point
    const existingPointIndex = points.findIndex(p => Math.abs(p.value - clickedValue) < 0.2);
    
    if (mode === 'move' && existingPointIndex !== -1) {
      // Start dragging existing point
      setIsDragging(true);
      setDraggedPointIndex(existingPointIndex);
    } else if (mode === 'add' && points.length < total_allocation) {
      // Add new point with next available ID
      const newId = getNextAvailableId();
      if (newId !== -1) {
        setPoints(prev => [...prev, { id: newId, value: clickedValue }].sort((a, b) => a.value - b.value));
        setAvailableIds(prev => prev.filter(id => id !== newId));
      }
    } else if (mode === 'remove' && existingPointIndex !== -1) {
      // Remove point and make its ID available again
      const removedId = points[existingPointIndex].id;
      setPoints(prev => prev.filter((_, i) => i !== existingPointIndex));
      setAvailableIds(prev => [...prev, removedId].sort((a, b) => a - b));
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || draggedPointIndex === null || mode !== 'move') return;
    const newValue = calculateValue(e.clientX);
    if (newValue === null) return;

    setPoints(prev => {
      const newPoints = [...prev];
      newPoints[draggedPointIndex] = { ...newPoints[draggedPointIndex], value: newValue };
      return newPoints.sort((a, b) => a.value - b.value);
    });
  }, [isDragging, draggedPointIndex, mode, calculateValue]);

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedPointIndex(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  const handleSubmit = () => {
    if (disabled) return;
    
    // Pass only the point values to the backend
    const pointValues = points.map(p => p.value);
    onSubmit(pointValues);
  };

  // Use HSL color space for better color distribution
  const getPointColor = (id: number) => {
    const hue = (id * 137.508) % 360; // Golden angle approximation for good distribution
    const saturation = 70;
    const lightness = isDark ? 70 : 60;
    
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
            className={`px-3 py-1 rounded-md text-sm ${
              mode === 'add'
                ? isDark
                  ? 'bg-blue-400 text-white'
                  : 'bg-blue-500 text-white'
                : isDark
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Add
          </button>
          <button
            onClick={() => setMode('remove')}
            className={`px-3 py-1 rounded-md text-sm ${
              mode === 'remove'
                ? isDark
                  ? 'bg-blue-400 text-white'
                  : 'bg-blue-500 text-white'
                : isDark
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Remove
          </button>
          <button
            onClick={() => setMode('move')}
            className={`px-3 py-1 rounded-md text-sm ${
              mode === 'move'
                ? isDark
                  ? 'bg-blue-400 text-white'
                  : 'bg-blue-500 text-white'
                : isDark
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Move
          </button>
        </div>
      </div>

      {/* Number line */}
      <div className="relative pt-6 pb-8">
        {/* Points tooltips */}
        {points.map((point) => (
          <div 
            key={point.id}
            className={`absolute -top-1 transform -translate-x-1/2 px-2 py-1 rounded text-sm
              ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-800 text-white'}`}
            style={{ left: `${(point.value / (options.length - 1)) * 100}%` }}
          >
            {point.value.toFixed(2)}
          </div>
        ))}

        {/* Click area */}
        <div
          ref={lineRef}
          className="relative h-12 cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          {/* Background line */}
          <div className={`absolute top-1/2 left-0 right-0 h-1 rounded-full 
            ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
          />

          {/* Tick marks and labels */}
          {options.map((option, index) => {
            const position = (index / (options.length - 1)) * 100;
            return (
              <div
                key={index}
                className="absolute top-0 bottom-0"
                style={{ left: `${position}%` }}
              >
                <div className={`w-px h-3 mb-1 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
                <div className={`text-xs text-center transform -translate-x-1/2 
                  ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
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
                boxShadow: isDark 
                  ? '0 0 0 2px rgba(17, 24, 39, 0.5)' 
                  : '0 0 0 2px rgba(255, 255, 255, 0.5)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Submit button */}
      <div className="space-y-2">
        {points.length < total_allocation && (
          <div className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Please place all {total_allocation} points before submitting
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={points.length < total_allocation}
          className={`w-full py-2 px-4 rounded-md transition-colors text-white
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