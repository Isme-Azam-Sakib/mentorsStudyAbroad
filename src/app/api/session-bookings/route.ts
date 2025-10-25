import { NextRequest, NextResponse } from 'next/server';
import { getSessionBookingsApiUrl } from '@/lib/config';
import { validateFormData, sanitizeInput, secureLog } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Validate and sanitize all input data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    // Sanitize all inputs
    const sanitizedData = {
      full_name: sanitizeInput(formData.full_name || ''),
      email: sanitizeInput(formData.email || ''),
      mobile_no: sanitizeInput(formData.mobile_no || ''),
      country_name: sanitizeInput(formData.country_name || ''),
      preferred_course: sanitizeInput(formData.preferred_course || ''),
      year: sanitizeInput(formData.year || '')
    };

    // Check required fields after sanitization
    if (!sanitizedData.full_name || !sanitizedData.email || !sanitizedData.mobile_no) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Transform data to match the external API format
    const apiPayload = {
      full_name: sanitizedData.full_name,
      email: sanitizedData.email,
      mobile_no: sanitizedData.mobile_no,
      country_name: sanitizedData.country_name,
      preferred_course: sanitizedData.preferred_course,
      year: sanitizedData.year
    };

    // Use secure logging instead of console.log
    secureLog('Session booking request received', { 
      hasData: !!apiPayload.full_name,
      country: apiPayload.country_name 
    });


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
      
      // Log error securely without exposing sensitive details
      secureLog('External API error', { 
        status: response.status,
        hasErrorText: !!errorText 
      }, 'error');
      
      return NextResponse.json(
        { error: 'Failed to submit to external API' },
        { status: response.status }
      );
    }

    const responseData = await response.json();

    // Log success securely
    secureLog('Session booking submitted successfully', { 
      success: true 
    });

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
