import { UserResponse } from '@/types/study';

/**
 * Submit a user response to the API
 * @param response The user response to submit
 * @returns A promise with the submission result
 */
export async function submitResponse(response: UserResponse) {
  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response),
    });
    
    return await res.json();
  } catch (error) {
    console.error('Error submitting response:', error);
    return { success: false, message: 'Failed to submit response' };
  }
}

/**
 * Submit demographic survey data
 * @param data The demographic data to submit
 * @returns A promise with the submission result
 */
export async function submitDemographicData(data: any) {
  try {
    const res = await fetch('/api/demographic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return await res.json();
  } catch (error) {
    console.error('Error submitting demographic data:', error);
    return { success: false, message: 'Failed to submit demographic data' };
  }
}

/**
 * Get responses for a specific scenario
 * @param scenarioId The ID of the scenario to get responses for
 * @returns A promise with the responses
 */
export async function getResponsesByScenario(scenarioId: number) {
  try {
    const res = await fetch(`/api/responses/${scenarioId}`);
    return await res.json();
  } catch (error) {
    console.error('Error getting responses:', error);
    return { success: false, message: 'Failed to get responses' };
  }
} 