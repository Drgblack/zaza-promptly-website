import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

// Simple in-memory storage for demo - replace with actual database
const sharedSnippets = new Map<string, {
  id: string;
  content: string;
  timestamp: number;
  locale: string;
}>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, locale = 'en' } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Generate short ID
    const id = nanoid(8);
    
    // Store snippet
    const snippet = {
      id,
      content: content.trim(),
      timestamp: Date.now(),
      locale
    };
    
    sharedSnippets.set(id, snippet);

    return NextResponse.json({
      id,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/share/${id}`
    });
  } catch (error) {
    console.error('Share API error:', error);
    return NextResponse.json(
      { error: 'Failed to create share link' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'ID is required' },
      { status: 400 }
    );
  }

  const snippet = sharedSnippets.get(id);
  
  if (!snippet) {
    return NextResponse.json(
      { error: 'Snippet not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(snippet);
}