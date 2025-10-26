'use client';

import { useEffect } from 'react';
import { pluginRegistry } from '@/components/plugins';

interface PluginInitializerProps {
  studySlug: string;
}

/**
 * Client component that registers study-specific plugins on mount
 */
export function PluginInitializer({ studySlug }: PluginInitializerProps) {
  useEffect(() => {
    const registerPlugins = async () => {
      try {
        // Register study-specific plugins
        if (studySlug === 'prob-gym') {
          const { probGymPluginManifest } = await import('@/studies/prob-gym/plugins');

          // Register all plugins from the manifest
          if (probGymPluginManifest.initialize) {
            await probGymPluginManifest.initialize();
          }

          probGymPluginManifest.plugins.forEach((plugin) => {
            try {
              pluginRegistry.register(plugin);
              console.log(`[PluginInitializer] Registered plugin: ${plugin.name}`);
            } catch (error) {
              console.error(`[PluginInitializer] Error registering plugin ${plugin.name}:`, error);
            }
          });

          console.log('[PluginInitializer] All Prob-Gym plugins registered');
          console.log('[PluginInitializer] Available plugins:', pluginRegistry.list().map(p => p.name));
        }
        // Add more studies here as they're created
      } catch (error) {
        console.error('[PluginInitializer] Error loading plugins:', error);
      }
    };

    registerPlugins();
  }, [studySlug]);

  // This component doesn't render anything
  return null;
}
