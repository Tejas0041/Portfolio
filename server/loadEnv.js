import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.join(__dirname, '.env')

// Only load .env file if it exists (for local development)
// On Render/production, environment variables are set directly
if (fs.existsSync(envPath)) {
  const result = dotenv.config({ path: envPath })
  
  if (result.error) {
    console.warn('⚠️  Warning loading .env:', result.error.message)
  } else {
    console.log('✓ .env file loaded from:', envPath)
  }
} else {
  console.log('ℹ️  .env file not found - using environment variables (production mode)')
}

// Verify critical env vars exist
const requiredVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET', 'MONGODB_URI']
const missingVars = requiredVars.filter(v => !process.env[v])

if (missingVars.length > 0) {
  console.warn(`⚠️  Missing environment variables: ${missingVars.join(', ')}`)
}
