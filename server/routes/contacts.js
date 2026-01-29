const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Get all contact submissions
router.get('/', (req, res) => {
  db.all('SELECT * FROM contacts ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Submit a contact form
router.post('/', (req, res) => {
  const { full_name, email, mobile_number, city } = req.body;

  // Validation
  if (!full_name || !email || !mobile_number || !city) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.run(
    'INSERT INTO contacts (full_name, email, mobile_number, city) VALUES (?, ?, ?, ?)',
    [full_name, email, mobile_number, city],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({
          id: this.lastID,
          full_name,
          email,
          mobile_number,
          city
        });
      }
    }
  );
});

// Delete a contact submission
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM contacts WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Contact deleted successfully' });
    }
  });
});

module.exports = router;
