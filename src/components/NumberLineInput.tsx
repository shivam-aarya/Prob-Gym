'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

interface NumberLineInputProps {
  options: string[];
  onSubmit: (distribution: number[]) => void;
  numPoints?: number;
}

type InteractionMode = 'add' | 'remove' | 'move';

interface Point {
  id: number;
  value: number;
}

export default function NumberLineInput({ options, onSubmit, numPoints = 5 }: NumberLineInputProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [points, setPoints] = useState<Point[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPointIndex, setDraggedPointIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<InteractionMode>('add');
  const [availableIds, setAvailableIds] = useState<number[]>(Array.from({ length: numPoints }, (_, i) => i));
  const lineRef = useRef<HTMLDivElement>(null);

  const calculateValue = (clientX: number) => {
    if (!lineRef.current) return null;
    const rect = lineRef.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    const clampedPosition = Math.max(0, Math.min(1, position));
    return Number((clampedPosition * (options.length - 1)).toFixed(2));
  };

  const getNextAvailableId = () => {
    return availableIds[0] ?? -1;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const clickedValue = calculateValue(e.clientX);
    if (clickedValue === null) return;

    // Check if clicking near an existing point
    const existingPointIndex = points.findIndex(p => Math.abs(p.value - clickedValue) < 0.2);
    
    if (mode === 'move' && existingPointIndex !== -1) {
      // Start dragging existing point
      setIsDragging(true);
      setDraggedPointIndex(existingPointIndex);
    } else if (mode === 'add' && points.length < numPoints) {
      // Add new point with next available ID
      const newId = getNextAvailableId();
      if (newId !== -1) {
        setPoints(prev => [...prev, { id: newId, value: clickedValue }].sort((a, b) => a.value - b.value));
        setAvailableIds(prev => prev.filter(id => id !== newId));
      }
    } else if (mode === 'remove' && existingPointIndex !== -1) {
      // Remove point and make its ID available again
      const removedId = points[existingPointIndex].id;
      setPoints(prev => prev.filter((_, index) => index !== existingPointIndex));
      setAvailableIds(prev => [...prev, removedId].sort((a, b) => a - b));
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || draggedPointIndex === null || mode !== 'move') return;
    const newValue = calculateValue(e.clientX);
    if (newValue === null) return;

    setPoints(prev => {
      const newPoints = [...prev];
      newPoints[draggedPointIndex] = { ...newPoints[draggedPointIndex], value: newValue };
      return newPoints.sort((a, b) => a.value - b.value);
    });
  };

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
  }, [isDragging]);

  // Calculate probability distribution from points
  const calculateDistribution = () => {
    if (points.length < 2) return null;
    
    // Create bins for the distribution
    const numBins = options.length;
    const bins = new Array(numBins).fill(0);
    
    // Calculate area for each segment between points
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i].value;
      const end = points[i + 1].value;
      const startBin = Math.floor(start);
      const endBin = Math.floor(end);
      
      // Add partial areas to bins
      for (let bin = startBin; bin <= endBin; bin++) {
        if (bin === startBin && bin === endBin) {
          // Point falls within single bin
          bins[bin] += (end - start);
        } else if (bin === startBin) {
          // First bin
          bins[bin] += ((bin + 1) - start);
        } else if (bin === endBin) {
          // Last bin
          bins[bin] += (end - bin);
        } else {
          // Middle bins
          bins[bin] += 1;
        }
      }
    }
    
    // Normalize the distribution
    const total = bins.reduce((sum, val) => sum + val, 0);
    return bins.map(val => val / total);
  };

  const handleSubmit = () => {
    const distribution = calculateDistribution();
    if (distribution) {
      onSubmit(distribution);
    }
  };

  // Add this function to generate a color based on point ID
  const getPointColor = (id: number) => {
    const colors = [
      { light: 'rgba(59, 130, 246, 0.8)', dark: 'rgba(96, 165, 250, 0.8)' }, // blue
      { light: 'rgba(16, 185, 129, 0.8)', dark: 'rgba(52, 211, 153, 0.8)' }, // green
      { light: 'rgba(245, 158, 11, 0.8)', dark: 'rgba(251, 191, 36, 0.8)' }, // yellow
      { light: 'rgba(239, 68, 68, 0.8)', dark: 'rgba(248, 113, 113, 0.8)' }, // red
      { light: 'rgba(168, 85, 247, 0.8)', dark: 'rgba(192, 132, 252, 0.8)' }, // purple
    ];
    return isDark ? colors[id % colors.length].dark : colors[id % colors.length].light;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Click to add points ({points.length}/{numPoints})
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
        {points.map((point, index) => (
          <div 
            key={index}
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

          {/* Distribution curve */}
          {points.length >= 2 && (
            <svg
              className="absolute top-1/2 left-0 right-0 w-full h-20 -mt-10 pointer-events-none"
              preserveAspectRatio="none"
            >
              <path
                d={`M ${points.map(p => `${(p.value / (options.length - 1)) * 100} 50`).join(' L ')}`}
                fill="none"
                stroke={isDark ? '#60A5FA' : '#3B82F6'}
                strokeWidth="2"
                className="transition-all duration-200"
              />
            </svg>
          )}

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
          {points.map((point, index) => (
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
      <button
        onClick={handleSubmit}
        disabled={points.length < 2}
        className={`w-full py-2 px-4 rounded-md transition-colors text-white
          ${isDark 
            ? 'bg-blue-400 hover:bg-blue-500 active:bg-blue-600 disabled:bg-gray-600' 
            : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300'
          } disabled:cursor-not-allowed`}
      >
        Submit Response
      </button>
    </div>
  );
} 