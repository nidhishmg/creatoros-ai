/**
 * Zod Validation Schemas for Creator DNA Scanner
 * 
 * Runtime validation to ensure data integrity
 */

import { z } from 'zod';

// ============================================================================
// INPUT VALIDATION SCHEMAS
// ============================================================================

export const PostEngagementSchema = z.object({
  likes: z.number().int().min(0),
  comments: z.number().int().min(0),
  shares: z.number().int().min(0),
});

export const PostTypeSchema = z.enum(['reel', 'image', 'video', 'text']);

export const CreatorPostSchema = z.object({
  content: z.string().min(1),
  post_type: PostTypeSchema,
  engagement: PostEngagementSchema,
  comments_sample: z.array(z.string()),
  posted_at: z.string().datetime(),
});

export const CreatorDataSchema = z.object({
  creator_id: z.string().min(1),
  posts: z.array(CreatorPostSchema).min(1, 'At least one post is required'),
});

// ============================================================================
// OUTPUT VALIDATION SCHEMAS
// ============================================================================

export const ContentToneSchema = z.enum([
  'casual',
  'professional',
  'educational',
  'satirical',
  'emotional',
  'political',
  'inspirational',
  'entertainment',
]);

export const RiskToleranceSchema = z.enum(['low', 'medium', 'high']);

export const AudienceTypeSchema = z.enum([
  'mass entertainment',
  'niche technical',
  'opinion-driven',
  'activist / political',
  'educational / learner-focused',
  'lifestyle / aspirational',
  'community-focused',
]);

export const ConfidenceScoresSchema = z.object({
  tone: z.number().min(0).max(1),
  humor: z.number().min(0).max(1),
  risk: z.number().min(0).max(1),
  audience: z.number().min(0).max(1),
});

export const CreatorDNASchema = z.object({
  primary_tone: ContentToneSchema,
  humor_level: z.number().int().min(0).max(10),
  dark_humor_present: z.boolean(),
  risk_tolerance: RiskToleranceSchema,
  audience_type: AudienceTypeSchema,
  confidence: ConfidenceScoresSchema,
});

export const CreatorDNAProfileSchema = z.object({
  creator_id: z.string().min(1),
  generated_at: z.string().datetime(),
  creator_dna: CreatorDNASchema,
});

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate creator input data
 */
export function validateCreatorData(data: unknown) {
  return CreatorDataSchema.safeParse(data);
}

/**
 * Validate creator DNA profile output
 */
export function validateCreatorDNAProfile(profile: unknown) {
  return CreatorDNAProfileSchema.safeParse(profile);
}
