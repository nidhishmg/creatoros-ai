/**
 * LLM Prompt Templates for Creator DNA Analysis
 * 
 * Each attribute has its own focused prompt to ensure:
 * - Better accuracy (smaller, focused tasks)
 * - Easier debugging
 * - Consistent output parsing
 */

/**
 * System prompt establishing the AI's role
 */
export const SYSTEM_PROMPT = `You are an expert content analyst specializing in understanding creator personalities and content styles.
Your analysis must be:
- Objective and based only on the provided content
- Conservative in confidence (don't overstate certainty)
- Consistent in using the exact categories provided

Always respond in valid JSON format only. No explanations outside the JSON.`;

/**
 * Prompt for analyzing primary content tone
 */
export function buildTonePrompt(content: string): string {
  return `Analyze the following creator content and determine their PRIMARY content tone.

CONTENT TO ANALYZE:
"""
${content}
"""

Choose exactly ONE tone from these options:
- casual: Relaxed, conversational, friend-like communication
- professional: Formal, business-like, polished content
- educational: Teaching-focused, informative, tutorial-style
- satirical: Using humor to critique, mock, or comment on topics
- emotional: Heart-centered, personal stories, vulnerability
- political: Focused on political topics, advocacy, social issues
- inspirational: Motivational, uplifting, empowering messages
- entertainment: Pure fun, jokes, memes, viral content

Respond with this exact JSON structure:
{
  "primary_tone": "one of the options above",
  "confidence": 0.0 to 1.0,
  "reasoning": "brief explanation (max 50 words)"
}`;
}

/**
 * Prompt for analyzing humor level and dark humor presence
 */
export function buildHumorPrompt(content: string): string {
  return `Analyze the humor characteristics in this creator's content.

CONTENT TO ANALYZE:
"""
${content}
"""

Evaluate:
1. HUMOR LEVEL: How much humor is present? (0 = no humor, 10 = constant humor)
2. DARK HUMOR: Is there dark humor, morbid jokes, or taboo topic humor present?

Consider:
- Sarcasm and irony count as humor
- Self-deprecating jokes
- Wordplay and puns
- Absurdist content
- Controversial or edgy jokes (dark humor)

Respond with this exact JSON structure:
{
  "humor_level": 0 to 10 (integer),
  "dark_humor_present": true or false,
  "confidence": 0.0 to 1.0,
  "reasoning": "brief explanation (max 50 words)"
}`;
}

/**
 * Prompt for analyzing risk tolerance
 */
export function buildRiskPrompt(content: string, commentsContext: string): string {
  return `Analyze the risk tolerance level of this creator based on their content and audience reactions.

CREATOR'S CONTENT:
"""
${content}
"""

AUDIENCE COMMENTS/REACTIONS:
"""
${commentsContext}
"""

Risk factors to consider:
- Controversial opinions or takes
- Strong language or profanity
- Sensitive topics (politics, religion, social issues)
- Provocative statements
- Brand-unsafe content
- Audience polarization in comments

Risk Tolerance Levels:
- LOW: Safe content, avoids controversy, brand-friendly, mainstream appeal
- MEDIUM: Occasional edge, some opinions, manageable controversy
- HIGH: Frequently controversial, strong opinions, polarizing, edgy content

Respond with this exact JSON structure:
{
  "risk_tolerance": "low" or "medium" or "high",
  "confidence": 0.0 to 1.0,
  "reasoning": "brief explanation (max 50 words)"
}`;
}

/**
 * Prompt for analyzing audience type
 */
export function buildAudiencePrompt(content: string, engagementContext: string): string {
  return `Determine the primary audience type for this creator based on their content style and engagement patterns.

CREATOR'S CONTENT:
"""
${content}
"""

ENGAGEMENT CONTEXT:
${engagementContext}

Audience Type Options:
- mass entertainment: Broad appeal, viral potential, general audience
- niche technical: Specialized knowledge, expert audience, technical depth
- opinion-driven: Commentary, reactions, hot takes, debate-oriented audience
- activist / political: Cause-focused, politically engaged, advocacy audience
- educational / learner-focused: Students, professionals learning, skill-seekers
- lifestyle / aspirational: Aesthetic, lifestyle, aspirational content consumers
- community-focused: Tight-knit following, personal connection, loyal fanbase

Choose the SINGLE most dominant audience type.

Respond with this exact JSON structure:
{
  "audience_type": "one of the options above",
  "confidence": 0.0 to 1.0,
  "reasoning": "brief explanation (max 50 words)"
}`;
}

/**
 * Build engagement context string for audience analysis
 */
export function buildEngagementContext(
  avgLikes: number,
  avgComments: number,
  avgShares: number,
  totalPosts: number
): string {
  const engagementRatio = avgComments / Math.max(avgLikes, 1);
  const shareRatio = avgShares / Math.max(avgLikes, 1);
  
  return `
- Total posts analyzed: ${totalPosts}
- Average likes: ${Math.round(avgLikes)}
- Average comments: ${Math.round(avgComments)}
- Average shares: ${Math.round(avgShares)}
- Comment-to-like ratio: ${(engagementRatio * 100).toFixed(1)}%
- Share-to-like ratio: ${(shareRatio * 100).toFixed(1)}%
`;
}
