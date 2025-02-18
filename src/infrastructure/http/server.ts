import { fastifyCookie } from '@fastify/cookie'
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

import { loginRoute } from '@/presentation/routes/auth/login.route'
import { refreshTokenRoute } from '@/presentation/routes/auth/refresh-token.route'
import { registerUsersRoute } from '@/presentation/routes/auth/register-users.route'
import { meRoute } from '@/presentation/routes/user/me.route'
import { env } from '@/shared/config/env'
import { errorHandler } from '@/shared/pre-handlers/error-handler'

export function buildServer() {
  //start app
  const app = fastify({
    logger:
      env.NODE_ENV === 'development'
        ? {
            transport: {
              target: 'pino-pretty',
              options: {
                colorize: true,
                messageFormat: '{msg}',
                ignore: 'pid,hostname',
              },
            },
          }
        : {},
  }).withTypeProvider<ZodTypeProvider>()

  //zod validation
  app.setSerializerCompiler(serializerCompiler)
  app.setValidatorCompiler(validatorCompiler)

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
      security: [{ bearerAuth: [] }],
    },
    transform: jsonSchemaTransform,
  })
  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })

  //pre-handlers
  app.register(fastifyCors)
  app.register(fastifyJwt, { secret: env.JWT_SECRET })
  app.register(fastifyCookie, {
    secret: env.COOKIE_SECRET,
  })

  //error handler
  app.setErrorHandler(errorHandler)

  //auth routes
  app.register(registerUsersRoute, { prefix: '/api/auth' })
  app.register(loginRoute, { prefix: '/api/auth' })
  app.register(refreshTokenRoute, { prefix: '/api/auth' })

  app.register(meRoute, { prefix: '/api/user' })

  //return app
  return app
}
