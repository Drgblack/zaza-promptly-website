import { NextRequest, NextResponse } from 'next/server';
import { BrevoDirectAPI } from '@/lib/brevo-direct';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ 
        success: false, 
        error: 'Name, email, and message are required' 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Please provide a valid email address' 
      }, { status: 400 });
    }

    // Rate limiting check
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    // Split name into first and last name for Brevo
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Add contact to Brevo with contact form tag
    try {
      await BrevoDirectAPI.addContact({
        email: email.toLowerCase().trim(),
        firstName,
        lastName,
        attributes: {
          SOURCE: 'contact_form',
          LEAD_SOURCE: 'contact_page',
          CONTACT_MESSAGE: message.substring(0, 500), // Limit message length
          CONTACT_DATE: new Date().toISOString(),
          CLIENT_IP: clientIP
        }
      });
    } catch (brevoError) {
      console.error('Brevo contact creation failed:', brevoError);
      // Continue even if Brevo fails - we'll still send the notification
    }

    // Send email notification to support team
    const notificationSent = await sendNotificationEmail({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      message: message.trim(),
      clientIP
    });

    if (!notificationSent) {
      console.error('Failed to send notification email');
      // Still return success to user - the form submission was recorded
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Thanks! We\'ll be in touch soon.' 
    });

  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Oops! Something went wrong. Please try again.' 
    }, { status: 500 });
  }
}

// Send notification email using Brevo transactional email
async function sendNotificationEmail(data: {
  name: string;
  email: string;
  message: string;
  clientIP: string;
}): Promise<boolean> {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('BREVO_API_KEY not configured for notifications');
      return false;
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: 'Zaza Promptly Contact Form',
          email: 'noreply@zazapromptly.com'
        },
        to: [
          {
            email: 'support@zazatechnologies.com',
            name: 'Zaza Support Team'
          }
        ],
        subject: `New Contact Form Submission from ${data.name}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7c3aed;">New Contact Form Submission</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
              <p><strong>IP Address:</strong> ${data.clientIP}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h3 style="color: #374151; margin-top: 0;">Message:</h3>
              <p style="white-space: pre-wrap; line-height: 1.6; color: #4b5563;">${escapeHtml(data.message)}</p>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 6px; border-left: 4px solid #7c3aed;">
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                This message was sent from the Zaza Promptly contact form at zazapromptly.com/contact
              </p>
            </div>
          </div>
        `,
        textContent: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
IP: ${data.clientIP}
Submitted: ${new Date().toLocaleString()}

Message:
${data.message}

---
This message was sent from the Zaza Promptly contact form.
        `.trim()
      })
    });

    if (response.ok) {
      console.log('Contact notification email sent successfully');
      return true;
    } else {
      const errorText = await response.text();
      console.error('Failed to send notification email:', errorText);
      return false;
    }
  } catch (error) {
    console.error('Error sending notification email:', error);
    return false;
  }
}

// Simple HTML escape function
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export async function GET() {
  return NextResponse.json({ 
    error: 'Method not allowed. Use POST to submit contact form.' 
  }, { status: 405 });
}