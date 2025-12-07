# Tejas Pawar - Portfolio Website

A modern, animated portfolio website built with the MERN stack, featuring an admin panel to manage all content.

## Features

- 🎨 Modern dark theme with gradient accents
- ✨ Smooth animations using Framer Motion
- 🖱️ Custom animated cursor
- 🌟 Interactive particle background
- 📱 Fully responsive design
- 🔐 Admin panel to manage all content
- ☁️ Cloudinary integration for images & resume
- 📬 Contact form saves to admin messages

## Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- React Icons

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- EJS (Admin Panel)
- Cloudinary (File uploads)

## Quick Start

### 1. Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account (free)

### 2. Setup Environment

Copy `server/.env.example` to `server/.env` and configure:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tejas-portfolio

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
SESSION_SECRET=your-super-secret-key

# Cloudinary (get from cloudinary.com dashboard)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3. Install & Run

```bash
# Install all dependencies
npm run install-all

# Start both frontend & backend
npm run dev
```

### 4. Access

- **Portfolio:** http://localhost:3000
- **Admin Panel:** http://localhost:5000/admin

## Admin Panel

Access the admin panel at `/admin` to manage:

- **Profile:** Name, bio, social links, profile image, resume
- **Skills:** Add/remove skills by category
- **Projects:** Add projects with images, tags, links
- **Coding Profiles:** LeetCode, GFG, Codeforces stats
- **Experience:** Work history
- **Education:** Academic background
- **Messages:** View contact form submissions

### Default Login
- Username: `admin`
- Password: `admin123`

⚠️ **Change these in production!**

## Cloudinary Setup

1. Create free account at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard → Copy Cloud Name, API Key, API Secret
3. Add to `.env` file

## Deployment

### Frontend (Vercel)
```bash
cd client && npm run build
```
Deploy the `dist` folder to Vercel.

### Backend (Railway/Render)
1. Deploy the `server` folder
2. Set environment variables
3. Update frontend API URL

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   └── App.jsx
│   └── package.json
├── server/                 # Express backend
│   ├── config/            # Cloudinary config
│   ├── models/            # Mongoose models
│   ├── routes/            # API & admin routes
│   ├── views/             # EJS admin templates
│   └── package.json
└── package.json           # Root package
```

---

Made with ❤️ by Tejas Pawar
