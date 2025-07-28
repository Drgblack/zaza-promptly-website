// Test script for Anthropic API integration
const fetch = require('node-fetch');

async function testAnthropicAPI() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    console.log('❌ ANTHROPIC_API_KEY not found in environment variables');
    return;
  }

  console.log('🔑 Testing Anthropic API key...');
  console.log('Key format:', apiKey.substring(0, 20) + '...');

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 100,
        temperature: 0.7,
        system: 'You are a helpful assistant. Respond briefly.',
        messages: [
          {
            role: 'user',
            content: 'Say "Hello from Claude!"'
          }
        ]
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Anthropic API test successful!');
      console.log('Response:', data.content[0].text);
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.log('❌ Anthropic API test failed:');
      console.log('Status:', response.status);
      console.log('Error:', errorData);
    }
  } catch (error) {
    console.log('❌ Anthropic API test failed with error:', error.message);
  }
}

// Run the test
testAnthropicAPI(); 