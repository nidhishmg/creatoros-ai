/**
 * Attribute Analyzers
 * 
 * Individual analyzers for each Creator DNA attribute.
 * Each analyzer makes a focused LLM call and returns a normalized result.
 */

import { getOpenAIClient, MODEL_CONFIG } from '@/lib/openai';
import {
  SYSTEM_PROMPT,
  buildTonePrompt,
  buildHumorPrompt,
  buildRiskPrompt,
  buildAudiencePrompt,
  buildEngagementContext,
} from '@/lib/prompts';
import {
  parseToneResponse,
  parseHumorResponse,
  parseRiskResponse,
  parseAudienceResponse,
} from './parsers';
import type {
  AggregatedContent,
  ContentTone,
  RiskTolerance,
  AudienceType,
  AttributeAnalysis,
} from '@/types';

/**
 * Make an LLM API call with the given prompt
 */
async function callLLM(userPrompt: string): Promise<string> {
  const openai = getOpenAIClient();
  
  const response = await openai.chat.completions.create({
    model: MODEL_CONFIG.analysis.model,
    temperature: MODEL_CONFIG.analysis.temperature,
    max_tokens: MODEL_CONFIG.analysis.max_tokens,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  });
  
  return response.choices[0]?.message?.content || '';
}

/**
 * Analyze primary content tone
 */
export async function analyzeTone(
  content: AggregatedContent
): Promise<AttributeAnalysis<ContentTone>> {
  const prompt = buildTonePrompt(content.combined_text);
  
  try {
    const response = await callLLM(prompt);
    const parsed = parseToneResponse(response);
    
    if (parsed) {
      // Apply confidence penalty for low post count
      const adjustedConfidence = applyDataConfidencePenalty(
        parsed.confidence,
        content.total_posts
      );
      
      return {
        ...parsed,
        confidence: adjustedConfidence,
      };
    }
  } catch (error) {
    console.error('Tone analysis error:', error);
  }
  
  // Fallback with low confidence
  return {
    value: 'casual',
    confidence: 0.3,
    reasoning: 'Unable to determine tone, defaulting to casual',
  };
}

/**
 * Analyze humor level and dark humor presence
 */
export async function analyzeHumor(
  content: AggregatedContent
): Promise<AttributeAnalysis<{ level: number; dark_humor: boolean }>> {
  const prompt = buildHumorPrompt(content.combined_text);
  
  try {
    const response = await callLLM(prompt);
    const parsed = parseHumorResponse(response);
    
    if (parsed) {
      const adjustedConfidence = applyDataConfidencePenalty(
        parsed.confidence,
        content.total_posts
      );
      
      return {
        ...parsed,
        confidence: adjustedConfidence,
      };
    }
  } catch (error) {
    console.error('Humor analysis error:', error);
  }
  
  // Fallback with low confidence
  return {
    value: { level: 3, dark_humor: false },
    confidence: 0.3,
    reasoning: 'Unable to determine humor level, defaulting to moderate',
  };
}

/**
 * Analyze risk tolerance
 */
export async function analyzeRisk(
  content: AggregatedContent
): Promise<AttributeAnalysis<RiskTolerance>> {
  const commentsContext = content.all_comments.slice(0, 30).join('\n');
  const prompt = buildRiskPrompt(content.combined_text, commentsContext);
  
  try {
    const response = await callLLM(prompt);
    const parsed = parseRiskResponse(response);
    
    if (parsed) {
      const adjustedConfidence = applyDataConfidencePenalty(
        parsed.confidence,
        content.total_posts
      );
      
      return {
        ...parsed,
        confidence: adjustedConfidence,
      };
    }
  } catch (error) {
    console.error('Risk analysis error:', error);
  }
  
  // Fallback with low confidence (conservative = low risk)
  return {
    value: 'medium',
    confidence: 0.3,
    reasoning: 'Unable to determine risk tolerance, defaulting to medium',
  };
}

/**
 * Analyze audience type
 */
export async function analyzeAudience(
  content: AggregatedContent
): Promise<AttributeAnalysis<AudienceType>> {
  const engagementContext = buildEngagementContext(
    content.avg_engagement.likes,
    content.avg_engagement.comments,
    content.avg_engagement.shares,
    content.total_posts
  );
  
  const prompt = buildAudiencePrompt(content.combined_text, engagementContext);
  
  try {
    const response = await callLLM(prompt);
    const parsed = parseAudienceResponse(response);
    
    if (parsed) {
      const adjustedConfidence = applyDataConfidencePenalty(
        parsed.confidence,
        content.total_posts
      );
      
      return {
        ...parsed,
        confidence: adjustedConfidence,
      };
    }
  } catch (error) {
    console.error('Audience analysis error:', error);
  }
  
  // Fallback with low confidence
  return {
    value: 'mass entertainment',
    confidence: 0.3,
    reasoning: 'Unable to determine audience type, defaulting to mass entertainment',
  };
}

/**
 * Apply confidence penalty based on amount of data available
 * More posts = higher confidence ceiling
 */
function applyDataConfidencePenalty(
  baseConfidence: number,
  postCount: number
): number {
  // Thresholds for confidence scaling
  const MIN_POSTS_FOR_FULL_CONFIDENCE = 20;
  const MIN_POSTS_FOR_MEDIUM_CONFIDENCE = 5;
  
  let multiplier = 1.0;
  
  if (postCount < MIN_POSTS_FOR_MEDIUM_CONFIDENCE) {
    // Very low data - cap confidence at 0.5
    multiplier = 0.5;
  } else if (postCount < MIN_POSTS_FOR_FULL_CONFIDENCE) {
    // Medium data - scale linearly
    multiplier = 0.5 + (0.5 * (postCount - MIN_POSTS_FOR_MEDIUM_CONFIDENCE) / 
      (MIN_POSTS_FOR_FULL_CONFIDENCE - MIN_POSTS_FOR_MEDIUM_CONFIDENCE));
  }
  
  return Math.round(baseConfidence * multiplier * 100) / 100;
}
