import { UserResponse } from '@/types/study';

export interface DemographicData {
  age: string;
  gender: string;
  education: string;
  experience: string;
  [key: string]: string; // For any additional demographic fields
}

export interface ParticipantData {
  id: string;
  studyId: string;
  responses: UserResponse[];
  demographicData?: DemographicData;
  createdAt: string;
  updatedAt: string;
}

export interface StudyData {
  id: string;
  slug: string;
  title: string;
  description?: string;
  config: Record<string, any>;
  metadata?: Record<string, any>;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  version: string;
  createdAt: string;
  updatedAt: string;
}

export interface PluginData {
  id: string;
  name: string;
  version: string;
  componentPath: string;
  configSchema?: Record<string, any>;
  createdAt: string;
}

/**
 * Interface for basic database operations
 * This abstraction allows us to swap different database providers
 * All operations are now study-scoped for multi-study support
 */
export interface DatabaseService {
  /**
   * Create a new participant entry or return an existing one
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @returns A promise resolving to the ID of the stored participant or error
   */
  createOrUpdateParticipant(studyId: string, participantId: string): Promise<{ id?: string; error?: Error }>;

  /**
   * Store a user response for a specific participant
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @param response The user response to store
   * @returns A promise resolving to the success status or error
   */
  submitResponse(studyId: string, participantId: string, response: UserResponse): Promise<{ success: boolean; error?: Error }>;

  /**
   * Store demographic survey data for a specific participant
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @param data The demographic survey data to store
   * @returns A promise resolving to the success status or error
   */
  submitDemographicData(studyId: string, participantId: string, data: DemographicData): Promise<{ success: boolean; error?: Error }>;

  /**
   * Retrieve all data for a specific participant
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @returns A promise resolving to the participant data or error
   */
  getParticipantData(studyId: string, participantId: string): Promise<{ data?: ParticipantData; error?: Error }>;

  /**
   * Update the total completion time for a participant
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @param totalDurationMs Total time spent in milliseconds
   * @returns A promise resolving to the success status or error
   */
  updateTotalCompletionTime(studyId: string, participantId: string, totalDurationMs: number): Promise<{ success: boolean; error?: Error }>;

  /**
   * Get a study by its slug
   * @param slug The unique slug for the study
   * @returns A promise resolving to the study data or error
   */
  getStudyBySlug(slug: string): Promise<{ data?: StudyData; error?: Error }>;

  /**
   * Get a study by its ID
   * @param studyId The unique ID for the study
   * @returns A promise resolving to the study data or error
   */
  getStudyById(studyId: string): Promise<{ data?: StudyData; error?: Error }>;

  /**
   * List all studies with optional filtering
   * @param filters Optional filters for status, tags, etc.
   * @returns A promise resolving to an array of study data or error
   */
  listStudies(filters?: { status?: string }): Promise<{ data?: StudyData[]; error?: Error }>;
} 