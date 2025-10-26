/**
 * Study metadata and configuration types
 * Defines the standard structure for all studies in the platform
 */

/**
 * Study status enum
 */
export type StudyStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';

/**
 * Study length categories
 */
export type StudyLength = 'quick' | 'medium' | 'long';

/**
 * Study metadata tags for classification and filtering
 */
export interface StudyTags {
  /** Cognitive processes involved */
  cognitiveProcess?: string[];

  /** Modalities used (visual, text, audio, interactive, etc.) */
  modality?: string[];

  /** Study length category */
  studyLength?: StudyLength;

  /** Domain/field of study */
  domain?: string[];

  /** Custom tags */
  custom?: Record<string, string | string[]>;
}

/**
 * Study settings
 */
export interface StudySettings {
  /** Number of questions per participant */
  questionsPerParticipant?: number;

  /** Whether to randomize question order */
  randomizeQuestions?: boolean;

  /** Whether participants can go back to previous questions */
  allowBack?: boolean;

  /** Whether to show progress indicator */
  showProgress?: boolean;

  /** Time limit in minutes (optional) */
  timeLimit?: number;

  /** Whether to auto-save progress */
  autoSave?: boolean;

  /** Completion message shown at the end */
  completionMessage?: string;

  /** URL to redirect to after completion */
  redirectUrl?: string;
}

/**
 * Study flow configuration
 * Defines which pages are enabled in the study
 */
export interface StudyFlow {
  /** Whether to show consent page */
  consent: boolean;

  /** Whether to show tutorial page */
  tutorial: boolean;

  /** Whether to show main scenarios/questions */
  scenarios: boolean;

  /** Whether to show demographic survey */
  demographic: boolean;
}

/**
 * Tutorial page configuration
 */
export interface TutorialPage {
  title?: string;
  content: string | string[];
  type?: 'text' | 'image' | 'video' | 'quiz' | 'scenario';
  media?: {
    type: 'image' | 'video' | 'gif';
    src: string;
    alt?: string;
  };
  buttonText?: string;
}

/**
 * Consent configuration
 */
export interface ConsentConfig {
  title: string;
  content: string[];
  buttonText?: string;
  requireSignature?: boolean;
}

/**
 * Demographic question configuration
 */
export interface DemographicQuestion {
  id: string;
  type: 'text' | 'select' | 'radio' | 'checkbox';
  label: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

/**
 * Demographic survey configuration
 */
export interface DemographicConfig {
  title: string;
  description?: string;
  questions: DemographicQuestion[];
  buttonText?: string;
  requireProlificId?: boolean;
}

/**
 * Complete study metadata
 * This is the comprehensive structure that describes a study
 */
export interface StudyMetadata {
  // === Identification ===
  /** Unique identifier */
  id: string;

  /** URL-friendly slug */
  slug: string;

  /** Semantic version */
  version: string;

  // === Display Information ===
  /** Study title */
  title: string;

  /** Full description */
  description: string;

  /** Short description for cards/previews */
  shortDescription?: string;

  /** Study authors */
  authors?: string[];

  // === Classification ===
  /** Tags for filtering and categorization */
  tags: StudyTags;

  /** Study status */
  status: StudyStatus;

  // === Configuration ===
  /** Study settings */
  settings: StudySettings;

  /** Study flow configuration */
  flow: StudyFlow;

  // === Resources ===
  /** Base path for study assets (relative to public/) */
  assetPath: string;

  /** Required plugins */
  plugins: string[];

  // === Study Content Paths ===
  /** Path to scenarios file (relative to study directory) */
  scenariosPath?: string;

  /** Path to config file (relative to study directory) */
  configPath?: string;

  // === Timestamps (auto-populated) ===
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

/**
 * Study configuration (from config.json files)
 * This structure matches the existing Prob-Gym config files
 */
export interface StudyConfig {
  study: {
    title: string;
    randomizeQuestions?: boolean;
    questionsPerParticipant?: number;
    backend?: {
      enabled: boolean;
      endpoint?: string;
    };
  };
  consent?: ConsentConfig;
  tutorial?: {
    title: string;
    pages: TutorialPage[];
    buttonText?: string;
  };
  demographic?: DemographicConfig;
}

/**
 * Filter options for study queries
 */
export interface StudyFilterOptions {
  status?: StudyStatus | StudyStatus[];
  cognitiveProcess?: string | string[];
  modality?: string | string[];
  studyLength?: StudyLength | StudyLength[];
  tags?: Record<string, string | string[]>;
  search?: string;
}

/**
 * Study summary for list views
 */
export interface StudySummary {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  status: StudyStatus;
  tags: StudyTags;
  participantCount?: number;
  estimatedDuration?: number; // in minutes
  assetPath: string;
}

/**
 * Study context - provided to components within a study
 */
export interface StudyContext {
  /** Study metadata */
  metadata: StudyMetadata;

  /** Study configuration */
  config: StudyConfig;

  /** Current study ID */
  studyId: string;

  /** Current participant ID */
  participantId: string;

  /** Helper functions */
  helpers: {
    /** Get asset URL for this study */
    getAssetUrl: (path: string) => string;

    /** Get plugin by name */
    getPlugin: (name: string) => any;
  };
}

/**
 * Study registration data
 * Used when adding a new study to the registry
 */
export interface StudyRegistration {
  metadata: StudyMetadata;
  config: StudyConfig;
  scenarios: any[]; // Study-specific scenario format
}
