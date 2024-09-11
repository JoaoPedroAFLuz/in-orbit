import z from 'zod';

const envSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  PORT: z.coerce.number().default(3333),
});

const env = envSchema.parse(process.env);

export { env };
