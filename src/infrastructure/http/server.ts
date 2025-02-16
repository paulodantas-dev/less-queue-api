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

import { testRoutes } from '@/interfaces/http/routes/test/test.routes'
import { env } from '@/shared/config/env'
import { errorHandler } from '@/shared/pre-handlers/error-handler'

export function buildServer() {
  //start app
  const app = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          messageFormat: '{msg}',
          ignore: 'pid,hostname',
        },
      },
    },
  }).withTypeProvider<ZodTypeProvider>()

  //zod validation
  app.setSerializerCompiler(serializerCompiler)
  app.setValidatorCompiler(validatorCompiler)

  //pre-handlers
  app.register(fastifyCors)
  app.register(fastifyJwt, { secret: env.JWT_SECRET })
  app.setErrorHandler(errorHandler)

  //routes
  app.register(testRoutes)

  //swagger docs
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'LessQueue API',
        description: 'API Documentation for LessQueue',
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

  //return app
  return app
}
