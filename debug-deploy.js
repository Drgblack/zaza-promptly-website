#!/usr/bin/env node

// Simple debug script to verify deployment issues
console.log('=== DEPLOYMENT DEBUG INFO ===');
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV);
console.log('Vercel URL:', process.env.VERCEL_URL);
console.log('Current directory:', process.cwd());

// Check if locale files exist
const fs = require('fs');
const path = require('path');

const localeFiles = [
  '.next/server/app/en.html',
  '.next/server/app/de.html', 
  '.next/server/app/fr.html',
  '.next/server/app/es.html',
  '.next/server/app/it.html'
];

console.log('\n=== CHECKING LOCALE FILES ===');
localeFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`${file}: ${exists ? '✓ EXISTS' : '✗ MISSING'}`);
});

// Check middleware
const middlewareExists = fs.existsSync(path.join(process.cwd(), 'middleware.ts'));
console.log(`\nmiddleware.ts: ${middlewareExists ? '✓ EXISTS' : '✗ MISSING'}`);

if (middlewareExists) {
  const middlewareContent = fs.readFileSync(path.join(process.cwd(), 'middleware.ts'), 'utf8');
  console.log('\n=== MIDDLEWARE CONTENT ===');
  console.log(middlewareContent);
}

console.log('\n=== END DEBUG INFO ===');