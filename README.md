# Zaza Promptly - AI-Powered Student Comments for Teachers
<!-- Force deployment sync --> Zaza Promptly is an AI-powered tool that helps teachers write clear, kind, and professional messages to parents - in seconds. Built using Next.js and OpenAI GPT-4. ## Features - 🎯 **Customised Tone** - Tailor each comment to match your personal voice or school guidelines - ⚡ **Instant Generation** - Generate high-quality comments in seconds - never miss a deadline again - 🧠 **Context Aware** - Remembers your preferences and prior student notes - 🌍 **Multilingual Ready** - Generate comments in multiple languages effortlessly ## Tech Stack - **Framework:** Next.js 15 with App Router - **Styling:** Tailwind CSS - **Language:** TypeScript - **Deployment:** Vercel ## Getting Started ```bash
git clone https://github.com/Drgblack/zaza-promptly-site.git
cd zaza-promptly-site
npm install
npm run dev
```

## Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Then configure your environment variables as needed.

## Payments (Stripe) – Local & Vercel

### Overview
The application uses Stripe for payment processing with environment-aware configuration:
- **Development/Preview**: Uses Stripe test keys
- **Production**: Uses Stripe live keys
- **Fallback**: Graceful degradation if keys are missing

### Local Development

1. **Get Stripe Test Keys**:
   - Sign up at [stripe.com](https://stripe.com)
   - Navigate to Developers → API keys
   - Copy your **Publishable key** and **Secret key** (both starting with `sk_test_` and `pk_test_`)

2. **Configure `.env.local`**:
   ```bash
   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

3. **Test the Integration**:
   ```bash
   npm run dev
   # Visit http://localhost:3000/pricing
   # Click "Start 7-Day Free Trial"
   ```

### Test Card Numbers
Use these test card numbers in Stripe checkout:

| Card Number | Description |
|-------------|-------------|
| `4242424242424242` | Visa - Success |
| `4000000000000002` | Visa - Card declined |
| `4000000000009995` | Visa - Insufficient funds |
| `4000000000000069` | Visa - Expired card |

**Test Details**:
- **Expiry**: Any future date (e.g., `12/34`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP**: Any ZIP code (e.g., `12345`)

### Vercel Deployment

#### Environment Variables
Configure these in your Vercel dashboard (Settings → Environment Variables):

**For Preview/Development:**
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**For Production:**
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Alternative: Environment-Specific Keys
You can also use environment-specific variables:

```bash
# Test environment
STRIPE_TEST_PUBLISHABLE_KEY=pk_test_...
STRIPE_TEST_SECRET_KEY=sk_test_...
STRIPE_TEST_WEBHOOK_SECRET=whsec_...

# Live environment
STRIPE_LIVE_PUBLISHABLE_KEY=pk_live_...
STRIPE_LIVE_SECRET_KEY=sk_live_...
STRIPE_LIVE_WEBHOOK_SECRET=whsec_...
```

The system automatically selects the appropriate keys based on `VERCEL_ENV`.

### API Endpoints

#### Create Checkout Session
```bash
POST /api/stripe-checkout
Content-Type: application/json

{
  "plan": "pro-monthly",
  "successUrl": "https://yoursite.com/success",
  "cancelUrl": "https://yoursite.com/cancel"
}
```

**Response**:
```json
{
  "url": "https://checkout.stripe.com/pay/cs_...",
  "sessionId": "cs_test_...",
  "testMode": true,
  "environment": "development",
  "plan": "pro-monthly",
  "amount": "$14.99"
}
```

#### Available Plans
- `pro-monthly`: $14.99/month
- `pro-yearly`: $149.90/year (save 17%)

### Testing

Run the Stripe integration tests:

```bash
# Install test dependencies
npm install --save-dev jest @types/jest

# Run tests
npm test -- __tests__/api/stripe-checkout.test.ts

# Run with coverage
npm test -- --coverage
```

### Webhooks (Production)

1. **Setup Webhook Endpoint**: `https://yoursite.com/api/stripe-webhook`
2. **Select Events**:
   - `checkout.session.completed`
   - `checkout.session.expired`  
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

3. **Add Webhook Secret** to environment variables

### Troubleshooting

#### Build Failures
- ✅ **Fixed**: Missing Stripe keys no longer cause build failures
- ✅ **Graceful**: Returns 503 error instead of crashing
- ✅ **Environment-aware**: Automatically uses correct keys per environment

#### Common Issues
1. **"Payment processing unavailable"**: Check your Stripe keys in environment variables
2. **"Invalid plan type"**: Ensure you're using `pro-monthly` or `pro-yearly`
3. **Webhook failures**: Verify webhook secret matches Stripe dashboard

#### Debug Mode
Add to `.env.local` for detailed logging:
```bash
STRIPE_DEBUG=true
# Deployment trigger
