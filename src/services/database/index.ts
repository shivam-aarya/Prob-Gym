import { DatabaseService } from './types';
import { SupabaseService } from './supabase';
import { InMemoryDatabaseService } from './memory';

// Database implementation type
export type DatabaseImplementation = 'supabase' | 'memory';

/**
 * Factory for creating database service instances
 */
export class DatabaseFactory {
  private static instance: DatabaseService;
  private static currentImplementation: DatabaseImplementation;

  /**
   * Get the database service instance
   * 
   * @param implementation The database implementation to use (default: based on environment)
   * @returns A database service instance
   */
  static getService(implementation?: DatabaseImplementation): DatabaseService {
    // Determine which implementation to use
    const useImplementation = implementation || DatabaseFactory.determineImplementation();
    
    // If we already have an instance and it's the same implementation, return it
    if (DatabaseFactory.instance && DatabaseFactory.currentImplementation === useImplementation) {
      return DatabaseFactory.instance;
    }

    // Create a new instance of the requested implementation
    switch (useImplementation) {
      case 'supabase':
        DatabaseFactory.instance = new SupabaseService();
        break;
      case 'memory':
        DatabaseFactory.instance = new InMemoryDatabaseService();
        break;
      default:
        // Default to in-memory for safety
        DatabaseFactory.instance = new InMemoryDatabaseService();
        break;
    }

    DatabaseFactory.currentImplementation = useImplementation;
    return DatabaseFactory.instance;
  }

  /**
   * Determine which database implementation to use based on environment
   * 
   * @returns The database implementation to use
   */
  private static determineImplementation(): DatabaseImplementation {
    // Check if we're in a test environment
    if (process.env.NODE_ENV === 'test') {
      return 'memory';
    }

    // Check if Supabase credentials are configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Use Supabase if credentials are configured, otherwise use in-memory
    return (supabaseUrl && supabaseKey) ? 'supabase' : 'memory';
  }
}

// Export a singleton instance for convenience
export const db = DatabaseFactory.getService();

// Export types for usage throughout the application
export * from './types'; 