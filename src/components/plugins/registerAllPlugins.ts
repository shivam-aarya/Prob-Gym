/**
 * Synchronous plugin registration module
 * This module registers all plugins immediately when imported,
 * avoiding race conditions with async useEffect
 */

import { pluginRegistry } from '@/components/plugins';

// Track if plugins have been registered
let pluginsRegistered = false;

/**
 * Register all plugins synchronously
 * This function is idempotent - safe to call multiple times
 */
export function registerAllPlugins() {
  if (pluginsRegistered) {
    return;
  }

  console.log('[registerAllPlugins] Starting synchronous plugin registration...');

  try {
    // Import and register Prob-Gym plugins synchronously
    // Note: These must be synchronous imports to work
    const { ConstrainedSliderPlugin } = require('@/studies/prob-gym/plugins/ConstrainedSliderPlugin');
    const { NumberLinePlugin } = require('@/studies/prob-gym/plugins/NumberLinePlugin');
    const { HistogramPlugin } = require('@/studies/prob-gym/plugins/HistogramPlugin');

    const probGymPlugins = [ConstrainedSliderPlugin, NumberLinePlugin, HistogramPlugin];

    probGymPlugins.forEach((plugin) => {
      try {
        const result = pluginRegistry.register(plugin, { override: true });
        if (result.success) {
          console.log(`[registerAllPlugins] ✓ Registered: ${plugin.name}`);
        }
      } catch (error) {
        console.error(`[registerAllPlugins] Failed to register ${plugin.name}:`, error);
      }
    });

    // Import and register CogGym input plugins
    const { MultipleChoicePlugin } = require('@/components/plugins/MultipleChoicePlugin');
    const { MultipleSelectPlugin } = require('@/components/plugins/MultipleSelectPlugin');
    const { TextboxPlugin } = require('@/components/plugins/TextboxPlugin');

    const cogGymPlugins = [MultipleChoicePlugin, MultipleSelectPlugin, TextboxPlugin];

    cogGymPlugins.forEach((plugin) => {
      try {
        const result = pluginRegistry.register(plugin, { override: true });
        if (result.success) {
          console.log(`[registerAllPlugins] ✓ Registered: ${plugin.name}`);
        }
      } catch (error) {
        console.error(`[registerAllPlugins] Failed to register ${plugin.name}:`, error);
      }
    });

    const registeredPlugins = pluginRegistry.list();
    console.log('[registerAllPlugins] ✅ All plugins registered synchronously');
    console.log('[registerAllPlugins] Available:', registeredPlugins.map(p => p.name).join(', '));

    pluginsRegistered = true;
  } catch (error) {
    console.error('[registerAllPlugins] ❌ Error loading plugins:', error);
  }
}

// Register plugins immediately when this module is imported
registerAllPlugins();
