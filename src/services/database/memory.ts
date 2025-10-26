import { DatabaseService, DemographicData, ParticipantData, StudyData } from './types';
import { UserResponse } from '@/types/study';

interface Participant {
  id: string;
  study_id: string;
  participant_id: string;
  responses: Record<number, UserResponse>;
  demographic_data?: DemographicData;
  consent_timestamp: string;
  last_updated: string;
  total_completion_time_ms?: number;
}

interface Study {
  id: string;
  slug: string;
  title: string;
  description?: string;
  config: Record<string, any>;
  metadata?: Record<string, any>;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  version: string;
  created_at: string;
  updated_at: string;
}

/**
 * In-memory implementation of the DatabaseService interface
 * Useful for development and testing without requiring a real database
 * Now supports multi-study platform
 */
export class InMemoryDatabaseService implements DatabaseService {
  private participants: Map<string, Participant> = new Map();
  private studies: Map<string, Study> = new Map();
  private nextParticipantId = 1;
  private nextStudyId = 1;

  /**
   * Create a new participant entry or return an existing one
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @returns A promise resolving to the ID of the stored participant or error
   */
  async createOrUpdateParticipant(studyId: string, participantId: string): Promise<{ id?: string; error?: Error }> {
    try {
      // Check if participant already exists for this study
      const existingParticipant = Array.from(this.participants.values())
        .find(p => p.study_id === studyId && p.participant_id === participantId);

      if (existingParticipant) {
        return { id: existingParticipant.id };
      }

      // Create new participant
      const id = `participant_${this.nextParticipantId++}`;
      const now = new Date().toISOString();

      const participant: Participant = {
        id,
        study_id: studyId,
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
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @param response The user response to store
   * @returns A promise resolving to the success status or error
   */
  async submitResponse(studyId: string, participantId: string, response: UserResponse): Promise<{ success: boolean; error?: Error }> {
    try {
      // Find participant
      const participant = Array.from(this.participants.values())
        .find(p => p.study_id === studyId && p.participant_id === participantId);

      if (!participant) {
        throw new Error(`Participant with ID ${participantId} not found in study ${studyId}`);
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
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @param data The demographic survey data to store
   * @returns A promise resolving to the success status or error
   */
  async submitDemographicData(studyId: string, participantId: string, data: DemographicData): Promise<{ success: boolean; error?: Error }> {
    try {
      // Find participant
      const participant = Array.from(this.participants.values())
        .find(p => p.study_id === studyId && p.participant_id === participantId);

      if (!participant) {
        throw new Error(`Participant with ID ${participantId} not found in study ${studyId}`);
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
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @returns A promise resolving to the participant data or error
   */
  async getParticipantData(studyId: string, participantId: string): Promise<{ data?: ParticipantData; error?: Error }> {
    try {
      const participant = Array.from(this.participants.values())
        .find(p => p.study_id === studyId && p.participant_id === participantId);

      if (!participant) {
        throw new Error(`Participant with ID ${participantId} not found in study ${studyId}`);
      }

      const participantData: ParticipantData = {
        id: participant.id,
        studyId: participant.study_id,
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

  /**
   * Update the total completion time for a participant
   * @param studyId The unique ID for the study
   * @param participantId The unique ID for the participant
   * @param totalDurationMs Total time spent in milliseconds
   * @returns A promise resolving to the success status or error
   */
  async updateTotalCompletionTime(studyId: string, participantId: string, totalDurationMs: number): Promise<{ success: boolean; error?: Error }> {
    try {
      // Find participant
      const participant = Array.from(this.participants.values())
        .find(p => p.study_id === studyId && p.participant_id === participantId);

      if (!participant) {
        throw new Error(`Participant with ID ${participantId} not found in study ${studyId}`);
      }

      // Update total completion time
      participant.total_completion_time_ms = totalDurationMs;
      participant.last_updated = new Date().toISOString();

      return { success: true };
    } catch (error) {
      console.error('Error updating total completion time:', error);
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
      const study = Array.from(this.studies.values())
        .find(s => s.slug === slug);

      if (!study) {
        throw new Error(`Study with slug ${slug} not found`);
      }

      const studyData: StudyData = {
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
      const study = this.studies.get(studyId);

      if (!study) {
        throw new Error(`Study with ID ${studyId} not found`);
      }

      const studyData: StudyData = {
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
      let studies = Array.from(this.studies.values());

      if (filters?.status) {
        studies = studies.filter(s => s.status === filters.status);
      }

      const studyData: StudyData[] = studies.map(study => ({
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

      // Sort by created_at descending
      studyData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      return { data: studyData };
    } catch (error) {
      console.error('Error listing studies:', error);
      return { error: error as Error };
    }
  }

  /**
   * Helper method to seed a study (useful for development)
   */
  async seedStudy(study: Omit<Study, 'id' | 'created_at' | 'updated_at'>): Promise<{ id?: string; error?: Error }> {
    try {
      const id = `study_${this.nextStudyId++}`;
      const now = new Date().toISOString();

      const newStudy: Study = {
        id,
        ...study,
        created_at: now,
        updated_at: now
      };

      this.studies.set(id, newStudy);
      return { id };
    } catch (error) {
      console.error('Error seeding study:', error);
      return { error: error as Error };
    }
  }
}
