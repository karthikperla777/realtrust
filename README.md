# Full Stack Web Application - Landing Page & Admin Panel

A complete full-stack web application with a **modern, professional hero section** and comprehensive admin panel for managing projects, clients, contact submissions, and newsletter subscriptions.

## 🎨 Modern Design Features
- **Professional Hero Section** with center-aligned heading and subheading
- **Clean UI** with white background and minimalist corporate design
- **Flat Design** with soft shadows for depth
- **Modern Typography** using system fonts for optimal rendering
- **Responsive Web Design** - fully responsive across all devices
- **High-Quality UI** with smooth animations and micro-interactions
- **Professional Color Palette** - blue, white, and gray for corporate appeal
- **Smooth Hover Effects** with cubic-bezier easing

## Features

### Landing Page
- **Projects Section**: Display all projects with images, names, and descriptions
- **Happy Clients Section**: Showcase client testimonials with images and designations
- **Contact Form**: Collect user inquiries with full name, email, mobile number, and city
- **Newsletter Subscription**: Allow users to subscribe to updates via email

### Admin Panel
- **Project Management**: Add, view, and delete projects with image upload and cropping
- **Client Management**: Add, view, and delete client profiles with image handling
- **Contact Submissions**: View and manage all contact form submissions
- **Newsletter Subscribers**: View and manage email subscriptions
- **Image Cropping**: Bonus feature - crop images during upload (450x350 default)

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Image Processing**: Sharp (for image cropping)
- **File Upload**: Multer

## 🎯 Design Highlights

### Hero Section
- Centered heading with prominent typography
- Subheading with professional gray text
- Dual call-to-action buttons (primary + secondary)
- Gradient visual elements on the right side
- Responsive two-column layout

### Professional UI Elements
- Modern navigation bar with sticky positioning
- Soft shadows (2-8px) for depth
- Rounded corners (8-12px) for modern feel
- Smooth transitions and animations
- Professional brand color (Blue #2563eb)
- High contrast text for readability

### Responsive Breakpoints
- Desktop: Full two-column hero layout
- Tablet (1024px): Optimized spacing and sizing
- Mobile (768px): Single column, full-width buttons

For detailed design information, see [DESIGN.md](DESIGN.md)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Landing Page: `http://localhost:5000`
   - Admin Panel: `http://localhost:5000/admin`

## Project Structure

```
webapp/
├── public/
│   ├── admin/
│   │   ├── index.html       # Admin panel HTML
│   │   ├── admin.css        # Admin panel styles
│   │   └── admin.js         # Admin panel JavaScript
│   ├── images/              # Uploaded images directory
│   ├── index.html           # Landing page HTML
│   ├── styles.css           # Landing page styles
│   └── script.js            # Landing page JavaScript
├── server/
│   ├── db/
│   │   └── database.js      # SQLite database initialization
│   ├── routes/
│   │   ├── projects.js      # Projects API routes
│   │   ├── clients.js       # Clients API routes
│   │   ├── contacts.js      # Contacts API routes
│   │   └── newsletter.js    # Newsletter API routes
│   ├── uploads/             # Image storage directory
│   └── server.js            # Express server entry point
├── package.json
└── data.db                  # SQLite database file (auto-created)
```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Add a new project
- `DELETE /api/projects/:id` - Delete a project

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Add a new client
- `DELETE /api/clients/:id` - Delete a client

### Contacts
- `GET /api/contacts` - Get all contact submissions
- `POST /api/contacts` - Submit a contact form
- `DELETE /api/contacts/:id` - Delete a contact submission

### Newsletter
- `GET /api/newsletter` - Get all subscribers
- `POST /api/newsletter` - Subscribe to newsletter
- `DELETE /api/newsletter/:id` - Unsubscribe from newsletter

## Usage

### Adding Projects
1. Go to Admin Panel → Projects
2. Click "Add Project"
3. Fill in project details and upload an image
4. (Optional) Adjust crop coordinates for image cropping
5. Click "Save Project"

### Adding Clients
1. Go to Admin Panel → Clients
2. Click "Add Client"
3. Fill in client details with name, designation, description, and image
4. (Optional) Adjust crop coordinates
5. Click "Save Client"

### Managing Contacts & Newsletter
- View all contact form submissions in the Contacts tab
- View all newsletter subscribers in the Newsletter tab
- Delete entries as needed

## Image Cropping Feature

The application supports automatic image cropping during upload:
- **Default crop size**: 450x350 pixels
- **Custom crop**: Specify X, Y coordinates and width, height
- Images are processed with Sharp for optimal quality
- Cropped images are stored as JPEG with 90% quality

## Database Schema

### Projects Table
- id, name, description, image, created_at

### Clients Table
- id, name, description, designation, image, created_at

### Contacts Table
- id, full_name, email, mobile_number, city, created_at

### Newsletter Table
- id, email (unique), created_at

## Deployment

The application can be deployed to any cloud platform:

### Option 1: Heroku
```bash
# Create Heroku app
heroku create app-name

# Deploy
git push heroku main
```

### Option 2: AWS
1. Create EC2 instance
2. Install Node.js
3. Clone repository
4. Run `npm install`
5. Start server with process manager (PM2)

### Option 3: Azure
1. Create App Service
2. Configure deployment from Git
3. Set environment variables
4. Deploy

## Environment Variables

If needed, create a `.env` file:
```
PORT=5000
NODE_ENV=development
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port already in use
Change the PORT in server.js or set `PORT=3000 npm start`

### Database locked
Delete `data.db` file and restart the server

### Image upload issues
Ensure `server/uploads/` directory exists and is writable

## License

This project is open source and available under the ISC License.

## Support

For issues and questions, please create an issue in the repository.

---

**Note**: This application does not use "Flipr" or any related branding.
