const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../data.db');

let db = null;

try {
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Database connection error:', err.message);
      process.exit(1);
    } else {
      console.log('Connected to SQLite database at', dbPath);
      initializeDatabase();
    }
  });
} catch (error) {
  console.error('Fatal error creating database:', error.message);
  process.exit(1);
}

function initializeDatabase() {
  try {
    // Projects table
    db.run(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('Error creating projects table:', err);
      else {
        console.log('Projects table ready');
        setTimeout(() => addSampleProjects(), 100);
      }
    });

    // Clients table
    db.run(`CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      designation TEXT NOT NULL,
      image TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('Error creating clients table:', err);
      else {
        console.log('Clients table ready');
        setTimeout(() => checkAndAddSampleClients(), 100);
      }
    });

    // Contact submissions table
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      mobile_number TEXT NOT NULL,
      city TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('Error creating contacts table:', err);
      else console.log('Contacts table ready');
    });

    // Newsletter subscribers table
    db.run(`CREATE TABLE IF NOT EXISTS newsletter (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('Error creating newsletter table:', err);
      else console.log('Newsletter table ready');
    });

    // Users table for admin authentication
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('Error creating users table:', err);
      else console.log('Users table ready');
    });
  } catch (error) {
    console.error('Error during database initialization:', error.message);
  }
}

function addSampleProjects() {
  db.get('SELECT COUNT(*) as count FROM projects', (err, row) => {
    if (!err && row && row.count === 0) {
      const sampleProjects = [
        {
          name: 'Consultation',
          description: 'Professional business consultation and strategy development',
          image: '/uploads/sample-project-1.jpg'
        },
        {
          name: 'Design',
          description: 'Creative and modern design solutions',
          image: '/uploads/sample-project-2.jpg'
        },
        {
          name: 'Marketing & Design',
          description: 'Comprehensive marketing with design integration',
          image: '/uploads/sample-project-3.jpg'
        },
        {
          name: 'Consultation & Marketing',
          description: 'Strategic consultation with marketing initiatives',
          image: '/uploads/sample-project-4.jpg'
        },
        {
          name: 'Consultation',
          description: 'Expert guidance for business transformation',
          image: '/uploads/sample-project-5.jpg'
        }
      ];

      let inserted = 0;
      sampleProjects.forEach((project) => {
        db.run(
          'INSERT INTO projects (name, description, image) VALUES (?, ?, ?)',
          [project.name, project.description, project.image],
          function(err) {
            if (err) {
              console.error('Error inserting project:', err);
            } else {
              inserted++;
              if (inserted === sampleProjects.length) {
                console.log('All sample projects added successfully');
              }
            }
          }
        );
      });
    }
  });
}

function checkAndAddSampleClients() {
  db.get('SELECT COUNT(*) as count FROM clients', (err, row) => {
    if (!err && row && row.count === 0) {
      addSampleClients();
    }
  });
}

function addSampleClients() {
  const sampleClients = [
    {
      name: 'Roshan Smith',
      designation: 'CEO at TechCorp',
      description: 'Excellent service and professional team. Highly recommended!',
      image: '/uploads/sample-client-1.jpg'
    },
    {
      name: 'Shipra Koyel',
      designation: 'Marketing Director',
      description: 'Great experience working with this talented team.',
      image: '/uploads/sample-client-2.jpg'
    },
    {
      name: 'John Legore',
      designation: 'Business Owner',
      description: 'Outstanding results and exceptional customer support.',
      image: '/uploads/sample-client-3.jpg'
    },
    {
      name: 'Mary Freeman',
      designation: 'Project Manager',
      description: 'Professional, creative, and results-driven approach.',
      image: '/uploads/sample-client-4.jpg'
    },
    {
      name: 'Lucy Davis',
      designation: 'Creative Lead',
      description: 'Impressive work quality and timely delivery.',
      image: '/uploads/sample-client-5.jpg'
    }
  ];

  let inserted = 0;
  sampleClients.forEach((client) => {
    db.run(
      'INSERT INTO clients (name, description, designation, image) VALUES (?, ?, ?, ?)',
      [client.name, client.description, client.designation, client.image],
      function(err) {
        if (err) {
          console.error('Error inserting client:', err);
        } else {
          inserted++;
          if (inserted === sampleClients.length) {
            console.log('All sample clients added successfully');
          }
        }
      }
    );
  });
}

module.exports = db;
