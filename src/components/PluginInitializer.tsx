'use client';

import { useEffect } from 'react';
import { pluginRegistry } from '@/components/plugins';

interface PluginInitializerProps {
  studySlug: string;
}

/**
 * Client component that registers plugins on mount
 */
export function PluginInitializer({ studySlug }: PluginInitializerProps) {
  useEffect(() => {
    const registerPlugins = async () => {
      try {
        // Register core plugins (available to all studies)
        const { probGymPluginManifest } = await import('@/studies/prob-gym/plugins');

        // Register all plugins from the manifest
        if (probGymPluginManifest.initialize) {
          await probGymPluginManifest.initialize();
        }

        probGymPluginManifest.plugins.forEach((plugin) => {
          try {
            pluginRegistry.register(plugin, { override: true });
            console.log(`[PluginInitializer] Registered core plugin: ${plugin.name}`);
          } catch (error) {
            console.error(`[PluginInitializer] Error registering plugin ${plugin.name}:`, error);
          }
        });

        // Register CogGym input plugins (MultipleChoice, MultipleSelect, Textbox)
        const { MultipleChoicePlugin } = await import('@/components/plugins/MultipleChoicePlugin');
        const { MultipleSelectPlugin } = await import('@/components/plugins/MultipleSelectPlugin');
        const { TextboxPlugin } = await import('@/components/plugins/TextboxPlugin');

        [MultipleChoicePlugin, MultipleSelectPlugin, TextboxPlugin].forEach((plugin) => {
          try {
            pluginRegistry.register(plugin, { override: true });
            console.log(`[PluginInitializer] Registered CogGym plugin: ${plugin.name}`);
          } catch (error) {
            console.error(`[PluginInitializer] Error registering plugin ${plugin.name}:`, error);
          }
        });

        console.log('[PluginInitializer] All core plugins registered');
        console.log('[PluginInitializer] Available plugins:', pluginRegistry.list().map(p => p.name));

        // Register study-specific plugins if needed
        // (For now, all core plugins are available to all studies)
      } catch (error) {
        console.error('[PluginInitializer] Error loading plugins:', error);
      }
    };

    registerPlugins();
  }, [studySlug]);

  // This component doesn't render anything
  return null;
}
