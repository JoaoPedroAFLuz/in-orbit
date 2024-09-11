import fastify from 'fastify';

import { env } from '../env';

const app = fastify({ logger: true });

console.log({ teste: env.DATABASE_URL });

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
