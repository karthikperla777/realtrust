const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadsDir = path.join(__dirname, '../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create sample project images using Sharp
const createSampleImages = async () => {
  const colors = [
    { bg: '#667eea', accent: '#764ba2' },
    { bg: '#1e40af', accent: '#2563eb' },
    { bg: '#059669', accent: '#10b981' },
    { bg: '#d97706', accent: '#f97316' },
    { bg: '#7c3aed', accent: '#8b5cf6' }
  ];

  for (let i = 1; i <= 5; i++) {
    const color = colors[i - 1];
    const svgImage = `
      <svg width="450" height="350" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color.bg};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color.accent};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="450" height="350" fill="url(#grad${i})"/>
        <circle cx="225" cy="175" r="100" fill="rgba(255,255,255,0.1)"/>
        <rect x="50" y="50" width="350" height="250" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" rx="10"/>
        <text x="225" y="170" font-size="28" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">Project ${i}</text>
        <text x="225" y="200" font-size="16" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="Arial">Professional Design</text>
      </svg>
    `;

    try {
      await sharp(Buffer.from(svgImage))
        .jpeg({ quality: 90 })
        .toFile(path.join(uploadsDir, `sample-project-${i}.jpg`));
      console.log(`Created sample-project-${i}.jpg`);
    } catch (error) {
      console.error(`Error creating sample-project-${i}.jpg:`, error);
    }
  }
};

createSampleImages();
