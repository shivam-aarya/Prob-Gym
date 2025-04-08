import { UserResponse } from '@/types/study';

/**
 * Interface for basic database operations
 * This abstraction allows us to swap different database providers
 */
export interface DatabaseService {
  /**
   * Store a user response in the database
   * @param response The user response to store
   * @returns A promise resolving to the ID of the stored response or error
   */
  submitResponse(response: UserResponse): Promise<{ id?: string; error?: Error }>;

  /**
   * Retrieve user responses for a specific scenario
   * @param scenarioId The ID of the scenario to get responses for
   * @returns A promise resolving to an array of user responses
   */
  getResponsesByScenario(scenarioId: number): Promise<{ data?: UserResponse[]; error?: Error }>;

  /**
   * Store demographic survey data
   * @param data The demographic survey data to store
   * @returns A promise resolving to the ID of the stored survey or error
   */
  submitDemographicData(data: any): Promise<{ id?: string; error?: Error }>;
} 