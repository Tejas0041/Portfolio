import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.join(__dirname, '.env')

// Check if .env exists
if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found at:', envPath)
  process.exit(1)
}

// Load environment variables
const result = dotenv.config({ path: envPath })

if (result.error) {
  console.error('❌ Error loading .env:', result.error)
  process.exit(1)
}

// Verify critical env vars
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('❌ Missing Cloudinary credentials in .env file!')
}
