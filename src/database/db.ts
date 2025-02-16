import mongoose from 'mongoose'

const mongoUri = `mongodb+srv://admin:admin@cluster0.adbd6.mongodb.net/`

export async function connectToDatabase() {
  try {
    await mongoose.connect(mongoUri, {
      dbName: 'lessqueue',
    })
    console.log('🚀 Connected to MongoDB successfully')
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error)
    process.exit(1)
  }
}
