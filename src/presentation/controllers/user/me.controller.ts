import type { FastifyReply } from 'fastify/types/reply'
import type { FastifyRequest } from 'fastify/types/request'

import { UserProfileRepositoryDatabase } from '@/infrastructure/database/users/user-profile-repository'
import { MeUseCase } from '@/presentation/use-cases/user/me.use-case'
import { generalErrorResponse } from '@/shared/utils/general-error-response'
import { sendResponse } from '@/shared/utils/send-response'

export async function meHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userProfileRepository = new UserProfileRepositoryDatabase()
    const meService = new MeUseCase(userProfileRepository)
    const userProfile = await meService.getUserProfileById(request.userId)

    if (!userProfile) {
      return sendResponse({
        reply,
        success: false,
        message: ['User not found'],
        status: 200,
        data: null,
      })
    }

    return sendResponse({
      reply,
      success: true,
      message: ['User profile retrieved successfully'],
      status: 200,
      data: userProfile,
    })
  } catch (error) {
    generalErrorResponse({
      reply,
      error,
      logMessage: 'Error getting user profile',
    })
  }
}
