#!/usr/bin/env node

/**
 * Simple deployment script for Zaza websites
 */

console.log('🚀 Starting deployment...');
console.log('📅 Build timestamp:', new Date().toISOString());
console.log('✅ Deployment script executed successfully');

// For debugging - print environment info
console.log('Node version:', process.version);
console.log('Working directory:', process.cwd());

// Exit successfully - Vercel will handle the actual deployment
process.exit(0);