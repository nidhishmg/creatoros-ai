/**
 * Creator DNA Scanner Service
 * 
 * Main entry point for analyzing creator content and generating DNA profiles.
 * 
 * Usage:
 *   import { analyzeCreatorDNA } from '@/services/creator-dna';
 *   const result = await analyzeCreatorDNA(creatorData);
 */

import { aggregateContent } from './aggregator';
import { 
  analyzeTone, 
  analyzeHumor, 
  analyzeRisk, 
  analyzeAudience 
} from './analyzers';
import { validateCreatorData } from '@/types/schemas';
import type { 
  CreatorData, 
  CreatorDNAProfile, 
  ScannerResult,
  ScannerConfig 
} from '@/types';

/**
 * Default scanner configuration
 */
const DEFAULT_CONFIG: ScannerConfig = {
  min_posts_for_high_confidence: 20,
  default_confidence_penalty: 0.3,
  openai_model: 'gpt-4-turbo-preview',
  max_content_length: 12000,
};

/**
 * Analyze creator content and generate a DNA profile
 * 
 * @param creatorData - The creator's content data
 * @param config - Optional scanner configuration
 * @returns ScannerResult with either the profile or an error
 * 
 * @example
 * const result = await analyzeCreatorDNA({
 *   creator_id: 'creator123',
 *   posts: [
 *     {
 *       content: 'My post caption...',
 *       post_type: 'reel',
 *       engagement: { likes: 1000, comments: 50, shares: 20 },
 *       comments_sample: ['Great video!', 'Love this!'],
 *       posted_at: '2025-01-15T10:00:00Z'
 *     }
 *   ]
 * });
 * 
 * if (result.success) {
 *   console.log(result.profile.creator_dna);
 * }
 */
export async function analyzeCreatorDNA(
  creatorData: CreatorData,
  config: Partial<ScannerConfig> = {}
): Promise<ScannerResult> {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  
  // Step 1: Validate input data
  const validation = validateCreatorData(creatorData);
  if (!validation.success) {
    return {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input data',
        details: validation.error.errors,
      },
    };
  }
  
  // Step 2: Check for sufficient data
  if (creatorData.posts.length === 0) {
    return {
      success: false,
      error: {
        code: 'INSUFFICIENT_DATA',
        message: 'No posts provided for analysis',
      },
    };
  }
  
  try {
    // Step 3: Aggregate content
    const aggregated = aggregateContent(creatorData);
    
    // Step 4: Run all attribute analyses in parallel
    const [toneResult, humorResult, riskResult, audienceResult] = await Promise.all([
      analyzeTone(aggregated),
      analyzeHumor(aggregated),
      analyzeRisk(aggregated),
      analyzeAudience(aggregated),
    ]);
    
    // Step 5: Construct the DNA profile
    const profile: CreatorDNAProfile = {
      creator_id: creatorData.creator_id,
      generated_at: new Date().toISOString(),
      creator_dna: {
        primary_tone: toneResult.value,
        humor_level: humorResult.value.level,
        dark_humor_present: humorResult.value.dark_humor,
        risk_tolerance: riskResult.value,
        audience_type: audienceResult.value,
        confidence: {
          tone: toneResult.confidence,
          humor: humorResult.confidence,
          risk: riskResult.confidence,
          audience: audienceResult.confidence,
        },
      },
    };
    
    return {
      success: true,
      profile,
    };
    
  } catch (error) {
    console.error('Creator DNA Scanner error:', error);
    
    return {
      success: false,
      error: {
        code: 'LLM_ERROR',
        message: 'Failed to analyze creator content',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

/**
 * Get scanner configuration
 */
export function getScannerConfig(): ScannerConfig {
  return { ...DEFAULT_CONFIG };
}

// Re-export types for convenience
export type { 
  CreatorData, 
  CreatorDNAProfile, 
  ScannerResult,
  ScannerConfig 
} from '@/types';
