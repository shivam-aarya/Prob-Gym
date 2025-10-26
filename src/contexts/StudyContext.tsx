'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { StudyMetadata, StudyConfig } from '@/studies/types';
import { PluginInitializer } from '@/components/PluginInitializer';

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
      // If path is already absolute (starts with /), return as-is
      if (path.startsWith('/')) {
        return path;
      }
      // Otherwise, treat as relative and prepend assetPath
      return `${metadata.assetPath}/${path}`;
    },
  };

  return (
    <StudyContext.Provider value={value}>
      <PluginInitializer studySlug={metadata.slug} />
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
