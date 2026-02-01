/**
 * Database Types (generated from Supabase schema)
 * 
 * These types match the database schema for type-safe queries.
 */

export interface Database {
  public: {
    Tables: {
      creator_dna_profiles: {
        Row: {
          id: string;
          creator_id: string;
          generated_at: string;
          primary_tone: string;
          humor_level: number;
          dark_humor_present: boolean;
          risk_tolerance: string;
          audience_type: string;
          confidence_tone: number;
          confidence_humor: number;
          confidence_risk: number;
          confidence_audience: number;
          raw_profile: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          creator_id: string;
          generated_at: string;
          primary_tone: string;
          humor_level: number;
          dark_humor_present?: boolean;
          risk_tolerance: string;
          audience_type: string;
          confidence_tone: number;
          confidence_humor: number;
          confidence_risk: number;
          confidence_audience: number;
          raw_profile: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          creator_id?: string;
          generated_at?: string;
          primary_tone?: string;
          humor_level?: number;
          dark_humor_present?: boolean;
          risk_tolerance?: string;
          audience_type?: string;
          confidence_tone?: number;
          confidence_humor?: number;
          confidence_risk?: number;
          confidence_audience?: number;
          raw_profile?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
      };
      creator_dna_history: {
        Row: {
          id: string;
          creator_id: string;
          profile_snapshot: Record<string, unknown>;
          analyzed_at: string;
        };
        Insert: {
          id?: string;
          creator_id: string;
          profile_snapshot: Record<string, unknown>;
          analyzed_at?: string;
        };
        Update: {
          id?: string;
          creator_id?: string;
          profile_snapshot?: Record<string, unknown>;
          analyzed_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
