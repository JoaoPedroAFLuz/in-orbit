import fastify from 'fastify';

import { env } from '../env';

const app = fastify({ logger: true });

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
