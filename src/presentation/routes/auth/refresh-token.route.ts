import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { refreshTokenHandler } from '@/presentation/controllers/auth/refresh-token.controller'

export const successSchema = z.object({
  success: z.boolean(),
  message: z.array(z.string()),
  data: z
    .object({
      accessToken: z.string(),
    })
    .nullable(),
})

export async function refreshTokenRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/refresh-token',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Create a new account',
        response: {
          200: successSchema,
        },
      },
    },
    refreshTokenHandler,
  )
}
