const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const https = require('https');

const uploadsDir = path.join(__dirname, '../uploads');

// For demonstration, I'll create professional consultation images
// In production, you would place actual images here

async function setupConsultationImages() {
  try {
    // Create a professional consultation-themed image
    const consultationSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
        <defs>
          <linearGradient id="consultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="300" height="300" fill="url(#consultGradient)"/>
        <circle cx="75" cy="100" r="30" fill="white" opacity="0.4"/>
        <circle cx="225" cy="100" r="30" fill="white" opacity="0.4"/>
        <rect x="50" y="150" width="200" height="80" fill="white" opacity="0.2" rx="8"/>
        <text x="150" y="280" text-anchor="middle" font-size="16" font-weight="bold" fill="white">Professional Consultation</text>
      </svg>
    `;

    await sharp(Buffer.from(consultationSvg))
      .resize(300, 300, { fit: 'cover' })
      .jpeg({ quality: 90 })
      .toFile(path.join(uploadsDir, 'business-consultation.jpg'));
    console.log('Created: business-consultation.jpg');

    // Create a professional collaboration image
    const collaborationSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
        <defs>
          <linearGradient id="collabGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0891b2;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0e7490;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="300" height="300" fill="url(#collabGradient)"/>
        <circle cx="100" cy="80" r="25" fill="white" opacity="0.3"/>
        <circle cx="200" cy="80" r="25" fill="white" opacity="0.3"/>
        <circle cx="150" cy="140" r="25" fill="white" opacity="0.3"/>
        <path d="M 100 110 Q 150 130 200 110" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
        <text x="150" y="280" text-anchor="middle" font-size="16" font-weight="bold" fill="white">Team Collaboration</text>
      </svg>
    `;

    await sharp(Buffer.from(collaborationSvg))
      .resize(300, 300, { fit: 'cover' })
      .jpeg({ quality: 90 })
      .toFile(path.join(uploadsDir, 'team-collaboration.jpg'));
    console.log('Created: team-collaboration.jpg');

    console.log('Images created successfully!');
    console.log('\nTo replace these with real images:');
    console.log('1. Download your business consultation image');
    console.log('2. Save it as: ' + path.join(uploadsDir, 'business-consultation.jpg'));
    console.log('3. Save it as: ' + path.join(uploadsDir, 'team-collaboration.jpg'));
  } catch (err) {
    console.error('Error creating images:', err);
  }
}

setupConsultationImages();
