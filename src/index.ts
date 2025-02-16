import { connectToDatabase } from './infrastructure/database/db'
import { buildServer } from './infrastructure/http/server'
import { env } from './shared/config/env'

async function start() {
  const app = buildServer()

  try {
    await connectToDatabase(app)

    await app.listen({ port: env.PORT, host: env.HOST })
    app.log.info(`Server running at http://${env.HOST}:${env.PORT}`)
    app.log.info(`API Docs available at http://${env.HOST}:${env.PORT}/docs`)
  } catch (err) {
    app.log.error('Server failed to start:', { err })
    process.exit(1)
  }
}

start()
