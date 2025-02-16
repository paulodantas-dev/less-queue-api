import type { FastifyReply, FastifyRequest } from 'fastify'

import { sendResponse } from '@/shared/utils/send-reponse'

import { registerSchema } from '../../routes/auth/register-users.routes'
import { registerService } from '../../services/register.service'

export async function handler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, email, password } = registerSchema.parse(request.body)

    const user = await registerService({ name, email, password })

    const token = await reply.jwtSign(
      { sub: user.id, email: user.email },
      { expiresIn: '1d' },
    )

    sendResponse({
      reply,
      success: true,
      message: ['User registered successfully'],
      status: 201,
      data: { token },
    })
  } catch (error) {
    reply.log.error({ error }, 'Error registering user')

    const statusCode = error instanceof Error ? 400 : 500
    sendResponse({
      reply,
      success: false,
      message:
        error instanceof Error
          ? [error.message]
          : ['An unknown error occurred'],
      status: statusCode,
    })
  }
}
