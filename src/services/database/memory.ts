import { DatabaseService } from './types';
import { UserResponse } from '@/types/study';

/**
 * In-memory implementation of the DatabaseService interface
 * Useful for development and testing without requiring a real database
 */
export class InMemoryDatabaseService implements DatabaseService {
  private responses: Map<string, UserResponse> = new Map();
  private demographics: Map<string, any> = new Map();
  private nextId = 1;

  /**
   * Store a user response in memory
   * @param response The user response to store
   * @returns A promise resolving to the ID of the stored response
   */
  async submitResponse(response: UserResponse): Promise<{ id?: string; error?: Error }> {
    try {
      const id = `response_${this.nextId++}`;
      this.responses.set(id, { ...response });
      return { id };
    } catch (error) {
      console.error('Error submitting response:', error);
      return { error: error as Error };
    }
  }

  /**
   * Retrieve user responses for a specific scenario from memory
   * @param scenarioId The ID of the scenario to get responses for
   * @returns A promise resolving to an array of user responses
   */
  async getResponsesByScenario(scenarioId: number): Promise<{ data?: UserResponse[]; error?: Error }> {
    try {
      const responses = Array.from(this.responses.values())
        .filter(response => response.scenario_id === scenarioId);
      return { data: responses };
    } catch (error) {
      console.error('Error getting responses:', error);
      return { error: error as Error };
    }
  }

  /**
   * Store demographic survey data in memory
   * @param data The demographic survey data to store
   * @returns A promise resolving to the ID of the stored survey
   */
  async submitDemographicData(data: any): Promise<{ id?: string; error?: Error }> {
    try {
      const id = `demographic_${this.nextId++}`;
      this.demographics.set(id, { ...data });
      return { id };
    } catch (error) {
      console.error('Error submitting demographic data:', error);
      return { error: error as Error };
    }
  }
} 