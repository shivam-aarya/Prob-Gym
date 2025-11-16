/**
 * Synchronous plugin registration module
 * This module registers all plugins immediately when imported,
 * avoiding race conditions with async useEffect
 */

import { pluginRegistry } from '@/components/plugins';
import { ConstrainedSliderPlugin } from '@/studies/prob-gym/plugins/ConstrainedSliderPlugin';
import { NumberLinePlugin } from '@/studies/prob-gym/plugins/NumberLinePlugin';
import { HistogramPlugin } from '@/studies/prob-gym/plugins/HistogramPlugin';
import { MultipleChoicePlugin } from '@/components/plugins/MultipleChoicePlugin';
import { MultipleSelectPlugin } from '@/components/plugins/MultipleSelectPlugin';
import { TextboxPlugin } from '@/components/plugins/TextboxPlugin';

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
    // Register Prob-Gym plugins
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

    // Register CogGym input plugins
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
