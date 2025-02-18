import type { FastifyReply } from 'fastify/types/reply'

import { sendResponse } from '../send-response'

type GeneralErrorResponseParams = {
  reply: FastifyReply
  error: Error | unknown
  logMessage?: string
}

export function generalErrorResponse({
  reply,
  error,
  logMessage,
}: GeneralErrorResponseParams) {
  reply.log.error({ error }, logMessage || 'An error occurred')

  const statusCode = error instanceof Error ? 400 : 500
  return sendResponse({
    reply,
    success: false,
    message:
      error instanceof Error ? [error.message] : ['An unknown error occurred'],
    status: statusCode,
  })
}
