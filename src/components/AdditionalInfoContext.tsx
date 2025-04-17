'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdditionalInfoContextType {
  additionalInfo: Map<number, string>;
  setAdditionalInfo: (scenarioId: number, info: string) => void;
  getAdditionalInfo: (scenarioId: number) => string;
}

const AdditionalInfoContext = createContext<AdditionalInfoContextType | undefined>(undefined);

export function AdditionalInfoProvider({ children }: { children: ReactNode }) {
  const [additionalInfo, setAdditionalInfoMap] = useState<Map<number, string>>(new Map());

  const setAdditionalInfo = (scenarioId: number, info: string) => {
    setAdditionalInfoMap(prev => {
      const newMap = new Map(prev);
      newMap.set(scenarioId, info);
      return newMap;
    });
  };

  const getAdditionalInfo = (scenarioId: number) => {
    return additionalInfo.get(scenarioId) || '';
  };

  return (
    <AdditionalInfoContext.Provider value={{ additionalInfo, setAdditionalInfo, getAdditionalInfo }}>
      {children}
    </AdditionalInfoContext.Provider>
  );
}

export function useAdditionalInfo(scenarioId: number) {
  const context = useContext(AdditionalInfoContext);
  if (context === undefined) {
    throw new Error('useAdditionalInfo must be used within an AdditionalInfoProvider');
  }

  return {
    additionalInfo: context.getAdditionalInfo(scenarioId),
    setAdditionalInfo: (info: string) => context.setAdditionalInfo(scenarioId, info)
  };
} 