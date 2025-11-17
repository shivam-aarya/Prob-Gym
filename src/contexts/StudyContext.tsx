'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { StudyMetadata, StudyConfig } from '@/studies/types';

/**
 * Study context interface
 */
interface StudyContextType {
  /** Study metadata */
  metadata: StudyMetadata;

  /** Study configuration */
  config: StudyConfig;

  /** Current study ID (from database) */
  studyId: string;

  /** Current study slug */
  studySlug: string;

  /** Helper to get asset URL for this study */
  getAssetUrl: (path: string) => string;
}

/**
 * Study context
 */
const StudyContext = createContext<StudyContextType | null>(null);

/**
 * Study provider props
 */
interface StudyProviderProps {
  metadata: StudyMetadata;
  config: StudyConfig;
  children: ReactNode;
}

/**
 * Study provider component
 * Provides study metadata and helpers to all child components
 */
export function StudyProvider({ metadata, config, children }: StudyProviderProps) {
  const value: StudyContextType = {
    metadata,
    config,
    studyId: metadata.id,
    studySlug: metadata.slug,
    getAssetUrl: (path: string) => {
      // If path is already absolute and starts with assetPath, return as-is
      if (path.startsWith(metadata.assetPath)) {
        return path;
      }

      // For absolute paths that reference assets, extract the filename
      // This handles paths like /studies/TEST_.../assets/file.png or /assets/file.png
      if (path.startsWith('/')) {
        // Extract filename from paths like /studies/.../assets/file.png
        const assetsMatch = path.match(/\/assets\/(.+)$/);
        if (assetsMatch) {
          return `${metadata.assetPath}/${assetsMatch[1]}`;
        }
        // If it's an absolute path but not an asset, return as-is
        return path;
      }

      // Otherwise, treat as relative and prepend assetPath
      return `${metadata.assetPath}/${path}`;
    },
  };

  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  );
}

/**
 * Hook to access study context
 * Throws error if used outside of StudyProvider
 */
export function useStudy(): StudyContextType {
  const context = useContext(StudyContext);

  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }

  return context;
}

/**
 * Hook to safely access study context
 * Returns null if used outside of StudyProvider
 */
export function useStudySafe(): StudyContextType | null {
  return useContext(StudyContext);
}
