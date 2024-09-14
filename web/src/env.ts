import z from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.coerce.string().default('http://localhost:3333'),
});

const env = envSchema.parse(import.meta.env);

export { env };
