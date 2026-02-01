/**
 * Creator DNA Profile Storage Service
 * 
 * Handles saving and retrieving Creator DNA profiles from Supabase.
 */

import { getSupabaseAdmin } from '@/lib/supabase';
import type { CreatorDNAProfile } from '@/types';

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
      raw_profile: profile, // Store full JSON for future reference
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
    .single();
  
  if (error || !data) {
    return null;
  }
  
  return data.raw_profile as CreatorDNAProfile;
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
    .order('updated_at', { ascending: false });
  
  if (error || !data) {
    return { profiles: [], total: 0, hasMore: false };
  }
  
  return {
    profiles: data.map(d => d.raw_profile as CreatorDNAProfile),
    total: count || 0,
    hasMore: (count || 0) > offset + pageSize,
  };
}
