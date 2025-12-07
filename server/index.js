import './loadEnv.js'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import session from 'express-session'
import path from 'path'
import { fileURLToPath } from 'url'

import contactRoutes from './routes/contact.js'
import apiRoutes from './routes/api.js'
import adminRoutes from './routes/admin.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// View engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}))

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api', apiRoutes)
app.use('/admin', adminRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' })
})

// Resume proxy endpoint to force inline display
app.get('/api/resume', async (req, res) => {
  try {
    const Profile = mongoose.model('Profile')
    const profile = await Profile.findOne()
    
    if (!profile || !profile.resumeUrl) {
      return res.status(404).json({ error: 'Resume not found' })
    }
    
    // Get the original URL and ensure it doesn't have duplicate flags
    let resumeUrl = profile.resumeUrl
    
    // Remove any existing fl_attachment flags
    resumeUrl = resumeUrl.replace(/\/fl_attachment[^\/]*\//g, '/')
    
    // Add fl_attachment flag to force inline display
    const inlineUrl = resumeUrl.replace('/upload/', '/upload/fl_attachment/')
    
    res.redirect(inlineUrl)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.log('MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Admin panel: http://localhost:${PORT}/admin`)
})
