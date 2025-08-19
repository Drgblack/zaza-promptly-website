#!/bin/bash

# E2E Test Script for Blog Functionality

set -e

echo "🧪 Running E2E tests for blog functionality..."

# Check if we have a base URL for testing
if [ -z "$PLAYWRIGHT_BASE_URL" ]; then
    echo "ℹ️  PLAYWRIGHT_BASE_URL not set, using http://localhost:3000"
    export PLAYWRIGHT_BASE_URL="http://localhost:3000"
fi

echo "🌐 Testing against: $PLAYWRIGHT_BASE_URL"

# Install Playwright browsers if needed
if [ ! -d "node_modules/@playwright/test" ]; then
    echo "📦 Installing Playwright..."
    npm install --save-dev @playwright/test
fi

# Install browsers
echo "📦 Installing Playwright browsers..."
npx playwright install --with-deps chromium

# Run the tests
echo "🚀 Running Playwright tests..."
npx playwright test --config=playwright.config.ts

echo "✅ E2E tests completed!"

# If running in CI, also generate and show report
if [ "$CI" = "true" ]; then
    echo "📊 Generating test report..."
    npx playwright show-report --host 0.0.0.0 --port 9323 &
    REPORT_PID=$!
    sleep 2
    echo "📊 Test report available at: http://localhost:9323"
    
    # Clean up report server after a delay
    sleep 10
    kill $REPORT_PID 2>/dev/null || true
fi