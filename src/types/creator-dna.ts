/**
 * Creator DNA Scanner - Type Definitions
 * 
 * These types define the input/output contracts for the Creator DNA Scanner feature.
 * All types are strict and validated at runtime using Zod schemas.
 */

// ============================================================================
// INPUT TYPES
// ============================================================================

/**
 * Engagement metrics for a single post
 */
export interface PostEngagement {
  likes: number;
  comments: number;
  shares: number;
}

/**
 * Supported post types
 */
export type PostType = 'reel' | 'image' | 'video' | 'text';

/**
 * A single creator post with engagement data
 */
export interface CreatorPost {
  content: string;
  post_type: PostType;
  engagement: PostEngagement;
  comments_sample: string[];
  posted_at: string; // ISO timestamp
}

/**
 * Input data for the Creator DNA Scanner
 */
export interface CreatorData {
  creator_id: string;
  posts: CreatorPost[];
}

// ============================================================================
// OUTPUT TYPES
// ============================================================================

/**
 * Primary content tone categories
 */
export type ContentTone = 
  | 'casual'
  | 'professional'
  | 'educational'
  | 'satirical'
  | 'emotional'
  | 'political'
  | 'inspirational'
  | 'entertainment';

/**
 * Risk tolerance levels
 */
export type RiskTolerance = 'low' | 'medium' | 'high';

/**
 * Audience type categories
 */
export type AudienceType =
  | 'mass entertainment'
  | 'niche technical'
  | 'opinion-driven'
  | 'activist / political'
  | 'educational / learner-focused'
  | 'lifestyle / aspirational'
  | 'community-focused';

/**
 * Confidence scores for each DNA attribute
 */
export interface ConfidenceScores {
  tone: number;      // 0-1
  humor: number;     // 0-1
  risk: number;      // 0-1
  audience: number;  // 0-1
}

/**
 * The Creator DNA Profile - core output structure
 */
export interface CreatorDNA {
  primary_tone: ContentTone;
  humor_level: number;           // 0-10 scale
  dark_humor_present: boolean;
  risk_tolerance: RiskTolerance;
  audience_type: AudienceType;
  confidence: ConfidenceScores;
}

/**
 * Complete Creator DNA Profile with metadata
 */
export interface CreatorDNAProfile {
  creator_id: string;
  generated_at: string;  // ISO timestamp
  creator_dna: CreatorDNA;
}

// ============================================================================
// INTERNAL TYPES (Used by the scanner service)
// ============================================================================

/**
 * Aggregated content for analysis
 */
export interface AggregatedContent {
  all_captions: string[];
  all_comments: string[];
  combined_text: string;
  total_posts: number;
  avg_engagement: PostEngagement;
  post_type_distribution: Record<PostType, number>;
}

/**
 * LLM analysis result for a single attribute
 */
export interface AttributeAnalysis<T> {
  value: T;
  confidence: number;
  reasoning: string;
}

/**
 * Raw LLM response structure (before normalization)
 */
export interface LLMAnalysisResponse {
  tone?: AttributeAnalysis<string>;
  humor?: AttributeAnalysis<{ level: number; dark_humor: boolean }>;
  risk?: AttributeAnalysis<string>;
  audience?: AttributeAnalysis<string>;
}

/**
 * Scanner configuration options
 */
export interface ScannerConfig {
  min_posts_for_high_confidence: number;
  default_confidence_penalty: number;
  openai_model: string;
  max_content_length: number;
}

/**
 * Error types for the scanner
 */
export type ScannerErrorCode = 
  | 'INSUFFICIENT_DATA'
  | 'LLM_ERROR'
  | 'VALIDATION_ERROR'
  | 'TIMEOUT';

export interface ScannerError {
  code: ScannerErrorCode;
  message: string;
  details?: unknown;
}

/**
 * Scanner result - either success or error
 */
export type ScannerResult = 
  | { success: true; profile: CreatorDNAProfile }
  | { success: false; error: ScannerError };
