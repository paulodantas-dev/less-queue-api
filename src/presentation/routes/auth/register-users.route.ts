import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { registerHandler } from '@/presentation/controllers/auth/register.controller'

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must contain at least 6 characters'),
})

const successSchema = z.object({
  success: z.boolean(),
  message: z.array(z.string()),
  data: z
    .object({
      accessToken: z.string(),
    })
    .nullable(),
})

export async function registerUsersRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/register',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Create a new account',
        body: registerSchema,
        response: {
          201: successSchema.strict(),
        },
      },
    },
    registerHandler,
  )
}
