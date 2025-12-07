import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['frontend', 'backend', 'languages', 'tools'],
    required: true 
  },
  icon: { type: String, default: '' }, // Icon name from react-icons
  color: { type: String, default: '#6366f1' },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('Skill', skillSchema)
