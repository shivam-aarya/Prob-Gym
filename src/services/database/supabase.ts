import { createClient } from '@supabase/supabase-js';
import { DatabaseService, DemographicData, ParticipantData } from './types';
import { UserResponse } from '@/types/study';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Supabase implementation of the DatabaseService interface
 */
export class SupabaseService implements DatabaseService {
  /**
   * Create a new participant entry or return an existing one
   * @param participantId The unique ID for the participant
   * @returns A promise resolving to the ID of the stored participant or error
   */
  async createOrUpdateParticipant(participantId: string): Promise<{ id?: string; error?: Error }> {
    try {
      // Check if participant already exists
      const { data: existingParticipant, error: fetchError } = await supabase
        .from('participants')
        .select('id')
        .eq('participant_id', participantId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows returned
        throw fetchError;
      }

      // If participant exists, return their ID
      if (existingParticipant) {
        return { id: existingParticipant.id };
      }

      // Otherwise create a new participant
      const { data, error } = await supabase
        .from('participants')
        .insert({
          participant_id: participantId,
          responses: {},
          consent_timestamp: new Date().toISOString()
        })
        .select('id')
        .single();

      if (error) throw error;
      return { id: data?.id };
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
      // First get current participant data
      const { data: participant, error: fetchError } = await supabase
        .from('participants')
        .select('responses')
        .eq('participant_id', participantId)
        .single();

      if (fetchError) throw fetchError;

      // Get existing responses or initialize empty object
      const existingResponses = participant?.responses || {};
      
      // Add new response to the responses object, using scenario_id as key
      const updatedResponses = {
        ...existingResponses,
        [response.scenario_id]: response
      };

      // Update the participant record
      const { error } = await supabase
        .from('participants')
        .update({
          responses: updatedResponses,
          last_updated: new Date().toISOString()
        })
        .eq('participant_id', participantId);

      if (error) throw error;
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
      // Update the participant record with demographic data
      const { error } = await supabase
        .from('participants')
        .update({
          demographic_data: data,
          last_updated: new Date().toISOString()
        })
        .eq('participant_id', participantId);

      if (error) throw error;
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
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .eq('participant_id', participantId)
        .single();

      if (error) throw error;
      
      if (!data) {
        throw new Error(`Participant with ID ${participantId} not found`);
      }

      const participantData: ParticipantData = {
        id: data.id,
        responses: Object.values(data.responses || {}),
        demographicData: data.demographic_data,
        createdAt: data.consent_timestamp,
        updatedAt: data.last_updated
      };

      return { data: participantData };
    } catch (error) {
      console.error('Error getting participant data:', error);
      return { error: error as Error };
    }
  }

  /**
   * Update the total completion time for a participant
   * @param participantId The unique ID for the participant
   * @param totalDurationMs Total time spent in milliseconds
   * @returns A promise resolving to the success status or error
   */
  async updateTotalCompletionTime(participantId: string, totalDurationMs: number): Promise<{ success: boolean; error?: Error }> {
    try {
      console.log('Updating completion time:', { participantId, totalDurationMs });
      
      // First check if the participant exists
      const { data: participant, error: fetchError } = await supabase
        .from('participants')
        .select('id')
        .eq('participant_id', participantId)
        .single();
      
      if (fetchError) {
        console.error('Error fetching participant:', fetchError);
        console.error('Participant might not exist with ID:', participantId);
        return { success: false, error: new Error(`Participant not found: ${participantId}`) };
      }
      
      console.log('Found participant:', participant);
      
      const { error } = await supabase
        .from('participants')
        .update({
          total_completion_time_ms: totalDurationMs,
          last_updated: new Date().toISOString()
        })
        .eq('participant_id', participantId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error updating total completion time:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return { success: false, error: error as Error };
    }
  }
} 