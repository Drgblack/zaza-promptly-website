import fetch from 'node-fetch';

const run = async () => {
  try {
    const response = await fetch('https://zazapromptly.com/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ test: 'hello' }),
    });

    const data = await response.json();
    console.log('✅ Success:', data);
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

run();
