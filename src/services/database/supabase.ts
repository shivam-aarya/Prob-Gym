import { createClient } from '@supabase/supabase-js';
import { DatabaseService } from './types';
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
   * Store a user response in the database
   * @param response The user response to store
   * @returns A promise resolving to the ID of the stored response or error
   */
  async submitResponse(response: UserResponse): Promise<{ id?: string; error?: Error }> {
    try {
      const { data, error } = await supabase
        .from('responses')
        .insert({
          task_name: response.task_name,
          scenario_id: response.scenario_id,
          response_data: response.response_data,
          created_at: new Date().toISOString()
        })
        .select('id')
        .single();

      if (error) throw error;
      return { id: data?.id };
    } catch (error) {
      console.error('Error submitting response:', error);
      return { error: error as Error };
    }
  }

  /**
   * Retrieve user responses for a specific scenario
   * @param scenarioId The ID of the scenario to get responses for
   * @returns A promise resolving to an array of user responses
   */
  async getResponsesByScenario(scenarioId: number): Promise<{ data?: UserResponse[]; error?: Error }> {
    try {
      const { data, error } = await supabase
        .from('responses')
        .select('*')
        .eq('scenario_id', scenarioId);

      if (error) throw error;
      return { data: data as UserResponse[] };
    } catch (error) {
      console.error('Error getting responses:', error);
      return { error: error as Error };
    }
  }

  /**
   * Store demographic survey data
   * @param data The demographic survey data to store
   * @returns A promise resolving to the ID of the stored survey or error
   */
  async submitDemographicData(data: any): Promise<{ id?: string; error?: Error }> {
    try {
      // Extract timestamp and remove it from data object
      const { timestamp, ...demographicData } = data;
      
      const { data: surveyData, error } = await supabase
        .from('demographics')
        .insert({
          ...demographicData,
          created_at: timestamp || new Date().toISOString()
        })
        .select('id')
        .single();

      if (error) throw error;
      return { id: surveyData?.id };
    } catch (error) {
      console.error('Error submitting demographic data:', error);
      return { error: error as Error };
    }
  }
} 