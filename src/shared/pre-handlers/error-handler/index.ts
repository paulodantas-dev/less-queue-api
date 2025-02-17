import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { sendResponse } from '@/shared/utils/send-response'

import { BaseError } from './types/base-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  const logger = request.log

  if (error.validation) {
    logger.error({ error }, 'Fastify validation error')

    return sendResponse({
      reply,
      status: 400,
      success: false,
      message: error.validation
        .map((v) => v.message)
        .filter((msg): msg is string => msg !== undefined),
      data: null,
    })
  }

  if (error instanceof ZodError) {
    logger.error({ error }, 'Zod validation error')
    const zodMessages = Object.values(error.flatten().fieldErrors)
      .flat()
      .filter((msg): msg is string => msg !== undefined)

    return sendResponse({
      reply,
      status: 400,
      success: false,
      message: zodMessages,
      data: null,
    })
  }

  if (error instanceof BaseError) {
    logger.error({ error }, `${error.statusCode} Error`)

    return sendResponse({
      reply,
      status: error.statusCode,
      success: false,
      message: [error.message],
      data: null,
    })
  }

  logger.error({ error }, 'Internal server error')
  return sendResponse({
    reply,
    status: 500,
    success: false,
    message: ['Internal server error'],
    data: null,
  })
}
