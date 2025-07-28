import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Helper: Write log entry to file and console
function logGPTEvent(event: Record<string, any>) {
  const logDir = path.resolve(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
  const logPath = path.join(logDir, 'gpt-helper.log');
  const entry = JSON.stringify(event) + '\n';
  fs.appendFileSync(logPath, entry);
  // Also log to console for dev
  console.log('[GPT-HELPER-LOG]', event);
}

export async function POST(request: NextRequest) {
  const requestId = uuidv4();
  const timestamp = new Date().toISOString();
  let sessionId = null;
  try {
    // Parse the request body
    const body = await request.json();
    const { observation } = body;
    sessionId = request.headers.get('x-session-id') || null;

    // Input validation
    if (!observation || typeof observation !== 'string' || !observation.trim()) {
      const errorEvent = {
        type: 'validation_failure',
        requestId,
        timestamp,
        sessionId,
        payload: { observation },
        error: 'Observation field is required and must be a non-empty string',
      };
      logGPTEvent(errorEvent);
      return NextResponse.json(
        { error: 'Observation field is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Check if API key is available
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const errorEvent = {
        type: 'config_error',
        requestId,
        timestamp,
        sessionId,
        error: 'OPENAI_API_KEY not found in environment variables',
      };
      logGPTEvent(errorEvent);
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Strict system prompt with few-shot examples
    const systemPrompt = `
You are a professional school teacher assistant who writes personalised, subject-specific feedback based on short, freeform teacher observations. 
You always stick to the student name and observation details — do not hallucinate or substitute content. 

If the observation says 'Fanny', the feedback must be about Fanny. Never use any other name. If the observation says 'Bob', the feedback must be about Bob. Never use any other name. If the observation does not mention a subject, do not invent one.

Return only the feedback sentence. Do NOT include phrases like "Jamie, your determination in math class..." unless the input says "Jamie" and mentions math.

Examples:
Observation: "Mia is very shy but contributes in small group activities."
→ Feedback: "Mia is growing in confidence and participates thoughtfully in smaller group settings."

Observation: "Liam tries hard in PE and is improving in hand–eye coordination."
→ Feedback: "Liam shows great effort in PE and has made noticeable progress in hand–eye coordination."

Observation: "Bob is not very good at sewing."
→ Feedback: "Bob is developing his sewing skills and continues to show persistence with hands-on tasks."
`;

    const userPrompt = `Observation: "${observation}" → Feedback:`;

    // Log incoming request (sanitized)
    logGPTEvent({
      type: 'request',
      requestId,
      timestamp,
      sessionId,
      payload: { observation: observation.slice(0, 200) },
    });

    // Prepare the request to OpenAI
    const openAIPayload = {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 100,
      temperature: 0.5,
    };

    // Log OpenAI payload (no API key)
    logGPTEvent({
      type: 'openai_request',
      requestId,
      timestamp,
      sessionId,
      payload: { ...openAIPayload, apiKey: undefined },
    });

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(openAIPayload),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      logGPTEvent({
        type: 'openai_error',
        requestId,
        timestamp,
        sessionId,
        error: errorData,
      });
      return NextResponse.json(
        { error: 'Failed to get response from OpenAI' },
        { status: 500 }
      );
    }

    const data = await openAIResponse.json();
    const gptResponse = data.choices[0]?.message?.content;

    // Log OpenAI response (sanitized)
    logGPTEvent({
      type: 'openai_response',
      requestId,
      timestamp,
      sessionId,
      response: gptResponse ? gptResponse.slice(0, 500) : null,
      usage: data.usage,
    });

    if (!gptResponse) {
      logGPTEvent({
        type: 'no_gpt_response',
        requestId,
        timestamp,
        sessionId,
        error: 'No response generated from OpenAI',
      });
      return NextResponse.json(
        { error: 'No response generated from OpenAI' },
        { status: 500 }
      );
    }

    // Return the GPT response
    logGPTEvent({
      type: 'response',
      requestId,
      timestamp,
      sessionId,
      response: gptResponse ? gptResponse.slice(0, 500) : null,
    });
    return new Response(gptResponse.trim(), {
      headers: { 'Content-Type': 'text/plain' }
    });

  } catch (error: any) {
    logGPTEvent({
      type: 'internal_error',
      requestId,
      timestamp,
      sessionId,
      error: error?.message || error,
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
} 