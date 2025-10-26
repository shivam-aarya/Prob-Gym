'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { pluginRegistry } from './PluginRegistry';
import { Plugin, PluginContext } from './types';

/**
 * Error boundary for plugin rendering
 */
class PluginErrorBoundary extends Component<
  {
    pluginName: string;
    fallback?: ReactNode;
    children: ReactNode;
  },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      `[PluginLoader] Error in plugin "${this.props.pluginName}":`,
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="border border-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
          <h3 className="text-red-700 dark:text-red-400 font-semibold mb-2">
            Plugin Error: {this.props.pluginName}
          </h3>
          <p className="text-red-600 dark:text-red-300 text-sm">
            {this.state.error?.message || 'An error occurred while rendering this plugin.'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Props for PluginLoader component
 */
export interface PluginLoaderProps {
  /** Name of the plugin to load */
  pluginName: string;

  /** Props to pass to the plugin component */
  pluginProps?: Record<string, any>;

  /** Plugin context */
  context?: PluginContext;

  /** Fallback UI if plugin not found or fails */
  fallback?: ReactNode;

  /** Whether to show error details in production */
  showErrors?: boolean;

  /** Class name for wrapper div */
  className?: string;
}

/**
 * PluginLoader - Component for dynamically loading and rendering plugins
 *
 * Usage:
 * ```tsx
 * <PluginLoader
 *   pluginName="constrained-slider"
 *   pluginProps={{ value, onChange, options }}
 *   context={{ studyId, participantId }}
 * />
 * ```
 */
export function PluginLoader({
  pluginName,
  pluginProps = {},
  context,
  fallback,
  showErrors = process.env.NODE_ENV === 'development',
  className,
}: PluginLoaderProps): React.ReactElement {
  // Get plugin from registry
  const plugin = pluginRegistry.get(pluginName);

  // Plugin not found
  if (!plugin) {
    const errorMessage = `Plugin "${pluginName}" not found in registry.`;
    console.error(`[PluginLoader] ${errorMessage}`);

    if (fallback !== undefined) {
      return <>{fallback}</>;
    }

    if (showErrors) {
      return (
        <div className="border border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
          <h3 className="text-yellow-700 dark:text-yellow-400 font-semibold mb-2">
            Plugin Not Found
          </h3>
          <p className="text-yellow-600 dark:text-yellow-300 text-sm">
            Plugin &quot;{pluginName}&quot; is not registered.
          </p>
          <p className="text-yellow-600 dark:text-yellow-300 text-xs mt-2">
            Available plugins: {pluginRegistry.list().map(p => p.name).join(', ') || 'none'}
          </p>
        </div>
      );
    }

    return <></>;
  }

  // Get the component from plugin
  const PluginComponent = plugin.component;

  // Merge context with plugin props
  const finalProps = {
    ...pluginProps,
    context: {
      ...context,
      getPlugin: (name: string) => pluginRegistry.get(name),
    },
  };

  // Render plugin with error boundary
  return (
    <div className={className} data-plugin={pluginName}>
      <PluginErrorBoundary pluginName={pluginName} fallback={fallback}>
        <PluginComponent {...finalProps} />
      </PluginErrorBoundary>
    </div>
  );
}

/**
 * Hook to access a plugin from the registry
 */
export function usePlugin(pluginName: string): Plugin | undefined {
  const [plugin, setPlugin] = React.useState<Plugin | undefined>(
    pluginRegistry.get(pluginName)
  );

  React.useEffect(() => {
    // Update if plugin changes (useful for hot-reloading in dev)
    setPlugin(pluginRegistry.get(pluginName));
  }, [pluginName]);

  return plugin;
}

/**
 * Hook to check if a plugin is available
 */
export function usePluginAvailable(pluginName: string): boolean {
  const plugin = usePlugin(pluginName);
  return plugin !== undefined;
}

/**
 * Hook to get multiple plugins
 */
export function usePlugins(pluginNames: string[]): (Plugin | undefined)[] {
  const [plugins, setPlugins] = React.useState<(Plugin | undefined)[]>([]);

  React.useEffect(() => {
    const loadedPlugins = pluginNames.map((name) => pluginRegistry.get(name));
    setPlugins(loadedPlugins);
  }, [pluginNames]);

  return plugins;
}

/**
 * Hook to get all plugins of a specific type
 */
export function usePluginsByType(type: Plugin['type']): Plugin[] {
  const [plugins, setPlugins] = React.useState<Plugin[]>(
    pluginRegistry.getByType(type)
  );

  React.useEffect(() => {
    setPlugins(pluginRegistry.getByType(type));
  }, [type]);

  return plugins;
}
