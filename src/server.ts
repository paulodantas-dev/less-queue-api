// src/server.ts
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import Fastify from 'fastify'

const server = Fastify({ logger: true })

// Plugins
server.register(cors)
server.register(swagger, {
  openapi: {
    info: {
      title: 'LessQueue API',
      version: '1.0.0',
      description: 'API para gerenciamento de pedidos e filas em restaurantes',
    },
  },
})
server.register(swaggerUi, {
  routePrefix: '/docs',
})

// Health Check Route
server.get('/health', async () => {
  return { status: 'ok' }
})

// Start Server
const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' })
    console.log('🚀 Server running at http://localhost:3000')
    console.log('📚 API Docs available at http://localhost:3000/docs')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
