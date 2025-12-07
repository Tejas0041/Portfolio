import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})



const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'portfolio/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }]
  }
})

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'portfolio/resume',
      allowed_formats: ['pdf'],
      resource_type: 'raw',
      public_id: `resume_${Date.now()}`,
      format: 'pdf'
    }
  }
})

export const uploadImage = multer({ storage: imageStorage })
export const uploadResume = multer({ storage: resumeStorage })

// Helper to convert resume URL to inline display
export const getInlineResumeUrl = (url) => {
  if (!url) return url
  
  // Don't modify if already has fl_attachment
  if (url.includes('fl_attachment')) {
    return url
  }
  
  // For Cloudinary raw files, add fl_attachment flag
  // Change from: https://res.cloudinary.com/xxx/raw/upload/v123/file
  // To: https://res.cloudinary.com/xxx/raw/upload/fl_attachment/v123/file
  
  return url.replace('/upload/', '/upload/fl_attachment/')
}

export { cloudinary }
