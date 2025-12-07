import express from 'express'
import Profile from '../models/Profile.js'
import Skill from '../models/Skill.js'
import Project from '../models/Project.js'

const router = express.Router()

// Get all portfolio data for frontend
router.get('/portfolio', async (req, res) => {
  try {
    let profile = await Profile.findOne()
    if (!profile) {
      profile = await Profile.create({})
    }
    
    const skills = await Skill.find().sort({ category: 1, order: 1 })
    const projects = await Project.find().sort({ order: 1 })
    
    // Group skills by category
    const groupedSkills = {
      frontend: skills.filter(s => s.category === 'frontend'),
      backend: skills.filter(s => s.category === 'backend'),
      languages: skills.filter(s => s.category === 'languages'),
      tools: skills.filter(s => s.category === 'tools')
    }
    
    res.json({
      profile,
      skills: groupedSkills,
      projects
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get profile only
router.get('/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne()
    if (!profile) {
      profile = await Profile.create({})
    }
    res.json(profile)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 })
    res.json(skills)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
