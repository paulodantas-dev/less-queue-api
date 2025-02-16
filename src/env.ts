import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  PORT: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1024).max(65535),
  ),
  HOST: z
    .string()
    .default('localhost')
    .refine(
      (host) => {
        return (
          host === 'localhost' ||
          host === '127.0.0.1' ||
          host.match(/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/)
        )
      },
      {
        message: 'HOST must be a valid IP address or localhost',
      },
    ),
  JWT_SECRET: z.string().nonempty('JWT_SECRET is required'),
})

export const env = envSchema.parse(process.env)
