import type { FastifyReply, FastifyRequest } from 'fastify'

import { UserRepositoryDatabase } from '@/infrastructure/database/users/user-repository'
import { loginSchema } from '@/presentation/routes/auth/login.route'
import { LoginUserUseCase } from '@/presentation/use-cases/auth/login.use-case'
import { generalErrorResponse } from '@/shared/utils/general-error-response'
import { sendResponse } from '@/shared/utils/send-response'

export async function loginHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email, password } = loginSchema.parse(request.body)

    const userRepository = new UserRepositoryDatabase()
    const loginUserUseCase = new LoginUserUseCase(userRepository)

    const user = await loginUserUseCase.execute(email, password)

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
      message: ['Login successful'],
      status: 200,
      data: { accessToken },
    })
  } catch (error) {
    generalErrorResponse({
      reply,
      error,
      logMessage: 'Error in loginHandler',
    })
  }
}
