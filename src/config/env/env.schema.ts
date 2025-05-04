import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.number().default(3000),
  JWT_SECRET: z.string(),
});

export type Env = z.infer<typeof envSchema>;
