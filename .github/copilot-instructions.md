# GitHub Copilot Instructions for Full Stack Web Application

## Project Overview
Full-stack web application with landing page and admin panel for managing projects, clients, contacts, and newsletters. Built with Express.js, SQLite, HTML/CSS/JavaScript.

## Key Technologies
- **Backend**: Express.js, SQLite3, Multer, Sharp
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: SQLite (data.db)
- **Image Processing**: Sharp for cropping, Multer for uploads

## Project Structure
- `/public` - Frontend files (landing page and admin panel)
- `/server` - Backend Express.js server and routes
- `/server/routes` - API endpoint handlers
- `/server/db` - Database initialization
- `/server/uploads` - Image storage

## Important Files
- `server/server.js` - Main Express server (PORT 5000)
- `server/db/database.js` - SQLite schema and initialization
- `public/index.html` - Landing page
- `public/admin/index.html` - Admin panel
- `package.json` - Dependencies (express, sqlite3, multer, sharp, cors, body-parser)

## Running the Application
```
npm install
npm start
```
- Landing Page: http://localhost:5000
- Admin Panel: http://localhost:5000/admin

## API Structure
- GET/POST/DELETE `/api/projects` - Project management
- GET/POST/DELETE `/api/clients` - Client management
- GET/POST/DELETE `/api/contacts` - Contact form submissions
- GET/POST/DELETE `/api/newsletter` - Newsletter subscriptions

## Features Implemented
✅ Landing page with projects and clients sections
✅ Contact form with database storage
✅ Newsletter subscription
✅ Admin panel with full CRUD operations
✅ Image upload with Sharp cropping (450x350 default)
✅ SQLite database with 4 tables
✅ Responsive design
✅ Error handling and validation

## Database Tables
- **projects**: id, name, description, image, created_at
- **clients**: id, name, description, designation, image, created_at
- **contacts**: id, full_name, email, mobile_number, city, created_at
- **newsletter**: id, email (unique), created_at

## Common Tasks
- Add project: POST `/api/projects` with FormData (name, description, image, optional crop params)
- View contacts: GET `/api/contacts`
- Subscribe to newsletter: POST `/api/newsletter` with email
- Image crop: Send cropX, cropY, cropWidth, cropHeight with image upload

## Notes
- Images stored in `/server/uploads/`
- No authentication implemented (admin panel is publicly accessible)
- CORS enabled for frontend-backend communication
- Supports image cropping during upload as bonus feature
