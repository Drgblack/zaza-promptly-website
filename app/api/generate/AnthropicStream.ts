export async function AnthropicStream(messages: any[]) {
  try {
    // Convert OpenAI format to Anthropic format
    const anthropicMessages = messages.map(msg => ({
      role: msg.role === 'system' ? 'assistant' : msg.role,
      content: msg.content
    }));

    // Anthropic requires the system message to be in the system field
    const systemMessage = messages.find(msg => msg.role === 'system')?.content || '';
    const userMessages = messages.filter(msg => msg.role === 'user');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 500,
        temperature: 0.7,
        system: systemMessage,
        messages: userMessages
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Anthropic API Error:', response.status, errorData);
      throw new Error(`Anthropic API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();

    if (data?.content?.[0]?.text) {
      return data.content[0].text;
    } else {
      console.error('Unexpected Anthropic response format:', data);
      throw new Error('Failed to get response from Anthropic - unexpected response format');
    }
  } catch (error) {
    console.error('AnthropicStream error:', error);
    throw error;
  }
} 