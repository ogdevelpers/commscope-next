export const runtime = 'edge';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server'; 
 
// Define the expected structure of the request body
interface UserRegistrationData {
  willAttend: string;
  firstName: string;
  lastName: string;
  // fullName: string;
  email: string;
  phone?: string;
  // city: string;
  // photoConsent?: string; 
  // dietaryRestrictions : any;
  // country: string;
  company?: string;
  jobTitle?: string;
  // nationality?: string;
  // passportUrl?: string;
  // Add other fields as needed based on your form
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: UserRegistrationData = await request.json();

    // Validate required fields
    if (!body.willAttend || !body.firstName|| !body.lastName|| !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields: willAttend, firstName, lastName, and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('commscope_users_dinner_2025')
      .select('id, email')
      .eq('email', body.email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected
      console.log('Error checking existing user:', checkError);
      return NextResponse.json(
        { error: 'Database error while checking user' },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Prepare user data for insertion
    const userData = {
      willAttend: body.willAttend,
      firstName: body.firstName,
      lastName: body.lastName,
      // fullName: body.fullName, 
      email: body.email,
      phone: body.phone || null,
      // city: body.city || null, 
      // country: body.country || null,
      // dietaryRestrictions: body.dietaryRestrictions || null, 
      company: body.company || null,
      // nationality: body.nationality || null,
      // passportUrl: body.passportUrl || null,
      // photoConsent: body.photoConsent || null,
      jobTitle: body.jobTitle || null, 
      created_at: new Date().toISOString(),  
    };

    console.log({userData, body})

    // Insert user into commscope_users table
    const { data: insertedUser, error: insertError } = await supabase
      .from('commscope_users_dinner_2025')
      .insert([userData])
      .select()
      .single();

    if (insertError) {
      console.log({insertError})
      console.error('Error inserting user:', insertError);
      
      // Handle specific database errors
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to register user' },
        { status: 500 }
      );
    }

    // Return success response with user data (excluding sensitive info)
    return NextResponse.json({
      success: true,
      data: {
        message: 'Successfully registered user',
        user: {
          id: insertedUser.id,
          willAttend: insertedUser.willAttend,
          firstName: insertedUser.first_name,
          lastName: insertedUser.last_name,
          // fullName: insertedUser.fullName,
          email: insertedUser.email,
          company: insertedUser.company,
          jobTitle: insertedUser.jobTitle,
          createdAt: insertedUser.created_at
        }
      }
    });

  } catch (error) {
    console.error('API error:', error);
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to retrieve users (if needed)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let query = supabase
      .from('commscope_users_dinner_2025')
      .select('id, willAttend, firstName, lastName, email, company, position, created_at');

    // Filter by email if provided
    if (email) {
      query = query.eq('email', email);
    }

    // Add pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    // Order by creation date (newest first)
    query = query.order('created_at', { ascending: false });

    const { data: users, error, count } = await query;

    if (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}