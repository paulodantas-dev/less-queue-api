import type { FastifyRequest } from 'fastify/types/request'
import { jwtDecode } from 'jwt-decode'

import { UserRepositoryDatabase } from '@/infrastructure/database/users/user-repository'

import { NotFoundError } from '../error-handler/types/not-found-error'
import { UnauthorizedError } from '../error-handler/types/unauthorized-error'

export async function userAuth(request: FastifyRequest) {
  const userRepository = new UserRepositoryDatabase()

  if (!request.headers.authorization) {
    throw new UnauthorizedError()
  }

  const token = request.headers.authorization.split(' ')[1]

  if (!token) {
    throw new UnauthorizedError()
  }

  const decoded = jwtDecode(token)

  if (!decoded.sub) {
    throw new UnauthorizedError()
  }

  const userData = await userRepository.findByEmail(decoded.sub)

  if (!userData) {
    throw new NotFoundError()
  }

  request.userId = userData.getId()
}
