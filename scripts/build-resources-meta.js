#!/usr/bin/env node

// Build resources metadata for downloadable resources
// This script generates metadata for PDF resources and other downloadable content

console.log('Building resources metadata...');

const resourcesMeta = [
  {
    id: 'parent-communication-templates',
    title: '50 Parent Communication Templates',
    description: 'Ready-to-use email templates for common classroom situations and parent communications.',
    type: 'template',
    downloadUrl: '/resources/parent-communication-templates.pdf',
    fileSize: '2.3 MB',
    lastUpdated: new Date().toISOString(),
    targetAudience: ['Primary Teachers', 'Secondary Teachers', 'SEN Teachers'],
    subjects: ['All Subjects', 'Communication', 'Parent Relations']
  },
  {
    id: 'lesson-plan-starters',
    title: 'Quick Lesson Plan Starters',
    description: 'Turn abstract curriculum goals into structured daily plans with these proven templates.',
    type: 'guide',
    downloadUrl: '/resources/lesson-plan-starters.pdf',
    fileSize: '1.8 MB',
    lastUpdated: new Date().toISOString(),
    targetAudience: ['New Teachers', 'Trainee Teachers', 'Supply Teachers'],
    subjects: ['Mathematics', 'English', 'Science', 'Social Studies']
  },
  {
    id: 'differentiation-strategies',
    title: 'Differentiation Strategies Cheat Sheet',
    description: 'Simple modifications for different learning styles and abilities in your classroom.',
    type: 'guide',
    downloadUrl: '/resources/differentiation-strategies.pdf',
    fileSize: '1.5 MB',
    lastUpdated: new Date().toISOString(),
    targetAudience: ['All Teachers', 'SEN Teachers', 'Teaching Assistants'],
    subjects: ['Inclusive Education', 'Special Needs', 'Learning Support']
  }
];

// Write metadata to public directory
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const metaPath = path.join(publicDir, 'resources-meta.json');
fs.writeFileSync(metaPath, JSON.stringify(resourcesMeta, null, 2));

console.log('✅ Resources metadata built successfully');
console.log(`   Metadata saved to: ${metaPath}`);
console.log(`   Created metadata for ${resourcesMeta.length} resources`);

// Also create individual resource pages if needed
const resourcesDir = path.join(publicDir, 'resources');
if (!fs.existsSync(resourcesDir)) {
  fs.mkdirSync(resourcesDir, { recursive: true });
}

console.log('✅ Resources build completed');