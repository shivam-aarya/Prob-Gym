'use client';

import '@/components/plugins/registerAllPlugins';

/**
 * Global plugin initializer - ensures plugins are loaded
 * Plugins are registered synchronously when registerAllPlugins module is imported
 */
export function GlobalPluginInitializer() {
  // Plugins are registered synchronously on module import
  // This component exists just to ensure the import happens
  return null;
}
