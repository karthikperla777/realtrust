const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const names = ['Roshan', 'Shipra', 'John', 'Mary', 'Lucy'];

async function createSampleClientImages() {
  for (let i = 0; i < 5; i++) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
        <defs>
          <linearGradient id="grad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors[i]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors[(i + 1) % 5]};stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="60" fill="url(#grad${i})"/>
        <circle cx="60" cy="35" r="20" fill="white"/>
        <ellipse cx="60" cy="70" rx="25" ry="30" fill="white"/>
        <text x="60" y="115" text-anchor="middle" font-size="10" fill="#666">${names[i]}</text>
      </svg>
    `;

    const filePath = path.join(uploadsDir, `sample-client-${i + 1}.jpg`);
    
    try {
      await sharp(Buffer.from(svg))
        .resize(120, 120, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 90 })
        .toFile(filePath);
      console.log(`Created: sample-client-${i + 1}.jpg`);
    } catch (err) {
      console.error(`Error creating sample-client-${i + 1}.jpg:`, err);
    }
  }

  console.log('All sample client images created successfully');
}

createSampleClientImages();
