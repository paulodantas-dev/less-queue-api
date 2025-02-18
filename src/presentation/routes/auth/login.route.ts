import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { loginHandler } from '@/presentation/controllers/auth/login.controller'

export const loginSchema = z.object({
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

export async function loginRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/login',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate user and generate access token',
        body: loginSchema,
        response: {
          200: successSchema.strict(),
        },
      },
    },
    loginHandler,
  )
}
