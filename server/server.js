const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const projectRoutes = require('./routes/projects');
const clientRoutes = require('./routes/clients');
const contactRoutes = require('./routes/contacts');
const newsletterRoutes = require('./routes/newsletter');

const app = express();
const PORT = process.env.PORT || 5000;

// Set a timeout for the process
const STARTUP_TIMEOUT = process.env.NODE_ENV === 'production' ? 30000 : 60000;
const startupTimer = setTimeout(() => {
  console.error('Server startup timeout - forcing exit to restart');
  process.exit(1);
}, STARTUP_TIMEOUT);

// Clear timeout once server is fully ready
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database
let db;
try {
  db = require('./db/database');
  console.log('Database initialized');
} catch (error) {
  console.error('Failed to initialize database:', error.message);
}

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Serve landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Serve admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', port: PORT });
});

const server = app.listen(PORT, () => {
  clearTimeout(startupTimer);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Landing page: http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    if (db && db.close) {
      db.close((err) => {
        if (err) console.error('Error closing database:', err);
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    if (db && db.close) {
      db.close((err) => {
        if (err) console.error('Error closing database:', err);
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
});
