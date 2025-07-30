import { NextRequest, NextResponse } from 'next/server';
import { BrevoDirectAPI } from '@/lib/brevo-direct';
import { UnifiedBrevoCapture, getUTMData, getCurrentAppSource } from '@/lib/unified-brevo-capture';

export async function POST(request: NextRequest) {
  try {
    const { 
      email, 
      firstName,
      lastName,
      name, // Legacy compatibility
      source, 
      tags = [],
      listId,
      apiKey
    } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Extract UTM data from headers or request
    const referer = request.headers.get('referer') || '';
    const utmData = extractUTMFromReferer(referer);
    
    // Determine lead source from the request context
    const leadSource = source || determineLeadSource(referer, tags);

    // Try the simple direct Brevo API first
    try {
      const result = await BrevoDirectAPI.addContact({
        email,
        firstName,
        lastName,
        attributes: {
          SOURCE: source || 'website',
          LEAD_SOURCE: leadSource,
          TAGS: tags.join(','),
          UTM_SOURCE: utmData.source || '',
          UTM_MEDIUM: utmData.medium || '',
          UTM_CAMPAIGN: utmData.campaign || '',
          SIGNUP_URL: referer || ''
        }
      });

      if (result.success) {
        return NextResponse.json({ 
          success: true, 
          message: result.message,
          trackingData: {
            event: 'brevo_subscribe',
            source: source || 'website',
            leadSource,
            tags
          }
        });
      } else {
        console.error('Direct Brevo API failed:', result.message);
        // Fall back to unified system
      }
    } catch (directError) {
      console.error('Direct Brevo API error:', directError);
      // Fall back to unified system
    }

    // Fallback to unified Brevo capture system
    const appSource = getCurrentAppFromReferer(referer);
    let success = false;
    
    // Construct full name from firstName and lastName, fallback to legacy name field
    const fullName = firstName && lastName ? `${firstName} ${lastName}` : 
                     firstName ? firstName : 
                     lastName ? lastName : 
                     name || '';

    switch (appSource) {
      case 'teach':
        success = await UnifiedBrevoCapture.captureTeachLead(
          email, 
          fullName, 
          leadSource, 
          utmData, 
          tags
        );
        break;
      case 'visuals':
        success = await UnifiedBrevoCapture.captureVisualsLead(
          email, 
          fullName, 
          leadSource, 
          utmData, 
          tags
        );
        break;
      case 'ecosystem':
        success = await UnifiedBrevoCapture.captureEcosystemLead(
          email, 
          fullName, 
          leadSource, 
          utmData, 
          tags
        );
        break;
      default:
        success = await UnifiedBrevoCapture.capturePromptlyLead(
          email, 
          fullName, 
          leadSource, 
          utmData, 
          tags
        );
    }

    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        trackingData: {
          event: 'brevo_subscribe',
          source: appSource,
          leadSource,
          tags
        }
      });
    } else {
      return NextResponse.json({ 
        error: 'Failed to subscribe to newsletter. Please try again or contact support.' 
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Brevo subscription error:', error);
    return NextResponse.json({ 
      error: 'Internal server error. Please try again later.' 
    }, { status: 500 });
  }
}

// Helper functions
function extractUTMFromReferer(referer: string): any {
  if (!referer) return {};
  
  try {
    const url = new URL(referer);
    return {
      source: url.searchParams.get('utm_source'),
      medium: url.searchParams.get('utm_medium'),
      campaign: url.searchParams.get('utm_campaign'),
      term: url.searchParams.get('utm_term'),
      content: url.searchParams.get('utm_content')
    };
  } catch {
    return {};
  }
}

function determineLeadSource(referer: string, tags: string[]): string {
  // Check tags first for explicit source
  if (tags.includes('exit_intent')) return 'exit_intent';
  if (tags.includes('resource_bundle')) return 'resource_download';
  if (tags.includes('referral')) return 'referral';
  if (tags.includes('blog')) return 'blog_subscription';
  
  // Check referer for implicit source
  if (referer.includes('/why-zaza-teach')) return 'comparison_page';
  if (referer.includes('/pricing')) return 'pricing_page';
  if (referer.includes('/blog/')) return 'blog_post';
  if (referer.includes('/free-resources')) return 'resource_page';
  if (referer.includes('/zaza-ecosystem')) return 'ecosystem_page';
  
  return 'homepage_signup';
}

function getCurrentAppFromReferer(referer: string): string {
  if (!referer) return 'promptly';
  
  if (referer.includes('zazateach.com')) return 'teach';
  if (referer.includes('zazavisuals.com')) return 'visuals';
  if (referer.includes('/zaza-ecosystem')) return 'ecosystem';
  
  return 'promptly';
}

export async function GET() {
  return NextResponse.json({ 
    error: 'Method not allowed. Use POST to subscribe.' 
  }, { status: 405 });
}