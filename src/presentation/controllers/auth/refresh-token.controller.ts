import type { FastifyReply, FastifyRequest } from 'fastify'

import { UserRepositoryDatabase } from '@/infrastructure/database/users/user-repository'
import { RefreshTokenUseCase } from '@/presentation/use-cases/auth/refresh-token.use-case'
import { UnauthorizedError } from '@/shared/pre-handlers/error-handler/types/unauthorized-error'
import { generalErrorResponse } from '@/shared/utils/general-error-response'
import { sendResponse } from '@/shared/utils/send-response'

export async function refreshTokenHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const refreshToken = request.cookies.refreshToken

    if (!refreshToken) {
      throw new UnauthorizedError('Refresh token not provided')
    }

    const userRepository = new UserRepositoryDatabase()
    const refreshTokenUseCase = new RefreshTokenUseCase(userRepository)

    const user = await refreshTokenUseCase.execute(refreshToken)

    const accessToken = await reply.jwtSign(
      { sub: user.getEmail(), role: user.getRole() },
      { expiresIn: '1d' },
    )

    sendResponse({
      reply,
      success: true,
      message: ['Token refreshed successfully'],
      status: 200,
      data: { accessToken },
    })
  } catch (error) {
    generalErrorResponse({
      reply,
      error,
      logMessage: 'Error refreshing token',
    })
  }
}
