import { NextRequest, NextResponse } from 'next/server';
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
      fullName: sanitizeInput(formData.fullName || ''),
      email: sanitizeInput(formData.email || ''),
      mobile: sanitizeInput(formData.mobile || ''),
      country: sanitizeInput(formData.country || ''),
      course: sanitizeInput(formData.course || ''),
      year: sanitizeInput(formData.year || '')
    };

    // Check required fields after sanitization
    if (!sanitizedData.fullName || !sanitizedData.email || !sanitizedData.mobile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you can add your backend logic:
    // 1. Save to database (MongoDB, PostgreSQL, etc.)
    // 2. Send email notification
    // 3. Integrate with CRM system
    // 4. Send to external API
    
    // Use secure logging instead of console.log
    secureLog('New contact form submission', {
      hasData: !!sanitizedData.fullName,
      country: sanitizedData.country,
      submittedAt: new Date().toISOString()
    });

    // Example: Save to database (uncomment and modify as needed)
    /*
    const db = await connectToDatabase();
    await db.collection('contacts').insertOne({
      ...formData,
      submittedAt: new Date(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    });
    */

    // Example: Send email notification (uncomment and modify as needed)
    /*
    await sendEmail({
      to: 'admin@yourcompany.com',
      subject: 'New Contact Form Submission',
      body: `New consultation request from ${fullName} for ${country}`
    });
    */

    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    secureLog('Contact form error', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 'error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
