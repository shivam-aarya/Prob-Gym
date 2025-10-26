/**
 * Prob-Gym Plugin Manifest
 * Exports all custom input plugins for the Prob-Gym study
 */

import { PluginManifest } from '@/components/plugins/types';
import { ConstrainedSliderPlugin } from './ConstrainedSliderPlugin';
import { NumberLinePlugin } from './NumberLinePlugin';
import { HistogramPlugin } from './HistogramPlugin';

/**
 * Prob-Gym plugin manifest
 * Registers all custom input components used in this study
 */
export const probGymPluginManifest: PluginManifest = {
  plugins: [ConstrainedSliderPlugin, NumberLinePlugin, HistogramPlugin],

  initialize: async () => {
    console.log('[Prob-Gym] Plugins initialized');
  },

  cleanup: () => {
    console.log('[Prob-Gym] Plugins cleaned up');
  },
};

// Export individual plugins
export { ConstrainedSliderPlugin, NumberLinePlugin, HistogramPlugin };

export default probGymPluginManifest;
