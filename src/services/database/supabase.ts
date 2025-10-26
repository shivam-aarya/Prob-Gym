import { createClient } from '@supabase/supabase-js';
import { DatabaseService, DemographicData, ParticipantData, StudyData } from './types';
import { UserResponse } from '@/types/study';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Supabase implementation of the DatabaseService interface
 * Updated for multi-study platform support
 */
export class SupabaseService implements DatabaseService {
  /**
   * Create a new participant entry or return an existing one
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @returns A promise resolving to the ID of the stored participant or error
   */
  async createOrUpdateParticipant(studyId: string, participantId: string): Promise<{ id?: string; error?: Error }> {
    try {
      // Check if participant already exists for this study
      const { data: existingParticipant, error: fetchError } = await supabase
        .from('participants')
        .select('id')
        .eq('study_id', studyId)
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
          study_id: studyId,
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
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @param response The user response to store
   * @returns A promise resolving to the success status or error
   */
  async submitResponse(studyId: string, participantId: string, response: UserResponse): Promise<{ success: boolean; error?: Error }> {
    try {
      // First get current participant data
      const { data: participant, error: fetchError } = await supabase
        .from('participants')
        .select('responses')
        .eq('study_id', studyId)
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
        .eq('study_id', studyId)
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
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @param data The demographic survey data to store
   * @returns A promise resolving to the success status or error
   */
  async submitDemographicData(studyId: string, participantId: string, data: DemographicData): Promise<{ success: boolean; error?: Error }> {
    try {
      // Update the participant record with demographic data
      const { error } = await supabase
        .from('participants')
        .update({
          demographic_data: data,
          last_updated: new Date().toISOString()
        })
        .eq('study_id', studyId)
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
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @returns A promise resolving to the participant data or error
   */
  async getParticipantData(studyId: string, participantId: string): Promise<{ data?: ParticipantData; error?: Error }> {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .eq('study_id', studyId)
        .eq('participant_id', participantId)
        .single();

      if (error) throw error;

      if (!data) {
        throw new Error(`Participant with ID ${participantId} not found in study ${studyId}`);
      }

      const participantData: ParticipantData = {
        id: data.id,
        studyId: data.study_id,
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
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @param totalDurationMs Total time spent in milliseconds
   * @returns A promise resolving to the success status or error
   */
  async updateTotalCompletionTime(studyId: string, participantId: string, totalDurationMs: number): Promise<{ success: boolean; error?: Error }> {
    try {
      console.log('Updating completion time:', { studyId, participantId, totalDurationMs });

      // First check if the participant exists
      const { data: participant, error: fetchError } = await supabase
        .from('participants')
        .select('id')
        .eq('study_id', studyId)
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
        .eq('study_id', studyId)
        .eq('participant_id', participantId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error updating total completion time:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return { success: false, error: error as Error };
    }
  }

  /**
   * Get a study by its slug
   * @param slug The unique slug for the study
   * @returns A promise resolving to the study data or error
   */
  async getStudyBySlug(slug: string): Promise<{ data?: StudyData; error?: Error }> {
    try {
      const { data, error } = await supabase
        .from('studies')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;

      if (!data) {
        throw new Error(`Study with slug ${slug} not found`);
      }

      const studyData: StudyData = {
        id: data.id,
        slug: data.slug,
        title: data.title,
        description: data.description,
        config: data.config,
        metadata: data.metadata,
        status: data.status,
        version: data.version,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };

      return { data: studyData };
    } catch (error) {
      console.error('Error getting study by slug:', error);
      return { error: error as Error };
    }
  }

  /**
   * Get a study by its ID
   * @param studyId The unique ID for the study
   * @returns A promise resolving to the study data or error
   */
  async getStudyById(studyId: string): Promise<{ data?: StudyData; error?: Error }> {
    try {
      const { data, error } = await supabase
        .from('studies')
        .select('*')
        .eq('id', studyId)
        .single();

      if (error) throw error;

      if (!data) {
        throw new Error(`Study with ID ${studyId} not found`);
      }

      const studyData: StudyData = {
        id: data.id,
        slug: data.slug,
        title: data.title,
        description: data.description,
        config: data.config,
        metadata: data.metadata,
        status: data.status,
        version: data.version,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };

      return { data: studyData };
    } catch (error) {
      console.error('Error getting study by ID:', error);
      return { error: error as Error };
    }
  }

  /**
   * List all studies with optional filtering
   * @param filters Optional filters for status, tags, etc.
   * @returns A promise resolving to an array of study data or error
   */
  async listStudies(filters?: { status?: string }): Promise<{ data?: StudyData[]; error?: Error }> {
    try {
      let query = supabase.from('studies').select('*');

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      const studies: StudyData[] = (data || []).map((study) => ({
        id: study.id,
        slug: study.slug,
        title: study.title,
        description: study.description,
        config: study.config,
        metadata: study.metadata,
        status: study.status,
        version: study.version,
        createdAt: study.created_at,
        updatedAt: study.updated_at
      }));

      return { data: studies };
    } catch (error) {
      console.error('Error listing studies:', error);
      return { error: error as Error };
    }
  }
} 