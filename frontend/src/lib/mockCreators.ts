/**
 * CreatorOS - Mock Creators Dataset
 * 
 * This file contains 20 realistic mock creators for development and demo purposes.
 * Data is India-focused with realistic engagement rates and metrics.
 * 
 * IMPORTANT:
 * - This data will be replaced with real data from API in production
 * - All names and handles are fictional
 * - Metrics are based on industry averages
 */

import type { Creator } from './types';

export const mockCreators: Creator[] = [
  // ===== INDIVIDUAL INFLUENCERS =====
  {
    creator_id: 'cr_001',
    creator_name: 'Priya Sharma',
    account_type: 'individual',
    creator_goals: ['grow_audience', 'monetize_audience', 'brand_collaborations'],
    created_at: '2024-06-15T10:30:00Z',
    updated_at: '2026-01-28T14:00:00Z',
    platforms: {
      instagram: {
        handle: '@priyasharma_lifestyle',
        followers: 524000,
        avg_engagement_rate: 4.2,
        auth_method: 'manual',
        posts: [],
      },
      youtube: {
        channel_url: 'https://youtube.com/@priyasharmalifestyle',
        followers: 380000,
        avg_engagement_rate: 5.1,
        auth_method: 'url',
      },
    },
    posting_behavior: {
      posts_per_week: 5,
      best_posting_time: '7:00 PM IST',
      worst_posting_time: '3:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'motivational',
      secondary_tone: 'casual',
      humor_level: 35,
      edginess_level: 15,
      risk_tolerance: 'low',
      content_categories: ['Lifestyle', 'Fashion', 'Travel'],
      visual_style: 'cinematic',
      confidence_scores: { tone: 0.89, humor: 0.72, risk: 0.91, audience: 0.85 },
    },
    audience_profile: {
      primary_age_group: '25-34',
      primary_gender_split: { male: 25, female: 72, other: 3 },
      top_regions: ['Mumbai', 'Delhi', 'Bangalore', 'Pune'],
      audience_emotions: { humor: 40, anger: 5, support: 75, curiosity: 60 },
    },
    monetization_signals: {
      high_intent_comments: 245,
      dm_purchase_requests: 89,
      past_paid_products: ['E-book: Style Guide', 'Online Course'],
      monetization_readiness_score: 78,
    },
    brand_collab_profile: {
      brand_safety_score: 92,
      past_collab_categories: ['Fashion', 'Beauty', 'Wellness'],
      collab_success_rate: 85,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 8,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 25000,
      past_licenses_sold: 12,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 285000,
      revenue_sources: ['sponsorships', 'ads', 'licensing'],
    },
    ai_memory: {
      last_ai_suggestion: 'Try posting Reels at 7 PM for 20% more reach',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-28T14:00:00Z',
  },

  // ===== BRAND NEW CREATOR (0 followers) =====
  {
    creator_id: 'cr_002',
    creator_name: 'Rahul Verma',
    account_type: 'individual',
    creator_goals: ['understand_content_style', 'grow_audience'],
    created_at: '2026-01-25T09:00:00Z',
    updated_at: '2026-01-30T11:00:00Z',
    platforms: {
      instagram: {
        handle: '@rahulverma_tech',
        followers: 0,
        avg_engagement_rate: 0,
        auth_method: 'credentials',
        login_meta: { email_masked: 'ra****@gmail.com' },
        posts: [],
      },
    },
    posting_behavior: {
      posts_per_week: 0,
      best_posting_time: 'Unknown',
      worst_posting_time: 'Unknown',
    },
    creator_dna: {
      primary_tone: 'educational',
      secondary_tone: 'casual',
      humor_level: 20,
      edginess_level: 10,
      risk_tolerance: 'low',
      content_categories: ['Technology', 'Gadgets'],
      visual_style: 'minimal',
      confidence_scores: { tone: 0.45, humor: 0.30, risk: 0.80, audience: 0.35 },
    },
    audience_profile: {
      primary_age_group: '18-24',
      primary_gender_split: { male: 70, female: 28, other: 2 },
      top_regions: ['Delhi'],
      audience_emotions: { humor: 20, anger: 5, support: 30, curiosity: 80 },
    },
    monetization_signals: {
      high_intent_comments: 0,
      dm_purchase_requests: 0,
      past_paid_products: [],
      monetization_readiness_score: 5,
    },
    brand_collab_profile: {
      brand_safety_score: 85,
      past_collab_categories: [],
      collab_success_rate: 0,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 2,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: false,
      avg_license_price_inr: 0,
      past_licenses_sold: 0,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 0,
      revenue_sources: [],
    },
    ai_memory: {
      last_ai_suggestion: 'Start with 3 posts per week to build consistency',
      suggestion_accepted: false,
      outcome: null,
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-30T11:00:00Z',
  },

  // ===== MEME PAGE =====
  {
    creator_id: 'cr_003',
    creator_name: 'Desi Memes Official',
    account_type: 'community',
    creator_goals: ['grow_audience', 'monetize_audience', 'license_content'],
    created_at: '2023-03-10T15:00:00Z',
    updated_at: '2026-01-29T18:30:00Z',
    platforms: {
      instagram: {
        handle: '@desimemes_official',
        followers: 1250000,
        avg_engagement_rate: 8.5,
        auth_method: 'manual',
        posts: [],
      },
      facebook: {
        handle: 'Desi Memes Official',
        followers: 890000,
        avg_engagement_rate: 6.2,
        auth_method: 'manual',
        posts: [],
      },
      twitter: {
        handle: '@desimemes_in',
        followers: 156000,
        avg_engagement_rate: 3.8,
        auth_method: 'manual',
      },
    },
    posting_behavior: {
      posts_per_week: 21,
      best_posting_time: '9:00 PM IST',
      worst_posting_time: '6:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'dark_humor',
      secondary_tone: 'satire',
      humor_level: 95,
      edginess_level: 75,
      risk_tolerance: 'high',
      content_categories: ['Memes', 'Comedy', 'Pop Culture'],
      visual_style: 'meme',
      confidence_scores: { tone: 0.92, humor: 0.96, risk: 0.88, audience: 0.91 },
    },
    audience_profile: {
      primary_age_group: '18-24',
      primary_gender_split: { male: 68, female: 30, other: 2 },
      top_regions: ['Delhi', 'Mumbai', 'Hyderabad', 'Chennai', 'Kolkata'],
      audience_emotions: { humor: 95, anger: 15, support: 60, curiosity: 40 },
    },
    monetization_signals: {
      high_intent_comments: 890,
      dm_purchase_requests: 45,
      past_paid_products: ['Merchandise'],
      monetization_readiness_score: 72,
    },
    brand_collab_profile: {
      brand_safety_score: 45,
      past_collab_categories: ['Gaming', 'Food & Beverage', 'Entertainment'],
      collab_success_rate: 68,
    },
    risk_analysis: {
      policy_violation_history: 3,
      controversy_score: 72,
      cultural_sensitivity_flags: ['Political satire', 'Religious humor'],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 5000,
      past_licenses_sold: 156,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 420000,
      revenue_sources: ['sponsorships', 'licensing', 'ads'],
    },
    ai_memory: {
      last_ai_suggestion: 'Consider toning down political content for brand safety',
      suggestion_accepted: false,
      outcome: null,
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-29T18:30:00Z',
  },

  // ===== EDUCATIONAL CREATOR =====
  {
    creator_id: 'cr_004',
    creator_name: 'Physics Wallah Junior',
    account_type: 'organization',
    creator_goals: ['grow_audience', 'monetize_audience'],
    created_at: '2022-08-20T12:00:00Z',
    updated_at: '2026-01-30T09:00:00Z',
    platforms: {
      youtube: {
        channel_url: 'https://youtube.com/@physicswallah_jr',
        followers: 2800000,
        avg_engagement_rate: 4.8,
        auth_method: 'url',
      },
      instagram: {
        handle: '@physicswallah_jr',
        followers: 450000,
        avg_engagement_rate: 3.2,
        auth_method: 'manual',
        posts: [],
      },
    },
    posting_behavior: {
      posts_per_week: 7,
      best_posting_time: '5:00 PM IST',
      worst_posting_time: '2:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'educational',
      secondary_tone: 'motivational',
      humor_level: 25,
      edginess_level: 5,
      risk_tolerance: 'low',
      content_categories: ['Education', 'Science', 'Exam Prep'],
      visual_style: 'infographic',
      confidence_scores: { tone: 0.95, humor: 0.55, risk: 0.98, audience: 0.92 },
    },
    audience_profile: {
      primary_age_group: '13-17',
      primary_gender_split: { male: 58, female: 40, other: 2 },
      top_regions: ['Uttar Pradesh', 'Bihar', 'Rajasthan', 'Madhya Pradesh'],
      audience_emotions: { humor: 25, anger: 8, support: 85, curiosity: 92 },
    },
    monetization_signals: {
      high_intent_comments: 3200,
      dm_purchase_requests: 890,
      past_paid_products: ['Online Courses', 'Study Materials', 'Test Series'],
      monetization_readiness_score: 95,
    },
    brand_collab_profile: {
      brand_safety_score: 98,
      past_collab_categories: ['EdTech', 'Stationery', 'Books'],
      collab_success_rate: 92,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 3,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 50000,
      past_licenses_sold: 45,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 1850000,
      revenue_sources: ['subscriptions', 'sponsorships', 'ads'],
    },
    ai_memory: {
      last_ai_suggestion: 'Create short-form content for Instagram Reels',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-30T09:00:00Z',
  },

  // ===== POLITICAL PAGE =====
  {
    creator_id: 'cr_005',
    creator_name: 'Rajneeti Today',
    account_type: 'political',
    creator_goals: ['grow_audience', 'avoid_content_risks'],
    created_at: '2021-04-15T08:00:00Z',
    updated_at: '2026-01-30T20:00:00Z',
    platforms: {
      facebook: {
        handle: 'Rajneeti Today',
        followers: 980000,
        avg_engagement_rate: 7.8,
        auth_method: 'credentials',
        login_meta: { email_masked: 'ad****@rajneetitoday.com' },
        posts: [],
      },
      twitter: {
        handle: '@rajneeti_today',
        followers: 425000,
        avg_engagement_rate: 5.2,
        auth_method: 'manual',
      },
      youtube: {
        channel_url: 'https://youtube.com/@rajneetitoday',
        followers: 320000,
        avg_engagement_rate: 4.5,
        auth_method: 'url',
      },
    },
    posting_behavior: {
      posts_per_week: 28,
      best_posting_time: '8:00 AM IST',
      worst_posting_time: '1:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'political',
      secondary_tone: 'satire',
      humor_level: 40,
      edginess_level: 85,
      risk_tolerance: 'high',
      content_categories: ['Politics', 'News', 'Opinion'],
      visual_style: 'infographic',
      confidence_scores: { tone: 0.91, humor: 0.65, risk: 0.78, audience: 0.88 },
    },
    audience_profile: {
      primary_age_group: '35-44',
      primary_gender_split: { male: 72, female: 26, other: 2 },
      top_regions: ['Delhi', 'Uttar Pradesh', 'Maharashtra', 'Bihar'],
      audience_emotions: { humor: 30, anger: 55, support: 65, curiosity: 70 },
    },
    monetization_signals: {
      high_intent_comments: 156,
      dm_purchase_requests: 12,
      past_paid_products: [],
      monetization_readiness_score: 35,
    },
    brand_collab_profile: {
      brand_safety_score: 25,
      past_collab_categories: ['News Apps'],
      collab_success_rate: 40,
    },
    risk_analysis: {
      policy_violation_history: 8,
      controversy_score: 88,
      cultural_sensitivity_flags: ['Political bias', 'Fact-check required', 'Inflammatory content'],
    },
    licensing_profile: {
      content_licensable: false,
      avg_license_price_inr: 0,
      past_licenses_sold: 0,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 85000,
      revenue_sources: ['ads', 'donations'],
    },
    ai_memory: {
      last_ai_suggestion: 'Add fact-check disclaimers to reduce policy flags',
      suggestion_accepted: false,
      outcome: null,
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-30T20:00:00Z',
  },

  // ===== NGO =====
  {
    creator_id: 'cr_006',
    creator_name: 'Green Earth Foundation',
    account_type: 'ngo',
    creator_goals: ['grow_audience', 'brand_collaborations'],
    created_at: '2020-11-05T10:00:00Z',
    updated_at: '2026-01-28T16:00:00Z',
    platforms: {
      instagram: {
        handle: '@greenearthfoundation_in',
        followers: 89000,
        avg_engagement_rate: 6.5,
        auth_method: 'manual',
        posts: [],
      },
      facebook: {
        handle: 'Green Earth Foundation India',
        followers: 125000,
        avg_engagement_rate: 4.8,
        auth_method: 'manual',
        posts: [],
      },
    },
    posting_behavior: {
      posts_per_week: 4,
      best_posting_time: '10:00 AM IST',
      worst_posting_time: '11:00 PM IST',
    },
    creator_dna: {
      primary_tone: 'emotional',
      secondary_tone: 'educational',
      humor_level: 10,
      edginess_level: 20,
      risk_tolerance: 'low',
      content_categories: ['Environment', 'Social Cause', 'Sustainability'],
      visual_style: 'cinematic',
      confidence_scores: { tone: 0.88, humor: 0.35, risk: 0.92, audience: 0.80 },
    },
    audience_profile: {
      primary_age_group: '25-34',
      primary_gender_split: { male: 45, female: 52, other: 3 },
      top_regions: ['Mumbai', 'Bangalore', 'Chennai', 'Pune'],
      audience_emotions: { humor: 15, anger: 25, support: 90, curiosity: 75 },
    },
    monetization_signals: {
      high_intent_comments: 320,
      dm_purchase_requests: 5,
      past_paid_products: [],
      monetization_readiness_score: 28,
    },
    brand_collab_profile: {
      brand_safety_score: 95,
      past_collab_categories: ['Sustainability', 'CSR'],
      collab_success_rate: 78,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 12,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 8000,
      past_licenses_sold: 8,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 45000,
      revenue_sources: ['donations', 'events'],
    },
    ai_memory: {
      last_ai_suggestion: 'Partner with eco-friendly brands for sponsored content',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-28T16:00:00Z',
  },

  // ===== STARTUP BRAND =====
  {
    creator_id: 'cr_007',
    creator_name: 'Chai Point',
    account_type: 'brand',
    creator_goals: ['grow_audience', 'monetize_audience'],
    created_at: '2019-07-20T14:00:00Z',
    updated_at: '2026-01-29T12:00:00Z',
    platforms: {
      instagram: {
        handle: '@chaipointindia',
        followers: 245000,
        avg_engagement_rate: 3.8,
        auth_method: 'credentials',
        login_meta: { email_masked: 'so****@chaipoint.com' },
        posts: [],
      },
      facebook: {
        handle: 'Chai Point India',
        followers: 180000,
        avg_engagement_rate: 2.5,
        auth_method: 'manual',
        posts: [],
      },
      twitter: {
        handle: '@chaipoint_in',
        followers: 45000,
        avg_engagement_rate: 1.8,
        auth_method: 'manual',
      },
    },
    posting_behavior: {
      posts_per_week: 6,
      best_posting_time: '8:00 AM IST',
      worst_posting_time: '2:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'casual',
      secondary_tone: 'entertainment',
      humor_level: 55,
      edginess_level: 15,
      risk_tolerance: 'low',
      content_categories: ['Food & Beverage', 'Lifestyle', 'Culture'],
      visual_style: 'minimal',
      confidence_scores: { tone: 0.82, humor: 0.70, risk: 0.90, audience: 0.78 },
    },
    audience_profile: {
      primary_age_group: '25-34',
      primary_gender_split: { male: 55, female: 43, other: 2 },
      top_regions: ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad'],
      audience_emotions: { humor: 60, anger: 8, support: 70, curiosity: 55 },
    },
    monetization_signals: {
      high_intent_comments: 890,
      dm_purchase_requests: 234,
      past_paid_products: ['Chai Subscription', 'Merchandise'],
      monetization_readiness_score: 82,
    },
    brand_collab_profile: {
      brand_safety_score: 88,
      past_collab_categories: ['Food', 'Lifestyle'],
      collab_success_rate: 75,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 5,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 15000,
      past_licenses_sold: 22,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 125000,
      revenue_sources: ['sponsorships', 'ads'],
    },
    ai_memory: {
      last_ai_suggestion: 'Create UGC campaign to boost engagement',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-29T12:00:00Z',
  },

  // ===== SPORTS CLUB =====
  {
    creator_id: 'cr_008',
    creator_name: 'Mumbai Cricket Academy',
    account_type: 'club',
    creator_goals: ['grow_audience', 'brand_collaborations'],
    created_at: '2021-01-10T11:00:00Z',
    updated_at: '2026-01-30T15:00:00Z',
    platforms: {
      instagram: {
        handle: '@mumbaicricketacademy',
        followers: 52000,
        avg_engagement_rate: 5.2,
        auth_method: 'manual',
        posts: [],
      },
      youtube: {
        channel_url: 'https://youtube.com/@mumbaicricketacademy',
        followers: 28000,
        avg_engagement_rate: 4.5,
        auth_method: 'url',
      },
    },
    posting_behavior: {
      posts_per_week: 5,
      best_posting_time: '6:00 PM IST',
      worst_posting_time: '4:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'motivational',
      secondary_tone: 'educational',
      humor_level: 30,
      edginess_level: 10,
      risk_tolerance: 'low',
      content_categories: ['Sports', 'Cricket', 'Training'],
      visual_style: 'vlog',
      confidence_scores: { tone: 0.85, humor: 0.50, risk: 0.95, audience: 0.82 },
    },
    audience_profile: {
      primary_age_group: '18-24',
      primary_gender_split: { male: 82, female: 16, other: 2 },
      top_regions: ['Mumbai', 'Pune', 'Thane', 'Nashik'],
      audience_emotions: { humor: 35, anger: 10, support: 85, curiosity: 70 },
    },
    monetization_signals: {
      high_intent_comments: 180,
      dm_purchase_requests: 45,
      past_paid_products: ['Training Programs', 'Cricket Gear'],
      monetization_readiness_score: 58,
    },
    brand_collab_profile: {
      brand_safety_score: 92,
      past_collab_categories: ['Sports Equipment', 'Fitness'],
      collab_success_rate: 70,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 5,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 10000,
      past_licenses_sold: 5,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 75000,
      revenue_sources: ['subscriptions', 'sponsorships'],
    },
    ai_memory: {
      last_ai_suggestion: 'Create tutorial series for better engagement',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-30T15:00:00Z',
  },

  // ===== COMMUNITY PAGE =====
  {
    creator_id: 'cr_009',
    creator_name: 'Bangalore Startups Network',
    account_type: 'community',
    creator_goals: ['grow_audience', 'brand_collaborations', 'license_content'],
    created_at: '2020-05-15T09:00:00Z',
    updated_at: '2026-01-30T10:00:00Z',
    platforms: {
      instagram: {
        handle: '@blrstartups',
        followers: 78000,
        avg_engagement_rate: 4.5,
        auth_method: 'manual',
        posts: [],
      },
      twitter: {
        handle: '@blrstartups',
        followers: 42000,
        avg_engagement_rate: 3.2,
        auth_method: 'credentials',
        login_meta: { email_masked: 'ad****@blrstartups.com' },
      },
      facebook: {
        handle: 'Bangalore Startups Network',
        followers: 35000,
        avg_engagement_rate: 2.8,
        auth_method: 'manual',
        posts: [],
      },
    },
    posting_behavior: {
      posts_per_week: 8,
      best_posting_time: '9:00 AM IST',
      worst_posting_time: '12:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'educational',
      secondary_tone: 'motivational',
      humor_level: 25,
      edginess_level: 20,
      risk_tolerance: 'medium',
      content_categories: ['Startups', 'Business', 'Technology', 'Networking'],
      visual_style: 'minimal',
      confidence_scores: { tone: 0.87, humor: 0.45, risk: 0.85, audience: 0.88 },
    },
    audience_profile: {
      primary_age_group: '25-34',
      primary_gender_split: { male: 68, female: 30, other: 2 },
      top_regions: ['Bangalore', 'Hyderabad', 'Pune', 'Chennai'],
      audience_emotions: { humor: 30, anger: 12, support: 78, curiosity: 85 },
    },
    monetization_signals: {
      high_intent_comments: 245,
      dm_purchase_requests: 32,
      past_paid_products: ['Event Tickets', 'Community Membership'],
      monetization_readiness_score: 62,
    },
    brand_collab_profile: {
      brand_safety_score: 88,
      past_collab_categories: ['SaaS', 'FinTech', 'Co-working'],
      collab_success_rate: 72,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 15,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 12000,
      past_licenses_sold: 18,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 95000,
      revenue_sources: ['sponsorships', 'events', 'subscriptions'],
    },
    ai_memory: {
      last_ai_suggestion: 'Host weekly Twitter Spaces for better engagement',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-30T10:00:00Z',
  },

  // ===== MEDIA ORGANIZATION =====
  {
    creator_id: 'cr_010',
    creator_name: 'The Morning Brief',
    account_type: 'organization',
    creator_goals: ['grow_audience', 'monetize_audience', 'license_content'],
    created_at: '2019-03-20T07:00:00Z',
    updated_at: '2026-01-30T06:00:00Z',
    platforms: {
      instagram: {
        handle: '@themorningbrief_in',
        followers: 580000,
        avg_engagement_rate: 3.2,
        auth_method: 'manual',
        posts: [],
      },
      youtube: {
        channel_url: 'https://youtube.com/@themorningbrief',
        followers: 420000,
        avg_engagement_rate: 4.1,
        auth_method: 'url',
      },
      twitter: {
        handle: '@morningbrief_in',
        followers: 280000,
        avg_engagement_rate: 2.5,
        auth_method: 'manual',
      },
    },
    posting_behavior: {
      posts_per_week: 35,
      best_posting_time: '7:00 AM IST',
      worst_posting_time: '3:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'educational',
      secondary_tone: 'casual',
      humor_level: 20,
      edginess_level: 30,
      risk_tolerance: 'medium',
      content_categories: ['News', 'Business', 'Finance', 'Politics'],
      visual_style: 'infographic',
      confidence_scores: { tone: 0.90, humor: 0.42, risk: 0.82, audience: 0.89 },
    },
    audience_profile: {
      primary_age_group: '25-34',
      primary_gender_split: { male: 62, female: 36, other: 2 },
      top_regions: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
      audience_emotions: { humor: 25, anger: 20, support: 70, curiosity: 88 },
    },
    monetization_signals: {
      high_intent_comments: 520,
      dm_purchase_requests: 85,
      past_paid_products: ['Premium Newsletter', 'Research Reports'],
      monetization_readiness_score: 78,
    },
    brand_collab_profile: {
      brand_safety_score: 75,
      past_collab_categories: ['Finance', 'Insurance', 'EdTech'],
      collab_success_rate: 80,
    },
    risk_analysis: {
      policy_violation_history: 2,
      controversy_score: 35,
      cultural_sensitivity_flags: ['Political content'],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 35000,
      past_licenses_sold: 65,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 450000,
      revenue_sources: ['subscriptions', 'sponsorships', 'ads', 'licensing'],
    },
    ai_memory: {
      last_ai_suggestion: 'Add interactive polls to increase engagement',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-30T06:00:00Z',
  },

  // ===== BLOGGER =====
  {
    creator_id: 'cr_011',
    creator_name: 'Foodie Funda',
    account_type: 'individual',
    creator_goals: ['grow_audience', 'brand_collaborations', 'monetize_audience'],
    created_at: '2022-02-14T12:00:00Z',
    updated_at: '2026-01-29T19:00:00Z',
    platforms: {
      instagram: {
        handle: '@foodiefunda',
        followers: 156000,
        avg_engagement_rate: 5.8,
        auth_method: 'credentials',
        login_meta: { email_masked: 'fo****@gmail.com' },
        posts: [],
      },
      youtube: {
        channel_url: 'https://youtube.com/@foodiefunda',
        followers: 89000,
        avg_engagement_rate: 4.2,
        auth_method: 'url',
      },
    },
    posting_behavior: {
      posts_per_week: 4,
      best_posting_time: '1:00 PM IST',
      worst_posting_time: '4:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'casual',
      secondary_tone: 'entertainment',
      humor_level: 60,
      edginess_level: 15,
      risk_tolerance: 'low',
      content_categories: ['Food', 'Travel', 'Lifestyle'],
      visual_style: 'vlog',
      confidence_scores: { tone: 0.84, humor: 0.75, risk: 0.92, audience: 0.86 },
    },
    audience_profile: {
      primary_age_group: '25-34',
      primary_gender_split: { male: 35, female: 62, other: 3 },
      top_regions: ['Delhi', 'Mumbai', 'Jaipur', 'Lucknow'],
      audience_emotions: { humor: 65, anger: 5, support: 80, curiosity: 75 },
    },
    monetization_signals: {
      high_intent_comments: 380,
      dm_purchase_requests: 45,
      past_paid_products: ['Recipe E-book'],
      monetization_readiness_score: 68,
    },
    brand_collab_profile: {
      brand_safety_score: 92,
      past_collab_categories: ['Food', 'Kitchen Appliances', 'Restaurants'],
      collab_success_rate: 82,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 8,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 18000,
      past_licenses_sold: 14,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 145000,
      revenue_sources: ['sponsorships', 'ads', 'licensing'],
    },
    ai_memory: {
      last_ai_suggestion: 'Create Instagram Reels for trending food items',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-29T19:00:00Z',
  },

  // ===== SMALL CREATOR (2K followers) =====
  {
    creator_id: 'cr_012',
    creator_name: 'Ankit Fitness',
    account_type: 'individual',
    creator_goals: ['understand_content_style', 'grow_audience'],
    created_at: '2025-09-10T08:00:00Z',
    updated_at: '2026-01-28T17:00:00Z',
    platforms: {
      instagram: {
        handle: '@ankitfitness_',
        followers: 2100,
        avg_engagement_rate: 8.5,
        auth_method: 'manual',
        posts: [],
      },
    },
    posting_behavior: {
      posts_per_week: 3,
      best_posting_time: '6:00 AM IST',
      worst_posting_time: '11:00 PM IST',
    },
    creator_dna: {
      primary_tone: 'motivational',
      secondary_tone: 'educational',
      humor_level: 20,
      edginess_level: 25,
      risk_tolerance: 'medium',
      content_categories: ['Fitness', 'Health', 'Motivation'],
      visual_style: 'vlog',
      confidence_scores: { tone: 0.72, humor: 0.40, risk: 0.85, audience: 0.68 },
    },
    audience_profile: {
      primary_age_group: '18-24',
      primary_gender_split: { male: 75, female: 23, other: 2 },
      top_regions: ['Delhi', 'Gurgaon'],
      audience_emotions: { humor: 25, anger: 5, support: 85, curiosity: 60 },
    },
    monetization_signals: {
      high_intent_comments: 25,
      dm_purchase_requests: 8,
      past_paid_products: [],
      monetization_readiness_score: 22,
    },
    brand_collab_profile: {
      brand_safety_score: 88,
      past_collab_categories: [],
      collab_success_rate: 0,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 10,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: false,
      avg_license_price_inr: 0,
      past_licenses_sold: 0,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 0,
      revenue_sources: [],
    },
    ai_memory: {
      last_ai_suggestion: 'Post transformation stories for higher engagement',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-28T17:00:00Z',
  },

  // ===== MICRO INFLUENCER (10K followers) =====
  {
    creator_id: 'cr_013',
    creator_name: 'Tech Talkies',
    account_type: 'individual',
    creator_goals: ['grow_audience', 'brand_collaborations'],
    created_at: '2024-05-20T15:00:00Z',
    updated_at: '2026-01-30T13:00:00Z',
    platforms: {
      youtube: {
        channel_url: 'https://youtube.com/@techtalkies_in',
        followers: 12500,
        avg_engagement_rate: 6.8,
        auth_method: 'url',
      },
      instagram: {
        handle: '@techtalkies_in',
        followers: 8500,
        avg_engagement_rate: 5.2,
        auth_method: 'manual',
        posts: [],
      },
    },
    posting_behavior: {
      posts_per_week: 3,
      best_posting_time: '8:00 PM IST',
      worst_posting_time: '5:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'educational',
      secondary_tone: 'entertainment',
      humor_level: 45,
      edginess_level: 20,
      risk_tolerance: 'low',
      content_categories: ['Technology', 'Gadgets', 'Reviews'],
      visual_style: 'vlog',
      confidence_scores: { tone: 0.82, humor: 0.68, risk: 0.90, audience: 0.78 },
    },
    audience_profile: {
      primary_age_group: '18-24',
      primary_gender_split: { male: 78, female: 20, other: 2 },
      top_regions: ['Bangalore', 'Hyderabad', 'Chennai'],
      audience_emotions: { humor: 50, anger: 8, support: 72, curiosity: 88 },
    },
    monetization_signals: {
      high_intent_comments: 85,
      dm_purchase_requests: 15,
      past_paid_products: [],
      monetization_readiness_score: 42,
    },
    brand_collab_profile: {
      brand_safety_score: 90,
      past_collab_categories: ['Electronics'],
      collab_success_rate: 65,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 12,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 5000,
      past_licenses_sold: 3,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 18000,
      revenue_sources: ['sponsorships', 'ads'],
    },
    ai_memory: {
      last_ai_suggestion: 'Create comparison videos for trending devices',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-30T13:00:00Z',
  },

  // ===== MID-TIER CREATOR (50K followers) =====
  {
    creator_id: 'cr_014',
    creator_name: 'Wanderlust Diaries',
    account_type: 'team',
    creator_goals: ['monetize_audience', 'brand_collaborations', 'license_content'],
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2026-01-29T22:00:00Z',
    platforms: {
      instagram: {
        handle: '@wanderlust_diaries_in',
        followers: 48000,
        avg_engagement_rate: 4.8,
        auth_method: 'manual',
        posts: [],
      },
      youtube: {
        channel_url: 'https://youtube.com/@wanderlustdiaries',
        followers: 52000,
        avg_engagement_rate: 5.5,
        auth_method: 'url',
      },
      facebook: {
        handle: 'Wanderlust Diaries India',
        followers: 25000,
        avg_engagement_rate: 2.8,
        auth_method: 'manual',
        posts: [],
      },
    },
    posting_behavior: {
      posts_per_week: 4,
      best_posting_time: '7:00 PM IST',
      worst_posting_time: '3:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'casual',
      secondary_tone: 'motivational',
      humor_level: 40,
      edginess_level: 15,
      risk_tolerance: 'low',
      content_categories: ['Travel', 'Photography', 'Lifestyle'],
      visual_style: 'cinematic',
      confidence_scores: { tone: 0.86, humor: 0.62, risk: 0.92, audience: 0.84 },
    },
    audience_profile: {
      primary_age_group: '25-34',
      primary_gender_split: { male: 42, female: 55, other: 3 },
      top_regions: ['Mumbai', 'Delhi', 'Bangalore', 'Goa'],
      audience_emotions: { humor: 45, anger: 5, support: 82, curiosity: 78 },
    },
    monetization_signals: {
      high_intent_comments: 320,
      dm_purchase_requests: 65,
      past_paid_products: ['Travel Presets', 'Photography Course'],
      monetization_readiness_score: 72,
    },
    brand_collab_profile: {
      brand_safety_score: 94,
      past_collab_categories: ['Travel', 'Hotels', 'Airlines', 'Camera Gear'],
      collab_success_rate: 85,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 5,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 22000,
      past_licenses_sold: 28,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 185000,
      revenue_sources: ['sponsorships', 'licensing', 'ads'],
    },
    ai_memory: {
      last_ai_suggestion: 'Create destination guides as downloadable content',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-29T22:00:00Z',
  },

  // ===== FACEBOOK-ONLY PAGE =====
  {
    creator_id: 'cr_015',
    creator_name: 'Desi Recipes Hub',
    account_type: 'community',
    creator_goals: ['grow_audience', 'monetize_audience'],
    created_at: '2018-11-25T14:00:00Z',
    updated_at: '2026-01-30T08:00:00Z',
    platforms: {
      facebook: {
        handle: 'Desi Recipes Hub',
        followers: 520000,
        avg_engagement_rate: 4.2,
        auth_method: 'credentials',
        login_meta: { email_masked: 'de****@recipeshub.com' },
        posts: [],
      },
    },
    posting_behavior: {
      posts_per_week: 10,
      best_posting_time: '12:00 PM IST',
      worst_posting_time: '2:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'casual',
      secondary_tone: 'educational',
      humor_level: 35,
      edginess_level: 5,
      risk_tolerance: 'low',
      content_categories: ['Food', 'Recipes', 'Culture'],
      visual_style: 'vlog',
      confidence_scores: { tone: 0.88, humor: 0.55, risk: 0.95, audience: 0.90 },
    },
    audience_profile: {
      primary_age_group: '35-44',
      primary_gender_split: { male: 25, female: 72, other: 3 },
      top_regions: ['Delhi', 'Mumbai', 'Lucknow', 'Ahmedabad', 'Jaipur'],
      audience_emotions: { humor: 40, anger: 5, support: 88, curiosity: 70 },
    },
    monetization_signals: {
      high_intent_comments: 680,
      dm_purchase_requests: 125,
      past_paid_products: ['Recipe Book'],
      monetization_readiness_score: 65,
    },
    brand_collab_profile: {
      brand_safety_score: 96,
      past_collab_categories: ['Kitchen Appliances', 'Food Brands', 'FMCG'],
      collab_success_rate: 88,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 3,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 8000,
      past_licenses_sold: 42,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 220000,
      revenue_sources: ['sponsorships', 'licensing', 'ads'],
    },
    ai_memory: {
      last_ai_suggestion: 'Expand to Instagram for younger audience',
      suggestion_accepted: false,
      outcome: null,
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-30T08:00:00Z',
  },

  // ===== INSTAGRAM-ONLY CREATOR =====
  {
    creator_id: 'cr_016',
    creator_name: 'Street Style Mumbai',
    account_type: 'individual',
    creator_goals: ['grow_audience', 'brand_collaborations'],
    created_at: '2023-06-10T16:00:00Z',
    updated_at: '2026-01-30T14:00:00Z',
    platforms: {
      instagram: {
        handle: '@streetstyle_mumbai',
        followers: 95000,
        avg_engagement_rate: 6.2,
        auth_method: 'manual',
        posts: [],
      },
    },
    posting_behavior: {
      posts_per_week: 6,
      best_posting_time: '6:00 PM IST',
      worst_posting_time: '5:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'casual',
      secondary_tone: 'entertainment',
      humor_level: 50,
      edginess_level: 25,
      risk_tolerance: 'medium',
      content_categories: ['Fashion', 'Street Photography', 'Mumbai'],
      visual_style: 'minimal',
      confidence_scores: { tone: 0.80, humor: 0.65, risk: 0.85, audience: 0.82 },
    },
    audience_profile: {
      primary_age_group: '18-24',
      primary_gender_split: { male: 45, female: 52, other: 3 },
      top_regions: ['Mumbai', 'Pune', 'Thane'],
      audience_emotions: { humor: 55, anger: 8, support: 75, curiosity: 68 },
    },
    monetization_signals: {
      high_intent_comments: 145,
      dm_purchase_requests: 28,
      past_paid_products: ['Lightroom Presets'],
      monetization_readiness_score: 52,
    },
    brand_collab_profile: {
      brand_safety_score: 85,
      past_collab_categories: ['Fashion', 'Footwear'],
      collab_success_rate: 70,
    },
    risk_analysis: {
      policy_violation_history: 1,
      controversy_score: 22,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 12000,
      past_licenses_sold: 8,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 65000,
      revenue_sources: ['sponsorships', 'licensing'],
    },
    ai_memory: {
      last_ai_suggestion: 'Collaborate with local fashion brands',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-30T14:00:00Z',
  },

  // ===== TEAM ACCOUNT =====
  {
    creator_id: 'cr_017',
    creator_name: 'Code Warriors',
    account_type: 'team',
    creator_goals: ['grow_audience', 'monetize_audience', 'brand_collaborations'],
    created_at: '2022-09-01T11:00:00Z',
    updated_at: '2026-01-29T16:00:00Z',
    platforms: {
      youtube: {
        channel_url: 'https://youtube.com/@codewarriors_in',
        followers: 185000,
        avg_engagement_rate: 5.8,
        auth_method: 'url',
      },
      instagram: {
        handle: '@codewarriors_in',
        followers: 65000,
        avg_engagement_rate: 4.5,
        auth_method: 'manual',
        posts: [],
      },
      twitter: {
        handle: '@codewarriors_in',
        followers: 28000,
        avg_engagement_rate: 2.8,
        auth_method: 'manual',
      },
    },
    posting_behavior: {
      posts_per_week: 5,
      best_posting_time: '9:00 PM IST',
      worst_posting_time: '6:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'educational',
      secondary_tone: 'entertainment',
      humor_level: 55,
      edginess_level: 15,
      risk_tolerance: 'low',
      content_categories: ['Programming', 'Technology', 'Career'],
      visual_style: 'infographic',
      confidence_scores: { tone: 0.90, humor: 0.72, risk: 0.94, audience: 0.88 },
    },
    audience_profile: {
      primary_age_group: '18-24',
      primary_gender_split: { male: 75, female: 23, other: 2 },
      top_regions: ['Bangalore', 'Hyderabad', 'Pune', 'Chennai'],
      audience_emotions: { humor: 50, anger: 5, support: 82, curiosity: 90 },
    },
    monetization_signals: {
      high_intent_comments: 520,
      dm_purchase_requests: 145,
      past_paid_products: ['Coding Bootcamp', 'Interview Prep Course'],
      monetization_readiness_score: 82,
    },
    brand_collab_profile: {
      brand_safety_score: 95,
      past_collab_categories: ['EdTech', 'Cloud Services', 'Developer Tools'],
      collab_success_rate: 88,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 5,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 20000,
      past_licenses_sold: 35,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 320000,
      revenue_sources: ['subscriptions', 'sponsorships', 'ads', 'licensing'],
    },
    ai_memory: {
      last_ai_suggestion: 'Create DSA series for placement season',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-29T16:00:00Z',
  },

  // ===== HIGH RISK SATIRE PAGE =====
  {
    creator_id: 'cr_018',
    creator_name: 'Sarcasm Society',
    account_type: 'community',
    creator_goals: ['grow_audience', 'avoid_content_risks', 'license_content'],
    created_at: '2020-07-15T13:00:00Z',
    updated_at: '2026-01-30T21:00:00Z',
    platforms: {
      instagram: {
        handle: '@sarcasm_society_in',
        followers: 890000,
        avg_engagement_rate: 7.2,
        auth_method: 'manual',
        posts: [],
      },
      twitter: {
        handle: '@sarcasm_soc_in',
        followers: 320000,
        avg_engagement_rate: 4.5,
        auth_method: 'credentials',
        login_meta: { email_masked: 'sa****@sarcsoc.com' },
      },
      facebook: {
        handle: 'Sarcasm Society India',
        followers: 450000,
        avg_engagement_rate: 5.8,
        auth_method: 'manual',
        posts: [],
      },
    },
    posting_behavior: {
      posts_per_week: 18,
      best_posting_time: '10:00 PM IST',
      worst_posting_time: '7:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'satire',
      secondary_tone: 'dark_humor',
      humor_level: 92,
      edginess_level: 78,
      risk_tolerance: 'high',
      content_categories: ['Memes', 'Social Commentary', 'Pop Culture'],
      visual_style: 'meme',
      confidence_scores: { tone: 0.94, humor: 0.96, risk: 0.72, audience: 0.90 },
    },
    audience_profile: {
      primary_age_group: '18-24',
      primary_gender_split: { male: 65, female: 33, other: 2 },
      top_regions: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai'],
      audience_emotions: { humor: 95, anger: 20, support: 55, curiosity: 45 },
    },
    monetization_signals: {
      high_intent_comments: 420,
      dm_purchase_requests: 35,
      past_paid_products: ['Merchandise'],
      monetization_readiness_score: 58,
    },
    brand_collab_profile: {
      brand_safety_score: 35,
      past_collab_categories: ['Gaming', 'Streaming Platforms'],
      collab_success_rate: 55,
    },
    risk_analysis: {
      policy_violation_history: 6,
      controversy_score: 82,
      cultural_sensitivity_flags: ['Political satire', 'Religious references', 'Adult humor'],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 3000,
      past_licenses_sold: 85,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 180000,
      revenue_sources: ['ads', 'licensing'],
    },
    ai_memory: {
      last_ai_suggestion: 'Create separate handles for different content types',
      suggestion_accepted: false,
      outcome: null,
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-30T21:00:00Z',
  },

  // ===== LARGE INFLUENCER (500K+) =====
  {
    creator_id: 'cr_019',
    creator_name: 'Kritika Khurana',
    account_type: 'individual',
    creator_goals: ['all_of_above'],
    created_at: '2018-05-10T10:00:00Z',
    updated_at: '2026-01-30T12:00:00Z',
    platforms: {
      instagram: {
        handle: '@kritikakhurana',
        followers: 580000,
        avg_engagement_rate: 4.8,
        auth_method: 'credentials',
        login_meta: { email_masked: 'kr****@gmail.com' },
        posts: [],
      },
      youtube: {
        channel_url: 'https://youtube.com/@kritikakhurana',
        followers: 420000,
        avg_engagement_rate: 5.2,
        auth_method: 'url',
      },
      twitter: {
        handle: '@kritikakhurana_',
        followers: 125000,
        avg_engagement_rate: 2.5,
        auth_method: 'manual',
      },
    },
    posting_behavior: {
      posts_per_week: 5,
      best_posting_time: '7:00 PM IST',
      worst_posting_time: '4:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'casual',
      secondary_tone: 'motivational',
      humor_level: 45,
      edginess_level: 20,
      risk_tolerance: 'low',
      content_categories: ['Fashion', 'Beauty', 'Lifestyle', 'Travel'],
      visual_style: 'cinematic',
      confidence_scores: { tone: 0.88, humor: 0.70, risk: 0.92, audience: 0.90 },
    },
    audience_profile: {
      primary_age_group: '25-34',
      primary_gender_split: { male: 22, female: 75, other: 3 },
      top_regions: ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Pune'],
      audience_emotions: { humor: 50, anger: 5, support: 85, curiosity: 65 },
    },
    monetization_signals: {
      high_intent_comments: 1250,
      dm_purchase_requests: 380,
      past_paid_products: ['Fashion Collection', 'Online Course', 'Presets'],
      monetization_readiness_score: 92,
    },
    brand_collab_profile: {
      brand_safety_score: 94,
      past_collab_categories: ['Fashion', 'Beauty', 'Jewelry', 'Travel', 'Lifestyle'],
      collab_success_rate: 90,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 8,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 45000,
      past_licenses_sold: 52,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 850000,
      revenue_sources: ['sponsorships', 'licensing', 'ads', 'subscriptions'],
    },
    ai_memory: {
      last_ai_suggestion: 'Launch your own fashion brand',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-30T12:00:00Z',
  },

  // ===== MEGA INFLUENCER (1M+) =====
  {
    creator_id: 'cr_020',
    creator_name: 'Technical Guruji',
    account_type: 'individual',
    creator_goals: ['all_of_above'],
    created_at: '2017-01-15T09:00:00Z',
    updated_at: '2026-01-30T18:00:00Z',
    platforms: {
      youtube: {
        channel_url: 'https://youtube.com/@technicalguruji',
        followers: 23500000,
        avg_engagement_rate: 3.2,
        auth_method: 'url',
      },
      instagram: {
        handle: '@technicalguruji',
        followers: 1850000,
        avg_engagement_rate: 2.8,
        auth_method: 'manual',
        posts: [],
      },
      twitter: {
        handle: '@technicalguruji',
        followers: 980000,
        avg_engagement_rate: 1.5,
        auth_method: 'manual',
      },
      facebook: {
        handle: 'Technical Guruji',
        followers: 2400000,
        avg_engagement_rate: 2.2,
        auth_method: 'manual',
        posts: [],
      },
    },
    posting_behavior: {
      posts_per_week: 14,
      best_posting_time: '5:00 PM IST',
      worst_posting_time: '3:00 AM IST',
    },
    creator_dna: {
      primary_tone: 'educational',
      secondary_tone: 'entertainment',
      humor_level: 35,
      edginess_level: 10,
      risk_tolerance: 'low',
      content_categories: ['Technology', 'Gadgets', 'Reviews', 'Unboxing'],
      visual_style: 'vlog',
      confidence_scores: { tone: 0.95, humor: 0.60, risk: 0.96, audience: 0.94 },
    },
    audience_profile: {
      primary_age_group: '18-24',
      primary_gender_split: { male: 82, female: 16, other: 2 },
      top_regions: ['India - All States', 'Nepal', 'Bangladesh', 'UAE'],
      audience_emotions: { humor: 40, anger: 8, support: 88, curiosity: 92 },
    },
    monetization_signals: {
      high_intent_comments: 8500,
      dm_purchase_requests: 2200,
      past_paid_products: ['Tech Merchandise', 'Online Courses'],
      monetization_readiness_score: 98,
    },
    brand_collab_profile: {
      brand_safety_score: 96,
      past_collab_categories: ['Smartphones', 'Electronics', 'E-commerce', 'Telecom'],
      collab_success_rate: 95,
    },
    risk_analysis: {
      policy_violation_history: 0,
      controversy_score: 5,
      cultural_sensitivity_flags: [],
    },
    licensing_profile: {
      content_licensable: true,
      avg_license_price_inr: 150000,
      past_licenses_sold: 125,
    },
    revenue_metrics: {
      monthly_avg_revenue_inr: 8500000,
      revenue_sources: ['sponsorships', 'ads', 'licensing', 'events'],
    },
    ai_memory: {
      last_ai_suggestion: 'Launch exclusive content platform',
      suggestion_accepted: true,
      outcome: 'improved',
    },
    ai_analysis_status: 'complete',
    last_analyzed_at: '2026-01-30T18:00:00Z',
  },
];

/**
 * Get a single mock creator by ID
 */
export function getMockCreatorById(id: string): Creator | undefined {
  return mockCreators.find(c => c.creator_id === id);
}

/**
 * Get the current/active mock creator
 * In production, this would come from authenticated user session
 */
export function getCurrentMockCreator(): Creator {
  // Default to first creator for demo purposes
  return mockCreators[0];
}

/**
 * Get mock creators filtered by account type
 */
export function getMockCreatorsByType(type: string): Creator[] {
  return mockCreators.filter(c => c.account_type === type);
}

/**
 * Get mock creators filtered by follower range
 */
export function getMockCreatorsByFollowers(min: number, max: number): Creator[] {
  return mockCreators.filter(c => {
    const totalFollowers = Object.values(c.platforms).reduce((sum, p) => {
      if (p && 'followers' in p) {
        return sum + (p.followers || 0);
      }
      return sum;
    }, 0);
    return totalFollowers >= min && totalFollowers <= max;
  });
}
