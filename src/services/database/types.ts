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
  responses: UserResponse[];
  demographicData?: DemographicData;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface for basic database operations
 * This abstraction allows us to swap different database providers
 */
export interface DatabaseService {
  /**
   * Create a new participant entry or return an existing one
   * @param participantId The unique ID for the participant
   * @returns A promise resolving to the ID of the stored participant or error
   */
  createOrUpdateParticipant(participantId: string): Promise<{ id?: string; error?: Error }>;

  /**
   * Store a user response for a specific participant
   * @param participantId The unique ID for the participant
   * @param response The user response to store
   * @returns A promise resolving to the success status or error
   */
  submitResponse(participantId: string, response: UserResponse): Promise<{ success: boolean; error?: Error }>;

  /**
   * Store demographic survey data for a specific participant
   * @param participantId The unique ID for the participant
   * @param data The demographic survey data to store
   * @returns A promise resolving to the success status or error
   */
  submitDemographicData(participantId: string, data: DemographicData): Promise<{ success: boolean; error?: Error }>;

  /**
   * Retrieve all data for a specific participant
   * @param participantId The unique ID for the participant
   * @returns A promise resolving to the participant data or error
   */
  getParticipantData(participantId: string): Promise<{ data?: ParticipantData; error?: Error }>;
} 