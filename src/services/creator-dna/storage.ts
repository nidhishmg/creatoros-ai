/**
 * Creator DNA Profile Storage Service
 * 
 * Handles saving and retrieving Creator DNA profiles from Supabase.
 */

import { createClient } from '@supabase/supabase-js';
import type { CreatorDNAProfile } from '@/types';

/**
 * Create Supabase admin client for server-side operations
 */
function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase environment variables are not set');
  }
  
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Type for the database row
interface CreatorDNARow {
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
  raw_profile: CreatorDNAProfile;
  created_at: string;
  updated_at: string;
}

/**
 * Save a Creator DNA profile to the database
 */
export async function saveCreatorDNAProfile(
  profile: CreatorDNAProfile
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase
    .from('creator_dna_profiles')
    .upsert({
      creator_id: profile.creator_id,
      generated_at: profile.generated_at,
      primary_tone: profile.creator_dna.primary_tone,
      humor_level: profile.creator_dna.humor_level,
      dark_humor_present: profile.creator_dna.dark_humor_present,
      risk_tolerance: profile.creator_dna.risk_tolerance,
      audience_type: profile.creator_dna.audience_type,
      confidence_tone: profile.creator_dna.confidence.tone,
      confidence_humor: profile.creator_dna.confidence.humor,
      confidence_risk: profile.creator_dna.confidence.risk,
      confidence_audience: profile.creator_dna.confidence.audience,
      raw_profile: profile as unknown as Record<string, unknown>,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'creator_id',
    });
  
  if (error) {
    console.error('Failed to save Creator DNA profile:', error);
    return { success: false, error: error.message };
  }
  
  return { success: true };
}

/**
 * Get a Creator DNA profile from the database
 */
export async function getCreatorDNAProfile(
  creatorId: string
): Promise<CreatorDNAProfile | null> {
  const supabase = getSupabaseAdmin();
  
  const { data, error } = await supabase
    .from('creator_dna_profiles')
    .select('raw_profile')
    .eq('creator_id', creatorId)
    .single<{ raw_profile: CreatorDNAProfile }>();
  
  if (error || !data) {
    return null;
  }
  
  return data.raw_profile;
}

/**
 * Delete a Creator DNA profile
 */
export async function deleteCreatorDNAProfile(
  creatorId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase
    .from('creator_dna_profiles')
    .delete()
    .eq('creator_id', creatorId);
  
  if (error) {
    console.error('Failed to delete Creator DNA profile:', error);
    return { success: false, error: error.message };
  }
  
  return { success: true };
}

/**
 * Get all Creator DNA profiles (with pagination)
 */
export async function listCreatorDNAProfiles(
  page: number = 1,
  pageSize: number = 20
): Promise<{
  profiles: CreatorDNAProfile[];
  total: number;
  hasMore: boolean;
}> {
  const supabase = getSupabaseAdmin();
  const offset = (page - 1) * pageSize;
  
  const { data, error, count } = await supabase
    .from('creator_dna_profiles')
    .select('raw_profile', { count: 'exact' })
    .range(offset, offset + pageSize - 1)
    .order('updated_at', { ascending: false }) as { data: { raw_profile: CreatorDNAProfile }[] | null; error: any; count: number | null };
  
  if (error || !data) {
    return { profiles: [], total: 0, hasMore: false };
  }
  
  return {
    profiles: data.map(d => d.raw_profile as CreatorDNAProfile),
    total: count || 0,
    hasMore: (count || 0) > offset + pageSize,
  };
}
