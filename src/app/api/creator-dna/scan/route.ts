/**
 * Creator DNA Scanner API Route
 * 
 * POST /api/creator-dna/scan
 * 
 * Analyzes creator content and returns a DNA profile.
 */

import { NextRequest, NextResponse } from 'next/server';
import { analyzeCreatorDNA } from '@/services/creator-dna';
import { validateCreatorData } from '@/types/schemas';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate input
    const validation = validateCreatorData(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request body',
            details: validation.error.errors,
          },
        },
        { status: 400 }
      );
    }
    
    // Run the analysis
    const result = await analyzeCreatorDNA(validation.data);
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      // Determine appropriate status code based on error
      const statusCode = result.error.code === 'INSUFFICIENT_DATA' ? 400 : 500;
      return NextResponse.json(result, { status: statusCode });
    }
    
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
        },
      },
      { status: 500 }
    );
  }
}

// Method not allowed for other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}
