/**
 * Content Aggregator
 * 
 * Responsible for combining and normalizing creator content
 * before sending to LLM for analysis.
 */

import type { 
  CreatorData, 
  CreatorPost, 
  AggregatedContent,
  PostType,
  PostEngagement 
} from '@/types';

/**
 * Maximum content length to send to LLM (tokens are roughly 4 chars)
 */
const MAX_CONTENT_LENGTH = 12000; // ~3000 tokens

/**
 * Aggregate all creator content into a single analysis-ready structure
 */
export function aggregateContent(creatorData: CreatorData): AggregatedContent {
  const { posts } = creatorData;
  
  // Extract all captions
  const allCaptions = posts
    .map(p => p.content)
    .filter(c => c && c.trim().length > 0);
  
  // Extract all comments
  const allComments = posts
    .flatMap(p => p.comments_sample)
    .filter(c => c && c.trim().length > 0);
  
  // Calculate average engagement
  const avgEngagement = calculateAverageEngagement(posts);
  
  // Calculate post type distribution
  const postTypeDistribution = calculatePostTypeDistribution(posts);
  
  // Combine and normalize text
  const combinedText = buildCombinedText(allCaptions, MAX_CONTENT_LENGTH);
  
  return {
    all_captions: allCaptions,
    all_comments: allComments,
    combined_text: combinedText,
    total_posts: posts.length,
    avg_engagement: avgEngagement,
    post_type_distribution: postTypeDistribution,
  };
}

/**
 * Calculate average engagement metrics across all posts
 */
function calculateAverageEngagement(posts: CreatorPost[]): PostEngagement {
  if (posts.length === 0) {
    return { likes: 0, comments: 0, shares: 0 };
  }
  
  const totals = posts.reduce(
    (acc, post) => ({
      likes: acc.likes + post.engagement.likes,
      comments: acc.comments + post.engagement.comments,
      shares: acc.shares + post.engagement.shares,
    }),
    { likes: 0, comments: 0, shares: 0 }
  );
  
  return {
    likes: totals.likes / posts.length,
    comments: totals.comments / posts.length,
    shares: totals.shares / posts.length,
  };
}

/**
 * Calculate distribution of post types
 */
function calculatePostTypeDistribution(posts: CreatorPost[]): Record<PostType, number> {
  const distribution: Record<PostType, number> = {
    reel: 0,
    image: 0,
    video: 0,
    text: 0,
  };
  
  for (const post of posts) {
    distribution[post.post_type]++;
  }
  
  return distribution;
}

/**
 * Build combined text from captions, truncating if necessary
 */
function buildCombinedText(captions: string[], maxLength: number): string {
  // Sort by length (prefer longer, more detailed captions)
  const sortedCaptions = [...captions].sort((a, b) => b.length - a.length);
  
  let combinedText = '';
  let captionIndex = 0;
  
  while (captionIndex < sortedCaptions.length && combinedText.length < maxLength) {
    const caption = sortedCaptions[captionIndex];
    const normalizedCaption = normalizeText(caption);
    
    if (combinedText.length + normalizedCaption.length + 10 <= maxLength) {
      combinedText += `[Post ${captionIndex + 1}]: ${normalizedCaption}\n\n`;
    }
    
    captionIndex++;
  }
  
  return combinedText.trim();
}

/**
 * Normalize text for analysis
 * - Remove excessive whitespace
 * - Remove URLs
 * - Remove excessive emojis (keep some for tone analysis)
 * - Normalize line breaks
 */
function normalizeText(text: string): string {
  return text
    // Remove URLs
    .replace(/https?:\/\/[^\s]+/g, '[LINK]')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    // Limit consecutive emojis
    .replace(/([\uD800-\uDBFF][\uDC00-\uDFFF])\1{2,}/g, '$1$1')
    // Trim
    .trim();
}

/**
 * Build comments context string for risk analysis
 */
export function buildCommentsContext(comments: string[], maxLength: number = 2000): string {
  if (comments.length === 0) {
    return 'No comments available for analysis.';
  }
  
  // Take a diverse sample of comments
  const sampleSize = Math.min(20, comments.length);
  const sample = sampleComments(comments, sampleSize);
  
  let context = '';
  for (const comment of sample) {
    const normalized = normalizeText(comment);
    if (context.length + normalized.length + 5 <= maxLength) {
      context += `- ${normalized}\n`;
    }
  }
  
  return context.trim() || 'No meaningful comments available.';
}

/**
 * Sample comments to get a representative set
 * Takes from beginning, middle, and end to get variety
 */
function sampleComments(comments: string[], sampleSize: number): string[] {
  if (comments.length <= sampleSize) {
    return comments;
  }
  
  const sample: string[] = [];
  const step = Math.floor(comments.length / sampleSize);
  
  for (let i = 0; i < sampleSize; i++) {
    const index = Math.min(i * step, comments.length - 1);
    sample.push(comments[index]);
  }
  
  return sample;
}
