// test-api.js
// Run this script to test your API endpoint thoroughly

const API_URL = 'http://localhost:3003/api/gpt-helper';

async function testAPI() {
  console.log('🔍 Testing AI Feedback API...\n');
  
  // Test 1: Check if route exists (should return 405 for GET)
  console.log('Test 1: Checking if route exists...');
  try {
    const response = await fetch(API_URL);
    console.log(`✅ Route exists! Status: ${response.status}`);
    if (response.status === 405) {
      console.log('✅ Correct! GET method not allowed (expected behavior)');
    } else if (response.status === 404) {
      console.log('❌ Route not found! Check your Next.js server and file structure.');
      return;
    }
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    console.log('Make sure your Next.js server is running on port 3003');
    return;
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 2: Test POST with valid observation
  console.log('Test 2: Testing POST with valid observation...');
  const testObservation = "Ava is making great progress in science and helps her classmates";
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        observation: testObservation
      })
    });
    
    console.log(`Status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Response received:');
      console.log(JSON.stringify(data, null, 2));
      
      // Check for hallucination
      const responseText = JSON.stringify(data).toLowerCase();
      if (responseText.includes('jamie') || responseText.includes('math')) {
        console.log('\n❌ HALLUCINATION DETECTED!');
        console.log('Response contains "Jamie" or "math" when it should contain "Ava" and "science"');
      } else if (responseText.includes('ava') && responseText.includes('science')) {
        console.log('\n✅ CORRECT! Response mentions "Ava" and "science"');
      } else {
        console.log('\n⚠️  Response doesn\'t contain expected terms');
      }
    } else {
      const errorData = await response.text();
      console.log('❌ API Error:', errorData);
    }
  } catch (error) {
    console.log('❌ Request failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 3: Test with different observation
  console.log('Test 3: Testing with different observation...');
  const testObservation2 = "Marcus shows excellent leadership skills during group projects";
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        observation: testObservation2
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Second test response:');
      console.log(JSON.stringify(data, null, 2));
      
      // Check for hallucination
      const responseText = JSON.stringify(data).toLowerCase();
      if (responseText.includes('jamie') || responseText.includes('math')) {
        console.log('\n❌ HALLUCINATION DETECTED in second test!');
      } else if (responseText.includes('marcus') && responseText.includes('leadership')) {
        console.log('\n✅ CORRECT! Second response mentions "Marcus" and "leadership"');
      }
    } else {
      console.log('❌ Second test failed');
    }
  } catch (error) {
    console.log('❌ Second test request failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 4: Test error handling
  console.log('Test 4: Testing error handling...');
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Missing observation field
        wrongField: "test"
      })
    });
    
    console.log(`Error handling test status: ${response.status}`);
    const data = await response.json();
    console.log('Error handling response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.log('Error handling test failed:', error.message);
  }
  
  console.log('\n🏁 Testing complete!');
  console.log('\nNext steps:');
  console.log('1. Check the logs/gpt-helper.log file for detailed request/response data');
  console.log('2. Look at your Next.js server console for any error messages');
  console.log('3. If hallucination persists, we may need to adjust the OpenAI prompt');
}

// Run the test
testAPI().catch(console.error); 