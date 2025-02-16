import type { FastifyReply } from 'fastify/types/reply'

type SendResponseParams<T> = {
  reply: FastifyReply
  status: number
  success: boolean
  message: string[]
  data?: T
}

export function sendResponse<T>({
  reply,
  status,
  success,
  message,
  data,
}: SendResponseParams<T>) {
  return reply.code(status).send({
    success,
    message,
    data: data || null,
  })
}
