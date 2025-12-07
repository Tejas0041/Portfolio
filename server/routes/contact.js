import express from 'express'
import Contact from '../models/Contact.js'

const router = express.Router()

// Contact form submission
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    // Save to database
    await Contact.create({ name, email, subject, message })
    res.json({ success: true, message: 'Message sent successfully!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
