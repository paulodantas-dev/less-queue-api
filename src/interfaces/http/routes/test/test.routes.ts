import type { FastifyInstance } from 'fastify'

import { testController } from '../../controllers/test/test.controller'

export async function testRoutes(app: FastifyInstance) {
  app.get('/', testController)
}
