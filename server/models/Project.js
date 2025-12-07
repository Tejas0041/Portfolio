import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  tags: [{ type: String }],
  github: { type: String, default: '' },
  live: { type: String, default: '' },
  category: { 
    type: String, 
    enum: ['fullstack', 'frontend', 'backend', 'mobile', 'other'],
    default: 'fullstack'
  },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('Project', projectSchema)
