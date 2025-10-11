import { NextRequest, NextResponse } from 'next/server';
import { getSessionBookingsApiUrl } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Validate required fields
    const { full_name, email, mobile_no, country_name, preferred_course, year } = formData;
    
    if (!full_name || !email || !mobile_no) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Transform data to match the external API format
    const apiPayload = {
      full_name,
      email,
      mobile_no,
      country_name,
      preferred_course,
      year
    };

    console.log('Form Data:', apiPayload);


    const externalApiUrl = getSessionBookingsApiUrl();

    const response = await fetch(externalApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();

      
      return NextResponse.json(
        { error: 'Failed to submit to external API', details: errorText },
        { status: response.status }
      );
    }

    const responseData = await response.json();


    return NextResponse.json(
      { 
        message: 'Session booking submitted successfully',
        data: responseData 
      },
      { status: 200 }
    );
    
    

  } catch (error) {
        
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Network error - unable to connect to external service' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
