import { DatabaseService, DemographicData, ParticipantData } from './types';
import { UserResponse } from '@/types/study';

interface Participant {
  id: string;
  participant_id: string;
  responses: Record<number, UserResponse>;
  demographic_data?: DemographicData;
  consent_timestamp: string;
  last_updated: string;
}

/**
 * In-memory implementation of the DatabaseService interface
 * Useful for development and testing without requiring a real database
 */
export class InMemoryDatabaseService implements DatabaseService {
  private participants: Map<string, Participant> = new Map();
  private nextId = 1;

  /**
   * Create a new participant entry or return an existing one
   * @param participantId The unique ID for the participant
   * @returns A promise resolving to the ID of the stored participant or error
   */
  async createOrUpdateParticipant(participantId: string): Promise<{ id?: string; error?: Error }> {
    try {
      // Check if participant already exists
      const existingParticipant = Array.from(this.participants.values())
        .find(p => p.participant_id === participantId);
      
      if (existingParticipant) {
        return { id: existingParticipant.id };
      }

      // Create new participant
      const id = `participant_${this.nextId++}`;
      const now = new Date().toISOString();
      
      const participant: Participant = {
        id,
        participant_id: participantId,
        responses: {},
        consent_timestamp: now,
        last_updated: now
      };
      
      this.participants.set(id, participant);
      return { id };
    } catch (error) {
      console.error('Error creating/updating participant:', error);
      return { error: error as Error };
    }
  }

  /**
   * Store a user response for a specific participant
   * @param participantId The unique ID for the participant
   * @param response The user response to store
   * @returns A promise resolving to the success status or error
   */
  async submitResponse(participantId: string, response: UserResponse): Promise<{ success: boolean; error?: Error }> {
    try {
      // Find participant
      const participant = Array.from(this.participants.values())
        .find(p => p.participant_id === participantId);
      
      if (!participant) {
        throw new Error(`Participant with ID ${participantId} not found`);
      }

      // Update responses
      participant.responses = {
        ...participant.responses,
        [response.scenario_id]: response
      };
      
      participant.last_updated = new Date().toISOString();
      
      return { success: true };
    } catch (error) {
      console.error('Error submitting response:', error);
      return { success: false, error: error as Error };
    }
  }

  /**
   * Store demographic survey data for a specific participant
   * @param participantId The unique ID for the participant
   * @param data The demographic survey data to store
   * @returns A promise resolving to the success status or error
   */
  async submitDemographicData(participantId: string, data: DemographicData): Promise<{ success: boolean; error?: Error }> {
    try {
      // Find participant
      const participant = Array.from(this.participants.values())
        .find(p => p.participant_id === participantId);
      
      if (!participant) {
        throw new Error(`Participant with ID ${participantId} not found`);
      }

      // Update demographic data
      participant.demographic_data = data;
      participant.last_updated = new Date().toISOString();
      
      return { success: true };
    } catch (error) {
      console.error('Error submitting demographic data:', error);
      return { success: false, error: error as Error };
    }
  }

  /**
   * Retrieve all data for a specific participant
   * @param participantId The unique ID for the participant
   * @returns A promise resolving to the participant data or error
   */
  async getParticipantData(participantId: string): Promise<{ data?: ParticipantData; error?: Error }> {
    try {
      const participant = Array.from(this.participants.values())
        .find(p => p.participant_id === participantId);
      
      if (!participant) {
        throw new Error(`Participant with ID ${participantId} not found`);
      }
      
      const participantData: ParticipantData = {
        id: participant.id,
        responses: Object.values(participant.responses),
        demographicData: participant.demographic_data,
        createdAt: participant.consent_timestamp,
        updatedAt: participant.last_updated
      };
      
      return { data: participantData };
    } catch (error) {
      console.error('Error getting participant data:', error);
      return { error: error as Error };
    }
  }
} 