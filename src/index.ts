import { connectToDatabase } from './database/db'
import { env } from './env'
import { buildServer } from './server'

const start = async () => {
  const app = buildServer()

  try {
    await connectToDatabase()

    await app.listen({ port: env.PORT, host: env.HOST })
    console.log(`🚀 Server running at http://${env.HOST}:${env.PORT}`)
    console.log(`📚 API Docs available at http://${env.HOST}:${env.PORT}/docs`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
