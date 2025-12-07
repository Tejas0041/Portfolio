import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Tejas Pawar' },
  title: { type: String, default: 'Full Stack Developer' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: 'Burhanpur, MP' },
  bio: { type: String, default: '' },
  aboutText: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  resumeLink: { type: String, default: '' }, // Google Drive or external link
  typingTexts: [{ type: String }],
  
  // Social Links
  socials: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  
  // Coding Profiles
  codingProfiles: [{
    platform: String,
    username: String,
    link: String,
    stats: {
      stat1Label: String,
      stat1Value: String,
      stat2Label: String,
      stat2Value: String,
      stat3Label: String,
      stat3Value: String
    }
  }],
  
  // Education
  education: [{
    title: String,
    institution: String,
    location: String,
    period: String,
    description: String,
    current: { type: Boolean, default: false }
  }],
  
  // Experience
  experience: [{
    title: String,
    company: String,
    location: String,
    period: String,
    description: String,
    current: { type: Boolean, default: false }
  }]
}, { timestamps: true })

export default mongoose.model('Profile', profileSchema)
