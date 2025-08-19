# Brevo Email Integration Setup This document explains how to set up the Brevo (formerly Sendinblue) email integration for the Zaza Promptly website. ## Required Environment Variables The following environment variables must be set in your production environment (Vercel, etc.): ### 1. BREVO_API_KEY
Get your API key from: https://app.brevo.com/settings/keys/api ```bash
BREVO_API_KEY=xkeysib-your_actual_brevo_api_key_here
``` ### 2. BREVO_LIST_ID The ID of the contact list where subscribers will be added. ```bash
BREVO_LIST_ID=1
``` **To find your List ID:**
1. Go to https://app.brevo.com/contact/list-manage
2. Click on your newsletter list
3. The ID is shown in the URL: `list-manage/list/[ID]` ## How It Works ### Email Signup Flow
1. User fills out email form on website
2. Form sends POST request to `/api/brevo-subscribe`
3. API tries two approaches: - **Primary**: Direct Brevo API call (simpler, more reliable) - **Fallback**: Unified Brevo capture system (complex, multi-app) ### Form Integration
The email signup forms automatically include: - Email validation - First name (optional) - Last name (optional) - Source tracking (homepage, blog, etc.) - UTM parameter capture ### API Endpoints - **POST** `/api/brevo-subscribe` - Subscribe email to newsletter - **GET** `/api/brevo-subscribe` - Returns 405 Method Not Allowed ## Testing ### Test the Integration
1. Set environment variables in your deployment platform
2. Submit the email form on the live website
3. Check the Brevo dashboard to confirm contacts are being added
4. Check server logs for any error messages ### Debug Common Issues **"Failed to subscribe to newsletter"** - Check `BREVO_API_KEY` is valid and active - Verify `BREVO_LIST_ID` exists and is correct - Check Brevo account limits haven't been exceeded **"API key not configured"** - Environment variable `BREVO_API_KEY` is missing or empty - Check variable name spelling (case-sensitive) **"Invalid list ID"** - `BREVO_LIST_ID` is not a valid number - List may have been deleted in Brevo dashboard - Check permissions on the list ## Production Deployment ### Vercel Setup
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the required variables: ``` BREVO_API_KEY = xkeysib-your_actual_key BREVO_LIST_ID = your_list_id_number ```
4. Redeploy the application ### Other Platforms
Set the environment variables according to your platform's documentation: - Netlify: Site settings → Environment variables - Heroku: Settings → Config Vars - Railway: Variables tab - AWS: Environment variables in your service configuration ## Features ### Contact Attributes
Each subscriber gets these attributes in Brevo: - `FIRSTNAME` - First name from form - `LASTNAME` - Last name from form - `SOURCE` - Where they signed up (e.g., "website") - `LEAD_SOURCE` - Specific source (e.g., "homepage_signup") - `SIGNUP_DATE` - When they subscribed - `UTM_SOURCE` - UTM tracking parameters - `UTM_MEDIUM` - UTM tracking parameters - `UTM_CAMPAIGN` - UTM tracking parameters - `SIGNUP_URL` - The page URL where they signed up ### Error Handling - Graceful fallbacks if primary API fails - Duplicate contact handling (updates existing) - Detailed logging for debugging - User-friendly error messages ### Analytics Integration - Google Analytics event tracking - Custom conversion tracking - Source attribution tracking ## Support If you encounter issues:
1. Check the server logs for detailed error messages
2. Verify your Brevo API key has the correct permissions
3. Ensure your Brevo account is active and within limits
4. Test the API connection using the Brevo dashboard API tester For additional help, contact the development team with: - Error messages from logs - Screenshot of Brevo dashboard settings - Description of what the user was trying to do