const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Get all newsletter subscribers
router.get('/', (req, res) => {
  db.all('SELECT * FROM newsletter ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Subscribe to newsletter
router.post('/', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  db.run(
    'INSERT INTO newsletter (email) VALUES (?)',
    [email],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          res.status(400).json({ error: 'Email already subscribed' });
        } else {
          res.status(500).json({ error: err.message });
        }
      } else {
        res.json({
          id: this.lastID,
          email
        });
      }
    }
  );
});

// Unsubscribe from newsletter
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM newsletter WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Unsubscribed successfully' });
    }
  });
});

module.exports = router;
