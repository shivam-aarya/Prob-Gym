import { ComponentType } from 'react';

/**
 * Plugin type categories
 */
export type PluginType = 'input' | 'visualization' | 'feature';

/**
 * Base plugin interface that all plugins must implement
 */
export interface Plugin<TProps = any, _TConfig = any> {
  /** Unique name for the plugin */
  name: string;

  /** Plugin version (semver format) */
  version: string;

  /** Plugin type category */
  type: PluginType;

  /** React component to render */
  component: ComponentType<TProps>;

  /** Optional configuration schema for validation */
  configSchema?: Record<string, any>;

  /** Optional dependencies on other plugins */
  dependencies?: string[];

  /** Optional description */
  description?: string;

  /** Optional author information */
  author?: string;
}

/**
 * Plugin manifest - exported from plugin files
 * Contains metadata and initialization/cleanup hooks
 */
export interface PluginManifest {
  /** List of plugins provided by this manifest */
  plugins: Plugin[];

  /** Optional initialization function called when plugin is loaded */
  initialize?: () => void | Promise<void>;

  /** Optional cleanup function called when plugin is unloaded */
  cleanup?: () => void | Promise<void>;
}

/**
 * Plugin registration options
 */
export interface PluginRegistrationOptions {
  /** Whether to override existing plugin with same name */
  override?: boolean;

  /** Whether to validate dependencies before registration */
  validateDependencies?: boolean;
}

/**
 * Plugin context provided to all plugin components
 */
export interface PluginContext {
  /** Study ID the plugin is running in */
  studyId?: string;

  /** Study slug */
  studySlug?: string;

  /** Participant ID */
  participantId?: string;

  /** Scenario/question ID */
  scenarioId?: number;

  /** Task name */
  taskName?: string;

  /** Plugin configuration specific to this instance */
  config?: Record<string, any>;

  /** Helper to get other registered plugins */
  getPlugin?: (name: string) => Plugin | undefined;
}

/**
 * Props passed to input plugin components
 */
export interface InputPluginProps {
  /** Current value */
  value?: any;

  /** Callback when value changes */
  onChange: (value: any) => void;

  /** Whether the input is disabled */
  disabled?: boolean;

  /** Plugin-specific configuration */
  config?: Record<string, any>;

  /** Plugin context */
  context?: PluginContext;

  /** Options or choices for the input */
  options?: string[];

  /** Additional props */
  [key: string]: any;
}

/**
 * Props passed to visualization plugin components
 */
export interface VisualizationPluginProps {
  /** Data to visualize */
  data: any;

  /** Plugin-specific configuration */
  config?: Record<string, any>;

  /** Plugin context */
  context?: PluginContext;

  /** Additional props */
  [key: string]: any;
}

/**
 * Error thrown when plugin-related operations fail
 */
export class PluginError extends Error {
  constructor(
    message: string,
    public pluginName?: string,
    public code?: string
  ) {
    super(message);
    this.name = 'PluginError';
  }
}

/**
 * Plugin load result
 */
export interface PluginLoadResult {
  success: boolean;
  plugin?: Plugin;
  error?: PluginError;
}

/**
 * Plugin registry state
 */
export interface PluginRegistryState {
  plugins: Map<string, Plugin>;
  initialized: Set<string>;
  failed: Map<string, PluginError>;
}
