import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { meHandler } from '@/presentation/controllers/user/me.controller'
import { userAuth } from '@/shared/pre-handlers/user-auth'

const authHeaderSchema = z
  .object({
    authorization: z
      .string({ message: 'Authorization header is required' })
      .regex(/^Bearer\s.+$/, {
        message: "Authorization header must be in the format 'Bearer <token>'",
      })
      .describe('Bearer token required'),
  })
  .passthrough()

const successSchema = z.object({
  success: z.boolean(),
  message: z.array(z.string()),
  data: z
    .object({
      id: z.string(),
      email: z.string(),
      name: z.string(),
      role: z.string(),
      phone: z.string().optional(),
      loginType: z.string().optional(),
      googleId: z.string().optional(),
      companyId: z.string().optional(),
      address: z
        .object({
          street: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          zipCode: z.string().optional(),
          complement: z.string().optional(),
        })
        .optional(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable(),
})

export async function meRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/me',
    {
      schema: {
        tags: ['User'],
        summary: 'Get user profile',
        headers: authHeaderSchema,
        response: {
          200: successSchema.strict(),
        },
      },
      preHandler: [userAuth],
    },
    meHandler,
  )
}
