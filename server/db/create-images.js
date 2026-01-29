const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

async function createPlaceholderImages() {
  try {
    // Hero image - Professional business image
    const heroSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="500" height="600">
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="500" height="600" fill="url(#heroGradient)"/>
        <circle cx="250" cy="150" r="80" fill="white" opacity="0.2"/>
        <rect x="100" y="250" width="300" height="200" fill="white" opacity="0.15" rx="10"/>
        <text x="250" y="560" text-anchor="middle" font-size="32" font-weight="bold" fill="white">RealTrust</text>
      </svg>
    `;

    await sharp(Buffer.from(heroSvg))
      .resize(500, 600, { fit: 'cover' })
      .jpeg({ quality: 90 })
      .toFile(path.join(uploadsDir, 'hero-image.jpg'));
    console.log('Created: hero-image.jpg');

    // Avatar image - Professional team member
    const avatarSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250">
        <defs>
          <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f97316;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ea580c;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="125" cy="125" r="125" fill="url(#avatarGradient)"/>
        <circle cx="125" cy="80" r="35" fill="white"/>
        <ellipse cx="125" cy="150" rx="50" ry="60" fill="white"/>
        <text x="125" y="240" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Our Team</text>
      </svg>
    `;

    await sharp(Buffer.from(avatarSvg))
      .resize(250, 250, { fit: 'cover' })
      .jpeg({ quality: 90 })
      .toFile(path.join(uploadsDir, 'team-avatar.jpg'));
    console.log('Created: team-avatar.jpg');

    // Gallery images - 4 different professional images
    const galleryImages = [
      {
        name: 'gallery-1.jpg',
        gradient1: '#1e40af',
        gradient2: '#2563eb',
        icon: 'Strategy'
      },
      {
        name: 'gallery-2.jpg',
        gradient1: '#f97316',
        gradient2: '#ea580c',
        icon: 'Growth'
      },
      {
        name: 'gallery-3.jpg',
        gradient1: '#059669',
        gradient2: '#10b981',
        icon: 'Success'
      },
      {
        name: 'gallery-4.jpg',
        gradient1: '#7c3aed',
        gradient2: '#a855f7',
        icon: 'Innovation'
      }
    ];

    for (const img of galleryImages) {
      const galleryGradientId = img.name.replace(/[.-]/g, '');
      const gallerySvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
          <defs>
            <linearGradient id="${galleryGradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${img.gradient1};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${img.gradient2};stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="300" height="300" fill="url(${galleryGradientId})"/>
          <circle cx="150" cy="100" r="40" fill="white" opacity="0.3"/>
          <rect x="50" y="150" width="200" height="100" fill="white" opacity="0.2" rx="8"/>
          <text x="150" y="280" text-anchor="middle" font-size="18" font-weight="bold" fill="white">${img.icon}</text>
        </svg>
      `;

      await sharp(Buffer.from(gallerySvg))
        .resize(300, 300, { fit: 'cover' })
        .jpeg({ quality: 90 })
        .toFile(path.join(uploadsDir, img.name));
      console.log(`Created: ${img.name}`);
    }

    console.log('All placeholder images created successfully');
  } catch (err) {
    console.error('Error creating images:', err);
  }
}

createPlaceholderImages();
