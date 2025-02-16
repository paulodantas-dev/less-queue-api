import type { FastifyReply, FastifyRequest } from 'fastify'

export async function testController(req: FastifyRequest, reply: FastifyReply) {
  reply.status(200).send({
    message: '🚀 Test route is working!',
    timestamp: new Date().toISOString(),
  })
}
