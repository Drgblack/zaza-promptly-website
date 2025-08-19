#!/usr/bin/env node

const fs = require('fs');
const { glob } = require('glob');

const DASH_REGEX = /[\u2012-\u2015]/g;

async function checkForDashes() {
  const patterns = [
    '**/*.ts',
    '**/*.tsx', 
    '**/*.js',
    '**/*.jsx',
    '**/*.md',
    '**/*.mdx',
    '**/*.json',
    '**/*.yml',
    '**/*.yaml',
    '**/*.css',
    '**/*.scss',
    '**/*.html',
    '**/*.txt'
  ];

  const ignore = [
    '**/node_modules/**',
    '**/.next/**',
    '**/.vercel/**',
    '**/.git/**',
    '**/public/media/**',
    '**/dist/**',
    '**/build/**'
  ];

  const files = await glob(patterns, { ignore });
  let totalDashesFound = 0;
  let hasFailures = false;

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const matches = content.match(DASH_REGEX);
      if (matches) {
        console.log(`⚠️  Unicode dashes found in: ${file}`);
        totalDashesFound += matches.length;
        hasFailures = true;
      }
    } catch (error) {
      // Skip files we can't read
    }
  }

  if (totalDashesFound === 0) {
    console.log('✅ No Unicode dashes found!');
    process.exit(0);
  } else {
    console.log(`❌ Found ${totalDashesFound} Unicode dashes in ${files.filter(f => {
      try {
        const content = fs.readFileSync(f, 'utf8');
        return content.match(DASH_REGEX);
      } catch (error) {
        return false;
      }
    }).length} files`);
    process.exit(1);
  }
}

if (require.main === module) {
  checkForDashes().catch(console.error);
}