const fs = require('fs');
const path = require('path');

// Simple SVG avatar generator for testimonials
function generateAvatar(name, gender, backgroundColor, textColor) {
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .bg { fill: ${backgroundColor}; }
      .text { fill: ${textColor}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 60px; font-weight: 600; text-anchor: middle; dominant-baseline: central; }
      .circle { fill: rgba(255,255,255,0.1); }
    </style>
  </defs>
  
  <!-- Background circle -->
  <circle cx="100" cy="100" r="100" class="bg"/>
  
  <!-- Subtle inner circle for depth -->
  <circle cx="100" cy="100" r="85" class="circle"/>
  
  <!-- Person silhouette -->
  <circle cx="100" cy="75" r="25" fill="rgba(255,255,255,0.2)"/>
  <path d="M 60 160 Q 100 130 140 160 L 140 200 L 60 200 Z" fill="rgba(255,255,255,0.2)"/>
  
  <!-- Initials -->
  <text x="100" y="100" class="text">${initials}</text>
</svg>`;
}

const testimonials = [
  { name: 'Sarah Thompson', gender: 'female', bg: '#6366f1', text: '#ffffff' },
  { name: 'Michael Rodriguez', gender: 'male', bg: '#8b5cf6', text: '#ffffff' },
  { name: 'Emma Clarke', gender: 'female', bg: '#06b6d4', text: '#ffffff' },
  { name: 'David Chen', gender: 'male', bg: '#10b981', text: '#ffffff' }
];

const outputDir = path.join(__dirname, '..', 'public', 'images', 'testimonials');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

testimonials.forEach(person => {
  const fileName = person.name.toLowerCase().replace(' ', '-') + '.svg';
  const filePath = path.join(outputDir, fileName);
  const svg = generateAvatar(person.name, person.gender, person.bg, person.text);
  
  fs.writeFileSync(filePath, svg);
  console.log(`Generated avatar: ${fileName}`);
});

console.log('All testimonial avatars generated successfully!');