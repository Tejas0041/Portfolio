import express from 'express'
import Profile from '../models/Profile.js'
import Skill from '../models/Skill.js'
import Project from '../models/Project.js'
import Contact from '../models/Contact.js'
import { uploadImage, uploadResume, cloudinary, getInlineResumeUrl } from '../config/cloudinary.js'

const router = express.Router()

// Auth middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.isAdmin) {
    return next()
  }
  res.redirect('/admin/login')
}

// Login page
router.get('/login', (req, res) => {
  res.render('login', { error: null })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.isAdmin = true
    res.redirect('/admin')
  } else {
    res.render('login', { error: 'Invalid credentials' })
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/admin/login')
})

// Dashboard
router.get('/', isAuthenticated, async (req, res) => {
  const profile = await Profile.findOne() || {}
  const skills = await Skill.find().sort({ category: 1, order: 1 })
  const projects = await Project.find().sort({ order: 1 })
  const messages = await Contact.find().sort({ createdAt: -1 }).limit(5)
  const unreadCount = await Contact.countDocuments({ read: false })
  
  res.render('dashboard', { profile, skills, projects, messages, unreadCount })
})

// Profile Management
router.get('/profile', isAuthenticated, async (req, res) => {
  let profile = await Profile.findOne()
  if (!profile) profile = await Profile.create({})
  res.render('profile', { profile })
})

router.post('/profile', isAuthenticated, async (req, res) => {
  try {
    let profile = await Profile.findOne()
    if (!profile) profile = new Profile()
    
    const { typingTexts, ...rest } = req.body
    Object.assign(profile, rest)
    
    // Handle typing texts array
    if (typingTexts) {
      profile.typingTexts = typingTexts.split(',').map(t => t.trim()).filter(t => t)
    }
    
    await profile.save()
    res.redirect('/admin/profile?success=' + encodeURIComponent('Profile updated successfully!'))
  } catch (error) {
    res.redirect('/admin/profile?error=' + encodeURIComponent(error.message))
  }
})

// Upload profile image
router.post('/profile/image', isAuthenticated, (req, res, next) => {
  uploadImage.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer/Cloudinary error:', err)
      return res.redirect('/admin/profile?error=' + encodeURIComponent(err.message))
    }
    next()
  })
}, async (req, res) => {
  try {
    if (!req.file) {
      return res.redirect('/admin/profile?error=No file uploaded')
    }
    const profile = await Profile.findOne() || new Profile()
    
    // Delete old profile image from Cloudinary if exists
    if (profile.profileImage) {
      try {
        const publicId = profile.profileImage.split('/').slice(-2).join('/').split('.')[0]
        await cloudinary.uploader.destroy(publicId)
      } catch (err) {
        console.log('Could not delete old image:', err.message)
      }
    }
    
    profile.profileImage = req.file.path
    await profile.save()
    res.redirect('/admin/profile?success=' + encodeURIComponent('Profile image updated!'))
  } catch (error) {
    console.error('Image upload error:', error)
    res.redirect('/admin/profile?error=' + encodeURIComponent(error.message))
  }
})

// Save resume link (Google Drive, etc)
router.post('/profile/resume-link', isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOne() || new Profile()
    profile.resumeLink = req.body.resumeLink
    await profile.save()
    res.redirect('/admin/profile?success=' + encodeURIComponent('Resume link saved!'))
  } catch (error) {
    res.redirect('/admin/profile?error=' + encodeURIComponent(error.message))
  }
})

// Upload resume
router.post('/profile/resume', isAuthenticated, uploadResume.single('resume'), async (req, res) => {
  try {
    const profile = await Profile.findOne() || new Profile()
    
    // Delete old resume from Cloudinary if exists
    if (profile.resumeUrl) {
      try {
        const publicId = profile.resumeUrl.split('/').slice(-3).join('/').replace('.pdf', '')
        await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' })
      } catch (err) {
        console.log('Could not delete old resume:', err.message)
      }
    }
    
    profile.resumeUrl = getInlineResumeUrl(req.file.path)
    await profile.save()
    res.redirect('/admin/profile?success=' + encodeURIComponent('Resume uploaded successfully!'))
  } catch (error) {
    res.redirect('/admin/profile?error=' + encodeURIComponent(error.message))
  }
})

// Skills Management
router.get('/skills', isAuthenticated, async (req, res) => {
  const skills = await Skill.find().sort({ category: 1, order: 1 })
  res.render('skills-enhanced', { skills })
})

router.post('/skills', isAuthenticated, async (req, res) => {
  try {
    await Skill.create(req.body)
    res.redirect('/admin/skills?success=' + encodeURIComponent('Skill added successfully!'))
  } catch (error) {
    res.redirect('/admin/skills?error=' + encodeURIComponent(error.message))
  }
})

router.post('/skills/:id/delete', isAuthenticated, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id)
    res.redirect('/admin/skills?success=' + encodeURIComponent('Skill deleted!'))
  } catch (error) {
    res.redirect('/admin/skills?error=' + encodeURIComponent(error.message))
  }
})



// Projects Management
router.get('/projects', isAuthenticated, async (req, res) => {
  const projects = await Project.find().sort({ order: 1 })
  res.render('projects', { projects, editProject: null })
})

router.get('/projects/:id/edit', isAuthenticated, async (req, res) => {
  const projects = await Project.find().sort({ order: 1 })
  const editProject = await Project.findById(req.params.id)
  res.render('projects', { projects, editProject })
})

router.post('/projects', isAuthenticated, uploadImage.single('image'), async (req, res) => {
  try {
    const { tags, ...rest } = req.body
    const projectData = {
      ...rest,
      tags: tags ? tags.split(',').map(t => t.trim()) : []
    }
    if (req.file) projectData.image = req.file.path
    await Project.create(projectData)
    res.redirect('/admin/projects?success=' + encodeURIComponent('Project added successfully!'))
  } catch (error) {
    res.redirect('/admin/projects?error=' + encodeURIComponent(error.message))
  }
})

router.post('/projects/:id', isAuthenticated, uploadImage.single('image'), async (req, res) => {
  try {
    const { tags, ...rest } = req.body
    const updateData = {
      ...rest,
      tags: tags ? tags.split(',').map(t => t.trim()) : []
    }
    if (req.file) updateData.image = req.file.path
    await Project.findByIdAndUpdate(req.params.id, updateData)
    res.redirect('/admin/projects?success=' + encodeURIComponent('Project updated successfully!'))
  } catch (error) {
    res.redirect('/admin/projects?error=' + encodeURIComponent(error.message))
  }
})

router.post('/projects/:id/delete', isAuthenticated, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.redirect('/admin/projects?success=' + encodeURIComponent('Project deleted!'))
  } catch (error) {
    res.redirect('/admin/projects?error=' + encodeURIComponent(error.message))
  }
})

// Coding Profiles Management
router.get('/coding-profiles', isAuthenticated, async (req, res) => {
  const profile = await Profile.findOne() || {}
  res.render('coding-profiles', { profile, editIndex: null })
})

router.post('/coding-profiles', isAuthenticated, async (req, res) => {
  try {
    let profile = await Profile.findOne()
    if (!profile) profile = new Profile()
    
    const newProfile = {
      platform: req.body.platform,
      username: req.body.username,
      link: req.body.link,
      stats: {
        stat1Label: req.body.stat1Label,
        stat1Value: req.body.stat1Value,
        stat2Label: req.body.stat2Label,
        stat2Value: req.body.stat2Value,
        stat3Label: req.body.stat3Label,
        stat3Value: req.body.stat3Value
      }
    }
    
    profile.codingProfiles.push(newProfile)
    await profile.save()
    res.redirect('/admin/coding-profiles?success=' + encodeURIComponent('Coding profile added!'))
  } catch (error) {
    res.redirect('/admin/coding-profiles?error=' + encodeURIComponent(error.message))
  }
})

router.post('/coding-profiles/:index/update', isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOne()
    if (profile && profile.codingProfiles[req.params.index]) {
      profile.codingProfiles[req.params.index] = {
        platform: req.body.platform,
        username: req.body.username,
        link: req.body.link,
        stats: {
          stat1Label: req.body.stat1Label,
          stat1Value: req.body.stat1Value,
          stat2Label: req.body.stat2Label,
          stat2Value: req.body.stat2Value,
          stat3Label: req.body.stat3Label,
          stat3Value: req.body.stat3Value
        }
      }
      await profile.save()
    }
    res.redirect('/admin/coding-profiles?success=' + encodeURIComponent('Profile updated!'))
  } catch (error) {
    res.redirect('/admin/coding-profiles?error=' + encodeURIComponent(error.message))
  }
})

router.post('/coding-profiles/:index/delete', isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOne()
    if (profile) {
      profile.codingProfiles.splice(req.params.index, 1)
      await profile.save()
    }
    res.redirect('/admin/coding-profiles?success=' + encodeURIComponent('Profile deleted!'))
  } catch (error) {
    res.redirect('/admin/coding-profiles?error=' + encodeURIComponent(error.message))
  }
})

// Experience Management
router.get('/experience', isAuthenticated, async (req, res) => {
  const profile = await Profile.findOne() || {}
  res.render('experience', { profile })
})

router.post('/experience', isAuthenticated, async (req, res) => {
  try {
    let profile = await Profile.findOne()
    if (!profile) profile = new Profile()
    
    profile.experience.push({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      period: req.body.period,
      description: req.body.description,
      current: req.body.current === 'on'
    })
    await profile.save()
    res.redirect('/admin/experience?success=' + encodeURIComponent('Experience added!'))
  } catch (error) {
    res.redirect('/admin/experience?error=' + encodeURIComponent(error.message))
  }
})

router.post('/experience/:index/update', isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOne()
    if (profile && profile.experience[req.params.index]) {
      profile.experience[req.params.index] = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        period: req.body.period,
        description: req.body.description,
        current: req.body.current === 'on'
      }
      await profile.save()
    }
    res.redirect('/admin/experience?success=' + encodeURIComponent('Experience updated!'))
  } catch (error) {
    res.redirect('/admin/experience?error=' + encodeURIComponent(error.message))
  }
})

router.post('/experience/:index/delete', isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOne()
    if (profile) {
      profile.experience.splice(req.params.index, 1)
      await profile.save()
    }
    res.redirect('/admin/experience?success=' + encodeURIComponent('Experience deleted!'))
  } catch (error) {
    res.redirect('/admin/experience?error=' + encodeURIComponent(error.message))
  }
})

// Education Management
router.get('/education', isAuthenticated, async (req, res) => {
  const profile = await Profile.findOne() || {}
  res.render('education', { profile })
})

router.post('/education', isAuthenticated, async (req, res) => {
  try {
    let profile = await Profile.findOne()
    if (!profile) profile = new Profile()
    
    profile.education.push({
      title: req.body.title,
      institution: req.body.institution,
      location: req.body.location,
      period: req.body.period,
      description: req.body.description,
      current: req.body.current === 'on'
    })
    await profile.save()
    res.redirect('/admin/education?success=' + encodeURIComponent('Education added!'))
  } catch (error) {
    res.redirect('/admin/education?error=' + encodeURIComponent(error.message))
  }
})

router.post('/education/:index/update', isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOne()
    if (profile && profile.education[req.params.index]) {
      profile.education[req.params.index] = {
        title: req.body.title,
        institution: req.body.institution,
        location: req.body.location,
        period: req.body.period,
        description: req.body.description,
        current: req.body.current === 'on'
      }
      await profile.save()
    }
    res.redirect('/admin/education?success=' + encodeURIComponent('Education updated!'))
  } catch (error) {
    res.redirect('/admin/education?error=' + encodeURIComponent(error.message))
  }
})

router.post('/education/:index/delete', isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOne()
    if (profile) {
      profile.education.splice(req.params.index, 1)
      await profile.save()
    }
    res.redirect('/admin/education?success=' + encodeURIComponent('Education deleted!'))
  } catch (error) {
    res.redirect('/admin/education?error=' + encodeURIComponent(error.message))
  }
})

// Messages
router.get('/messages', isAuthenticated, async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 })
  res.render('messages', { messages })
})

router.post('/messages/:id/read', isAuthenticated, async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, { read: true })
  res.redirect('/admin/messages')
})

router.post('/messages/:id/delete', isAuthenticated, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id)
  res.redirect('/admin/messages')
})

export default router
