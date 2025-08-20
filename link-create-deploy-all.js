#!/usr/bin/env node

/**
 * Zaza Websites Deployment Script
 * This script handles the deployment of all Zaza apps to Vercel
 */

const { execSync } = require('child_process');
const path = require('path');

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

if (!VERCEL_TOKEN) {
  console.error('❌ VERCEL_TOKEN environment variable is required');
  process.exit(1);
}

console.log('🚀 Starting deployment of Zaza Promptly website...');

try {
  // Install Vercel CLI globally if not already installed
  console.log('📦 Installing Vercel CLI...');
  execSync('npm install -g vercel', { stdio: 'inherit' });

  // Set working directory to current directory (zaza websites)
  const projectDir = process.cwd();
  console.log(`📂 Working directory: ${projectDir}`);

  // Login to Vercel using token
  console.log('🔑 Authenticating with Vercel...');
  execSync(`vercel login --token ${VERCEL_TOKEN}`, { stdio: 'inherit' });

  // Link the project if not already linked
  console.log('🔗 Linking project to Vercel...');
  try {
    execSync('vercel link --yes --token ' + VERCEL_TOKEN, { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️  Project may already be linked, continuing...');
  }

  // Deploy to Vercel
  console.log('🚀 Deploying to Vercel...');
  const deployCommand = `vercel --prod --token ${VERCEL_TOKEN} --yes`;
  execSync(deployCommand, { stdio: 'inherit' });

  console.log('✅ Deployment completed successfully!');
  console.log('🌐 Your website should be live at: https://www.zazapromptly.com');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}