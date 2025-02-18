import type { FastifyReply, FastifyRequest } from 'fastify'

import { UserRepositoryDatabase } from '@/infrastructure/database/users/user-repository'
import { RegisterUserUseCase } from '@/presentation/use-cases/auth/register.use-case'
import { generalErrorResponse } from '@/shared/utils/general-error-response'
import { sendResponse } from '@/shared/utils/send-response'

import { registerSchema } from '../../routes/auth/register-users.route'

export async function registerHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { name, email, password } = registerSchema.parse(request.body)

    const userRepository = new UserRepositoryDatabase()
    const registerUserUseCase = new RegisterUserUseCase(userRepository)

    const user = await registerUserUseCase.execute(name, email, password)

    const accessToken = await reply.jwtSign(
      { sub: user.getEmail(), role: user.getRole() },
      { expiresIn: '1d' },
    )

    const refreshToken = await reply.jwtSign(
      { sub: user.getEmail() },
      { expiresIn: '7d' },
    )

    reply.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })

    sendResponse({
      reply,
      success: true,
      message: ['User registered successfully'],
      status: 201,
      data: {
        accessToken,
      },
    })
  } catch (error) {
    generalErrorResponse({
      reply,
      error,
      logMessage: 'Error registering user',
    })
  }
}
