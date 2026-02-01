/**
 * OpenAI Client Configuration
 */

import OpenAI from 'openai';

// Singleton OpenAI client
let openaiClient: OpenAI | null = null;

/**
 * Get or create the OpenAI client instance
 */
export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    
    openaiClient = new OpenAI({
      apiKey,
    });
  }
  
  return openaiClient;
}

/**
 * Default model configuration
 */
export const DEFAULT_MODEL = 'gpt-4-turbo-preview';

/**
 * Model configuration for different use cases
 */
export const MODEL_CONFIG = {
  // High accuracy analysis
  analysis: {
    model: DEFAULT_MODEL,
    temperature: 0.3, // Lower temperature for more consistent outputs
    max_tokens: 500,
  },
  // Quick classification tasks
  classification: {
    model: 'gpt-3.5-turbo',
    temperature: 0.2,
    max_tokens: 300,
  },
} as const;
