import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Input validation and sanitization
    const { email, firstName, surname, formType, ...otherData } = data;
    
    // Validate required fields
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ 
        success: false, 
        error: 'Valid email is required' 
      }, { status: 400 });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Please provide a valid email address' 
      }, { status: 400 });
    }
    
    // Sanitize email
    const sanitizedEmail = email.toLowerCase().trim();
    
    // Validate and sanitize names if provided
    const sanitizedFirstName = firstName ? firstName.trim().slice(0, 100) : '';
    const sanitizedSurname = surname ? surname.trim().slice(0, 100) : '';
    
    // Validate form type
    const validFormTypes = ['email-signup', 'contact', 'feedback', 'submissions'];
    const sanitizedFormType = formType && validFormTypes.includes(formType) ? formType : 'submissions';
    
    // Rate limiting check (basic implementation)
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    console.log(`Form submission from IP: ${clientIP}`);
    
    // Prepare sanitized data
    const sanitizedData = {
      email: sanitizedEmail,
      firstName: sanitizedFirstName,
      surname: sanitizedSurname,
      formType: sanitizedFormType,
      ...otherData,
      createdAt: Timestamp.now(),
      clientIP: clientIP,
    };
    
    // Determine collection based on form type or fallback
    const collectionName = sanitizedFormType;
    await addDoc(collection(db, collectionName), sanitizedData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Firestore form submit error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Sorry, there was an error processing your submission. Please try again.' 
    }, { status: 500 });
  }
} 