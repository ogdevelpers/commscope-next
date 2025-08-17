export const runtime = 'edge';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server'; 
 
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
 

    return NextResponse.json({ success:true, data:"Successfully registered user" });

    return NextResponse.json({ error: 'No action specified' }, { status: 400 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}