const express = require('express');
const router = express.Router();
const db = require('../db/database');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all clients
router.get('/', (req, res) => {
  db.all('SELECT * FROM clients ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Add a new client with image cropping
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, designation, cropX, cropY, cropWidth, cropHeight } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    if (!name || !description || !designation) {
      return res.status(400).json({ error: 'Name, description, and designation are required' });
    }

    // Ensure uploads directory exists
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Process image with cropping if crop parameters provided
    let processedImage = req.file.buffer;
    
    if (cropX && cropY && cropWidth && cropHeight) {
      processedImage = await sharp(req.file.buffer)
        .extract({
          left: parseInt(cropX),
          top: parseInt(cropY),
          width: parseInt(cropWidth),
          height: parseInt(cropHeight)
        })
        .jpeg({ quality: 90 })
        .toBuffer();
    } else {
      // Resize to 450x350 if no crop specified
      processedImage = await sharp(req.file.buffer)
        .resize(450, 350, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 90 })
        .toBuffer();
    }

    // Save image
    const filename = `client_${Date.now()}.jpg`;
    const filepath = path.join(uploadsDir, filename);
    fs.writeFileSync(filepath, processedImage);

    // Store in database
    const imageUrl = `/uploads/${filename}`;
    db.run(
      'INSERT INTO clients (name, description, designation, image) VALUES (?, ?, ?, ?)',
      [name, description, designation, imageUrl],
      function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({
            id: this.lastID,
            name,
            description,
            designation,
            image: imageUrl
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a client
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // First get the image path
  db.get('SELECT image FROM clients WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Delete from database
    db.run('DELETE FROM clients WHERE id = ?', [id], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // Delete image file if exists
        if (row && row.image) {
          const filepath = path.join(__dirname, '..', row.image);
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }
        }
        res.json({ message: 'Client deleted successfully' });
      }
    });
  });
});

module.exports = router;
