'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from './ThemeProvider';

interface NumberLineInputProps {
  options: string[];
  onSubmit: (distribution: number[], points?: number[]) => void;
  total_allocation?: number;
  initialDistribution?: number[] | null;
  scenarioId?: number;
  discrete?: boolean;
  disabled?: boolean;
}

type InteractionMode = 'add' | 'remove' | 'move';

interface Point {
  id: number;
  value: number;
}

export default function NumberLineInput({ 
  options, 
  onSubmit, 
  total_allocation = 5,
  initialDistribution = null,
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
    if (initialDistribution && initialDistribution.length > 0) {
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
      } else {
        // If no scenarioId provided, try to extract from URL or search localStorage
        let extractedScenarioId = -1;
        
        // Try to extract scenario ID from URL or DOM
        const urlMatch = window.location.pathname.match(/\/scenarios\/(\d+)/);
        if (urlMatch && urlMatch[1]) {
          extractedScenarioId = parseInt(urlMatch[1], 10);
        } else {
          // Fallback - try to find in query params
          const urlParams = new URLSearchParams(window.location.search);
          const paramScenarioId = urlParams.get('scenario');
          if (paramScenarioId) {
            extractedScenarioId = parseInt(paramScenarioId, 10);
          }
        }
        
        // If still no ID, search localStorage for any point positions
        if (extractedScenarioId === -1) {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('pointPositions_')) {
              extractedScenarioId = parseInt(key.split('_')[1], 10);
              break;
            }
          }
        }
        
        // Now try to load the point positions
        if (extractedScenarioId !== -1) {
          const savedPositions = localStorage.getItem(`pointPositions_${extractedScenarioId}`);
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
      }
      
      // If we couldn't load exact positions, fall back to the distribution-based approach
      // We need to convert the distribution back to points with continuous values
      
      // First, identify non-zero bins and their probabilities
      const nonZeroBins: {index: number, prob: number}[] = [];
      initialDistribution.forEach((prob, index) => {
        if (prob > 0) {
          nonZeroBins.push({ index, prob });
        }
      });
      
      // Generate appropriate number of points (up to total_allocation)
      // If we have exact point positions, we should use those
      // For now, we'll place points strategically based on the distribution
      const newPoints: Point[] = [];
      
      // Try to place points to create a similar distribution
      if (nonZeroBins.length === 1) {
        // If only one bin has probability, place a point at its center
        newPoints.push({ 
          id: 0, 
          value: nonZeroBins[0].index + 0.5 
        });
      } else if (nonZeroBins.length > 1) {
        // For multiple bins, distribute points to create a curve
        // Sort bins by index
        nonZeroBins.sort((a, b) => a.index - b.index);
        
        // Place points at edges of non-zero regions and midpoints where needed
        // This is a simple approximation - in a real system you'd store exact point positions
        for (let i = 0; i < Math.min(nonZeroBins.length, total_allocation); i++) {
          const bin = nonZeroBins[i];
          // Place points with slight variations to avoid rounding
          const value = bin.index + (i % 2 === 0 ? 0.25 : 0.75);
          newPoints.push({ id: i, value });
        }
      }
      
      // Ensure we don't exceed total_allocation
      const pointsToUse = newPoints.slice(0, total_allocation);
      setPoints(pointsToUse);
      
      // Update available IDs
      const usedIds = pointsToUse.map(p => p.id);
      setAvailableIds(Array.from({ length: total_allocation }, (_, i) => i)
        .filter(id => !usedIds.includes(id)));
    }
  }, [initialDistribution, total_allocation, scenarioId]);

  // Reset points and available IDs when options change (new question)
  useEffect(() => {
    if (!initialDistribution) {
      setPoints([]);
      setAvailableIds(Array.from({ length: total_allocation }, (_, i) => i));
      setMode('add');
    }
    setIsDragging(false);
    setDraggedPointIndex(null);
  }, [options, total_allocation, initialDistribution]);

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

  // Calculate probability distribution from points
  const calculateDistribution = () => {
    if (points.length === 0) return null;
    
    // Create bins for the distribution
    const numBins = options.length;
    const bins = new Array(numBins).fill(0);
    
    if (points.length === 1) {
      // For single point, put all probability in the bin containing the point
      const pointBin = Math.floor(points[0].value);
      bins[pointBin] = 1;
      return bins;
    }
    
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
    if (disabled) return;
    
    const distribution = calculateDistribution();
    if (distribution) {
      // Also pass the actual point positions to preserve continuous values
      const pointPositions = points.map(p => p.value);
      onSubmit(distribution, pointPositions);
    }
  };

  // Add this function to generate a color based on point ID
  const getPointColor = (id: number) => {
    // Use HSL color space for better color distribution
    // Hue: 0-360 (full color spectrum)
    // Saturation: 70% (vibrant colors)
    // Lightness: 60% for light theme, 70% for dark theme
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