import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Validate required fields
    const { fullName, email, mobile, country, course, year } = formData;
    
    if (!fullName || !email || !mobile) {
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

    // Here you can add your backend logic:
    // 1. Save to database (MongoDB, PostgreSQL, etc.)
    // 2. Send email notification
    // 3. Integrate with CRM system
    // 4. Send to external API
    
    // Example: Log the data (replace with your actual storage logic)
    console.log('New contact form submission:', {
      ...formData,
      submittedAt: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
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
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
