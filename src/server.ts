import { fastifyCors } from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { env } from './env'
import { errorHandler } from './error-handler'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// Configuração de validação e serialização com Zod
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

// Registro de middlewares e plugins
app.register(fastifyCors)
app.register(fastifyJwt, { secret: env.JWT_SECRET })
app.setErrorHandler(errorHandler)

// Rotas
app.get('/health', async () => {
  return { status: 'ok' }
})

// Swagger e Swagger UI
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Fastify SaaS Boilerplate',
      description: 'Fastify SaaS Boilerplate API Documentation',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

const start = async () => {
  try {
    await app.listen({ port: env.PORT, host: env.HOST })
    console.log(`🚀 Server running at http://${env.HOST}:${env.PORT}`)
    console.log(`📚 API Docs available at http://${env.HOST}:${env.PORT}/docs`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
