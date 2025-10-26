import {
  Plugin,
  PluginManifest,
  PluginRegistrationOptions,
  PluginError,
  PluginLoadResult,
  PluginRegistryState,
} from './types';

/**
 * PluginRegistry - Singleton registry for managing plugins
 *
 * Responsibilities:
 * - Register and unregister plugins
 * - Validate plugin dependencies
 * - Initialize and cleanup plugins
 * - Provide plugin lookup and listing
 */
class PluginRegistry {
  private static instance: PluginRegistry;
  private state: PluginRegistryState;

  private constructor() {
    this.state = {
      plugins: new Map(),
      initialized: new Set(),
      failed: new Map(),
    };
  }

  /**
   * Get the singleton instance
   */
  static getInstance(): PluginRegistry {
    if (!PluginRegistry.instance) {
      PluginRegistry.instance = new PluginRegistry();
    }
    return PluginRegistry.instance;
  }

  /**
   * Register a single plugin
   */
  register(
    plugin: Plugin,
    options: PluginRegistrationOptions = {}
  ): PluginLoadResult {
    const { override = false, validateDependencies = true } = options;

    try {
      // Check if plugin already exists
      if (this.state.plugins.has(plugin.name) && !override) {
        throw new PluginError(
          `Plugin "${plugin.name}" is already registered. Use override option to replace.`,
          plugin.name,
          'ALREADY_REGISTERED'
        );
      }

      // Validate dependencies if required
      if (validateDependencies && plugin.dependencies) {
        for (const dep of plugin.dependencies) {
          if (!this.state.plugins.has(dep)) {
            throw new PluginError(
              `Plugin "${plugin.name}" depends on "${dep}" which is not registered.`,
              plugin.name,
              'MISSING_DEPENDENCY'
            );
          }
        }
      }

      // Register the plugin
      this.state.plugins.set(plugin.name, plugin);

      // Remove from failed if it was there
      if (this.state.failed.has(plugin.name)) {
        this.state.failed.delete(plugin.name);
      }

      console.log(`[PluginRegistry] Registered plugin: ${plugin.name} v${plugin.version}`);

      return {
        success: true,
        plugin,
      };
    } catch (error) {
      const pluginError = error instanceof PluginError
        ? error
        : new PluginError(
            `Failed to register plugin "${plugin.name}": ${(error as Error).message}`,
            plugin.name,
            'REGISTRATION_FAILED'
          );

      this.state.failed.set(plugin.name, pluginError);

      return {
        success: false,
        error: pluginError,
      };
    }
  }

  /**
   * Register multiple plugins from a manifest
   */
  async registerManifest(
    manifest: PluginManifest,
    options: PluginRegistrationOptions = {}
  ): Promise<PluginLoadResult[]> {
    const results: PluginLoadResult[] = [];

    // Register all plugins
    for (const plugin of manifest.plugins) {
      const result = this.register(plugin, options);
      results.push(result);
    }

    // Run initialization if provided and all plugins registered successfully
    if (manifest.initialize && results.every((r) => r.success)) {
      try {
        await manifest.initialize();
        console.log('[PluginRegistry] Manifest initialized successfully');
      } catch (error) {
        console.error('[PluginRegistry] Manifest initialization failed:', error);
        // Mark all plugins as failed
        for (const plugin of manifest.plugins) {
          this.state.failed.set(
            plugin.name,
            new PluginError(
              `Manifest initialization failed: ${(error as Error).message}`,
              plugin.name,
              'INIT_FAILED'
            )
          );
        }
      }
    }

    return results;
  }

  /**
   * Unregister a plugin by name
   */
  unregister(pluginName: string): boolean {
    const plugin = this.state.plugins.get(pluginName);

    if (!plugin) {
      console.warn(`[PluginRegistry] Plugin "${pluginName}" not found`);
      return false;
    }

    // Check if any other plugins depend on this one
    const dependents = this.getDependents(pluginName);
    if (dependents.length > 0) {
      console.warn(
        `[PluginRegistry] Cannot unregister "${pluginName}" because it's required by: ${dependents.join(', ')}`
      );
      return false;
    }

    this.state.plugins.delete(pluginName);
    this.state.initialized.delete(pluginName);
    this.state.failed.delete(pluginName);

    console.log(`[PluginRegistry] Unregistered plugin: ${pluginName}`);
    return true;
  }

  /**
   * Get a plugin by name
   */
  get(pluginName: string): Plugin | undefined {
    return this.state.plugins.get(pluginName);
  }

  /**
   * Check if a plugin is registered
   */
  has(pluginName: string): boolean {
    return this.state.plugins.has(pluginName);
  }

  /**
   * Get all registered plugins
   */
  list(): Plugin[] {
    return Array.from(this.state.plugins.values());
  }

  /**
   * Get plugins by type
   */
  getByType(type: Plugin['type']): Plugin[] {
    return this.list().filter((plugin) => plugin.type === type);
  }

  /**
   * Get plugins that depend on a given plugin
   */
  getDependents(pluginName: string): string[] {
    const dependents: string[] = [];

    for (const [name, plugin] of this.state.plugins.entries()) {
      if (plugin.dependencies?.includes(pluginName)) {
        dependents.push(name);
      }
    }

    return dependents;
  }

  /**
   * Get failed plugins
   */
  getFailures(): Map<string, PluginError> {
    return new Map(this.state.failed);
  }

  /**
   * Clear all plugins (useful for testing)
   */
  clear(): void {
    this.state.plugins.clear();
    this.state.initialized.clear();
    this.state.failed.clear();
    console.log('[PluginRegistry] Cleared all plugins');
  }

  /**
   * Get registry statistics
   */
  getStats(): {
    total: number;
    byType: Record<string, number>;
    failed: number;
  } {
    const plugins = this.list();
    const byType: Record<string, number> = {};

    for (const plugin of plugins) {
      byType[plugin.type] = (byType[plugin.type] || 0) + 1;
    }

    return {
      total: plugins.length,
      byType,
      failed: this.state.failed.size,
    };
  }

  /**
   * Validate all plugin dependencies
   */
  validateDependencies(): Map<string, string[]> {
    const missing = new Map<string, string[]>();

    for (const [name, plugin] of this.state.plugins.entries()) {
      if (plugin.dependencies) {
        const missingDeps = plugin.dependencies.filter(
          (dep) => !this.state.plugins.has(dep)
        );

        if (missingDeps.length > 0) {
          missing.set(name, missingDeps);
        }
      }
    }

    return missing;
  }
}

// Export singleton instance
export const pluginRegistry = PluginRegistry.getInstance();

// Export class for testing
export { PluginRegistry };
