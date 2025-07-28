# Zaza Promptly Setup Guide

## 🚀 Getting Started

### 1. Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# AI Provider Configuration (Choose one or both)
# Anthropic Claude API (Recommended)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# OpenAI GPT-4 API (Alternative)
OPENAI_API_KEY=your_openai_api_key_here

# Analytics Configuration (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id_here

# Application Configuration
NODE_ENV=development
```

### 2. AI Provider Setup

#### Option A: Anthropic Claude API (Recommended)

1. **Get an Anthropic API Key:**
   - Go to [Anthropic Console](https://console.anthropic.com/)
   - Sign up or log in to your account
   - Navigate to "API Keys" in your dashboard
   - Click "Create Key"
   - Copy the generated key

2. **Add to Environment:**
   - Replace `your_anthropic_api_key_here` in `.env.local` with your actual API key
   - Example: `ANTHROPIC_API_KEY=sk-ant-api03-...`

#### Option B: OpenAI GPT-4 API

1. **Get an OpenAI API Key:**
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Sign up or log in to your account
   - Navigate to "API Keys" in your dashboard
   - Click "Create new secret key"
   - Copy the generated key

2. **Add to Environment:**
   - Replace `your_openai_api_key_here` in `.env.local` with your actual API key
   - Example: `OPENAI_API_KEY=sk-1234567890abcdef...`

### 3. Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000` (or the next available port).

## 🔧 Features

### ✅ Working Without API Key
- **Demo Mode**: The feedback generator works with intelligent fallback responses
- **All UI Features**: Complete website functionality
- **AI-Focused Copy**: All marketing content and SEO optimizations

### 🚀 Full AI Features (with API Key)
- **Real AI Responses**: Actual AI-powered feedback generation (Claude or GPT-4)
- **Dynamic Content**: Personalized responses based on student observations
- **Tone Customization**: AI adapts to different feedback styles
- **Provider Flexibility**: Supports both Anthropic Claude and OpenAI GPT-4

## 🎯 Demo Mode Features

When no AI API keys are configured, the feedback generator provides:

- **Tone-Specific Responses**: Different styles for encouraging, constructive, formal, and warm tones
- **Context-Aware Feedback**: Responses adapt to positive, challenging, or improvement-focused observations
- **Professional Quality**: High-quality, teacher-appropriate feedback
- **Instant Generation**: No API delays, immediate responses

## 📝 Example Usage

### Demo Mode Response Examples:

**Input:** "Jamie struggles with fractions but tries hard"
**Tone:** Encouraging
**Response:** "I can see your dedication and effort in this area. Keep building on these strengths while exploring new challenges."

**Input:** "Sarah excels in creative writing and shows great imagination"
**Tone:** Warm
**Response:** "I really enjoy seeing your enthusiasm and positive energy in class. I'd love to see you continue growing and exploring new possibilities."

## 🔒 Security Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore`
- API keys are only used server-side and never exposed to the client

## 🆘 Troubleshooting

### Feedback Generator Not Working
1. Check that the development server is running
2. Verify the API route is accessible at `/api/generate`
3. Check browser console for any JavaScript errors
4. Ensure the demo mode fallback is working

### API Key Issues
1. Verify the API key is correctly formatted
2. Check your AI provider account has sufficient credits
3. Ensure the key has the necessary permissions
4. For Anthropic: Verify the API key starts with `sk-ant-api03-`
5. For OpenAI: Verify the API key starts with `sk-`

## 📞 Support

For technical support or questions about the setup process, please refer to the project documentation or contact the development team.

---

**Status**: ✅ Ready for Development
**Last Updated**: Current
**Version**: 1.0.0 