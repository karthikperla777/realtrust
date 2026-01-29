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

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Landing page: http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});
