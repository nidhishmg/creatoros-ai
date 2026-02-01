/**
 * CreatorOS - Unified Creator Data Types
 * This is the SINGLE SOURCE OF TRUTH for all creator data
 * 
 * IMPORTANT NOTES:
 * - All screens read from this schema
 * - Only onboarding writes to this schema
 * - Credentials are NEVER stored in raw form
 * - auth_method indicates how data was collected
 */

// Account types supported by CreatorOS
export type AccountType = 
  | 'individual'
  | 'team'
  | 'organization'
  | 'club'
  | 'brand'
  | 'community'
  | 'ngo'
  | 'political';

// Auth methods for platform data collection
export type PlatformAuthMethod = 'credentials' | 'manual' | 'url';

// Creator goals/intents
export type CreatorGoal =
  | 'understand_content_style'
  | 'grow_audience'
  | 'monetize_audience'
  | 'brand_collaborations'
  | 'avoid_content_risks'
  | 'license_content'
  | 'all_of_above';

// Primary tone types for Creator DNA
export type PrimaryTone =
  | 'dark_humor'
  | 'satire'
  | 'educational'
  | 'emotional'
  | 'motivational'
  | 'political'
  | 'entertainment'
  | 'casual';

// Visual style types
export type VisualStyle = 'minimal' | 'meme' | 'cinematic' | 'vlog' | 'infographic';

// Risk tolerance levels
export type RiskTolerance = 'low' | 'medium' | 'high';

// Age groups for audience
export type AgeGroup = '13-17' | '18-24' | '25-34' | '35-44' | '45+';

// Platform-specific data structures
export interface PlatformLoginMeta {
  /**
   * Masked email for display purposes only
   * Example: "ni****@gmail.com"
   * NEVER store raw credentials
   */
  email_masked: string;
}

export interface InstagramPlatform {
  handle: string;
  followers: number;
  avg_engagement_rate: number;
  auth_method: 'credentials' | 'manual';
  login_meta?: PlatformLoginMeta;
  posts: string[]; // Post URLs or IDs for analysis
}

export interface FacebookPlatform {
  handle: string;
  followers: number;
  avg_engagement_rate: number;
  auth_method: 'credentials' | 'manual';
  login_meta?: PlatformLoginMeta;
  posts: string[];
}

export interface YouTubePlatform {
  channel_url?: string;
  followers: number;
  avg_engagement_rate: number;
  auth_method: 'url' | 'manual';
}

export interface TwitterPlatform {
  handle: string;
  followers: number;
  avg_engagement_rate: number;
  auth_method: 'credentials' | 'manual';
  login_meta?: PlatformLoginMeta;
}

export interface CreatorPlatforms {
  instagram?: InstagramPlatform;
  facebook?: FacebookPlatform;
  youtube?: YouTubePlatform;
  twitter?: TwitterPlatform;
}

// Posting behavior analysis
export interface PostingBehavior {
  posts_per_week: number;
  best_posting_time: string;
  worst_posting_time: string;
}

// Creator DNA - AI-analyzed creative identity
export interface CreatorDNAProfile {
  primary_tone: PrimaryTone;
  secondary_tone?: string;
  humor_level: number; // 0-100
  edginess_level: number; // 0-100
  risk_tolerance: RiskTolerance;
  content_categories: string[];
  visual_style: VisualStyle;
  confidence_scores: {
    tone: number;
    humor: number;
    risk: number;
    audience: number;
  };
}

// Audience profile data
export interface AudienceProfile {
  primary_age_group: AgeGroup;
  primary_gender_split: {
    male: number;
    female: number;
    other: number;
  };
  top_regions: string[];
  audience_emotions: {
    humor: number; // 0-100
    anger: number;
    support: number;
    curiosity: number;
  };
}

// Monetization signals from audience
export interface MonetizationSignals {
  high_intent_comments: number;
  dm_purchase_requests: number;
  past_paid_products: string[];
  monetization_readiness_score: number; // 0-100
}

// Brand collaboration profile
export interface BrandCollabProfile {
  brand_safety_score: number; // 0-100
  past_collab_categories: string[];
  collab_success_rate: number; // 0-100
}

// Risk analysis data
export interface RiskAnalysis {
  policy_violation_history: number;
  controversy_score: number; // 0-100
  cultural_sensitivity_flags: string[];
}

// Licensing profile
export interface LicensingProfile {
  content_licensable: boolean;
  avg_license_price_inr: number;
  past_licenses_sold: number;
}

// Revenue metrics
export interface RevenueMetrics {
  monthly_avg_revenue_inr: number;
  revenue_sources: ('subscriptions' | 'donations' | 'events' | 'licensing' | 'sponsorships' | 'ads')[];
}

// AI Memory - tracks suggestions and outcomes
export interface AIMemory {
  last_ai_suggestion: string;
  suggestion_accepted: boolean;
  outcome: 'improved' | 'neutral' | 'worsened' | null;
  suggestion_history?: {
    suggestion: string;
    accepted: boolean;
    outcome: 'improved' | 'neutral' | 'worsened' | null;
    date: string;
  }[];
}

/**
 * UNIFIED CREATOR SCHEMA
 * This is the single source of truth for all creator data
 */
export interface Creator {
  // Core identity
  creator_id: string;
  creator_name: string;
  account_type: AccountType;
  creator_goals: CreatorGoal[];
  created_at: string;
  updated_at: string;

  // Platform data
  platforms: CreatorPlatforms;

  // Behavioral data
  posting_behavior: PostingBehavior;

  // AI-analyzed profiles
  creator_dna: CreatorDNAProfile;
  audience_profile: AudienceProfile;

  // Business intelligence
  monetization_signals: MonetizationSignals;
  brand_collab_profile: BrandCollabProfile;
  risk_analysis: RiskAnalysis;
  licensing_profile: LicensingProfile;
  revenue_metrics: RevenueMetrics;

  // AI interaction history
  ai_memory: AIMemory;

  // Analysis status
  ai_analysis_status: 'pending' | 'analyzing' | 'complete' | 'error';
  last_analyzed_at?: string;
}

/**
 * Onboarding form data - collected during onboarding flow
 */
export interface OnboardingFormData {
  // Step 1: Identity
  creator_name: string;
  account_type: AccountType;

  // Step 2: Platforms (each can be skipped)
  platforms: {
    instagram?: {
      skipped: boolean;
      auth_method?: 'credentials' | 'manual';
      // Credentials (DEMO ONLY - not persisted)
      email?: string;
      password?: string;
      // Manual entry
      handle?: string;
      followers?: number;
      engagement_rate?: number;
    };
    facebook?: {
      skipped: boolean;
      auth_method?: 'credentials' | 'manual';
      email?: string;
      password?: string;
      handle?: string;
      followers?: number;
      engagement_rate?: number;
    };
    youtube?: {
      skipped: boolean;
      auth_method?: 'url' | 'manual';
      channel_url?: string;
      followers?: number;
      engagement_rate?: number;
    };
    twitter?: {
      skipped: boolean;
      auth_method?: 'credentials' | 'manual';
      email?: string;
      password?: string;
      handle?: string;
      followers?: number;
      engagement_rate?: number;
    };
  };

  // Step 3: Intent
  creator_goals: CreatorGoal[];
}

/**
 * Helper function to mask email for storage
 * NEVER store raw emails - only masked versions
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '****@****.com';
  const [localPart, domain] = email.split('@');
  const maskedLocal = localPart.length > 2 
    ? localPart.slice(0, 2) + '****' 
    : '****';
  return `${maskedLocal}@${domain}`;
}

/**
 * Convert onboarding form data to Creator schema
 * This transforms user input into the unified schema
 */
export function onboardingToCreator(formData: OnboardingFormData): Partial<Creator> {
  const platforms: CreatorPlatforms = {};

  // Process Instagram
  if (formData.platforms.instagram && !formData.platforms.instagram.skipped) {
    const ig = formData.platforms.instagram;
    platforms.instagram = {
      handle: ig.handle || '',
      followers: ig.followers || 0,
      avg_engagement_rate: ig.engagement_rate || 0,
      auth_method: ig.auth_method || 'manual',
      login_meta: ig.auth_method === 'credentials' && ig.email 
        ? { email_masked: maskEmail(ig.email) } 
        : undefined,
      posts: [],
    };
  }

  // Process Facebook
  if (formData.platforms.facebook && !formData.platforms.facebook.skipped) {
    const fb = formData.platforms.facebook;
    platforms.facebook = {
      handle: fb.handle || '',
      followers: fb.followers || 0,
      avg_engagement_rate: fb.engagement_rate || 0,
      auth_method: fb.auth_method || 'manual',
      login_meta: fb.auth_method === 'credentials' && fb.email 
        ? { email_masked: maskEmail(fb.email) } 
        : undefined,
      posts: [],
    };
  }

  // Process YouTube
  if (formData.platforms.youtube && !formData.platforms.youtube.skipped) {
    const yt = formData.platforms.youtube;
    platforms.youtube = {
      channel_url: yt.channel_url,
      followers: yt.followers || 0,
      avg_engagement_rate: yt.engagement_rate || 0,
      auth_method: yt.auth_method || 'manual',
    };
  }

  // Process Twitter
  if (formData.platforms.twitter && !formData.platforms.twitter.skipped) {
    const tw = formData.platforms.twitter;
    platforms.twitter = {
      handle: tw.handle || '',
      followers: tw.followers || 0,
      avg_engagement_rate: tw.engagement_rate || 0,
      auth_method: tw.auth_method || 'manual',
      login_meta: tw.auth_method === 'credentials' && tw.email 
        ? { email_masked: maskEmail(tw.email) } 
        : undefined,
    };
  }

  return {
    creator_name: formData.creator_name,
    account_type: formData.account_type,
    creator_goals: formData.creator_goals,
    platforms,
    ai_analysis_status: 'pending',
  };
}

// Goal labels for UI display
export const GOAL_LABELS: Record<CreatorGoal, string> = {
  understand_content_style: 'Understand my content style',
  grow_audience: 'Grow audience',
  monetize_audience: 'Monetize my audience',
  brand_collaborations: 'Get brand collaborations',
  avoid_content_risks: 'Avoid content risks',
  license_content: 'License my content',
  all_of_above: 'All of the above',
};

// Account type labels for UI display
export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  individual: 'Individual Creator',
  team: 'Team',
  organization: 'Organization',
  club: 'Club',
  brand: 'Brand',
  community: 'Community',
  ngo: 'NGO',
  political: 'Political',
};
