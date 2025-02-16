import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { BadRequestError } from './types/bad-request-error'
import { UnauthorizedError } from './types/unauthorized-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  const logger = request.log

  if (error instanceof ZodError) {
    logger.error({ error }, 'Validation error')

    reply.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequestError) {
    logger.error({ error }, 'Bad request error')

    reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    logger.error({ error }, 'Unauthorized error')

    reply.status(401).send({
      message: error.message,
    })
  }

  logger.error({ error }, 'Internal server error')

  reply.status(500).send({ message: 'Internal server error' })
}
