/**
 * LLM Response Parsers
 * 
 * Safely parse and validate LLM responses.
 * Handle malformed JSON, missing fields, and out-of-range values.
 */

import type { 
  ContentTone, 
  RiskTolerance, 
  AudienceType,
  AttributeAnalysis 
} from '@/types';

// Valid values for enums
const VALID_TONES: ContentTone[] = [
  'casual', 'professional', 'educational', 'satirical',
  'emotional', 'political', 'inspirational', 'entertainment'
];

const VALID_RISK_LEVELS: RiskTolerance[] = ['low', 'medium', 'high'];

const VALID_AUDIENCE_TYPES: AudienceType[] = [
  'mass entertainment', 'niche technical', 'opinion-driven',
  'activist / political', 'educational / learner-focused',
  'lifestyle / aspirational', 'community-focused'
];

/**
 * Safely parse JSON from LLM response
 */
function safeParseJSON(text: string): unknown | null {
  try {
    // Try to extract JSON from the response (LLM might add extra text)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Clamp a number between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Parse tone analysis response
 */
export function parseToneResponse(
  response: string
): AttributeAnalysis<ContentTone> | null {
  const parsed = safeParseJSON(response);
  
  if (!parsed || typeof parsed !== 'object') {
    return null;
  }
  
  const data = parsed as Record<string, unknown>;
  
  // Validate tone
  let tone = String(data.primary_tone || '').toLowerCase() as ContentTone;
  if (!VALID_TONES.includes(tone)) {
    // Try to find closest match
    tone = findClosestTone(String(data.primary_tone || ''));
  }
  
  // Validate confidence
  const confidence = clamp(
    typeof data.confidence === 'number' ? data.confidence : 0.5,
    0,
    1
  );
  
  return {
    value: tone,
    confidence,
    reasoning: String(data.reasoning || 'No reasoning provided'),
  };
}

/**
 * Parse humor analysis response
 */
export function parseHumorResponse(
  response: string
): AttributeAnalysis<{ level: number; dark_humor: boolean }> | null {
  const parsed = safeParseJSON(response);
  
  if (!parsed || typeof parsed !== 'object') {
    return null;
  }
  
  const data = parsed as Record<string, unknown>;
  
  // Validate humor level (0-10)
  const level = clamp(
    Math.round(typeof data.humor_level === 'number' ? data.humor_level : 0),
    0,
    10
  );
  
  // Validate dark humor flag
  const darkHumor = Boolean(data.dark_humor_present);
  
  // Validate confidence
  const confidence = clamp(
    typeof data.confidence === 'number' ? data.confidence : 0.5,
    0,
    1
  );
  
  return {
    value: { level, dark_humor: darkHumor },
    confidence,
    reasoning: String(data.reasoning || 'No reasoning provided'),
  };
}

/**
 * Parse risk tolerance response
 */
export function parseRiskResponse(
  response: string
): AttributeAnalysis<RiskTolerance> | null {
  const parsed = safeParseJSON(response);
  
  if (!parsed || typeof parsed !== 'object') {
    return null;
  }
  
  const data = parsed as Record<string, unknown>;
  
  // Validate risk level
  let risk = String(data.risk_tolerance || '').toLowerCase() as RiskTolerance;
  if (!VALID_RISK_LEVELS.includes(risk)) {
    risk = 'medium'; // Default to medium if unclear
  }
  
  // Validate confidence
  const confidence = clamp(
    typeof data.confidence === 'number' ? data.confidence : 0.5,
    0,
    1
  );
  
  return {
    value: risk,
    confidence,
    reasoning: String(data.reasoning || 'No reasoning provided'),
  };
}

/**
 * Parse audience type response
 */
export function parseAudienceResponse(
  response: string
): AttributeAnalysis<AudienceType> | null {
  const parsed = safeParseJSON(response);
  
  if (!parsed || typeof parsed !== 'object') {
    return null;
  }
  
  const data = parsed as Record<string, unknown>;
  
  // Validate audience type
  let audience = String(data.audience_type || '').toLowerCase() as AudienceType;
  if (!VALID_AUDIENCE_TYPES.includes(audience)) {
    // Try to find closest match
    audience = findClosestAudienceType(String(data.audience_type || ''));
  }
  
  // Validate confidence
  const confidence = clamp(
    typeof data.confidence === 'number' ? data.confidence : 0.5,
    0,
    1
  );
  
  return {
    value: audience,
    confidence,
    reasoning: String(data.reasoning || 'No reasoning provided'),
  };
}

/**
 * Find closest matching tone using simple keyword matching
 */
function findClosestTone(input: string): ContentTone {
  const lower = input.toLowerCase();
  
  const keywords: Record<ContentTone, string[]> = {
    casual: ['casual', 'relaxed', 'friendly', 'informal', 'chill'],
    professional: ['professional', 'formal', 'business', 'corporate'],
    educational: ['educational', 'teaching', 'tutorial', 'informative', 'learning'],
    satirical: ['satirical', 'satire', 'parody', 'mock'],
    emotional: ['emotional', 'personal', 'vulnerable', 'heartfelt'],
    political: ['political', 'politics', 'advocacy', 'activist'],
    inspirational: ['inspirational', 'motivational', 'uplifting', 'empowering'],
    entertainment: ['entertainment', 'fun', 'viral', 'meme', 'comedy'],
  };
  
  for (const [tone, words] of Object.entries(keywords)) {
    if (words.some(word => lower.includes(word))) {
      return tone as ContentTone;
    }
  }
  
  return 'casual'; // Default fallback
}

/**
 * Find closest matching audience type
 */
function findClosestAudienceType(input: string): AudienceType {
  const lower = input.toLowerCase();
  
  const keywords: Record<AudienceType, string[]> = {
    'mass entertainment': ['mass', 'entertainment', 'general', 'broad', 'viral'],
    'niche technical': ['niche', 'technical', 'expert', 'specialized', 'tech'],
    'opinion-driven': ['opinion', 'commentary', 'reaction', 'debate'],
    'activist / political': ['activist', 'political', 'cause', 'advocacy'],
    'educational / learner-focused': ['educational', 'learner', 'student', 'learning'],
    'lifestyle / aspirational': ['lifestyle', 'aspirational', 'aesthetic'],
    'community-focused': ['community', 'loyal', 'fanbase', 'tight-knit'],
  };
  
  for (const [audience, words] of Object.entries(keywords)) {
    if (words.some(word => lower.includes(word))) {
      return audience as AudienceType;
    }
  }
  
  return 'mass entertainment'; // Default fallback
}
