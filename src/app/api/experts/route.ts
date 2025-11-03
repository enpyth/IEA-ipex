import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get sub_id from query parameters (can be comma-separated string or multiple params)
    const subIdParam = searchParams.get('sub_id');
    const subIds = subIdParam 
      ? subIdParam.split(',').map(id => id.trim()).filter(Boolean)
      : [];

    // Get select fields (defaults to 'orcid' if not specified)
    const selectParam = searchParams.get('select') || 'orcid';
    const selectFields = selectParam.split(',').map(field => field.trim()).filter(Boolean);

    // Validate sub_id is provided
    if (subIds.length === 0) {
      return NextResponse.json(
        { error: 'sub_id parameter is required (comma-separated values)' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createServerSupabaseClient();

    // Build the query
    let query = supabase
      .from('academic_with_tags')
      .select(selectFields.join(','))
      .in('sub_id', subIds);

    // Execute the query
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching experts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch experts from database', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    console.error('Unexpected error in experts API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
