import { UserResponse } from '@/types/study';
import { DemographicData } from '@/services/database/types';

/**
 * Generate a unique participant ID
 * @returns A unique string ID
 */
export function generateParticipantId(): string {
  // Generate a random ID with timestamp to ensure uniqueness
  return `participant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get the current participant ID from localStorage or create a new one
 * @returns The participant ID
 */
export function getOrCreateParticipantId(): string {
  const existingId = localStorage.getItem('participantId');
  if (existingId) {
    return existingId;
  }
  
  const newId = generateParticipantId();
  localStorage.setItem('participantId', newId);
  return newId;
}

/**
 * Submit a user response to the API
 * @param response The user response to submit
 * @returns A promise with the submission result
 */
export async function submitResponse(response: UserResponse) {
  try {
    const participantId = getOrCreateParticipantId();
    
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ participantId, response }),
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
export async function submitDemographicData(data: DemographicData) {
  try {
    const participantId = getOrCreateParticipantId();
    
    const res = await fetch('/api/demographic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ participantId, demographicData: data }),
    });
    
    return await res.json();
  } catch (error) {
    console.error('Error submitting demographic data:', error);
    return { success: false, message: 'Failed to submit demographic data' };
  }
}

/**
 * Get participant data from the API
 * @returns A promise with the participant data
 */
export async function getParticipantData() {
  try {
    const participantId = getOrCreateParticipantId();
    
    const res = await fetch(`/api/participant/${participantId}`);
    return await res.json();
  } catch (error) {
    console.error('Error getting participant data:', error);
    return { success: false, message: 'Failed to get participant data' };
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