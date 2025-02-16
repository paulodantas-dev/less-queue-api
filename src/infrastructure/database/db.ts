import type { FastifyInstance } from 'fastify/types/instance'
import { connect } from 'mongoose'

import { env } from '@/shared/config/env'

const mongoUri = env.MONGO_URI

export async function connectToDatabase(app: FastifyInstance) {
  try {
    await connect(mongoUri, {
      dbName: 'lessqueue',
    })
    app.log.info('Connected to MongoDB successfully')
  } catch (error) {
    app.log.info('Failed to connect to MongoDB:', error)
    process.exit(1)
  }
}
